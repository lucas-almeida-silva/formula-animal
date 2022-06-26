import { ReactNode } from 'react';

import { Container } from './styles';

type FieldErrorProps = {
  children: ReactNode;
};

export function FieldError({ children }: FieldErrorProps) {
  return <Container>{children}</Container>;
}
