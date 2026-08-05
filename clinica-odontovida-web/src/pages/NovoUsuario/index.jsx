import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function NovoUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState('recepcionista');
  const [profissionalRef, setProfissionalRef] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProfissionais() {
      try {
        const resposta = await api.get('/profissionais');
        setProfissionais(resposta.data);
      } catch {
        setErro('Não foi possível carregar os profissionais');
      }
    }
    carregarProfissionais();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    if (papel === 'dentista' && !profissionalRef) {
      setErro('Selecione o profissional correspondente ao dentista');
      return;
    }

    setSalvando(true);
    try {
      await api.post('/usuarios', {
        nome,
        email,
        senha,
        papel,
        profissionalRef: papel === 'dentista' ? profissionalRef : undefined,
      });
      navigate('/usuarios');
    } catch (erroRequisicao) {
      setErro(
        erroRequisicao.response?.data?.mensagem ||
          'Não foi possível criar o usuário'
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <CabecalhoPagina>
        <h1>Novo usuário</h1>
        <p>Crie uma conta de acesso para a equipe da clínica.</p>
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
          <Label htmlFor="senha">Senha inicial</Label>
          <Input id="senha" type="password" minLength={6} value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <TextoAjuda>Mínimo de 6 caracteres.</TextoAjuda>
        </Campo>
        <Campo>
          <Label htmlFor="papel">Papel</Label>
          <Select
            id="papel"
            value={papel}
            onChange={(e) => {
              setPapel(e.target.value);
              if (e.target.value !== 'dentista') setProfissionalRef('');
            }}
          >
            <option value="recepcionista">Recepcionista</option>
            <option value="dentista">Dentista</option>
            {usuario.papel === 'admin' && <option value="admin">Administrador</option>}
          </Select>
        </Campo>

        {papel === 'dentista' && (
          <Campo $ocuparLinha>
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

        <Acoes>
          <BotaoSalvar type="submit" disabled={salvando}>
            {salvando ? 'Criando...' : 'Criar usuário'}
          </BotaoSalvar>
          <BotaoCancelar type="button" onClick={() => navigate('/usuarios')} disabled={salvando}>
            Cancelar
          </BotaoCancelar>
        </Acoes>
      </Formulario>
    </>
  );
}
