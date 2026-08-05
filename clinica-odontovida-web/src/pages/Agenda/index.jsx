import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ModalConfirmacao from '../../components/ModalConfirmacao/index.jsx';
import {
  CabecalhoPagina,
  TituloGrupo,
  BotaoNovaConsulta,
  Filtros,
  CampoFiltro,
  InputFiltro,
  SelectFiltro,
  BotaoLimpar,
  Resumo,
  MensagemErro,
  EstadoVazio,
  ListaConsultas,
  CardConsulta,
  DadosConsulta,
  Status,
  AcoesConsulta,
  BotaoStatus,
  BotaoEditar,
  BotaoCancelar,
} from './styles.js';

export default function Agenda() {
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [cancelando, setCancelando] = useState(false);
  const [atualizandoStatus, setAtualizandoStatus] = useState(null);
  const [buscaPaciente, setBuscaPaciente] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const { usuario } = useAuth();

  const podeGerenciarConsultas = ['admin', 'recepcionista'].includes(
    usuario.papel
  );

  const profissionais = useMemo(() => {
    const profissionaisUnicos = new Map();

    consultas.forEach((consulta) => {
      if (consulta.profissional?._id) {
        profissionaisUnicos.set(consulta.profissional._id, {
          id: consulta.profissional._id,
          nome: consulta.profissional.nome,
        });
      }
    });

    return Array.from(profissionaisUnicos.values()).sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR')
    );
  }, [consultas]);

  const consultasFiltradas = useMemo(() => {
    const buscaNormalizada = buscaPaciente.trim().toLocaleLowerCase('pt-BR');

    return consultas.filter((consulta) => {
      const nomePaciente = (consulta.paciente?.nome || '').toLocaleLowerCase(
        'pt-BR'
      );
      const profissionalId = consulta.profissional?._id || '';
      const dataConsulta = new Date(consulta.dataHora);
      const ano = dataConsulta.getFullYear();
      const mes = String(dataConsulta.getMonth() + 1).padStart(2, '0');
      const dia = String(dataConsulta.getDate()).padStart(2, '0');
      const dataLocal = `${ano}-${mes}-${dia}`;

      return (
        (!buscaNormalizada || nomePaciente.includes(buscaNormalizada)) &&
        (!filtroProfissional || profissionalId === filtroProfissional) &&
        (!filtroStatus || consulta.status === filtroStatus) &&
        (!filtroData || dataLocal === filtroData)
      );
    });
  }, [
    consultas,
    buscaPaciente,
    filtroProfissional,
    filtroStatus,
    filtroData,
  ]);

  const possuiFiltros = Boolean(
    buscaPaciente || filtroProfissional || filtroStatus || filtroData
  );

  function limparFiltros() {
    setBuscaPaciente('');
    setFiltroProfissional('');
    setFiltroStatus('');
    setFiltroData('');
  }

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const resposta = await api.get('/consultas');
        setConsultas(
          resposta.data.filter((consulta) =>
            ['agendada', 'confirmada'].includes(consulta.status)
          )
        );
      } catch {
        setErro('Não foi possível carregar as consultas');
      } finally {
        setCarregando(false);
      }
    }

    carregarConsultas();
  }, []);

  async function cancelarConsulta() {
    if (!consultaSelecionada) return;
    setErro('');
    setCancelando(true);
    try {
      await api.delete(`/consultas/${consultaSelecionada._id}`);

      setConsultas((consultasAtuais) =>
        consultasAtuais.filter(
          (consulta) => consulta._id !== consultaSelecionada._id
        )
      );
      setConsultaSelecionada(null);
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível cancelar a consulta'
      );
    } finally {
      setCancelando(false);
    }
  }

  async function alterarStatus(consulta, novoStatus) {
    setErro('');
    setAtualizandoStatus(consulta._id);

    try {
      const resposta = await api.put(`/consultas/${consulta._id}`, {
        status: novoStatus,
      });

      setConsultas((consultasAtuais) => {
        if (novoStatus === 'concluida') {
          return consultasAtuais.filter(
            (consultaAtual) => consultaAtual._id !== consulta._id
          );
        }

        return consultasAtuais.map((consultaAtual) =>
          consultaAtual._id === consulta._id
            ? { ...consultaAtual, ...resposta.data }
            : consultaAtual
        );
      });
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível atualizar o status da consulta'
      );
    } finally {
      setAtualizandoStatus(null);
    }
  }

  if (carregando) {
    return <p>Carregando consultas...</p>;
  }

  return (
    <>
      <CabecalhoPagina>
        <TituloGrupo>
          <h1>Agenda</h1>
          <p>Acompanhe as consultas cadastradas na clínica.</p>
        </TituloGrupo>

        {podeGerenciarConsultas && (
          <BotaoNovaConsulta as={Link} to="/consultas/nova">
            Nova consulta
          </BotaoNovaConsulta>
        )}
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      {!erro && consultas.length > 0 && (
        <>
          <Filtros>
            <CampoFiltro>
              <label htmlFor="buscaPaciente">Paciente</label>
              <InputFiltro
                id="buscaPaciente"
                type="search"
                value={buscaPaciente}
                onChange={(event) => setBuscaPaciente(event.target.value)}
                placeholder="Buscar por nome"
              />
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="filtroProfissional">Profissional</label>
              <SelectFiltro
                id="filtroProfissional"
                value={filtroProfissional}
                onChange={(event) => setFiltroProfissional(event.target.value)}
              >
                <option value="">Todos</option>
                {profissionais.map((profissional) => (
                  <option key={profissional.id} value={profissional.id}>
                    {profissional.nome}
                  </option>
                ))}
              </SelectFiltro>
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="filtroStatus">Status</label>
              <SelectFiltro
                id="filtroStatus"
                value={filtroStatus}
                onChange={(event) => setFiltroStatus(event.target.value)}
              >
                <option value="">Todos</option>
                <option value="agendada">Agendada</option>
                <option value="confirmada">Confirmada</option>
                <option value="concluida">Concluída</option>
              </SelectFiltro>
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="filtroData">Data</label>
              <InputFiltro
                id="filtroData"
                type="date"
                value={filtroData}
                onChange={(event) => setFiltroData(event.target.value)}
              />
            </CampoFiltro>

            <BotaoLimpar
              type="button"
              onClick={limparFiltros}
              disabled={!possuiFiltros}
            >
              Limpar filtros
            </BotaoLimpar>
          </Filtros>

          <Resumo>
            {consultasFiltradas.length}{' '}
            {consultasFiltradas.length === 1
              ? 'consulta encontrada'
              : 'consultas encontradas'}
          </Resumo>
        </>
      )}

      {consultas.length === 0 && !erro && (
        <EstadoVazio>
          Nenhuma consulta cadastrada até o momento.
        </EstadoVazio>
      )}

      {consultas.length > 0 && consultasFiltradas.length === 0 && (
        <EstadoVazio>
          Nenhuma consulta corresponde aos filtros selecionados.
        </EstadoVazio>
      )}

      <ListaConsultas>
        {consultasFiltradas.map((consulta) => (
          <CardConsulta key={consulta._id}>
            <DadosConsulta>
              <h2>{consulta.paciente?.nome || 'Paciente não encontrado'}</h2>

              <p>
                <strong>Profissional:</strong>{' '}
                {consulta.profissional?.nome || 'Profissional não encontrado'}
              </p>

              <p>
                <strong>Especialidade:</strong>{' '}
                {consulta.profissional?.especialidade || 'Não informada'}
              </p>

              <p>
                <strong>Data:</strong>{' '}
                {new Date(consulta.dataHora).toLocaleString('pt-BR')}
              </p>

              <Status $status={consulta.status}>
                {consulta.status}
              </Status>
            </DadosConsulta>

            {consulta.status !== 'cancelada' && podeGerenciarConsultas && (
              <AcoesConsulta>
                {consulta.status === 'agendada' && (
                  <BotaoStatus
                    type="button"
                    onClick={() => alterarStatus(consulta, 'confirmada')}
                    disabled={atualizandoStatus === consulta._id}
                  >
                    {atualizandoStatus === consulta._id
                      ? 'Atualizando...'
                      : 'Confirmar'}
                  </BotaoStatus>
                )}

                {consulta.status === 'confirmada' && (
                  <BotaoStatus
                    type="button"
                    onClick={() => alterarStatus(consulta, 'concluida')}
                    disabled={atualizandoStatus === consulta._id}
                  >
                    {atualizandoStatus === consulta._id
                      ? 'Atualizando...'
                      : 'Concluir'}
                  </BotaoStatus>
                )}

                <BotaoEditar
                  as={Link}
                  to={`/consultas/${consulta._id}/editar`}
                >
                  Editar
                </BotaoEditar>
                <BotaoCancelar
                  type="button"
                  onClick={() => setConsultaSelecionada(consulta)}
                  disabled={atualizandoStatus === consulta._id}
                >
                  Cancelar consulta
                </BotaoCancelar>
              </AcoesConsulta>
            )}
          </CardConsulta>
        ))}
      </ListaConsultas>

      <ModalConfirmacao
        aberto={Boolean(consultaSelecionada)}
        titulo="Cancelar consulta?"
        mensagem={
          consultaSelecionada
            ? `A consulta de ${consultaSelecionada.paciente?.nome || 'este paciente'} será marcada como cancelada.`
            : ''
        }
        textoConfirmar="Cancelar consulta"
        carregando={cancelando}
        onConfirmar={cancelarConsulta}
        onCancelar={() => setConsultaSelecionada(null)}
      />
    </>
  );
}
