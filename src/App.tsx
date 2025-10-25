import "@/global.css";
import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/context/ThemeContext';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ScreenContent title="Home" path="src/App.tsx"></ScreenContent>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
