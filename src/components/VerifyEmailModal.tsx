
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  method: "sms" | "email";
  currentEmail: string;
  onClose: () => void;
  onVerified: () => void;
}

type Step = "confirm" | "sending" | "otp";

const OTP_LENGTH = 6;
const RESEND_TIMER = 55;

const VerifyEmailModal = ({ onClose, onVerified, currentEmail }: Props) => {
  const [step, setStep] = useState<Step>("confirm");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_TIMER);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // countdown when OTP step begins
  useEffect(() => {
    if (step !== "otp") return;
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, countdown]);

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleSendCode = async () => {
    setStep("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsVerifying(false);
    onVerified();
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setCountdown(RESEND_TIMER);
  };

  const otpFilled = otp.every((d) => d !== "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/*  Step: confirm  */}
        {(step === "confirm" || step === "sending") && (
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Verify your Email
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              We will send a 6-digit code to your current Sidonpay email
              address to confirm this change
            </p>

            <button
              onClick={handleSendCode}
              disabled={step === "sending"}
              className="mt-2 w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-80 transition-all flex items-center justify-center gap-2"
            >
              {step === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </div>
        )}

        {/*Step: OTP entry*/}
        {step === "otp" && (
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Verify your Email
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              We've sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-800">
                {currentEmail}
              </span>{" "}
              to confirm this change
            </p>

            {/* OTP circles */}
            <div className="flex items-center gap-2 sm:gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {inputRefs.current[i] = el}}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`w-11 h-11 rounded-full text-center text-sm font-bold border-2 outline-none transition-all duration-150 ${
                    digit
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-800 focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20"
                  }`}
                />
              ))}
            </div>

            {/* Resend countdown */}
            <div className="text-xs text-gray-500">
              {countdown > 0 ? (
                <span>Resend code in {countdown}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-[#1a6b3c] font-semibold hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>

            {/* Verify button */}
            <button
              onClick={handleVerify}
              disabled={!otpFilled || isVerifying}
              className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailModal;