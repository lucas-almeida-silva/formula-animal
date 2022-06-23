import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return <Container {...props}>{children}</Container>;
}
