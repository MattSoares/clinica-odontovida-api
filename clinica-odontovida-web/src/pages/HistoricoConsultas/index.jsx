import { useEffect, useMemo, useState } from 'react';
import api from '../../api/api.js';
import {
  CabecalhoPagina,
  Filtros,
  CampoFiltro,
  Input,
  Select,
  BotaoLimpar,
  Resumo,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
  Status,
} from './styles.js';

function normalizarTexto(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function dataLocalEmTexto(dataHora) {
  const data = new Date(dataHora);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export default function HistoricoConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [buscaPaciente, setBuscaPaciente] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const resposta = await api.get('/consultas');
        setConsultas(resposta.data);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar o histórico'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarHistorico();
  }, []);

  const profissionais = useMemo(() => {
    const unicos = new Map();
    consultas.forEach((consulta) => {
      if (consulta.profissional?._id) {
        unicos.set(consulta.profissional._id, consulta.profissional.nome);
      }
    });
    return Array.from(unicos, ([id, nome]) => ({ id, nome })).sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR')
    );
  }, [consultas]);

  const consultasFiltradas = useMemo(() => {
    const busca = normalizarTexto(buscaPaciente.trim());

    return consultas.filter((consulta) => {
      const nomePaciente = normalizarTexto(consulta.paciente?.nome);
      const profissionalId = consulta.profissional?._id || '';
      const dataConsulta = dataLocalEmTexto(consulta.dataHora);

      return (
        (!busca || nomePaciente.includes(busca)) &&
        (!filtroProfissional || profissionalId === filtroProfissional) &&
        (!filtroStatus || consulta.status === filtroStatus) &&
        (!dataInicial || dataConsulta >= dataInicial) &&
        (!dataFinal || dataConsulta <= dataFinal)
      );
    });
  }, [
    consultas,
    buscaPaciente,
    filtroProfissional,
    filtroStatus,
    dataInicial,
    dataFinal,
  ]);

  const possuiFiltros = Boolean(
    buscaPaciente ||
      filtroProfissional ||
      filtroStatus ||
      dataInicial ||
      dataFinal
  );

  function limparFiltros() {
    setBuscaPaciente('');
    setFiltroProfissional('');
    setFiltroStatus('');
    setDataInicial('');
    setDataFinal('');
  }

  if (carregando) return <p>Carregando histórico...</p>;

  return (
    <>
      <CabecalhoPagina>
        <h1>Histórico de consultas</h1>
        <p>Consulte todos os registros de atendimento da clínica.</p>
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      {!erro && consultas.length > 0 && (
        <>
          <Filtros>
            <CampoFiltro>
              <label htmlFor="historicoPaciente">Paciente</label>
              <Input
                id="historicoPaciente"
                type="search"
                value={buscaPaciente}
                onChange={(event) => setBuscaPaciente(event.target.value)}
                placeholder="Buscar por nome"
              />
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="historicoProfissional">Profissional</label>
              <Select
                id="historicoProfissional"
                value={filtroProfissional}
                onChange={(event) => setFiltroProfissional(event.target.value)}
              >
                <option value="">Todos</option>
                {profissionais.map((profissional) => (
                  <option key={profissional.id} value={profissional.id}>
                    {profissional.nome}
                  </option>
                ))}
              </Select>
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="historicoStatus">Status</label>
              <Select
                id="historicoStatus"
                value={filtroStatus}
                onChange={(event) => setFiltroStatus(event.target.value)}
              >
                <option value="">Todos</option>
                <option value="agendada">Agendada</option>
                <option value="confirmada">Confirmada</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </Select>
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="dataInicial">Data inicial</label>
              <Input
                id="dataInicial"
                type="date"
                value={dataInicial}
                max={dataFinal || undefined}
                onChange={(event) => setDataInicial(event.target.value)}
              />
            </CampoFiltro>

            <CampoFiltro>
              <label htmlFor="dataFinal">Data final</label>
              <Input
                id="dataFinal"
                type="date"
                value={dataFinal}
                min={dataInicial || undefined}
                onChange={(event) => setDataFinal(event.target.value)}
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
            {consultasFiltradas.length === 1 ? 'registro encontrado' : 'registros encontrados'}
          </Resumo>
        </>
      )}

      {!erro && consultas.length === 0 && (
        <EstadoVazio>Nenhuma consulta registrada.</EstadoVazio>
      )}

      {consultas.length > 0 && consultasFiltradas.length === 0 && (
        <EstadoVazio>Nenhum registro corresponde aos filtros.</EstadoVazio>
      )}

      {consultasFiltradas.length > 0 && (
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Profissional</th>
                <th>Data e horário</th>
                <th>Status</th>
                <th>Registrada por</th>
              </tr>
            </thead>
            <tbody>
              {consultasFiltradas.map((consulta) => (
                <tr key={consulta._id}>
                  <td><strong>{consulta.paciente?.nome || 'Não encontrado'}</strong></td>
                  <td>{consulta.profissional?.nome || 'Não encontrado'}</td>
                  <td>{new Date(consulta.dataHora).toLocaleString('pt-BR')}</td>
                  <td><Status $status={consulta.status}>{consulta.status}</Status></td>
                  <td>{consulta.registradaPor?.nome || 'Não informado'}</td>
                </tr>
              ))}
            </tbody>
          </Tabela>
        </TabelaContainer>
      )}
    </>
  );
}
