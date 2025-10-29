import { User } from "@/types/User";
import { createContext, ReactNode, useEffect, useState } from "react";
import { login as loginUser } from '@/service/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export interface AuthContextType{
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser){
        setUser({displayName: firebaseUser.displayName ?? "", email: firebaseUser.email ?? ""})
        setIsAuthenticated(true);
      } else{
        setUser(null);
        setIsAuthenticated(false);
      }
    })
    setLoading(false);

    // Remove o estado de autenticado
    return () => unsubscribe();
  }, [])
  
  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);
    setUser({ displayName: user.displayName ?? "", email: user.email ?? "" });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, isLoading, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
