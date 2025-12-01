import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "superadmin">("user");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role,
    };

    login(newUser);

    if (role === "admin" || role === "superadmin") {
      navigate("/admin/users");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src="/Subtract.png"
          alt="signup background"
        className="max-w-[500px] w-full h-75 mx-auto"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white px-10">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md space-y-5"
        >
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/Deep-green-Bg.png" alt="logo" className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-bold text-center">
            Create your account
          </h2>
          <p className="text-gray-500 text-center">
            Fill in your details and get your SidonPay account
          </p>

          {/* Email */}
          <input
            className="w-full p-3 border rounded-lg"
            type="email"
            placeholder="Email / Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            className="w-full p-3 border rounded-lg"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            className="w-full p-3 border rounded-lg"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ROLE SELECT */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "user" | "admin" | "superadmin")
            }
            className="w-full p-3 border rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Create Account
          </button>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <a href="/#/login" className="text-green-600 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
