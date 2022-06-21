import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;

    img {
      width: 4rem;
      border-radius: 50%;
    }
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 1rem;
`;

export const Footer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
  }
`;
