import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 28px 20px;
  overflow: hidden;
  background: linear-gradient(145deg, #eff6ff 0%, #f8fafc 48%, #ecfeff 100%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    filter: blur(2px);
  }

  &::before {
    width: 360px;
    height: 360px;
    top: -170px;
    right: -100px;
    background: rgba(37, 99, 235, 0.12);
  }

  &::after {
    width: 300px;
    height: 300px;
    left: -130px;
    bottom: -150px;
    background: rgba(8, 145, 178, 0.1);
  }
`;

export const Card = styled.div`
  width: min(100%, 420px);
  padding: 38px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
  animation: entradaLogin 320ms ease-out both;

  @keyframes entradaLogin {
    from { opacity: 0; transform: translateY(12px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 480px) {
    padding: 28px 22px;
    border-radius: 14px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 30px;
`;

export const LogoIcone = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(145deg, #2563eb, #1d4ed8);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.24);
  transform: rotate(-3deg);
`;

export const LogoTexto = styled.div`
  display: flex;
  flex-direction: column;

  strong { color: #1d4ed8; font-size: 19px; }
  span { margin-top: 1px; color: #64748b; font-size: 11px; }
`;

export const Titulo = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: 26px;
  line-height: 1.2;
`;

export const Subtitulo = styled.p`
  margin: 9px 0 26px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.55;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export const Campo = styled.div``;

export const Label = styled.label`
  display: block;
  margin-bottom: 7px;
  color: #334155;
  font-size: 13px;
  font-weight: 650;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 13px;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &::placeholder { color: #94a3b8; }
  &:hover { border-color: #94a3b8; }
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.11);
  }
`;

export const Botao = styled.button`
  min-height: 46px;
  margin-top: 3px;
  padding: 12px;
  border: none;
  border-radius: 9px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.18);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 11px 20px rgba(37, 99, 235, 0.23);
  }

  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { background: #93c5fd; cursor: not-allowed; box-shadow: none; }
`;

export const MensagemErro = styled.p`
  margin: -4px 0 0;
  padding: 10px 12px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background-color: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
`;

export const MensagemAviso = styled.p`
  margin: -10px 0 20px;
  padding: 11px 12px;
  border: 1px solid #fde68a;
  border-radius: 7px;
  background-color: #fffbeb;
  color: #92400e;
  font-size: 13px;
  line-height: 1.45;
`;

export const Rodape = styled.p`
  margin: 24px 0 0;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
  color: #94a3b8;
  font-size: 11px;
  text-align: center;
`;
