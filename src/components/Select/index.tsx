import { forwardRef, SelectHTMLAttributes } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FieldError } from '../FieldError';
import { Container } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, options, error, ...props }, ref) => (
    <Container hasError={!!error}>
      {label && <label htmlFor={name}>{label}</label>}

      <select id={name} name={name} ref={ref} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <IoIosArrowDown />

      {error && <FieldError>{error}</FieldError>}
    </Container>
  ),
);

Select.displayName = 'Select';
