import { User } from "@/types/User";
import { createContext, ReactNode, useEffect, useState } from "react";
import { login as loginUser } from '@/service/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase.config';
import { getUserProfile, getUserRef, UserProfileFromDB, userProfileToUser } from "@/service/user";
import { onValue } from "firebase/database";

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      let unsubscribeUserListener = () => {};
      if (firebaseUser) {
        const userInfo: User | null = await getUserProfile(firebaseUser.uid);
        setUser(userInfo);
        setIsAuthenticated(true);
        unsubscribeUserListener = onValue(getUserRef(firebaseUser.uid), async (snapshot) => {
          const newUserProfileInfo = snapshot.val() as UserProfileFromDB;
          const newUserInfo = await userProfileToUser(newUserProfileInfo);
          setUser(newUserInfo);
        });
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);

      return () => unsubscribeUserListener();
    });

    // Remove o estado de autenticado
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginUser(email, password);
    const userInfo : User | null = await getUserProfile(user.uid);
    setUser(userInfo);
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
