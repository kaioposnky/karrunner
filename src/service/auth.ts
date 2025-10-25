import { auth } from '@/config/firebase.config';
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (username: string, password: string) : void {
  signInWithEmailAndPassword(auth, username, password){
    
  }
}