import { Link } from "react-router-dom";
import Logo from "../assets/Dashboard-Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#2D7A4F] border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
            <img src={Logo} alt="SidonPay" className="h-15" />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { label: "Help", to: "/help" },
              { label: "Contact", to: "/contact" },
              { label: "Terms", to: "/terms" },
              { label: "Privacy", to: "/privacy" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs text-white hover:text-[#0D1F17] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white flex-shrink-0">
            © 2026 SidonPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;