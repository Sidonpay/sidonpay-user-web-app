import { useState } from "react";
import { X, FileText } from "lucide-react";

interface Props {
  onBack: () => void;
  onClose: () => void;
  onSubmit: (address: string) => void;
}

const AddressModal = ({ onBack, onClose, onSubmit }: Props) => {
  const [value, setValue] = useState("");
  const canSubmit = value.trim().length > 5;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <FileText size={22} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Proof of Address</p>
            <p className="text-sm text-gray-400">Type your full residential address</p>
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
            <FileText size={16} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Proof of Address</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
              Enter your full residential address as it appears on your documents
            </p>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Enter Address
        </p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 12 Broad Street, Victoria Island"
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/10 transition-all mb-5"
        />

        <button
          onClick={() => canSubmit && onSubmit(value)}
          disabled={!canSubmit}
          className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Submit Address →
        </button>
      </div>
    </div>
  );
};

export default AddressModal;