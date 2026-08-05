import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Container,
  Cabecalho,
  Marca,
  MarcaIcone,
  MarcaTexto,
  Navegacao,
  LinkNavegacao,
  AreaUsuario,
  Avatar,
  IdentificacaoUsuario,
  PapelUsuario,
  BotaoSair,
  Conteudo,
  Pagina,
} from './styles.js';

export default function Layout({ children }) {
  const { usuario, logout } = useAuth();
  const location = useLocation();

  const podeGerenciarConsultas = ['admin', 'recepcionista'].includes(
    usuario.papel
  );

  const iniciais = usuario.nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  return (
    <Container>
      <Cabecalho>
        <Marca>
          <MarcaIcone aria-hidden="true">+</MarcaIcone>
          <MarcaTexto>
            <span>OdontoVida</span>
            <small>Gestão da clínica</small>
          </MarcaTexto>
        </Marca>

        <Navegacao>
          <LinkNavegacao
            as={Link}
            to="/"
            $ativo={location.pathname === '/'}
          >
            Dashboard
          </LinkNavegacao>

          <LinkNavegacao
            as={Link}
            to="/agenda"
            $ativo={location.pathname === '/agenda'}
          >
            Agenda
          </LinkNavegacao>

          <LinkNavegacao
            as={Link}
            to="/pacientes"
            $ativo={location.pathname.startsWith('/pacientes')}
          >
            Pacientes
          </LinkNavegacao>

          <LinkNavegacao
            as={Link}
            to="/profissionais"
            $ativo={location.pathname.startsWith('/profissionais')}
          >
            Profissionais
          </LinkNavegacao>

          <LinkNavegacao
            as={Link}
            to="/historico"
            $ativo={location.pathname === '/historico'}
          >
            Histórico
          </LinkNavegacao>

          {podeGerenciarConsultas && (
            <LinkNavegacao
              as={Link}
              to="/usuarios"
              $ativo={location.pathname.startsWith('/usuarios')}
            >
              Usuários
            </LinkNavegacao>
          )}

          {podeGerenciarConsultas && (
            <LinkNavegacao
              as={Link}
              to="/consultas/nova"
              $ativo={location.pathname === '/consultas/nova'}
            >
              Nova consulta
            </LinkNavegacao>
          )}
        </Navegacao>

        <AreaUsuario>
          <Avatar aria-hidden="true">{iniciais}</Avatar>
          <IdentificacaoUsuario>
            <strong>{usuario.nome}</strong>
            <PapelUsuario>{usuario.papel}</PapelUsuario>
          </IdentificacaoUsuario>

          <BotaoSair type="button" onClick={logout}>
            Sair
          </BotaoSair>
        </AreaUsuario>
      </Cabecalho>

      <Conteudo>
        <Pagina key={location.pathname}>{children}</Pagina>
      </Conteudo>
    </Container>
  );
}
