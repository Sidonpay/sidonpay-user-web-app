import {
    createContext,
    useState,
    useEffect,
    useMemo,
    type ReactNode
} from 'react';

// --- Types (Exported for use in other files) ---
export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "superadmin";
}

export type Role = "user" | "admin" | "superadmin";

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// --- AuthProvider Component (Default Export) ---
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem("sidonpay-auth");
        if (saved) {
            const parsed = JSON.parse(saved);
            setUser(parsed.user);
            setIsAuthenticated(parsed.isAuthenticated);
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("sidonpay-auth", JSON.stringify({ user: userData, isAuthenticated: true }));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("sidonpay-auth");
    };

    const contextValue = useMemo(() => ({
        user,
        isAuthenticated,
        login,
        logout,
    }), [user, isAuthenticated]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}