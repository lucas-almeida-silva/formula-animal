import styled from 'styled-components';
import { Card } from '../../components/Card';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProductSummary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  > div:first-child {
    width: 30rem;
    height: 29rem;
    flex-shrink: 0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  @media (max-width: 885px) {
    flex-direction: column;

    > div:first-child {
      width: 100%;
      height: 32rem;
    }
  }

  @media (max-width: 620px) {
    > section:first-child {
      height: 30rem;
    }
  }

  @media (max-width: 480px) {
    > section:first-child {
      height: 25rem;
    }
  }
`;

export const ProductInfo = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.8rem 3rem;

  h1 {
    line-height: 2rem;
    font-size: 1.6rem;
  }

  > div:not(.value) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1rem;

    span {
      font-size: inherit;
      font-weight: 500;
    }

    & + div {
      margin-top: 1rem;
    }

    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  .value {
    margin: 3rem 0 2.6rem;

    strong {
      font-size: 2.6rem;
    }

    span {
      display: block;
      font-size: 1.2rem;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }

  button {
    margin-top: auto;
  }
`;

export const Specifications = styled(Card)`
  margin-top: 2rem;
  padding: 2rem;

  h2 {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
  }

  table {
    width: 100%;
    font-size: 0.95rem;

    tr {
      &:nth-child(even) {
        background: ${({ theme }) => theme.colors.background};
      }

      td {
        width: 60%;
        padding: 1rem;

        &:first-child {
          font-weight: 500;
          width: 40%;
        }
      }
    }
  }
`;
