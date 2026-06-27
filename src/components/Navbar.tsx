
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Dashboard-Logo.png";
import {  Menu, X } from "lucide-react";

const Navsection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Help", to: "/help" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <img src={Logo} alt="SidonPay" className="h-15"/>
          </Link>

          {/* Desktop center links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors ${
                  pathname === to
                    ? "text-[#2D7A4F]"
                    : "text-gray-600 hover:text-[#0D1F17]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm font-medium text-[#0D1F17] hover:text-[#2D7A4F] px-4 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold text-white bg-[#2D7A4F] hover:bg-[#235f3c] px-5 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-1">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-[#EEF7F2] text-[#2D7A4F]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-2.5 text-sm font-medium text-[#0D1F17] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-2.5 text-sm font-semibold text-white bg-[#2D7A4F] rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navsection;