import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ModalConfirmacao from '../../components/ModalConfirmacao/index.jsx';
import {
  CabecalhoPagina,
  TituloGrupo,
  BotaoNovoUsuario,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
  Papel,
  ColunaAcoes,
  GrupoAcoes,
  BotaoEditar,
  BotaoDesativar,
} from './styles.js';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [desativando, setDesativando] = useState(false);
  const { usuario: usuarioLogado } = useAuth();

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const resposta = await api.get('/usuarios');
        setUsuarios(resposta.data);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar os usuários'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarios();
  }, []);

  function podeDesativar(usuario) {
    if (usuario._id === usuarioLogado.id) return false;
    if (usuario.papel === 'admin' && usuarioLogado.papel !== 'admin') return false;
    return true;
  }

  function podeEditar(usuario) {
    return usuarioLogado.papel === 'admin' || usuario.papel !== 'admin';
  }

  async function desativarUsuario() {
    if (!usuarioSelecionado) return;
    setErro('');
    setDesativando(true);

    try {
      await api.delete(`/usuarios/${usuarioSelecionado._id}`);
      setUsuarios((atuais) =>
        atuais.filter((usuario) => usuario._id !== usuarioSelecionado._id)
      );
      setUsuarioSelecionado(null);
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível desativar o usuário'
      );
    } finally {
      setDesativando(false);
    }
  }

  if (carregando) return <p>Carregando usuários...</p>;

  return (
    <>
      <CabecalhoPagina>
        <TituloGrupo>
          <h1>Usuários</h1>
          <p>Gerencie as pessoas que podem acessar o sistema.</p>
        </TituloGrupo>
        <BotaoNovoUsuario as={Link} to="/usuarios/novo">
          Novo usuário
        </BotaoNovoUsuario>
      </CabecalhoPagina>

      {erro && <MensagemErro>{erro}</MensagemErro>}
      {!erro && usuarios.length === 0 && (
        <EstadoVazio>Nenhum usuário ativo encontrado.</EstadoVazio>
      )}

      {usuarios.length > 0 && (
        <TabelaContainer>
          <Tabela>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Papel</th>
                <th>Profissional vinculado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td><strong>{usuario.nome}</strong></td>
                  <td>{usuario.email}</td>
                  <td><Papel>{usuario.papel}</Papel></td>
                  <td>{usuario.profissionalRef?.nome || 'Não se aplica'}</td>
                  <ColunaAcoes>
                    <GrupoAcoes>
                      {podeEditar(usuario) && (
                        <BotaoEditar as={Link} to={`/usuarios/${usuario._id}/editar`}>
                          Editar
                        </BotaoEditar>
                      )}
                      {podeDesativar(usuario) && (
                        <BotaoDesativar
                          type="button"
                          onClick={() => setUsuarioSelecionado(usuario)}
                        >
                          Desativar
                        </BotaoDesativar>
                      )}
                    </GrupoAcoes>
                  </ColunaAcoes>
                </tr>
              ))}
            </tbody>
          </Tabela>
        </TabelaContainer>
      )}

      <ModalConfirmacao
        aberto={Boolean(usuarioSelecionado)}
        titulo="Desativar usuário?"
        mensagem={
          usuarioSelecionado
            ? `${usuarioSelecionado.nome} não poderá mais entrar no sistema.`
            : ''
        }
        textoConfirmar="Desativar usuário"
        carregando={desativando}
        onConfirmar={desativarUsuario}
        onCancelar={() => setUsuarioSelecionado(null)}
      />
    </>
  );
}
