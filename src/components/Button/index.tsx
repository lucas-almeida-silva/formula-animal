import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'secondary';
  children: ReactNode;
};

export function Button({ children, color = 'primary', ...props }: ButtonProps) {
  return (
    <Container color={color} {...props}>
      {children}
    </Container>
  );
}
