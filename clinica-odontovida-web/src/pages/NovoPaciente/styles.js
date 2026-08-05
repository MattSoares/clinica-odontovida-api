import styled from 'styled-components';

export const CabecalhoPagina = styled.div`
  margin-bottom: 24px;

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

export const Formulario = styled.form`
  max-width: 820px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

export const Campo = styled.div`
  grid-column: ${({ $ocuparLinha }) => ($ocuparLinha ? '1 / -1' : 'auto')};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 7px;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font: inherit;
  font-size: 14px;
  outline: none;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const MensagemErro = styled.p`
  max-width: 820px;
  padding: 14px 16px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background-color: #fef2f2;
  color: #b91c1c;
`;

export const Acoes = styled.div`
  grid-column: 1 / -1;

  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 450px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const BotaoSalvar = styled.button`
  padding: 11px 18px;
  border: none;
  border-radius: 7px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

export const BotaoCancelar = styled.button`
  padding: 11px 18px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #374151;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const TextoAjuda = styled.small`
  display: block;
  margin-top: 7px;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
`;

export const EstadoDisponibilidade = styled.small`
  display: block;
  margin-top: 7px;
  color: #b45309;
  font-size: 12px;
  font-weight: 600;
`;
