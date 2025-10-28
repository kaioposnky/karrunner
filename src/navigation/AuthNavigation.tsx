import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';

const Stack = createStackNavigator();

export const LoginStackScreen = "Login";
export const RegisterStackScreen = "Register";

export const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={LoginStackScreen} component={LoginScreen} />
      <Stack.Screen name={RegisterStackScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
