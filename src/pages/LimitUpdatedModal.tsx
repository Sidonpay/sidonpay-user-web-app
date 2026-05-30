import { X, CheckCircle, Shield } from "lucide-react";

interface Props {
  limitType: string;
  newLimit: string;
  onClose: () => void;
}

const LimitUpdatedModal = ({ limitType, newLimit, onClose }: Props) => {
  const newLimitLabel = `New ${limitType}`;
  const bodyText = `Your ${limitType.toLowerCase()} has been updated.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
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
            <p className="text-base font-bold text-gray-900">Limit Updated</p>
            <p className="text-xs text-gray-400">
              Your limit has been updated successfully
            </p>
          </div>
        </div>

        {/* Success icon + text */}
        <div className="flex flex-col items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-full border-4 border-[#e8f5ee] flex items-center justify-center">
            <CheckCircle size={36} className="text-[#1a6b3c]" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Limit Updated Successfully
          </h3>
          <p className="text-sm text-gray-500 text-center">{bodyText}</p>
        </div>

        {/* New limit display box */}
        <div className="bg-[#f5faf6] border border-[#c5e0ce] rounded-2xl px-4 py-5 mb-5 flex flex-col items-center gap-1">
          <p className="text-2xl font-bold text-[#1a6b3c]">{newLimit}</p>
          <p className="text-xs text-[#1a6b3c] font-medium">{newLimitLabel}</p>
        </div>

        {/* Manage Other Limits */}
        <button
          onClick={onClose}
          className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-2"
        >
          Manage Other Limits
        </button>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default LimitUpdatedModal;