import { createContext } from 'react';

export type RoleType = "user" | "admin" | "superadmin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: RoleType;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
