import { auth } from '@/config/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { createPlayerScore } from './score';
import { UnregisteredUser } from '@/types/UnregisteredUser';
import { getDatabase, ref, set } from 'firebase/database';
import { addUserInitialCar } from './car';
import { getUserByDisplayName, increaseUserBalance } from './user';
import { FirebaseError } from 'firebase/app';
import { evitavel } from "palavrao";

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

export const register = async (unregisteredUser: UnregisteredUser): Promise<User> => {
  try {
    if(evitavel(unregisteredUser.displayName)){
      throw new FirebaseError('auth/profanity-display-name', "Seu nome contêm palavras impróprias, insira outro nome.")
    }

    // Se existir um usuário com o mesmo nome
    const existingUser = await getUserByDisplayName(unregisteredUser.displayName);
    if (existingUser) {
      throw new FirebaseError('auth/display-name-already-in-use', "Este nome de usuário já está em uso.");
    }

    // Create user in Auth
    const userCredential = await createUserWithEmailAndPassword(auth, unregisteredUser.email, unregisteredUser.password);
    const user = userCredential.user;

    // Atualiza o nome do usuário no Auth
    await updateProfile(user, { displayName: unregisteredUser.displayName });

    // Cria o perfil do usuário no Realtime Database
    const db = getDatabase();
    const userProfile = {
      uid: user.uid,
      displayName: unregisteredUser.displayName,
      email: user.email,
    };
    await set(ref(db, `users/${user.uid}`), userProfile);

    // Dá um carro aleatório inicial para o usuário
    await addUserInitialCar(user.uid);

    // Cria o score do usuário
    await createPlayerScore(user.uid, user.displayName ?? "", user.email ?? "");

    await increaseUserBalance(user.uid, 1000);
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
      case 'auth/profanity-display-name':
        errorMessage = 'Seu nome contêm palavras impróprias, insira outro nome.';
        break;
      case 'auth/display-name-already-in-use':
        errorMessage = 'Este nome de usuário já está em uso.';
        break;
    }

    throw new Error(errorMessage);
  }
};
