import { useState } from "react";
import { X, Shield, Lock } from "lucide-react";
import ConfirmLimitModal from "./ConfirmLimitModal";

interface Props {
  title: string;
  currentLimit: string;
  tierCap: string;
  onBack: () => void;
  onClose: () => void;
}

const EditLimitModal = ({
  title,
  currentLimit,
  tierCap,
  onBack,
  onClose,
}: Props) => {
  const rawCurrent = currentLimit.replace(/[₦,]/g, "");
  const [newLimit, setNewLimit] = useState(rawCurrent);
  const [showConfirm, setShowConfirm] = useState(false);

  const formatWithCommas = (val: string) => {
    const num = parseInt(val || "0");
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  const displayNewLimit = `₦${formatWithCommas(newLimit)}`;
  const canContinue = newLimit.length > 0 && parseInt(newLimit) > 0;

  if (showConfirm) {
    return (
      <ConfirmLimitModal
        limitType={title}
        currentLimit={currentLimit}
        newLimit={displayNewLimit}
        onBack={() => setShowConfirm(false)}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <Shield size={18} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Edit {title}</p>
            <p className="text-xs text-gray-400">
              Set a new value within your tier cap
            </p>
          </div>
        </div>

       
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="border border-gray-100 rounded-xl p-2">
            <p className="text-xs text-gray-400 mb-1.5">Current Limit</p>
            <p className="text-lg font-bold text-gray-900">{currentLimit}</p>
          </div>
          <div className="border border-[#1a6b3c] bg-[#f5faf6] rounded-xl p-2">
            <p className="text-xs text-[#1a6b3c] font-medium mb-1.5">
              Tier 1 Cap
            </p>
            <p className="text-lg font-bold text-[#1a6b3c]">{tierCap}</p>
          </div>
        </div>

        {/* New limit input */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          New Limit Amount
        </p>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 mb-2 focus-within:border-[#1a6b3c] focus-within:ring-2 focus-within:ring-[#1a6b3c]/10 transition-all">
          <span className="text-sm font-semibold text-gray-600 mr-2">₦</span>
          <input
            type="text"
            inputMode="numeric"
            value={newLimit}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setNewLimit(val);
            }}
            className="flex-1 text-sm outline-none text-gray-800 bg-transparent"
            placeholder="Enter amount"
          />
        </div>

        {/* Max allowed note */}
        <div className="flex items-center gap-1.5 mb-7">
          <Lock size={11} className="text-gray-400 shrink-0" />
          <p className="text-xs text-gray-400">
            Maximum allowed:{" "}
            <span className="font-semibold text-gray-600">{tierCap}</span>{" "}
            (Tier 1)
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onBack}
            className="py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-6"
          >
            Back
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!canContinue}
            className="py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 mt-6"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLimitModal;