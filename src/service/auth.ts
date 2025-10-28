import { auth } from '@/config/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const login = async (username: string, password: string) : Promise<void> => {
  signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw new Error(errorMessage);
  });
}

export const register = async (email: string, password: string) : Promise<void> => {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw new Error(errorMessage);
  });
}
