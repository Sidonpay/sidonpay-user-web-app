import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "superadmin">("user");

  const handleLogin = () => {
    const loggedUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role,
    };

    login(loggedUser);

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
          alt="login background"
        className="max-w-[500px] w-full h-75 mx-auto"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white px-10">
        <div className="w-full max-w-md space-y-5">

          <div className="flex justify-center">
            <img src="/Deep-green-Bg.png" alt="logo" className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-bold text-center">Login to your account</h2>
          <p className="text-gray-500 text-center">
            Enter your details to continue
          </p>

          <input
            className="w-full p-3 border rounded-lg"
            type="email"
            placeholder="Email / Phone number"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
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

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Login
          </button>

          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/#/signup" className="text-green-600 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
