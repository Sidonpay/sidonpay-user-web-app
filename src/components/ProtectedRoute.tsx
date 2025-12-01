import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react"; // ✅ FIX for JSX.Element

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
  const { isAuthenticated, user } = useAuth(); // ✅ FIX: role comes from user

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Get role safely
  const role = user?.role ?? "user";

  // Admin route protection
  if (adminOnly && role !== "admin" && role !== "superadmin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
