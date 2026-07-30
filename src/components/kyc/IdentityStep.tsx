
import { useState } from "react";
import { ArrowLeft, Save, ShieldAlert, RotateCw } from "lucide-react";
import { useUser } from "../../context/UserContext";

const IdentityStep = () => {
  const { profile, updateProfile, setKYCStep, markStepComplete, submitTier1Verification } =
    useUser();

  const [nin, setNin] = useState(profile.nin);
  const [error, setError] = useState("");
  const [ninInvalid, setNinInvalid] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (value: string) => {
    // Only allow digits, max 11
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setNin(digitsOnly);
    if (error) setError("");
    if (ninInvalid) setNinInvalid(false);
  };

  const validate = () => {
    if (!nin.trim()) {
      setError("NIN is required");
      return false;
    }
    if (nin.length !== 11) {
      setError("NIN must be 11 digits");
      return false;
    }
    return true;
  };

  const handleSaveProgress = () => {
    updateProfile({ nin });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBack = () => {
    updateProfile({ nin });
    setKYCStep("address");
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    updateProfile({ nin });

    // Mock NIN verification — replace with real API call.
    // Demo rule: NIN starting with "1" simulates an invalid response.
    await new Promise((r) => setTimeout(r, 1200));

    if (nin.startsWith("1")) {
      setNinInvalid(true);
      setSubmitting(false);
      return;
    }

    markStepComplete("identity");
    submitTier1Verification();
    setSubmitting(false);
  };

  return (
    <div>
      {ninInvalid && (
        <div className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center shrink-0">
              <ShieldAlert size={15} className="text-red-500" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-red-700">Invalid NIN</p>
              <p className="text-xs text-red-500 truncate">
                The NIN you entered is not valid. Please check and try again.
              </p>
            </div>
          </div>
          <button
            onClick={() => setNinInvalid(false)}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 shrink-0"
          >
            <RotateCw size={13} /> Retry
          </button>
        </div>
      )}

      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
          NIN (National Identification Number) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={nin}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter 11-digit NIN"
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
            error || ninInvalid ? "border-red-400" : "border-gray-200"
          }`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-gray-400 mt-2">
          Your NIN is a unique 11-digit number assigned by the National Identity Management
          Commission (NIMC).
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveProgress}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50"
          >
            <Save size={15} /> {saved ? "Saved!" : "Save Progress"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1a6b3c] px-5 py-2.5 rounded-lg hover:bg-[#155c33] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Verification"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default IdentityStep;