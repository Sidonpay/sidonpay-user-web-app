import React, { useState } from "react";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputWithIcon from "../../components/ui/InputWithIcon";
import Button from "../../components/ui/Button";
import OtpInput from "../../components/ui/OtpInput";
import logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword({
        token: otp, // API uses 'token' for the OTP code based on screenshot
        newPassword: newPassword,
      });

      if (response.success) {
        navigate("/login", {
          state: {
            message:
              "Password reset successful! Please login with your new password.",
          },
        });
      }
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-full">
        <div className="mb-8">
          <img src={logo} alt="Sidonpay" className="h-10 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter the code sent to your email and choose a new password.
          </p>
        </div>

        <form onSubmit={handleReset}>
          <div className="mb-6">
            <label className="block text-xs text-gray-500 font-medium ml-1 mb-2">
              Reset Code (OTP)
            </label>
            <OtpInput length={6} onComplete={(val) => setOtp(val)} />
          </div>

          <InputWithIcon
            label="New Password"
            placeholder="New strong password"
            icon={Lock}
            isPassword
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <InputWithIcon
            label="Confirm Password"
            placeholder="Confirm new password"
            icon={Lock}
            isPassword
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div className="mt-4 mb-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="mt-8">
            <Button type="submit" isLoading={isLoading} fullWidth>
              Reset Password
            </Button>
          </div>
        </form>

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

export default ResetPassword;
