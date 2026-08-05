import styled from 'styled-components';

export const Select = styled.select`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background-color: #ffffff;
  color: #111827;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;
