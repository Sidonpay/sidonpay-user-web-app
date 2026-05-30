import { X, CheckCircle, FileText } from "lucide-react";

interface Props {
  documentName: string;
  submitType: "number" | "file" | "address";
  onDone: () => void;
  onUploadAnother?: () => void;
}

const DocumentSubmittedModal = ({
  documentName,
  submitType,
  onDone,
  onUploadAnother,
}: Props) => {

  const isNumber = submitType === "number";

  const headerTitle = "Submitted!";
  const headerSubtitle = "Your information is under review";

  const bodyTitle = isNumber
    ? "Number Submitted!"
    : "Document Submitted";

  const bodySubtitle = isNumber
    ? "Your BVN/NIN is being verified. This usually takes a few minutes."
    : "Your document is under review. This usually takes 1-2 business days.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onDone}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onDone}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Mini header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <FileText size={16} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{headerTitle}</p>
            <p className="text-xs text-gray-400">{headerSubtitle}</p>
          </div>
        </div>

        {/* Success icon */}
        <div className="flex flex-col items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-full border-4 border-[#e8f5ee] flex items-center justify-center">
            <CheckCircle size={36} className="text-[#1a6b3c]" />
          </div>
          <h3 className="text-base font-bold text-gray-900">{bodyTitle}</h3>
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            {bodySubtitle}
          </p>
        </div>

        {/* Status tag */}
        <div className="bg-[#f5faf6] border border-[#c5e0ce] rounded-xl px-4 py-3 mb-5">
          <p className="text-xs font-semibold text-[#1a6b3c]">{documentName}</p>
          <p className="text-xs text-gray-400 mt-0.5">Status: Under Review</p>
        </div>
        {!isNumber && onUploadAnother && (
          <button
            onClick={onUploadAnother}
            className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2"
          >
            Upload Another
          </button>
        )}

        {/* Done */}
        <button
          onClick={onDone}
          className="w-full py-2.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DocumentSubmittedModal;