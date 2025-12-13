import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../api/auth.api";
import type { User } from "../../context/AuthContext";

type RoleType = "user" | "admin" | "superadmin";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Defaulting to "user" since role selector is removed from UI design
    const [role] = useState<RoleType>("user");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await loginUser({ identifier: email, password });

            if (response.success && response.data) {
                // Construct user object (backend might returns userId, let's assume some defaults or use response)
                const loggedUser: User = {
                    id: response.data.userId || crypto.randomUUID(),
                    name: email.split("@")[0] || "User", // Ideally backend returns name
                    email,
                    role,
                };

                login(loggedUser, response.data.accessToken);

                if (role === "admin" || role === "superadmin") {
                    navigate("/admin/users");
                } else {
                    navigate("/dashboard");
                }
            } else {
                setError(response.message || "Login failed");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Login Error:", err);
            const errorMessage = err.response?.data?.error?.message || err.response?.data?.message || err.message || "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans overflow-hidden">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row h-[90vh] md:h-[85vh] overflow-hidden relative">

                {/* LEFT SIDE - IMAGE (Full Cover w/ Curve) */}
                <div className="hidden md:flex w-1/2 relative overflow-hidden p-0">
                    <img
                        src="/Subtract.png"
                        alt="SidonPay Graphic"
                        className="w-full h-full object-cover absolute inset-0 z-0"
                    />
                    {/* CURVED OVERLAY */}
                    <div className="absolute top-0 right-0 bottom-0 w-24 bg-white z-10" style={{ clipPath: 'ellipse(200% 100% at 100% 50%)' }}></div>
                </div>

                {/* Right side curve visual fix */}
                <div className="absolute left-[50%] top-0 bottom-0 w-24 hidden md:block transform -translate-x-[45%] pointer-events-none z-20">
                    <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 C30,30 30,70 0,100 L100,100 L100,0 Z" fill="white" />
                    </svg>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center h-full relative z-30">
                    <div className="flex items-center gap-2 mb-2">
                        <img src="/Deep-green-Bg.png" alt="SidonPay" className="w-10 h-10 rounded-lg" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">Login to your account</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Fill in your details to get back into your Sidonpay account
                    </p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">

                        {/* Email / Phone */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 ml-1">Email / Phone number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your email or phone number"
                                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all placeholder-gray-400 text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all placeholder-gray-400 text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.12-.563C16.478 2.5 20.268 5.443 21.543 9.5c-.77 2.456-2.555 4.545-4.863 5.443M9.54 9.54l-2.02 2.02m12.728-4.242l-2.02 2.02" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="flex justify-end mt-1">
                                <a href="#" className="text-green-600 text-xs font-semibold hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-xs bg-red-50 p-2 rounded border border-red-100 mb-2">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-2 focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-3 text-center transition-colors mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* OR Divider */}
                    <div className="flex items-center my-6">
                        <div className="w-full h-px bg-gray-200"></div>
                        <div className="px-3 text-center text-gray-400 text-xs font-semibold">OR</div>
                        <div className="w-full h-px bg-gray-200"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg px-5 py-2.5 hover:bg-gray-100 transition-colors"
                            onClick={() => alert("Google login not implemented")}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg px-5 py-2.5 hover:bg-gray-100 transition-colors"
                            onClick={() => alert("Apple login not implemented")}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.33-.16-1.63-.69-2.76-.69-1.12 0-2.39.51-2.73.66-1 .47-2.1.55-3.1-.4-4.22-3.87-4.22-10.43-.08-14.54 1.4-1.39 3.23-1.76 4.67-1.15.2.09 1.41.6 2.63.6 1.25 0 2.23-.42 2.62-.6 1.47-.64 3.48-.3 4.9 1.15-.1.06-2.59 1.51-2.59 4.39 0 3.51 2.95 4.7 3.04 4.73-.02.06-.44 1.44-1.52 2.95zm-3.6-11.85c.66-1.13 2.1-1.73 2.1-1.73-.09 1.48-1.5 2.69-2.5 2.62-.16-1.21.03-2.01.4-2.89z" />
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            Don't have an account?{" "}
                            <a href="#/signup" className="text-green-600 font-semibold hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}