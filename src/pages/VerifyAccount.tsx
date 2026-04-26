import { useState, useRef, useEffect } from "react";
import Logo from "../assets/SidonPay Logo.png";
import SideImage from "../assets/SideImage.png";

const VerifyAccount: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // Auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("OTP verified:", code);
    }, 2000);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(59);
    setOtp(["", "", "", "", "", ""]);
    console.log("Code resent!");
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 ">
      <div className="w-full max-w-5xl flex items-stretch rounded-2xl overflow-hidden shadow-lg rounded-2xl">

        {/* Left Side */}
        <div className="hidden md:flex w-1/2 max-h-[1000px]">
          <img src={SideImage} alt="Sidonpay illustration"  className="w-full h-full object-cover"/>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center min-h-full">

          {/* Logo */}
          <div className="mb-6">
            <img src={Logo} alt="Sidonpay Logo" className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Check your email</h2>
          <p className="text-sm text-gray-500 mb-8">
            Please enter the verification code sent to{" "}
            <span className="font-medium text-gray-700">valerie58@sidonpay.com</span>
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {inputRefs.current[index] = el}}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || isLoading}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              isComplete
                ? "bg-[#2D7A51] text-white hover:bg-green-700"
                : "bg-green-100 text-green-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify account"
            )}
          </button>

          {/* Resend */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Didn't receive the code?{" "}
            <span
              onClick={handleResend}
              className={`font-medium ${
                timer === 0
                  ? "text-green-600 cursor-pointer hover:underline"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend
            </span>{" "}
            {timer > 0 && (
              <span className="text-gray-400">
                0:{timer.toString().padStart(2, "0")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;