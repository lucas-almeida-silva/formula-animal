import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 5.1rem 1rem 4rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1500px;
    margin: 0 auto;

    img {
      width: 4rem;
      border-radius: 50%;
    }

    a:nth-child(2) {
      background: transparent;
      border: none;
      color: #fff;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 2rem;
      }

      span {
        position: absolute;
        bottom: 18px;
        right: -17px;

        height: 28px;
        width: 28px;
        border-radius: 50%;
        background-color: red;
        color: #fff;

        font-size: 0.8rem;
        font-weight: 500;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 1rem 3.1rem 1rem 2rem;
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 2.5rem 1.2rem;
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem 4rem;
  color: #fff;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1500px;
    margin: 0 auto;
  }
`;
