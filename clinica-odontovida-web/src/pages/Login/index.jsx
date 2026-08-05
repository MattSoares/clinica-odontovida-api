import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Container,
  Card,
  Logo,
  LogoIcone,
  LogoTexto,
  Titulo,
  Subtitulo,
  Form,
  Campo,
  Label,
  Input,
  Botao,
  MensagemErro,
  MensagemAviso,
  Rodape,
} from './styles.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessaoExpirada = searchParams.get('motivo') === 'sessao-expirada';

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setEnviando(true);

    try {
      await login(email, senha);
      navigate('/');
    // eslint-disable-next-line no-unused-vars
    } catch (erroLogin) {
      setErro('Email ou senha inválidos');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container>
      <Card>
        <Logo>
          <LogoIcone aria-hidden="true">+</LogoIcone>
          <LogoTexto>
            <strong>OdontoVida</strong>
            <span>Gestão da clínica</span>
          </LogoTexto>
        </Logo>

        <Titulo>Bem-vindo de volta</Titulo>
        <Subtitulo>
          Entre com sua conta para acessar a agenda e os dados da clínica.
        </Subtitulo>

        {sessaoExpirada && (
          <MensagemAviso>
            Sua sessão expirou. Entre novamente para continuar.
          </MensagemAviso>
        )}

        <Form onSubmit={handleSubmit}>
          <Campo>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seuemail@odontovida.com"
              autoComplete="email"
              required
            />
          </Campo>

          <Campo>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
          </Campo>

          {erro && <MensagemErro>{erro}</MensagemErro>}

          <Botao type="submit" disabled={enviando}>
            {enviando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </Form>

        <Rodape>
          Acesso exclusivo para a equipe da Clínica OdontoVida.
        </Rodape>
      </Card>
    </Container>
  );
}
