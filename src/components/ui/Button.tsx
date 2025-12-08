import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "outline" | "ghost";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#2E7D56] hover:bg-[#256a48] text-white shadow-sm", // Custom Sidonpay Green
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
      {children}
    </button>
  );
};

export default Button;
