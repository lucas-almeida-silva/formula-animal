import styled from 'styled-components';
import { Card } from '../../components/Card';

export const Container = styled(Card)`
  max-width: 1100px;
  margin: 0 auto;
  min-height: 25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    padding: 1.4rem;
    background-color: ${({ theme }) => theme.colors.successBadge};
    color: #fff;
    font-size: 4rem;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke-width: 3;
    }
  }

  > strong {
    display: block;
    margin-top: 0.5rem;
    font: 600 2.5rem Poppins, sans-serif;
  }

  span {
    display: block;
    margin-top: 2rem;
    font-size: 1.2rem;

    strong {
      font-weight: 600;
      font-size: 1.4rem;
    }
  }
`;
