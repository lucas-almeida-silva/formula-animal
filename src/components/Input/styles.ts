import styled, { css } from 'styled-components';

type ContainerProps = {
  hasError: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;

  * + div {
    margin-top: 1.3rem;
  }

  & ~ div {
    margin-top: 1.3rem;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }

  input {
    height: 3rem;
    width: 100%;
    background: ${({ theme }) => theme.colors.inputBackground};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    border-radius: 0.5rem;
    padding: 0 1rem;
    outline: none;

    ${({ hasError }) =>
      hasError &&
      css`
        border-color: ${({ theme }) => theme.colors.inputBorderDanger};
      `}

    &:disabled {
      background: ${({ theme }) => theme.colors.disabledInput};
      color: ${({ theme }) => theme.colors.disabledInputText};
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;
