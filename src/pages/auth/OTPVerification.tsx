import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import OtpInput from "../../components/ui/OtpInput";
import Button from "../../components/ui/Button";
import logo from "../../assets/logo.png";
import { authService } from "../../services/authService";

interface LocationState {
  email: string;
  userId: string;
}

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no state (direct access)
  useEffect(() => {
    if (!state?.userId || !state?.email) {
      navigate("/signup");
    }
  }, [state, navigate]);

  const handleVerify = async (otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.verifyOtp({
        userId: state.userId,
        code: otp,
      });

      if (response.success) {
        // Flow Update: Verify -> Login -> Dashboard
        // Navigate to Login with success message
        navigate("/login", {
          state: {
            email: state.email,
            message: "Verification successful! Please login.",
          },
        });
      }
    } catch (err: any) {
      console.error("OTP Error:", err);
      setError(
        err.response?.data?.message || err.message || "Verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    // Placeholder or actual call if available
    alert("Resend functionality pending backend confirmation.");
  };

  if (!state) return null;

  return (
    <AuthLayout>
      <div className="flex flex-col w-full">
        {/* Logo & Header */}
        <div className="mb-8">
          <img src={logo} alt="Sidonpay" className="h-10 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="text-gray-500 text-sm mt-1">
            Please enter the verification code sent to{" "}
            <span className="font-medium text-gray-700">{state.email}</span>
          </p>
        </div>

        {/* Form */}
        <div className="mb-8">
          <OtpInput length={6} onComplete={(otp) => handleVerify(otp)} />
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded text-center">
            {error}
          </div>
        )}

        <Button
          onClick={() => {}}
          isLoading={isLoading}
          fullWidth
          className="hidden"
        >
          Verify
        </Button>

        <div className="text-center mt-6">
          <span className="text-xs text-gray-500">
            Didn't receive the code?{" "}
          </span>
          <button
            onClick={handleResend}
            className="text-xs text-[#2E7D56] font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            Resend
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;
// Refresh import
