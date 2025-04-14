import { createContext, ReactNode, useState } from "react";

interface User {
    email: string;
    username: string;
    role: string;
}

interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface AuthWrapperProps {
    children: ReactNode;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User;
}

export const AuthContext = createContext<AuthContextType>({
    auth: {
        isAuthenticated: false,
        user: {
            email: "",
            username: "",
            role: "",
        },
    },
    setAuth: () => { },
})

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: {
            email: "",
            username: "",
            role: "",
        }
    })
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}