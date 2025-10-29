import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';

const Stack = createStackNavigator();

export const LoginStackScreen = "LoginScreen";
export const RegisterStackScreen = "RegisterScreen";

export const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={LoginStackScreen} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={RegisterStackScreen} component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
