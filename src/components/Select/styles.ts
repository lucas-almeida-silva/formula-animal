import styled, { css } from 'styled-components';

type ContainerProps = {
  hasError: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  position: relative;

  & + div {
    margin-top: 1.3rem;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }

  select {
    height: 3rem;
    width: 100%;
    background: ${({ theme }) => theme.colors.inputBackground};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    border-radius: 0.5rem;
    padding: 0 1rem;
    outline: none;

    -webkit-appearance: none;
    appearance: none;

    &:disabled {
      background: ${({ theme }) => theme.colors.disabledInput};
      color: ${({ theme }) => theme.colors.disabledInputText};
      opacity: 1;
    }

    ${({ hasError }) =>
      hasError &&
      css`
        border-color: ${({ theme }) => theme.colors.inputBorderDanger};
      `}
  }

  svg {
    position: absolute;
    top: 3rem;
    right: 1rem;
  }
`;
