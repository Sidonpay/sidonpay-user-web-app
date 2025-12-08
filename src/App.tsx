import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  // Simple simulation of auth state - In real app, this would be context/global state
  // Initialize auth state based on localStorage token existence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("userAccessToken");
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
