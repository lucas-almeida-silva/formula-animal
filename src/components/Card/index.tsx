import { ReactNode } from 'react';
import { Container } from './styles';

type CardProps = {
  children: ReactNode;
};

export function Card({ children, ...props }: CardProps): JSX.Element {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
}
