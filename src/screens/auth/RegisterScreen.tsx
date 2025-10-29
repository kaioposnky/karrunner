import { ThemedButton } from "@/components/themed/ThemedButton";
import { ThemedInput } from "@/components/themed/ThemedInput"
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView"
import { useTheme } from "@/hooks/useTheme";
import { register } from "@/service/auth";
import { AuthNavigationProps } from "@/types/AuthNavigationList";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  const navigation = useNavigation<AuthNavigationProps>();
  const formBackgroundColor = theme === 'light' ? 'bg-border-light' : 'bg-border-dark';

  const handleRegister = async () => {
    try {
      await register({ email, displayName, password });
      Toast.show({
        type: 'success',
        text2: 'Registro realizado com sucesso!',
        position: 'bottom',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: error.message,
        position: 'bottom',
      });
      throw new Error(error.message);
    }
  };

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ThemedView center="both">
      <ThemedView className={`w-80 rounded-lg p-4 ${formBackgroundColor}`}>
        <ThemedText variant="title" className="mb-4 text-center">
          Registro
        </ThemedText>

        <ThemedText className="mb-2">Nome de usuário</ThemedText>
        <ThemedInput
          className="mb-4"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Digite seu nome de usuário"
          autoCapitalize="none"
        />
        
        <ThemedText className="mb-2">E-mail</ThemedText>
        <ThemedInput
          className="mb-4"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
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
        <ThemedButton title="Registrar" className="" onPress={handleRegister} />
        <ThemedButton title="Logar" className="" onPress={goToLogin} />
      </ThemedView>
    </ThemedView>
  );
};
