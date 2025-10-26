import { ThemedText } from '@/components/themed/ThemedText';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const LoginScreen = "Login";
export const RegisterScreen = "Register";

export const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={LoginScreen} component={ThemedText} />
      <Stack.Screen name={RegisterScreen} component={ThemedText} />
    </Stack.Navigator>
  );
};
