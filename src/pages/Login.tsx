import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import Logo from "../assets/SidonPay Logo.png";
import SideImage from "../assets/SideImage.png";

interface LoginProps {
  onLogin?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email or phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin?.();
        navigate("/dashboard")
        console.log("Logged in:", formData);
      }, 2000);
    }
  };

  const isFormFilled = formData.email && formData.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-5xl flex items-stretch overflow-hidden rounded-2xl shadow-xl">

        {/* Left Side */}
        <div className="hidden md:block w-1/2">
          <img
            src={SideImage}
            alt="Sidonpay illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">

          {/* Logo */}
          <div className="mb-6">
            <img src={Logo} alt="Sidonpay Logo" className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Login to your account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill in your details to get back into your Sidonpay account
          </p>

          {/* Email/Phone */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Email / Phone number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="email"
                placeholder="Enter your email or phone number"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-gray-100 border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-100"
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-100 border rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <span className="text-xs text-green-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              isFormFilled
                ? "bg-[#2D7A51] text-white hover:bg-green-700"
                : "bg-green-100 text-green-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
            <div className="flex-1 h-px bg-gray-300 mx-2" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300 mx-2" />
            <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
          </div>

          {/* Google and Apple Buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 border border-gray-200 rounded-lg py-2.5 text-xs font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button className="flex-1 border border-gray-200 rounded-lg py-2.5 text-xs font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-green-600 font-semibold cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

