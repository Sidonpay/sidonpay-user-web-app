import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { IconType } from "react-icons";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: IconType | React.ElementType;
  error?: string;
  isPassword?: boolean;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  label,
  icon: Icon,
  error,
  isPassword = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine input type
  const type = isPassword
    ? showPassword
      ? "text"
      : "password"
    : props.type || "text";

  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      {label && (
        <label className="text-xs text-gray-500 font-medium ml-1">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center px-3 py-3 rounded-lg border bg-gray-50 transition-all duration-200
          ${
            error
              ? "border-red-500 bg-red-50"
              : isFocused
              ? "border-green-600 bg-white ring-1 ring-green-100"
              : "border-gray-200"
          }
          ${className}
        `}
      >
        {/* Left Icon */}
        {Icon && (
          <div className={`mr-3 ${error ? "text-red-400" : "text-gray-400"}`}>
            <Icon size={18} />
          </div>
        )}

        {/* Input Field */}
        <input
          {...props}
          type={type}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400
            w-full
          `}
        />

        {/* Right Icon (Password Toggle) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default InputWithIcon;
