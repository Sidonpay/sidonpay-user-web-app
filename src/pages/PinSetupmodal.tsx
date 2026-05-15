import { useState, useRef } from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";
import { usePinSetup } from "../hooks/usePinSetup";

interface PinSetupModalProps {
  onComplete: () => void;
}

type Step = "setup" | "confirm" | "success";

const PinSetupModal: React.FC<PinSetupModalProps> = ({ onComplete }) => {
  const { activatePin } = usePinSetup();
  const [step, setStep] = useState<Step>("setup");
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    if (value && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...confirmPin];
    newPin[index] = value.slice(-1);
    setConfirmPin(newPin);
    setError("");
    if (value && index < 5) {
      confirmRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirmKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !confirmPin[index] && index > 0) {
      confirmRefs.current[index - 1]?.focus();
    }
  };

  const handleSetupContinue = () => {
    if (pin.every((d) => d !== "")) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep("confirm");
      }, 1000);
    }
  };

  const handleConfirmContinue = () => {
    const enteredPin = confirmPin.join("");
    const originalPin = pin.join("");
    if (enteredPin !== originalPin) {
      setError("PINs do not match. Please try again!");
      setConfirmPin(["", "", "", "", "", ""]);
      confirmRefs.current[0]?.focus();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      activatePin(originalPin);
      setStep("success");
    }, 1500);
  };

  const isPinComplete = pin.every((d) => d !== "");
  const isConfirmComplete = confirmPin.every((d) => d !== "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl">

        {step === "setup" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Secure Your Account
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Create a 6-digit transaction PIN to confirm and protect payments.
            </p>
            <div className="flex justify-center gap-2 md:gap-3 mb-8">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { pinRefs.current[index] = el; }}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(index, e)}
                  className={`w-9 h-9 md:w-11 md:h-11 text-center text-lg font-bold border-2 rounded-full outline-none transition ${
                    digit
                      ? "border-gray-800 bg-gray-800 text-gray-800"
                      : "border-gray-300 bg-white"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleSetupContinue}
              disabled={!isPinComplete || isLoading}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
                isPinComplete
                  ? "bg-[#2D7A51] text-white hover:bg-green-700"
                  : "bg-green-100 text-green-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Please wait...
                </>
              ) : "Continue"}
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Confirm Your PIN
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Re-enter your 6-digit PIN to make sure you remember it.
            </p>
            <div className="flex justify-center gap-2 md:gap-3 mb-3">
              {confirmPin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { confirmRefs.current[index] = el; }}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleConfirmChange(index, e.target.value)}
                  onKeyDown={(e) => handleConfirmKeyDown(index, e)}
                  className={`w-9 h-9 md:w-11 md:h-11 text-center text-lg font-bold border-2 rounded-full outline-none transition ${
                    error
                      ? "border-red-500 bg-red-50"
                      : digit
                      ? "border-gray-800 bg-gray-800 text-gray-800"
                      : "border-gray-300 bg-white"
                  }`}
                />
              ))}
            </div>
            {error && <p className="text-xs text-red-500 mb-4">{error}</p>}
            {!error && <div className="mb-4" />}
            <button
              onClick={handleConfirmContinue}
              disabled={!isConfirmComplete || isLoading}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
                isConfirmComplete
                  ? "bg-[#2D7A51] text-white hover:bg-green-700"
                  : "bg-green-100 text-green-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Please wait...
                </>
              ) : "Continue"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#2D7A51]" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">PIN Created</h2>
            <p className="text-sm text-gray-400 mb-8">
              Your transaction PIN has been set successfully. You're all set!
            </p>
            <button
              onClick={onComplete}
              className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#2D7A51] text-white hover:bg-green-700 transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinSetupModal