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
      small: 'px-5 py-3',
      medium: 'px-7 py-4',
      large: 'px-9 py-5',
      xl: 'px-12 py-6',
      '2xl': 'px-16 py-7',
    },
    fontSizes: {
      small: 'text-xl',
      medium: 'text-xl',
      large: 'text-2xl',
      xl: 'text-3xl',
      '2xl': 'text-4xl',
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
  input: {
    style: {
      light: 'bg-gray-200 text-black border border-gray-300 rounded-lg p-3',
      dark: 'bg-gray-700 text-white border border-gray-600 rounded-lg p-3',
    },
    placeholder: {
      light: '#9CA3AF',
      dark: '#6B7280',
    },
  },
};
