import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, input, textarea, select, p, span {
    font: 400 1rem Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  button {
    font: 600 1rem Poppins, sans-serif;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    html {
      font-size: 93.75%;
    }
  }
`;
