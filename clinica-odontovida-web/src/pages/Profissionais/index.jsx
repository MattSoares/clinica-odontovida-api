import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ModalConfirmacao from '../../components/ModalConfirmacao/index.jsx';
import {
  CabecalhoPagina,
  TituloGrupo,
  BotaoNovoProfissional,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
  NomeProfissional,
  ColunaAcoes,
  GrupoAcoes,
  BotaoEditar,
  BotaoDesativar,
} from './styles.js';

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [quantidadeConsultas, setQuantidadeConsultas] = useState({});
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [desativando, setDesativando] = useState(false);

  const { usuario } = useAuth();
  const podeGerenciarProfissionais = ['admin', 'recepcionista'].includes(
    usuario.papel
  );

  useEffect(() => {
    async function carregarProfissionais() {
      try {
        const [respostaProfissionais, respostaConsultas] = await Promise.all([
          api.get('/profissionais'),
          api.get('/consultas'),
        ]);

        const consultasAtivas = respostaConsultas.data.filter(
          (consulta) => ['agendada', 'confirmada'].includes(consulta.status)
        );

        const totais = consultasAtivas.reduce((acumulador, consulta) => {
          const profissionalId = consulta.profissional?._id || consulta.profissional;
          if (profissionalId) {
            acumulador[profissionalId] = (acumulador[profissionalId] || 0) + 1;
          }
          return acumulador;
        }, {});

        setProfissionais(respostaProfissionais.data);
        setQuantidadeConsultas(totais);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar os profissionais'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProfissionais();
  }, []);

  async function desativarProfissional() {
    if (!profissionalSelecionado) return;
    setErro('');
    setDesativando(true);

    try {
      await api.delete(`/profissionais/${profissionalSelecionado._id}`);
      setProfissionais((profissionaisAtuais) =>
        profissionaisAtuais.filter(
          (profissional) => profissional._id !== profissionalSelecionado._id
        )
      );
      setProfissionalSelecionado(null);
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível desativar o profissional'
      );
    } finally {
      setDesativando(false);
    }
  }

  if (carregando) {
    return <p>Carregando profissionais...</p>;
  }

  return (
    <>
      <CabecalhoPagina>
        <TituloGrupo>
          <h1>Profissionais</h1>
          <p>Consulte os profissionais ativos cadastrados na clínica.</p>
        </TituloGrupo>

        {podeGerenciarProfissionais && (
          <BotaoNovoProfissional as={Link} to="/profissionais/novo">
            Novo profissional
          </BotaoNovoProfissional>
        )}
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}

      {!erro && profissionais.length === 0 && (
        <EstadoVazio>
          Nenhum profissional cadastrado até o momento.
        </EstadoVazio>
      )}

      {profissionais.length > 0 && (
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especialidade</th>
                <th>Telefone</th>
                <th>Consultas</th>
                {podeGerenciarProfissionais && <th>Ações</th>}
              </tr>
            </thead>

            <tbody>
              {profissionais.map((profissional) => (
                <tr key={profissional._id}>
                  <td>
                    <NomeProfissional>{profissional.nome}</NomeProfissional>
                  </td>
                  <td>{profissional.especialidade}</td>
                  <td>{profissional.telefone || 'Não informado'}</td>
                  <td>{quantidadeConsultas[profissional._id] || 0}</td>
                  {podeGerenciarProfissionais && (
                    <ColunaAcoes>
                      <GrupoAcoes>
                        <BotaoEditar
                          as={Link}
                          to={`/profissionais/${profissional._id}/editar`}
                        >
                          Editar
                        </BotaoEditar>
                        <BotaoDesativar
                          type="button"
                          onClick={() => setProfissionalSelecionado(profissional)}
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
        aberto={Boolean(profissionalSelecionado)}
        titulo="Desativar profissional?"
        mensagem={
          profissionalSelecionado
            ? `${profissionalSelecionado.nome} deixará de aparecer nas listagens, mas as consultas já registradas serão preservadas.`
            : ''
        }
        textoConfirmar="Desativar profissional"
        carregando={desativando}
        onConfirmar={desativarProfissional}
        onCancelar={() => setProfissionalSelecionado(null)}
      />
    </>
  );
}
