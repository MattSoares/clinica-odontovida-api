import styled from 'styled-components';
import {
  CabecalhoPagina,
  TituloGrupo,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
} from '../Pacientes/styles.js';

export {
  CabecalhoPagina,
  TituloGrupo,
  MensagemErro,
  EstadoVazio,
  TabelaContainer,
  Tabela,
};

export const BotaoNovoUsuario = styled.a`
  padding: 11px 18px; border-radius: 7px; background: #2563eb; color: #fff;
  font-size: 14px; font-weight: 600; text-align: center; text-decoration: none;
  &:hover { background: #1d4ed8; }
`;

export const Papel = styled.span`
  display: inline-flex; padding: 5px 9px; border-radius: 999px;
  background: #eff6ff; color: #1d4ed8; font-size: 12px;
  font-weight: 700; text-transform: capitalize;
`;

export const ColunaAcoes = styled.td`width: 190px;`;
export const GrupoAcoes = styled.div`display: flex; align-items: center; gap: 8px;`;
export const BotaoEditar = styled.a`
  padding: 8px 12px; border: 1px solid #bfdbfe; border-radius: 6px;
  background: #eff6ff; color: #1d4ed8; font-size: 13px; font-weight: 600;
  text-decoration: none; &:hover { background: #dbeafe; }
`;
export const BotaoDesativar = styled.button`
  padding: 8px 12px; border: 1px solid #fecaca; border-radius: 6px;
  background: #fff; color: #b91c1c; font-size: 13px; font-weight: 600; cursor: pointer;
  &:hover { background: #fef2f2; }
`;
