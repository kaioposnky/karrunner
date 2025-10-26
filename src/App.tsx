import "@/global.css";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from "./context/AuthContext";
import { toastConfig } from "./config/toast.config";
import Toast from 'react-native-toast-message';
import { ReactNode } from 'react';
import { MainScreen } from "./screens/MainScreen";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

// Parte mais 
export default function App() {
  return (
    <>
      <Providers>
        <MainScreen/>
        <StatusBar style="auto" />
      </Providers>
      <Toast config={toastConfig}/>
    </>
  );
}
