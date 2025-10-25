import { AuthContext, AuthContextType } from "@/context/AuthContext"
import { useContext } from "react"

export const useAuth = () => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if(context === undefined){
    throw Error("You must use useAuth inside AuthProvider!");
  }
  return context;
}