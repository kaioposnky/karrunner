import { ThemedButton } from '@/components/themed/ThemedButton';
import { ThemedInput } from '@/components/themed/ThemedInput';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { login } from '@/service/auth';
import { AuthNavigationProps } from '@/types/AuthNavigationList';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  const navigation = useNavigation<AuthNavigationProps>();
  const formBackgroundColor = theme === 'light' ? 'bg-border-light' : 'bg-border-dark';

  const handleLogin = async () => {
    try {
      await login(username, password);
      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Login realizado com sucesso!',
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <ThemedView center="both">
      <ThemedView className={`w-80 rounded-lg p-4 ${formBackgroundColor}`}>
        <ThemedText variant="title" className="mb-4 text-center">
          Login
        </ThemedText>

        <ThemedText className="mb-2">Usuário</ThemedText>
        <ThemedInput
          className="mb-4"
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu usuário"
        />

        <ThemedText className="mb-2">Senha</ThemedText>
        <ThemedInput
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />
      </ThemedView>
      <ThemedView className={'w-70 mt-6 flex flex-row justify-center gap-x-8'}>
        <ThemedButton title="Entrar" className="w-36" onPress={handleLogin} />
        <ThemedButton title="Registrar" className="w-36" onPress={goToRegister} />
      </ThemedView>
    </ThemedView>
  );
};
