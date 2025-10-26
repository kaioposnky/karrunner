const colorPalette = {
  primary: 'primary',
  primaryLight: 'primary-light',
  primaryDark: 'primary-dark',
  secondary: 'secondary',
  secondaryLight: 'secondary-light',
  secondaryDark: 'secondary-dark',
  backgroundLight: 'background-light',
  backgroundDark: 'background-dark',
  textLight: 'text-light',
  textDark: 'text-dark',
  white: 'white',
};

const themeTokens = {
  light: {
    btnPrimaryBg: `bg-${colorPalette.primary}`,
    btnPrimaryBgActive: `active:bg-${colorPalette.primaryDark}`,
    btnSecondaryBg: `bg-${colorPalette.secondary}`,
    btnSecondaryBgActive: `active:bg-${colorPalette.secondaryDark}`,
    btnOutlineBorder: `border-2 border-${colorPalette.primary}`,
    btnPrimaryText: `text-${colorPalette.white}`,
    btnSecondaryText: `text-${colorPalette.white}`,
    btnOutlineText: `text-${colorPalette.primary}`,
    viewBg: `bg-${colorPalette.backgroundLight}`,
    text: `text-${colorPalette.textLight}`,
  },
  dark: {
    btnPrimaryBg: `bg-${colorPalette.primaryLight}`,
    btnPrimaryBgActive: `active:bg-${colorPalette.primary}`,
    btnSecondaryBg: `bg-${colorPalette.secondaryLight}`,
    btnSecondaryBgActive: `active:bg-${colorPalette.secondary}`,
    btnOutlineBorder: `border-2 border-${colorPalette.primaryLight}`,
    btnPrimaryText: `text-${colorPalette.white}`,
    btnSecondaryText: `text-${colorPalette.white}`,
    btnOutlineText: `text-${colorPalette.primaryLight}`,
    viewBg: `bg-${colorPalette.backgroundDark}`,
    text: `text-${colorPalette.textDark}`,
  },
};

export const themeConfig = {
  button: {
    base: 'items-center justify-center',
    variants: {
      primary: {
        light: `${themeTokens.light.btnPrimaryBg} ${themeTokens.light.btnPrimaryBgActive}`,
        dark: `${themeTokens.dark.btnPrimaryBg} ${themeTokens.dark.btnPrimaryBgActive}`,
      },
      secondary: {
        light: `${themeTokens.light.btnSecondaryBg} ${themeTokens.light.btnSecondaryBgActive}`,
        dark: `${themeTokens.dark.btnSecondaryBg} ${themeTokens.dark.btnSecondaryBgActive}`,
      },
      outline: {
        light: `bg-transparent ${themeTokens.light.btnOutlineBorder}`,
        dark: `bg-transparent ${themeTokens.dark.btnOutlineBorder}`,
      },
    },
    text: {
      primary: {
        light: themeTokens.light.btnPrimaryText,
        dark: themeTokens.dark.btnPrimaryText,
      },
      secondary: {
        light: themeTokens.light.btnSecondaryText,
        dark: themeTokens.dark.btnSecondaryText,
      },
      outline: {
        light: themeTokens.light.btnOutlineText,
        dark: themeTokens.dark.btnOutlineText,
      },
    },
    sizes: {
      small: 'px-4 py-2',
      medium: 'px-6 py-3',
      large: 'px-8 py-4',
    },
    borders: {
      round: 'rounded-lg',
      roundy: 'rounded-2xl',
    },
  },
  text: {
    variants: {
      default: 'text-base',
      title: 'text-2xl font-bold',
      subtitle: 'text-md',
      caption: 'text-sm',
    },
    colors: {
      light: themeTokens.light.text,
      dark: themeTokens.dark.text,
    },
  },
  view: {
    background: {
      light: themeTokens.light.viewBg,
      dark: themeTokens.dark.viewBg,
    },
  },
};
