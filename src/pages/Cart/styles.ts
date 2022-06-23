import styled from 'styled-components';
import { Card } from '../../components/Card';

export const Container = styled(Card)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;

  h1 {
    border-bottom: 2px solid ${({ theme }) => theme.colors.divisor};
    padding-bottom: 1rem;
  }

  > p {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  footer {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 2px solid ${({ theme }) => theme.colors.divisor};

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    div {
      width: 20rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  @media (max-width: 500px) {
    padding: 3rem 1.4rem;

    footer div {
      width: 100%;
    }
  }
`;

export const CartItems = styled.section`
  margin-top: 3rem;

  header {
    background: ${({ theme }) => theme.colors.inputBorder};
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 3fr 1.5fr 1fr;
    padding: 1rem;

    @media (max-width: 900px) {
      display: none;
    }
  }

  article {
    display: grid;
    grid-template-columns: 3fr 1.5fr 1fr;
    width: 100%;
    padding: 0 1rem;

    & + article {
      margin-top: 1.4rem;
      padding-top: 1.4rem;
      border-top: 2px solid ${({ theme }) => theme.colors.divisor};
    }

    > div:first-child {
      display: flex;

      img {
        width: 10rem;
      }

      span {
        font-weight: bold;
        font-size: 1.2rem;
        margin-left: 0.5rem;
      }
    }

    > strong {
      font-size: 1.2rem;
    }

    @media (max-width: 900px) {
      display: flex;
      flex-wrap: wrap;
      padding: 0;

      > div:first-child {
        width: 100%;
        margin-bottom: 1.4rem;

        img {
          width: 9rem;
        }

        span {
          font-size: 1rem;
        }
      }

      > strong {
        margin-left: auto;
      }
    }
  }
`;

export const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: max-content;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 3.4rem;
      height: 2.6rem;
      text-align: center;
      border: 1px solid ${({ theme }) => theme.colors.inputBorder};
      outline: none;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    button {
      height: 2rem;
      width: 2rem;
      border: none;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        stroke-width: 3.2;
      }
    }
  }

  > button {
    margin-top: 5px;
    border: none;
    background: transparent;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textDanger};
  }
`;

export const Summary = styled.ul`
  list-style: none;
  width: 100%;

  margin-bottom: 2rem;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + li {
      margin-top: 0.8rem;
    }

    span {
      font-size: 1.1rem;
    }

    &:nth-child(2) {
      padding-bottom: 1.1rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid ${({ theme }) => theme.colors.divisor};
    }

    &:last-child {
      span {
        font-size: 1.3rem;
        font-weight: 600;
        align-self: flex-start;
      }

      strong {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 500px) {
    li {
      span {
        font-size: 1rem;
      }

      &:last-child {
        span {
          font-size: 1.2rem;
        }

        strong {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
