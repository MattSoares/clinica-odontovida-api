import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f4f7fb;
  color: #1f2937;
`;

export const Cabecalho = styled.header`
  min-height: 72px;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 3px 14px rgba(15, 23, 42, 0.04);

  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 800px) {
    padding: 20px;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
`;

export const Marca = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 172px;
`;

export const MarcaIcone = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(145deg, #2563eb, #1d4ed8);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 21px;
  font-weight: 800;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.22);
  transform: rotate(-3deg);
  transition: transform 180ms ease;

  ${Marca}:hover & {
    transform: rotate(3deg) scale(1.04);
  }
`;

export const MarcaTexto = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #2563eb;
    font-size: 20px;
    font-weight: 700;
  }

  small {
    color: #6b7280;
    font-size: 12px;
  }
`;

export const Navegacao = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;

  @media (max-width: 800px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const LinkNavegacao = styled.a`
  padding: 10px 14px;
  border-radius: 7px;

  color: ${({ $ativo }) => ($ativo ? '#1d4ed8' : '#4b5563')};
  background-color: ${({ $ativo }) => ($ativo ? '#eff6ff' : 'transparent')};

  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease,
    transform 160ms ease;

  &:hover {
    color: #1d4ed8;
    background-color: #eff6ff;
    transform: translateY(-1px);
  }
`;

export const AreaUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 14px;
  border-left: 1px solid #e5e7eb;

  @media (max-width: 800px) {
    width: 100%;
    justify-content: space-between;
    padding-left: 0;
    border-left: none;
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #1d4ed8;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

export const IdentificacaoUsuario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;

  @media (max-width: 800px) {
    align-items: flex-start;
  }
`;

export const PapelUsuario = styled.span`
  margin-top: 2px;
  color: #6b7280;
  font-size: 12px;
  text-transform: capitalize;
`;

export const BotaoSair = styled.button`
  padding: 9px 14px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #374151;
  cursor: pointer;
  transition: color 160ms ease, border-color 160ms ease,
    background-color 160ms ease;

  &:hover {
    border-color: #fecaca;
    background-color: #fef2f2;
    color: #b91c1c;
  }
`;

export const Conteudo = styled.main`
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 32px 0;
`;

export const Pagina = styled.div`
  animation: entradaPagina 240ms ease-out both;

  @keyframes entradaPagina {
    from {
      opacity: 0;
      transform: translateY(7px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  article,
  section {
    transition: transform 180ms ease, box-shadow 180ms ease;
  }
`;
