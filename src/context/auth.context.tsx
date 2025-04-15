import { createContext, ReactNode, useState } from "react";

interface User {
    email: string;
    username: string;
    role: string;
}

interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
    isLoading: true,
    setIsLoading: () => { },
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

    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}