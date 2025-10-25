import { ThemeContext, ThemeContextType } from "@/context/ThemeContext";
import { useContext } from "react";

export const useTheme = () : ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}