import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Hide navbar on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        SidonPay
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {isAuthenticated ? (
          <>
            {/* Dashboard based on role */}
            {user?.role === "admin" || user?.role === "superadmin" ? (
              <Link to="/admin/dashboard" className="hover:underline">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-white px-3 py-1 rounded hover:bg-white hover:text-indigo-600"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
