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

export const BotaoNovaConsulta = styled.a`
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

export const ListaConsultas = styled.div`
  display: grid;
  gap: 16px;
`;

export const CardConsulta = styled.article`
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;

  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const DadosConsulta = styled.div`
  h2 {
    margin: 0 0 8px;
    color: #111827;
    font-size: 18px;
  }

  p {
    margin: 5px 0;
    color: #4b5563;
    font-size: 14px;
  }
`;

export const Status = styled.span`
  display: inline-flex;
  margin-top: 10px;
  padding: 5px 9px;
  border-radius: 999px;

  background-color: ${({ $status }) => {
    if ($status === 'cancelada') return '#fef2f2';
    if ($status === 'confirmada') return '#ecfdf5';
    if ($status === 'concluida') return '#f3f4f6';
    return '#eff6ff';
  }};

  color: ${({ $status }) => {
    if ($status === 'cancelada') return '#b91c1c';
    if ($status === 'confirmada') return '#047857';
    if ($status === 'concluida') return '#4b5563';
    return '#1d4ed8';
  }};

  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
`;

export const AcoesConsulta = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

export const BotaoStatus = styled.button`
  padding: 9px 12px;
  border: 1px solid #a7f3d0;
  border-radius: 7px;
  background-color: #ecfdf5;
  color: #047857;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) { background-color: #d1fae5; }
  &:disabled { cursor: not-allowed; opacity: 0.6; }
`;

export const Filtros = styled.section`
  margin-bottom: 12px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: minmax(180px, 1.5fr) repeat(3, minmax(150px, 1fr)) auto;
  align-items: end;
  gap: 14px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CampoFiltro = styled.div`
  label {
    display: block;
    margin-bottom: 6px;
    color: #374151;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const InputFiltro = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 11px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #111827;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const SelectFiltro = styled.select`
  width: 100%;
  height: 40px;
  padding: 0 11px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #111827;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const BotaoLimpar = styled.button`
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #374151;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  &:hover:not(:disabled) { background-color: #f9fafb; }
  &:disabled { cursor: not-allowed; opacity: 0.5; }
`;

export const Resumo = styled.p`
  margin: 0 0 16px;
  color: #6b7280;
  font-size: 13px;
`;

export const BotaoEditar = styled.a`
  padding: 9px 12px;
  border: 1px solid #bfdbfe;
  border-radius: 7px;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;

  &:hover { background-color: #dbeafe; }
`;

export const BotaoCancelar = styled.button`
  padding: 9px 12px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background-color: #ffffff;
  color: #b91c1c;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #fef2f2;
  }

  &:disabled { cursor: not-allowed; opacity: 0.6; }
`;
