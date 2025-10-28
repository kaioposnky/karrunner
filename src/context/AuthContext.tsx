import { User } from "@/types/User";
import { createContext, ReactNode, useState } from "react";
import { login as loginUser } from "@/service/auth";

export interface AuthContextType{
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    setUser({ email: 'admin@example.com' });
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user }}>
      {children}
    </AuthContext.Provider>
  );
}
