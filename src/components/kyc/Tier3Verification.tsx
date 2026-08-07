
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useUser } from "../../context/UserContext";
import LivenessCheckStep from "./LivenessCheckStep";

interface Tier3VerificationProps {
  onBackToProfile: () => void;
}

const instructions = [
  "Position your face inside the frame",
  "Look straight ahead",
  "Blink naturally",
  "Turn head left",
  "Turn head right",
  "Smile naturally",
];

const Tier3Verification: React.FC<Tier3VerificationProps> = ({ onBackToProfile }) => {
  const { profile, startTier3Verification } = useUser();
  const [celebrate, setCelebrate] = useState(false);
  const prevStatusRef = useRef(profile.tier3Status);

  useEffect(() => {
    if (prevStatusRef.current === "in_progress" && profile.tier3Status === "verified") {
      setCelebrate(true);
    }
    prevStatusRef.current = profile.tier3Status;
  }, [profile.tier3Status]);

  // Intro / landing screen
  if (profile.tier3Status === "not_started") {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-5 sm:p-7">
        <button
          onClick={onBackToProfile}
          className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
        >
          <ArrowLeft size={15} /> Back to Profile
        </button>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Tier 3 — Facial Verification</h2>
          <p className="text-sm text-gray-400">Complete the liveness check to verify your identity</p>
        </div>

        <div className="flex flex-col items-center text-center border border-gray-100 rounded-xl p-8">
          <span className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <Sparkles size={26} className="text-gray-400" />
          </span>

          <h3 className="text-base font-bold text-gray-900 mb-1.5">Ready for Facial Verification</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-5">
            We'll guide you through a quick liveness check. Make sure you're in a well-lit
            area and your face is clearly visible.
          </p>

          <div className="border border-gray-100 rounded-xl px-5 py-4 mb-6 w-full max-w-sm text-left">
            <ol className="flex flex-col gap-2.5">
              {instructions.map((instr, i) => (
                <li key={instr} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {instr}
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={startTier3Verification}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-[#F59E0B] px-6 py-2.5 rounded-lg hover:bg-[#D97706]"
          >
            Start Verification
          </button>
        </div>
      </div>
    );
  }
  if (profile.tier3Status === "verified" && celebrate) {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Tier 3 — Facial Verification</h2>
          <p className="text-sm text-gray-400">Complete the liveness check to verify your identity</p>
        </div>

        <div className="flex flex-col items-center text-center border border-gray-100 rounded-xl p-8">
          <span className="w-16 h-16 rounded-full bg-[#EAF7EE] flex items-center justify-center mb-5">
            <CheckCircle size={28} className="text-[#22C55E]" />
          </span>

          <h3 className="text-lg font-bold text-gray-900 mb-2">Verification Complete</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Your facial liveness verification was successful. Your identity has now been
            verified.
          </p>

          <button
            onClick={onBackToProfile}
            className="w-full max-w-xs text-sm font-semibold text-white bg-[#F59E0B] px-6 py-2.5 rounded-lg hover:bg-[#D97706] mb-3"
          >
            Continue
          </button>
          <p className="text-xs text-gray-400">You may now continue using all Tier 3 features.</p>
        </div>
      </div>
    );
  }
  if (profile.tier3Status === "verified") {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
        <div className="p-5 sm:p-7 pb-0">
          <button
            onClick={onBackToProfile}
            className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
          >
            <ArrowLeft size={15} /> Back to Profile
          </button>

          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <CheckCircle size={16} className="text-[#F59E0B]" />
            </span>
            <p className="text-sm font-bold text-gray-900">Tier 3 — Full Verification</p>
            <span className="text-xs font-semibold text-[#F59E0B] bg-amber-50 px-2.5 py-1 rounded-full">
              Verified
            </span>
          </div>
        </div>

        <div className="mx-5 sm:mx-7 rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-5 sm:px-6 py-5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-white" />
            </span>
            <div>
              <p className="text-base font-bold text-white">Tier 3 Verification</p>
              <p className="text-xs text-white/80">Full identity verification — unlimited access</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 sm:px-6 py-5 bg-white">
            <div>
              <p className="text-xs text-gray-400 mb-1">Daily Limit</p>
              <p className="text-base font-bold text-gray-900">{profile.dailyLimit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Monthly Limit</p>
              <p className="text-base font-bold text-gray-900">{profile.monthlyLimit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Max Balance</p>
              <p className="text-base font-bold text-gray-900">{profile.maxBalance}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 sm:px-7 py-5">
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
              Features Unlocked
            </p>
            <ul className="flex flex-col gap-2">
              {["Unlimited features", "Premium support", "Advanced limits", "Priority processing"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-[#F59E0B] shrink-0" /> {f}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
              Requirements
            </p>
            <ul className="flex flex-col gap-2">
              {["Facial recognition", "Liveness verification"].map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-900">Verification complete!</p>
            <p className="text-xs text-gray-400">You have full Tier 3 access.</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#F59E0B] bg-amber-50 px-3 py-1.5 rounded-full shrink-0">
            <CheckCircle size={13} /> Verified
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-5 sm:p-7">
      <button
        onClick={onBackToProfile}
        className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
      >
        <ArrowLeft size={15} /> Back to Profile
      </button>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Tier 3 — Facial Verification</h2>
        <p className="text-sm text-gray-400">Complete the liveness check to verify your identity</p>
      </div>

      <LivenessCheckStep />
    </div>
  );
};

export default Tier3Verification;