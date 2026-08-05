import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ModalConfirmacao from '../../components/ModalConfirmacao/index.jsx';
import {
  CabecalhoPagina,
  TituloGrupo,
  BotaoNovoPaciente,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
  NomePaciente,
  ColunaAcoes,
  GrupoAcoes,
  BotaoEditar,
  BotaoDesativar,
} from './styles.js';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [desativando, setDesativando] = useState(false);

  const { usuario } = useAuth();

  const podeGerenciarPacientes = ['admin', 'recepcionista'].includes(
    usuario.papel
  );

  useEffect(() => {
    async function carregarPacientes() {
      try {
        const resposta = await api.get('/pacientes');
        setPacientes(resposta.data);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar os pacientes'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPacientes();
  }, []);

  function formatarData(data) {
    if (!data) {
      return 'Não informada';
    }

    return new Date(data).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
  }

  async function desativarPaciente() {
    if (!pacienteSelecionado) return;
    setErro('');
    setDesativando(true);

    try {
      await api.delete(`/pacientes/${pacienteSelecionado._id}`);

      setPacientes((pacientesAtuais) =>
        pacientesAtuais.filter(
          (pacienteAtual) => pacienteAtual._id !== pacienteSelecionado._id
        )
      );
      setPacienteSelecionado(null);
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível desativar o paciente'
      );
    } finally {
      setDesativando(false);
    }
  }

  if (carregando) {
    return <p>Carregando pacientes...</p>;
  }

  return (
    <>
      <CabecalhoPagina>
        <TituloGrupo>
          <h1>Pacientes</h1>
          <p>Consulte os pacientes ativos cadastrados na clínica.</p>
        </TituloGrupo>

        {podeGerenciarPacientes && (
          <BotaoNovoPaciente as={Link} to="/pacientes/novo">
            Novo paciente
          </BotaoNovoPaciente>
        )}
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      {!erro && pacientes.length === 0 && (
        <EstadoVazio>
          Nenhum paciente cadastrado até o momento.
        </EstadoVazio>
      )}

      {pacientes.length > 0 && (
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Data de nascimento</th>

                {podeGerenciarPacientes && <th>Ações</th>}
              </tr>
            </thead>

            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente._id}>
                  <td>
                    <NomePaciente>{paciente.nome}</NomePaciente>
                  </td>

                  <td>{paciente.telefone}</td>
                  <td>{paciente.email || 'Não informado'}</td>
                  <td>{formatarData(paciente.dataNascimento)}</td>

                  {podeGerenciarPacientes && (
                    <ColunaAcoes>
                      <GrupoAcoes>
                        <BotaoEditar
                          as={Link}
                          to={`/pacientes/${paciente._id}/editar`}
                        >
                          Editar
                        </BotaoEditar>

                        <BotaoDesativar
                          type="button"
                          onClick={() => setPacienteSelecionado(paciente)}
                        >
                          Desativar
                        </BotaoDesativar>
                      </GrupoAcoes>
                    </ColunaAcoes>
                  )}
                </tr>
              ))}
            </tbody>
          </Tabela>
        </TabelaContainer>
      )}

      <ModalConfirmacao
        aberto={Boolean(pacienteSelecionado)}
        titulo="Desativar paciente?"
        mensagem={
          pacienteSelecionado
            ? `${pacienteSelecionado.nome} deixará de aparecer nas listagens, mas seu registro será preservado.`
            : ''
        }
        textoConfirmar="Desativar paciente"
        carregando={desativando}
        onConfirmar={desativarPaciente}
        onCancelar={() => setPacienteSelecionado(null)}
      />
    </>
  );
}
