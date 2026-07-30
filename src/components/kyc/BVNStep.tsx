
import { useState } from "react";
import { ArrowRight, Save, ShieldAlert, RotateCw } from "lucide-react";
import { useUser } from "../../context/UserContext";

const BVNStep = () => {
  const { profile, updateProfile, setTier2Step, markTier2StepComplete } = useUser();

  const [bvn, setBvn] = useState(profile.bvn);
  const [error, setError] = useState("");
  const [bvnInvalid, setBvnInvalid] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setBvn(digitsOnly);
    if (error) setError("");
    if (bvnInvalid) setBvnInvalid(false);
  };

  const validate = () => {
    if (!bvn.trim()) {
      setError("BVN is required");
      return false;
    }
    if (bvn.length !== 11) {
      setError("BVN must be 11 digits");
      return false;
    }
    return true;
  };

  const handleSaveProgress = () => {
    updateProfile({ bvn });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleContinue = () => {
    if (!validate()) return;
    updateProfile({ bvn });

    // Mock BVN verification — demo rule: BVN starting with "1" simulates invalid.
    if (bvn.startsWith("1")) {
      setBvnInvalid(true);
      return;
    }

    markTier2StepComplete("bvn");
    setTier2Step("documents");
  };

  return (
    <div>
      {bvnInvalid && (
        <div className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center shrink-0">
              <ShieldAlert size={15} className="text-red-500" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-red-700">Invalid BVN</p>
              <p className="text-xs text-red-500 truncate">
                The BVN you entered is not valid. Please check and try again.
              </p>
            </div>
          </div>
          <button
            onClick={() => setBvnInvalid(false)}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 shrink-0"
          >
            <RotateCw size={13} /> Retry
          </button>
        </div>
      )}

      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
          BVN (Bank Verification Number) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={bvn}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter 11-digit BVN"
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
            error || bvnInvalid ? "border-red-400" : "border-gray-200"
          }`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-gray-400 mt-2">
          Your BVN is linked to your bank accounts. Dial *565*0# to retrieve your BVN.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleSaveProgress}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50"
        >
          <Save size={15} /> {saved ? "Saved!" : "Save Progress"}
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1a6b3c] px-5 py-2.5 rounded-lg hover:bg-[#155c33]"
        >
          Continue <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default BVNStep;