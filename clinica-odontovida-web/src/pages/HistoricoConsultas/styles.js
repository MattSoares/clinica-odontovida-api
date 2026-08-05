import styled from 'styled-components';

export const CabecalhoPagina = styled.div`
  margin-bottom: 24px;
  h1 { margin: 0; color: #111827; font-size: 28px; }
  p { margin: 6px 0 0; color: #6b7280; font-size: 14px; }
`;

export const Filtros = styled.section`
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.8fr 0.9fr 0.9fr auto;
  align-items: end;
  gap: 14px;
  @media (max-width: 1050px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const CampoFiltro = styled.div`
  label { display: block; margin-bottom: 6px; color: #374151; font-size: 12px; font-weight: 700; }
`;

const estiloCampo = `
  width: 100%; height: 40px; padding: 0 11px; border: 1px solid #d1d5db;
  border-radius: 7px; background: #fff; color: #111827; font-size: 14px;
  outline: none; box-sizing: border-box;
`;
export const Input = styled.input`${estiloCampo}`;
export const Select = styled.select`${estiloCampo}`;

export const BotaoLimpar = styled.button`
  height: 40px; padding: 0 14px; border: 1px solid #d1d5db; border-radius: 7px;
  background: #fff; color: #374151; font-weight: 600; white-space: nowrap; cursor: pointer;
  &:disabled { cursor: not-allowed; opacity: 0.5; }
`;

export const Resumo = styled.p`margin: 12px 0 16px; color: #6b7280; font-size: 13px;`;
export const MensagemErro = styled.p`padding: 14px 16px; border: 1px solid #fecaca; border-radius: 7px; background: #fef2f2; color: #b91c1c;`;
export const EstadoVazio = styled.div`padding: 48px 20px; border: 1px dashed #d1d5db; border-radius: 10px; background: #fff; color: #6b7280; text-align: center;`;
export const TabelaContainer = styled.div`overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff;`;
export const Tabela = styled.table`
  width: 100%; min-width: 900px; border-collapse: collapse;
  th, td { padding: 15px 18px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 14px; }
  th { background: #f9fafb; color: #4b5563; font-size: 12px; text-transform: uppercase; }
  td { color: #4b5563; }
  tbody tr:last-child td { border-bottom: none; }
`;

export const Status = styled.span`
  display: inline-flex; padding: 5px 9px; border-radius: 999px; font-size: 12px;
  font-weight: 700; text-transform: capitalize;
  background: ${({ $status }) => $status === 'cancelada' ? '#fef2f2' : $status === 'confirmada' ? '#ecfdf5' : $status === 'concluida' ? '#f3f4f6' : '#eff6ff'};
  color: ${({ $status }) => $status === 'cancelada' ? '#b91c1c' : $status === 'confirmada' ? '#047857' : $status === 'concluida' ? '#4b5563' : '#1d4ed8'};
`;
