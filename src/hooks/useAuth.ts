import { useContext } from 'react';
// FIX: AuthContextType is now correctly imported as an exported interface.
import { AuthContext, type AuthContextType } from '../context/AuthContext';

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx as AuthContextType;
};