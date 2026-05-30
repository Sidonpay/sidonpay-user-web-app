
import { useState } from "react";
import { X, Hash } from "lucide-react";

interface Props {
  onBack: () => void;
  onClose: () => void;
  onSubmit: (bvn: string) => void;
}

const BVNModal = ({ onBack, onClose, onSubmit }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    setValue(digits);
  };

  const isComplete = value.length === 11;

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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <Hash size={22} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Enter BVN / NIN</p>
            <p className="text-sm text-gray-400">Type your 11-digit number</p>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
        >
          <X size={14} />
          Back
        </button>

        {/* Info card */}
        <div className="flex items-start gap-3 bg-[#f5faf6] border border-[#c5e0ce] rounded-xl p-4 mb-5">
          <div className="w-9 h-9 rounded-lg bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <Hash size={16} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">BVN / NIN Number</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
              Your Bank Verification Number or National Identification Number — 11 digits
            </p>
          </div>
        </div>

        {/* Input */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Enter Number
        </p>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder="e.g. 12345678901"
          className={`w-full px-4 py-3 text-sm border rounded-xl outline-none transition-all mb-1.5 ${
            isComplete
              ? "border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/10"
              : "border-gray-200 focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/10"
          }`}
        />
        <p className="text-xs text-gray-400 mb-5">
          {value.length}/11 digits entered
        </p>

        {/* Submit */}
        <button
          onClick={() => isComplete && onSubmit(value)}
          disabled={!isComplete}
          className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Submit Number →
        </button>
      </div>
    </div>
  );
};

export default BVNModal;