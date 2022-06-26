import { forwardRef } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { FieldError } from '../FieldError';
import { Container } from './styles';

type InputMaskProps = InputProps & {
  name: string;
  label?: string;
  error?: string;
};

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ name, label, error, ...props }, ref) => (
    <Container hasError={!!error}>
      {label && <label htmlFor={name}>{label}</label>}

      <ReactInputMask
        id={name}
        name={name}
        maskChar=""
        inputRef={ref}
        {...props}
      />

      {error && <FieldError>{error}</FieldError>}
    </Container>
  ),
);

InputMask.displayName = 'InputMask';
