import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputWithIcon from "../../components/ui/InputWithIcon";
import Button from "../../components/ui/Button";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { authService } from "../../services/authService";

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; message?: string } | null;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: state?.email || "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  // Success message from redirection (e.g. "Verification successful")
  const [successMessage, setSuccessMessage] = useState<string | null>(
    state?.message || null
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear success message on new attempt

    try {
      const response = await authService.login(formData);
      if (response.success) {
        if (onLogin) onLogin();
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-full">
        {/* Logo & Header */}
        <div className="mb-8">
          <img src={logo} alt="Sidonpay" className="h-10 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            Login to your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details to get back into your Sidonpay account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <InputWithIcon
            label="Email / Phone number"
            placeholder="valerie58@sidonpay.com"
            icon={User}
            required
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
          />

          <div className="relative">
            <InputWithIcon
              label="Password"
              placeholder="Enter password"
              icon={Lock}
              isPassword
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Link
              to="/forgot-password"
              className="absolute right-0 -bottom-5 text-[10px] text-[#2E7D56] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {successMessage && (
            <div className="mt-6 mb-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mt-6 mb-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="mt-8">
            <Button type="submit" isLoading={isLoading} fullWidth>
              Login
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Social Auth */}
        <div className="flex gap-4">
          <Button
            variant="ghost"
            fullWidth
            className="bg-gray-50 border border-gray-100 text-xs text-gray-700 font-normal px-2"
          >
            <FcGoogle size={18} className="mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="ghost"
            fullWidth
            className="bg-gray-50 border border-gray-100 text-xs text-gray-700 font-normal px-2"
          >
            <FaApple size={18} className="mr-2" />
            Continue with Apple
          </Button>
        </div>

        <div className="text-center mt-6">
          <span className="text-xs text-gray-400">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-xs text-[#2E7D56] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
