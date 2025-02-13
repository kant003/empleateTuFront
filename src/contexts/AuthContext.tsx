import { createContext, ReactNode, useContext, useState } from "react";
import User from "../models/User";
interface AuthContextType{
    user: User | null
    login: (user: Partial<User>) =>void
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(
   {
    user: null,
    login: () => {},
    logout: () => {}
   }
)


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
  };

interface AuthProviderWrapperProps {
    children: ReactNode
}
function AuthProviderWrapper({children}:AuthProviderWrapperProps){
    const [user, setUser] = useState(null)

    const login = (userData: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(userData)); // Persistencia opcional
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
      };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProviderWrapper}