/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';

interface Theme {
  colors: {
    primary: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    title: string;
    card: string;
    menu: string;
    inputLabel: string;
    inputLabelSecondary: string;
    inputBorder: string;
    inputBorderDanger: string;
    inputBackground: string;
    inputText: string;
    divisor: string;
    disabledButton: string;
    disabledButtonText: string;
    loader: string;
    loaderSpinner: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
