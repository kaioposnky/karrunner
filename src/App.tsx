import "@/global.css";
import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from "./context/AuthContext";
import { toastConfig } from "./config/toast.config";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default function App() {
  return (
    <>
      <Providers>
        <ScreenContent title="Home" path="src/App.tsx"></ScreenContent>
        <StatusBar style="auto" />
      </Providers>
    </>
  );
}
