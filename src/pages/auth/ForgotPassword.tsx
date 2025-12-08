import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputWithIcon from "../../components/ui/InputWithIcon";
import Button from "../../components/ui/Button";
import logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccess(true);
        // Optionally navigate to a "Reset OTP" page if that's the flow
       
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 2000);
      }
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      setError(err.response?.data?.message || "Failed to send reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-full">
        <div className="mb-8">
          <img src={logo} alt="Sidonpay" className="h-10 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email to receive a password reset code.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              label="Email Address"
              placeholder="valerie58@sidonpay.com"
              icon={Mail}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && (
              <div className="mt-4 mb-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="mt-8">
              <Button type="submit" isLoading={isLoading} fullWidth>
                Send Reset Code
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="text-green-600 font-medium mb-2">Code Sent!</div>
            <p className="text-sm text-gray-600">
              Please check your email for the reset code. Redirecting...
            </p>
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-xs text-[#2E7D56] font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
