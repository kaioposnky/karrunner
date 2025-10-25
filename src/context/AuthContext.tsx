import { User } from "@/types/User";
import { createContext, ReactNode, useState } from "react";

export interface AuthContextType{
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ id: '1', username: 'Admin' });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user }}>
      {children}
    </AuthContext.Provider>
  );
}
