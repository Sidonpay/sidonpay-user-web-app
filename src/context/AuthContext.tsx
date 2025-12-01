import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin";
}


export type Role = "user" | "admin" | "superadmin";


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load saved auth from localStorage
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

    // save to localStorage
    localStorage.setItem(
      "sidonpay-auth",
      JSON.stringify({
        user: userData,
        isAuthenticated: true,
      })
    );
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("sidonpay-auth");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
