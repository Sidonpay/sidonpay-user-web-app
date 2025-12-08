import React, { useState } from "react";
import { User, Lock, CheckSquare, Square, Mail, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputWithIcon from "../../components/ui/InputWithIcon";
import Button from "../../components/ui/Button";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { authService } from "../../services/authService";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.success) {
        // Navigate to OTP, passing email and userId for the next step
        navigate("/otp-verify", {
          state: {
            email: formData.email,
            userId: response.data.userId,
          },
        });
      }
    } catch (err: any) {
      console.error("Signup Error Detailed:", err.response?.data);
      const data = err.response?.data;
      let backendMessage = "Registration failed. Please check your inputs.";

      if (data) {
        if (typeof data.message === "string") {
          backendMessage = data.message;
        } else if (data.error) {
          if (typeof data.error.message === "string") {
            backendMessage = data.error.message;
          } else if (typeof data.error === "string") {
            backendMessage = data.error;
          }
        }
      }

      setError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-full">
        {/* Logo & Header */}
        <div className="mb-6">
          <img src={logo} alt="Sidonpay" className="h-10 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details and get your very own Sidonpay account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <InputWithIcon
            label="Full Name"
            placeholder="Juadeb Gabriel"
            icon={User}
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          {/* Email Address */}
          <InputWithIcon
            label="Email"
            placeholder="juadebgabriel@gmail.com"
            type="email"
            icon={Mail}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Phone Number */}
          <InputWithIcon
            label="Phone Number"
            placeholder="+2347063116133"
            type="tel"
            icon={Phone}
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          {/* Password */}
          <InputWithIcon
            label="Password"
            placeholder="Choose a strong password"
            icon={Lock}
            isPassword
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {/* Confirm Password */}
          <InputWithIcon
            label="Confirm password"
            placeholder="Enter the same password"
            icon={Lock}
            isPassword
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {/* Terms Checkbox */}
          <div
            className="flex items-center mb-6 cursor-pointer"
            onClick={() => setAgreed(!agreed)}
          >
            <div
              className={`mr-2 ${agreed ? "text-[#2E7D56]" : "text-gray-400"}`}
            >
              {agreed ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <span className="text-xs text-gray-500">
              I agree to the SidonPay{" "}
              <span className="underline decoration-dotted cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="underline decoration-dotted cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            fullWidth
            disabled={!agreed}
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Social Auth */}
        <Button
          variant="ghost"
          fullWidth
          className="bg-gray-50 border border-gray-100 mb-4 text-gray-700 font-normal"
        >
          <FcGoogle size={20} className="mr-2" />
          Continue with Google
        </Button>

        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-xs text-[#2E7D56] font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
