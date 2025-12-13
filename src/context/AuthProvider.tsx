import {
    useState,
    useMemo,
    type ReactNode
} from 'react';
import { AuthContext, type User } from './AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
    // Lazy initialization for state to avoid setting state during render
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem("sidonpay-auth");
            return saved ? JSON.parse(saved).user : null;
        } catch {
            return null;
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            // Check for both user data and token
            const saved = localStorage.getItem("sidonpay-auth");
            const token = localStorage.getItem("token");
            return !!(saved && token);
        } catch {
            return false;
        }
    });

    const login = (userData: User, token?: string) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("sidonpay-auth", JSON.stringify({ user: userData, isAuthenticated: true }));
        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("sidonpay-auth");
        localStorage.removeItem("token");
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
