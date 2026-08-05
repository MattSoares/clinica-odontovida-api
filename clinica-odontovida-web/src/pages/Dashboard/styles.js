import styled from 'styled-components';

export const Cabecalho = styled.div`
  margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
  h1 { margin: 0; color: #111827; font-size: 28px; }
  p { margin: 6px 0 0; color: #6b7280; font-size: 14px; }
  > span { padding: 6px 10px; border-radius: 999px; background: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 700; text-transform: capitalize; }
`;
export const GradeIndicadores = styled.section`display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; @media(max-width:1000px){grid-template-columns:repeat(2,1fr)} @media(max-width:520px){grid-template-columns:1fr}`;
export const Indicador = styled.article`padding: 20px; border: 1px solid #e5e7eb; border-top: 4px solid ${({$cor})=>$cor}; border-radius: 10px; background: #fff; box-shadow: 0 2px 8px rgba(15,23,42,.04);`;
export const RotuloIndicador = styled.span`display:block; color:#6b7280; font-size:13px;`;
export const ValorIndicador = styled.strong`display:block; margin-top:8px; color:#111827; font-size:30px;`;
export const GradeConteudo = styled.section`display:grid; grid-template-columns:minmax(0,1.6fr) minmax(280px,.8fr); gap:20px; @media(max-width:850px){grid-template-columns:1fr}`;
export const Painel = styled.article`padding:22px; border:1px solid #e5e7eb; border-radius:10px; background:#fff;`;
export const TituloPainel = styled.div`display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:18px; h2{margin:0;color:#111827;font-size:18px} p{margin:5px 0 0;color:#6b7280;font-size:13px} a{color:#2563eb;font-size:13px;font-weight:700;text-decoration:none}`;
export const ListaConsultas = styled.div`display:grid; gap:10px;`;
export const Consulta = styled.div`padding:14px; border:1px solid #e5e7eb; border-radius:8px; display:flex; justify-content:space-between; gap:16px; div{display:flex;flex-direction:column;gap:4px} div:last-child{align-items:flex-end} strong{color:#111827;font-size:14px} span,time{color:#6b7280;font-size:12px} @media(max-width:560px){flex-direction:column;div:last-child{align-items:flex-start}}`;
export const Status = styled.span`padding:4px 8px;border-radius:999px;background:${({$status})=>$status==='confirmada'?'#ecfdf5':'#eff6ff'};color:${({$status})=>$status==='confirmada'?'#047857':'#1d4ed8'}!important;font-weight:700;text-transform:capitalize;`;
export const EstadoVazio = styled.div`padding:32px 16px;border:1px dashed #d1d5db;border-radius:8px;color:#6b7280;text-align:center;font-size:14px;`;
export const Atalhos = styled.div`display:grid;grid-template-columns:repeat(2,1fr);gap:10px;@media(max-width:420px){grid-template-columns:1fr}`;
export const Atalho = styled.a`padding:13px;border:1px solid #dbeafe;border-radius:8px;background:#f8fbff;color:#1d4ed8;font-size:13px;font-weight:700;text-align:center;text-decoration:none;&:hover{background:#eff6ff}`;
export const MensagemErro = styled.p`padding:14px 16px;border:1px solid #fecaca;border-radius:7px;background:#fef2f2;color:#b91c1c;`;
