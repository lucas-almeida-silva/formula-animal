import styled from 'styled-components';
import { Card } from '../../components/Card';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 0.5rem;
`;

export const ProductSummary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  > section:first-child {
    width: 30rem;
    height: 29rem;
    flex-shrink: 0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: containt;
  }

  @media(max-width: 885px) {
    flex-direction: column;

    > section:first-child {
      width: 100%;
      max-height: 32rem;
    }
  }
`;

export const ProductInfo = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.8rem 3rem;

  .price {
    margin: 3rem 0 2.6rem;

    strong {
      display: block;
      font-size: 2.6rem;
      font-weight: 600;
    }

    span {
      display: block;
      font-size: 1.1rem;
      font-weight: 500;
      margin-top: 0.5rem;
    }
  }

  > div:not(.price) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.95rem;

    & + div {
      margin-top: 1rem;
    }

    &:last-of-type {
      margin-bottom: 2rem;
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
    font-size: 0.9rem;

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
