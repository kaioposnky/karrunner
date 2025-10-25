import "../global.css";
import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="src/App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
