export const themeConfig = {
  button: {
    base: 'items-center justify-center',
    variants: {
      primary: {
        light: 'bg-primary active:bg-primary-dark',
        dark: 'bg-primary-light active:bg-primary',
      },
      secondary: {
        light: 'bg-secondary active:bg-secondary-dark',
        dark: 'bg-secondary-light active:bg-secondary',
      },
      outline: {
        light: 'bg-transparent border-2 border-primary',
        dark: 'bg-transparent border-2 border-primary-light',
      },
    },
    text: {
      primary: {
        light: 'text-white',
        dark: 'text-white',
      },
      secondary: {
        light: 'text-white',
        dark: 'text-white',
      },
      outline: {
        light: 'text-primary',
        dark: 'text-primary-light',
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
      light: 'text-text-light',
      dark: 'text-text-dark',
    },
  },
  view: {
    background: {
      light: 'bg-background-light',
      dark: 'bg-background-dark',
    },
  },
};
