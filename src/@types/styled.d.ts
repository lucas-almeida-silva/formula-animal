/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

interface Theme {
  colors: {
    primary: string;
    background: string;
    textPrimary: string;
    textDanger: string;
    textSecondary: string;
    title: string;
    card: string;
    inputLabel: string;
    inputLabelSecondary: string;
    inputBorder: string;
    inputBorderDanger: string;
    inputBackground: string;
    disabledInput: string;
    disabledInputText: string;
    divisor: string;
    disabledButton: string;
    disabledButtonText: string;
    loader: string;
    arrow: string;
    arrowBackground: string;
    carouselDotgBorder: string;
    carouselDotBackground: string;
    carouselThumbBorder: string;
    carouselThumbBorderSelected: string;
    successBadge: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
