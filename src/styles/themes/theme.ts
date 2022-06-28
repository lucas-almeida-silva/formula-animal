export interface Theme {
  colors: {
    primary: string;
    secondary: string;
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

export const theme: Theme = {
  colors: {
    primary: '#463675',
    secondary: '#248DA2',
    background: '#F0F0F7',
    textPrimary: '#2B2B2B',
    textSecondary: '#6A6180',
    textDanger: '#db0000',
    title: '#2D2739',
    card: '#FFF',
    inputLabel: '#212121',
    inputLabelSecondary: '#A9A7AF',
    inputBorder: '#d5dbdb',
    inputBorderDanger: '#EB0909',
    inputBackground: '#FAFAFC',
    disabledInput: '#e6e6e6',
    disabledInputText: '#4f4f4f',
    divisor: '#E6E6F0',
    disabledButton: '#B8B4B0',
    disabledButtonText: '#F7F7F7',
    loader: '#F0F0F7',
    arrow: '#ababab',
    arrowBackground: '#f0f0f0',
    carouselDotgBorder: '#969696',
    carouselDotBackground: '#e8e8e8',
    carouselThumbBorder: '#ccc',
    carouselThumbBorderSelected: '#333',
    successBadge: '#349A63',
  },
};
