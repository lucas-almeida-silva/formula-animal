import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

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
    flex-shrink: 0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  @media (max-width: 885px) {
    flex-direction: column;
    gap: 0;

    > div:first-child {
      width: 100%;
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

export const Images = styled(Carousel)`
  .control-dots {
    bottom: -10px;
  }

  .dot {
    height: 10px !important;
    width: 10px !important;
    border-radius: 50% !important;
    border: 1px solid ${({ theme }) => theme.colors.carouselDotgBorder};

    &:hover {
      box-shadow: none;
    }

    &.selected {
      box-shadow: none;
      background: ${({ theme }) => theme.colors.carouselDotBackground};
    }
  }

  .thumb {
    border: 1px solid ${({ theme }) => theme.colors.carouselThumbBorder};
  }

  .thumb.selected {
    border: 1px solid ${({ theme }) => theme.colors.carouselThumbBorderSelected};
  }
`;

export const CarouselArrow = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  height: 100%;

  display: flex;
  align-items: center;

  &.left {
    left: 0.5rem;
  }

  &.right {
    right: 0.5rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 2rem;
    color: ${({ theme }) => theme.colors.arrow};
    border: none;
    background: transparent;
    padding: 0.5rem;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.arrowBackground};
    }
  }

  @media (max-width: 580px) {
    &.left {
      left: 4px;
    }

    &.right {
      right: 4px;
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
    margin: 2.8rem 0 2.6rem;

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

  footer {
    margin-top: auto;

    button + button {
      margin-top: 0.8rem;
    }
  }

  @media (max-width: 885px) {
    padding: 1.8rem 2rem;

    h1 {
      font-size: 1.5rem;
      line-height: 1.8rem;
    }

    .value {
      font-size: 2.5rem;
      margin-top: 2.4rem;
    }
  }

  @media (max-width: 580px) {
    h1 {
      font-size: 1.35rem;
    }

    .value {
      font-size: 2.4rem;
    }
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

  @media (max-width: 885px) {
    padding: 2rem 1.5rem;
  }
`;
