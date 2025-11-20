import React from "react";

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login Page</h2>
      <button
        onClick={onLogin}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Simulate Login
      </button>
    </div>
  );
};

export default Login;
