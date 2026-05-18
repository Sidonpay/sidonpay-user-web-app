import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/SidonPay Logo.png";
import SideImage from "../assets/SideImage.png";
import {Eye, EyeOff, User, Mail, Phone, Lock} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/verify-account", {state: {email: formData.email}});
        console.log("Form submitted:", formData);
      }, 2000);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-5xl mx-auto flex overflow-hidden">
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img src={SideImage} alt="Signup illustration" />
            </div>

        {/* Right Side  Form */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <img src={Logo} alt="Sidonpay Logo" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in your details and get your very own Sidonpay account</p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Full name</label>
            <div className="relative">
              <span className="absolute left-3 top-1 translate-y-1/2 text-gray-400">
                <User className="w-4 h-4" />
              </span>
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-gray-100 border rounded-lg px-4 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1 translate-y-1/2 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-100 border rounded-lg px-4 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Phone number</label>
            <div className="relative">
              <span className="absolute left-3 top-1 translate-y-1/2 text-gray-400">
                <Phone className="w-4 h-4" />
              </span>
            </div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full bg-gray-100 border rounded-lg px-4 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1 translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Choose a strong password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-100 border rounded-lg px-4 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition pr-10 ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              >
                {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Confirm password</label>
            <div className="relative">
              <span className="absolute left-3 top-1 translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-gray-100 border rounded-lg px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-green-400 transition pr-10 ${
                  errors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
              >
                {showConfirmPassword ?  <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="accent-green-600"
              />
              I agree to the Sidonpay{" "}
              <span className="text-green-600 underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-green-600 underline cursor-pointer">Privacy Policy</span>
            </label>
            {errors.agreedToTerms && <p className="text-xs text-red-500 mt-1">{errors.agreedToTerms}</p>}
          </div>

           <button
           onClick={handleSubmit}
             disabled={isLoading}
             className="w-full bg-[#2D7A51] hover:bg-green-700 disabled:opacity-80 text-white font-semibold py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
               >
             {isLoading ? (
             <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Create Account
             </>
             ) : (
            "Create Account"
           )}
             </button>

            <div className="flex items-center my-4">
              <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex-1 h-px bg-gray-300" />
             <span className="text-xs text-gray-400 px-3">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
                <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              </div>

          {/* Google Button */}
          <button className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-green-600 font-semibold cursor-pointer hover:underline">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;