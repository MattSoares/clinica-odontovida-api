import styled from 'styled-components';

export const CabecalhoPagina = styled.div`
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const BotaoNovoProfissional = styled.a`
  padding: 11px 18px;
  border-radius: 7px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const TituloGrupo = styled.div`
  h1 {
    margin: 0;
    color: #111827;
    font-size: 28px;
  }

  p {
    margin: 6px 0 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

export const MensagemErro = styled.p`
  padding: 14px 16px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background-color: #fef2f2;
  color: #b91c1c;
`;

export const EstadoVazio = styled.div`
  padding: 48px 20px;
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  background-color: #ffffff;
  color: #6b7280;
  text-align: center;
`;

export const TabelaContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
`;

export const Tabela = styled.table`
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;

  th,
  td {
    padding: 16px 18px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    font-size: 14px;
  }

  th {
    background-color: #f9fafb;
    color: #4b5563;
    font-size: 12px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  td {
    color: #4b5563;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }
`;

export const NomeProfissional = styled.strong`
  color: #111827;
`;

export const ColunaAcoes = styled.td`
  width: 190px;
`;

export const GrupoAcoes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BotaoEditar = styled.a`
  display: inline-flex;
  padding: 8px 12px;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background-color: #dbeafe;
  }
`;

export const BotaoDesativar = styled.button`
  padding: 8px 12px;
  border: 1px solid #fecaca;
  border-radius: 6px;
  background-color: #ffffff;
  color: #b91c1c;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) { background-color: #fef2f2; }
  &:disabled { cursor: not-allowed; opacity: 0.6; }
`;
