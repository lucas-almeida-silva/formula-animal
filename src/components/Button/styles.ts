import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  height: 3.4rem;
  width: 100%;
  padding: 0 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 0.5rem;
  border: 0;
  transition: 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }
`;
