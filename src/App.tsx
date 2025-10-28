import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { toastConfig } from './config/toast.config';
import Toast from 'react-native-toast-message';
import { ReactNode } from 'react';
import { MainScreen } from './screens/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RootNavigationList } from './types/RootNavigationList';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigation } from './navigation/AuthNavigation';
import { GameNavigation } from './navigation/GameNavigation';
import { ThemedText } from './components/themed/ThemedText';

const Stack = createStackNavigator<RootNavigationList>();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default function App() {
  return (
    <>
      <Providers>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"MainScreen"}>
            <Stack.Screen
              name={"MainScreen"}
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"AuthNavigation"}
              component={AuthNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"GameNavigation"}
              component={GameNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Providers>
      <Toast config={toastConfig} />
    </>
  );
}
