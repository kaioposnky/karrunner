import { StackNavigationProp } from '@react-navigation/stack';

export type AuthNavigationList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type AuthNavigationProps = StackNavigationProp<AuthNavigationList>;
