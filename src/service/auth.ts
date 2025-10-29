import { auth } from '@/config/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { createPlayerScore } from './score';
import { UnregisteredUser } from '@/types/UnregisteredUser';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (error: any) {
    let errorMessage = 'Ocorreu um erro inesperado.';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'O e-mail fornecido é inválido.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'As credenciais fornecidas são inválidas.';
        break;
    }
    throw new Error(errorMessage);
  }
};

export const register = async (unregisteredUser : UnregisteredUser): Promise<User> => {
  try {
    // Cria o Usuário
    const userCredential = await createUserWithEmailAndPassword(auth, unregisteredUser.email, unregisteredUser.password);
    const user = userCredential.user;
    
    // Atualiza o nome do usuário
    const displayName = unregisteredUser.displayName;
    await updateProfile(user, {displayName})
    
    // Cria o score do usuário
    await createPlayerScore(user.uid, user.displayName ?? "", user.email ?? "");
    
    return userCredential.user;
  } catch (error: any) {
    let errorMessage = 'Ocorreu um erro inesperado ao tentar se registrar.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este e-mail já está em uso.';

        break;

      case 'auth/invalid-email':
        errorMessage = 'O e-mail fornecido é inválido.';

        break;

      case 'auth/weak-password':
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';

        break;
    }

    throw new Error(errorMessage);
  }
};
