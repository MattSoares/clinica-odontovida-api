import styled from 'styled-components';

export const Fundo = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: min(100%, 440px);
  padding: 28px;
  border-radius: 14px;
  background-color: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
  text-align: center;
`;

export const Icone = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background-color: #fef2f2;
  color: #dc2626;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 800;
`;

export const Titulo = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 21px;
`;

export const Mensagem = styled.p`
  margin: 10px 0 24px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
`;

export const Acoes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const BotaoVoltar = styled.button`
  padding: 11px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: #374151;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) { background-color: #f9fafb; }
  &:disabled { cursor: not-allowed; opacity: 0.6; }
`;

export const BotaoConfirmar = styled.button`
  padding: 11px 16px;
  border: 1px solid #dc2626;
  border-radius: 8px;
  background-color: #dc2626;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) { background-color: #b91c1c; }
  &:disabled { cursor: not-allowed; opacity: 0.65; }
`;
