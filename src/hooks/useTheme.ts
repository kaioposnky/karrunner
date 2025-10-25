import { useState, useCallback } from 'react';

type Theme = "light" | "dark";

interface UseTheme{
  theme: Theme,
  toggleTheme: () => void,
  changeTheme: (theme:Theme) => void,
}

export const useTheme = () : UseTheme => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme(prevState => prevState === "light" ? "dark" : "light");
  }, [])

  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme)
  }, [])

  return {theme, toggleTheme, changeTheme};
}