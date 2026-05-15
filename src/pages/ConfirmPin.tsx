import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const ConfirmPin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalPin = location.state?.pin || "";

  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const enteredPin = pin.join("");
    if (enteredPin !== originalPin) {
      setError("PINs do not match. Please try again!");
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/pin-created");
    }, 1500);
  };

  const isComplete = pin.every((d) => d !== "");

  return (
    <DashboardLayout userName="Kolawole">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-md text-center">

          {/* Shield Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Confirm Your PIN
          </h2>
          <p className="text-sm text-gray-400 mb-10">
            Re-enter your 6-digit PIN to make sure you remember it.
          </p>

          {/* PIN Inputs */}
          <div className="flex justify-center gap-3 mb-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-10 h-10 md:w-12 md:h-12 text-center text-lg font-bold border-2 rounded-full outline-none transition ${
                  error
                    ? "border-red-500 bg-red-50"
                    : digit
                    ? "border-gray-800 bg-gray-800 text-gray-800"
                    : "border-gray-300 bg-white"
                }`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 mb-6">{error}</p>
          )}

          {!error && <div className="mb-6" />}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isComplete || isLoading}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              isComplete
                ? "bg-[#2D7A51] text-white hover:bg-green-700"
                : "bg-green-100 text-green-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConfirmPin;