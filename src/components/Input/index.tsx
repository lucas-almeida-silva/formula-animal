import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from '../FieldError';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, ...props }, ref) => (
    <Container hasError={!!error}>
      {label && <label htmlFor={name}>{label}</label>}

      <input id={name} name={name} ref={ref} {...props} />

      {error && <FieldError>{error}</FieldError>}
    </Container>
  ),
);

Input.displayName = 'Input';
