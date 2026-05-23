import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, MessageCircle} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import AiAssistant from "../components/AiAssistant";

const PIN_LENGTH = 4;

const SetupPinPage = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showAi, setShowAi] = useState<boolean>(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...pin];
    updated[index] = value.slice(-1);
    setPin(updated);
    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const code = pin.join("");
    if (code.length < PIN_LENGTH) return;

    
    localStorage.setItem("pinActivated", "true");
    navigate("/dashboard/account", { state: { activeTab: "security" } });
  };

  const pinFilled = pin.every((d) => d !== "");

  return (
    <DashboardLayout userName="Kolawole">
    <div className="w-full max-w-md mx-auto px-4 py-12 flex flex-col items-center gap-6 text-center">

      {/* Shield icon */}
      <div className="w-16 h-16 rounded-full bg-[#eaf5ee] flex items-center justify-center">
        <ShieldCheck size={32} className="text-[#1a6b3c]" />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-gray-900">
          Secure Your Account
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          Create a 4-digit transaction PIN to confirm and protect payments.
        </p>
      </div>

      {/* PIN circles */}
      <div className="flex items-center gap-4 mt-2">
        {pin.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-12 rounded-full text-center text-sm font-bold border-2 outline-none transition-all duration-150 ${
              digit
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20"
            }`}
          />
        ))}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!pinFilled}
        className="mt-4 w-full max-w-xs py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-50 transition-all"
      >
        Continue
      </button>
    </div>
    <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>

        {/* AI Assistant overlay */}
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
    </DashboardLayout>
  );
};

export default SetupPinPage;