import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode; // <-- use ReactNode instead of JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>; // wrap ReactNode in a fragment
};

export default ProtectedRoute;
