import styled from 'styled-components';
import { shade } from 'polished';

import { Theme } from '../../styles/themes/theme';

type ThemeColors = {
  [key: string]: keyof Theme['colors'];
};

type ContainerProps = {
  color: 'primary' | 'secondary';
};

const colorVariations: ThemeColors = {
  primary: 'primary',
  secondary: 'secondary',
};

export const Container = styled.button<ContainerProps>`
  height: 3.6rem;
  width: 100%;
  padding: 0 2rem;
  background: ${({ theme, color }) => theme.colors[colorVariations[color]]};
  color: #fff;
  border-radius: 0.5rem;
  border: 0;
  transition: 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme, color }) =>
      shade(0.2, theme.colors[colorVariations[color]])};
  }
`;
