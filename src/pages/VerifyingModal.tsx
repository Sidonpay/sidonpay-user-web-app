
import { X, FileText } from "lucide-react";

interface Props {
  type: "verifying" | "uploading" | "verifyingDetails";
  fileName?: string;
  onClose: () => void;
}

const VerifyingModal = ({ type, fileName, onClose }: Props) => {
  const isUploading = type === "uploading";

  const title = isUploading ? "Uploading..." : "Verifying...";

  const bodyText =
    type === "uploading"
      ? "Uploading document"
      : type === "verifyingDetails"
      ? "Verifying your details"
      : "Verifying your number";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <FileText size={22} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{title}</p>
            <p className="text-sm text-gray-400">Please wait</p>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-[#1a6b3c] rounded-full animate-spin" />
          <p className="text-base font-bold text-gray-800">{bodyText}</p>
          {isUploading && fileName && (
            <p className="text-sm text-gray-400">{fileName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyingModal;