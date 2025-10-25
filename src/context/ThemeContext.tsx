import { useState, useCallback, createContext, ReactNode } from 'react';

type Theme = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeContextType{
  theme: Theme,
  toggleTheme: () => void,
  changeTheme: (theme:Theme) => void,
}

export const ThemeProvider = ({children} : {children: ReactNode}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }, []);

  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{theme, toggleTheme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
};

