
import { useState } from "react";
import { X, Shield, AlertTriangle, TrendingDown } from "lucide-react";
import LimitUpdatedModal from "./LimitUpdatedModal";

interface Props {
  limitType: string;
  currentLimit: string;
  newLimit: string;
  onBack: () => void;
  onClose: () => void;
}

const ConfirmLimitModal = ({
  limitType,
  currentLimit,
  newLimit,
  onBack,
  onClose,
}: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    // 🔁 Replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <LimitUpdatedModal
        limitType={limitType}
        newLimit={newLimit}
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
            <p className="text-base font-bold text-gray-900">Confirm Changes</p>
            <p className="text-xs text-gray-400">Review before applying</p>
          </div>
        </div>

        {/* Details rows */}
        <div className="flex flex-col mb-4">

          {/* Limit type row */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-sm text-gray-400">Limit type</span>
            <span className="text-sm font-bold text-gray-900">{limitType}</span>
          </div>

          {/* Current limit row */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-sm text-gray-400">Current limit</span>
            <span className="text-sm font-semibold text-gray-700">
              {currentLimit}
            </span>
          </div>

          {/* New limit row green highlighted */}
          <div className="flex items-center justify-between py-3.5 px-4 bg-[#f5faf6] rounded-xl mt-3">
            <span className="text-sm text-gray-400">New limit</span>
            <div className="flex items-center gap-1.5">
              <TrendingDown size={14} color="#D97706"/>
              <span className="text-sm font-bold text-[#D97706]" style={{color:"#D97706"}}>{newLimit}</span>
            </div>
          </div>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-2.5 bg-amber-900 border border-amber-500 rounded-xl px-4 py-3 mb-6"
        style=
        {{
            backgroundColor: "#F6F1DC",
            borderColor: "#FDE68A",
    }}
        >
          <AlertTriangle size={23} color="#F59E0B" className="mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed" style={{color: "#D97706"}}>
            This change takes effect immediately. You can update your limit
            again at any time.
          </p>
        </div> 

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onBack}
            className="py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLimitModal;