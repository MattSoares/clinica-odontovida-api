import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  CabecalhoPagina,
  Formulario,
  Campo,
  Label,
  Input,
  TextoAjuda,
  MensagemErro,
  Acoes,
  BotaoSalvar,
  BotaoCancelar,
} from '../NovoPaciente/styles.js';
import { Select } from '../EditarConsulta/styles.js';

export default function EditarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [papel, setPapel] = useState('recepcionista');
  const [profissionalRef, setProfissionalRef] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const { usuario: usuarioLogado } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const editandoPropriaConta = usuarioLogado.id === id;

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaUsuario, respostaProfissionais] = await Promise.all([
          api.get(`/usuarios/${id}`),
          api.get('/profissionais'),
        ]);
        const usuario = respostaUsuario.data;
        setNome(usuario.nome || '');
        setEmail(usuario.email || '');
        setPapel(usuario.papel || 'recepcionista');
        setProfissionalRef(usuario.profissionalRef?._id || '');
        setProfissionais(respostaProfissionais.data);
      } catch (erroRequisicao) {
        setErro(
          erroRequisicao.response?.data?.mensagem ||
            'Não foi possível carregar o usuário'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    if (papel === 'dentista' && !profissionalRef) {
      setErro('Selecione o profissional correspondente ao dentista');
      return;
    }

    if (novaSenha && novaSenha.length < 6) {
      setErro('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('A confirmação da senha não corresponde à nova senha');
      return;
    }

    setSalvando(true);
    try {
      await api.put(`/usuarios/${id}`, {
        nome,
        email,
        papel,
        profissionalRef: papel === 'dentista' ? profissionalRef : undefined,
        senha: novaSenha || undefined,
      });
      navigate('/usuarios');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível atualizar o usuário'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <p>Carregando usuário...</p>;

  return (
    <>
      <CabecalhoPagina>
        <h1>Editar usuário</h1>
        <p>Atualize os dados e as permissões da conta.</p>
      </CabecalhoPagina>
      {erro && <MensagemErro>{erro}</MensagemErro>}

      <Formulario onSubmit={handleSubmit}>
        <Campo>
          <Label htmlFor="nome">Nome completo</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Campo>
        <Campo>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Campo>
        <Campo>
          <Label htmlFor="papel">Papel</Label>
          <Select
            id="papel"
            value={papel}
            disabled={editandoPropriaConta}
            onChange={(e) => {
              setPapel(e.target.value);
              if (e.target.value !== 'dentista') setProfissionalRef('');
            }}
          >
            <option value="recepcionista">Recepcionista</option>
            <option value="dentista">Dentista</option>
            {usuarioLogado.papel === 'admin' && <option value="admin">Administrador</option>}
          </Select>
          {editandoPropriaConta && (
            <TextoAjuda>Seu próprio papel não pode ser alterado.</TextoAjuda>
          )}
        </Campo>

        {papel === 'dentista' && (
          <Campo>
            <Label htmlFor="profissionalRef">Profissional correspondente</Label>
            <Select id="profissionalRef" value={profissionalRef} onChange={(e) => setProfissionalRef(e.target.value)} required>
              <option value="">Selecione um profissional</option>
              {profissionais.map((profissional) => (
                <option key={profissional._id} value={profissional._id}>
                  {profissional.nome} — {profissional.especialidade}
                </option>
              ))}
            </Select>
          </Campo>
        )}

        {usuarioLogado.papel === 'admin' && (
          <>
            <Campo>
              <Label htmlFor="novaSenha">Nova senha</Label>
              <Input
                id="novaSenha"
                type="password"
                minLength={6}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                autoComplete="new-password"
              />
              <TextoAjuda>
                Deixe em branco para manter a senha atual.
              </TextoAjuda>
            </Campo>

            <Campo>
              <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                minLength={6}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                autoComplete="new-password"
                required={Boolean(novaSenha)}
              />
            </Campo>
          </>
        )}

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </BotaoSalvar>
          <BotaoCancelar type="button" onClick={() => navigate('/usuarios')} disabled={salvando}>
            Cancelar
          </BotaoCancelar>
        </Acoes>
      </Formulario>
    </>
  );
}
