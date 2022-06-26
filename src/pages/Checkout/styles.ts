import styled from 'styled-components';
import { Row } from 'react-grid-system';

import { Card } from '../../components/Card';

export const Container = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 3rem;
  gap: 3rem;

  > div:first-child {
    flex: 1;
  }

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  padding: 3rem;

  fieldset {
    border: none;

    & + fieldset {
      margin-top: 2rem;
    }

    legend {
      font: 600 1.5rem Poppins;
      margin-bottom: 2rem;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.divisor};
      width: 100%;
    }
  }

  button {
    margin-top: 3rem;
  }
`;

export const Payment = styled.div`
  display: flex;

  .rcss {
    margin: 0;
  }

  > div:nth-child(2) {
    margin-left: 4rem;
    flex: 1;
  }

  @media (max-width: 1280px) {
    flex-direction: column;

    > div:nth-child(2) {
      margin-top: 3.4rem;
      margin-left: 0;
    }
  }
`;

export const Summary = styled(Card)`
  width: 25rem;
  height: 100%;
  padding: 1.8rem 1.4rem;

  > strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  section {
    > div {
      & + div {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid ${({ theme }) => theme.colors.divisor};
      }

      div {
        display: flex;
        justify-content: space-between;

        &:first-child {
          justify-content: flex-start;
          margin-bottom: 0.6rem;

          img {
            width: 4.5rem;
            margin-right: 0.5rem;
          }
        }

        span {
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.4rem;
        }
      }
    }
  }

  footer {
    margin: 1.5rem 0 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid ${({ theme }) => theme.colors.divisor};

    div {
      display: flex;
      justify-content: space-between;

      & + div {
        margin-top: 0.8rem;
      }

      strong {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 930px) {
    width: 100%;
  }
`;

export const FormGroupRow = styled(Row)`
  row-gap: 1.3rem;

  & + div {
    margin-top: 1.3rem;
  }
`;
