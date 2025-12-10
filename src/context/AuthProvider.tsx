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
            const saved = localStorage.getItem("sidonpay-auth");
            return saved ? JSON.parse(saved).isAuthenticated : false;
        } catch {
            return false;
        }
    });

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
