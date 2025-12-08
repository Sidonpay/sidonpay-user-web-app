import React from "react";
import "./AuthLayout.css";
import authBg from "../../assets/auth-bg.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout-container p-10">
      <div
        className="auth-left-panel"
        style={{
          backgroundColor: "#ffff",
        }}
      >
        <img src={authBg} alt="Background" className="auth-bg-image" />
      </div>

      <div className="auth-right-panel">
        {/* The SVG Curve Separator - Creates a convex curve pushing into the left panel */}
        <div
          style={{
            position: "absolute",
            left: "-80px", // Width of the curve overlap
            top: 0,
            bottom: 0,
            width: "81px",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              d="M 100 0 L 100 100 Q 0 50 100 0"
              fill="white"
              stroke="none"
            />
          </svg>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
