import React from "react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        Welcome to SidonPay
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your user web app shell is ready.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
        >
          Signup
        </a>
      </div>
    </div>
  );
};

export default Landing;
