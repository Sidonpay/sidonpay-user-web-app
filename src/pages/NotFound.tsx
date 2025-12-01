import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">Page not found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-indigo-700"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
