import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 1rem solid ${({ theme }) => theme.colors.loader};
  border-top: 1rem solid ${({ theme }) => theme.colors.primary};
  animation: ${Spin} 2s linear infinite;
`;
