import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/authService";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

interface UserPayload{
    id: number
    email: string
    role: string
}

interface AuthContextType{
    user: UserPayload | null  // Partial<User>
    isAuthenticated: boolean
    isAdmin: boolean
    login: (email:string, password:string) => void
    logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children: React.ReactNode}){
    const [user, setUser] = useState<UserPayload | null>(null)

    // Carga el contexto la primera vez que la app arranca
    useEffect(()=>{
        async function callBack(){
            // obtengo los datos del backend y los guardo en el ctx
            const response = await fetch(API_URL_BASE+'/auth/user', {credentials: 'include'})
            const data = await response.json()
            setUser(data)
        }
        callBack()
    },[])

    const login = async (email: string, password:string) => {
        try{
            const tokenJwt = await AuthService.loginUser(email, password)
            setUser(tokenJwt)
        }catch(error){
            throw new Error("Error en el login")
        }
    }

    const logout = async () => {
        // conexión con el backend
        await fetch(API_URL_BASE+'/auth/logout', {method:'POST', credentials: 'include'})
        setUser(null)
    }

    return <AuthContext.Provider value={  
            {user, login, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }
        }>
            {children}
        </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if(!context) throw new Error('No puedes acceder al contexto fuera del AuthProvider')
    return context
}