import { X, ChevronRight, FileText } from "lucide-react";
import type { KYCDocument } from "../components/KYCTab";

interface Props {
  documents: KYCDocument[];
  tierTarget: "tier1" | "tier2" | "all";
  onSelect: (doc: KYCDocument) => void;
  onClose: () => void;
}

const VerifyDocumentsModal = ({
  documents,
  tierTarget,
  onSelect,
  onClose,
}: Props) => {

  // Filter docs based on tier
  const visibleDocs = documents.filter((d) => {
    if (tierTarget === "tier1") return d.id === "bvn" || d.id === "id";
    if (tierTarget === "tier2") return d.id === "utility" || d.id === "address";
    return true;
  });

  const title =
    tierTarget === "tier1"
      ? "Upgrade to Tier 1"
      : tierTarget === "tier2"
      ? "Upgrade to Tier 2"
      : "Continue Verification";

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
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <FileText size={22} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{title}</p>
            <p className="text-sm text-gray-400">Select a document to continue</p>
          </div>
        </div>

        {/* Document list */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Required Documents
        </p>

        <div className="flex flex-col divide-y divide-gray-100">
          {visibleDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelect(doc)}
              className="flex items-center justify-between w-full py-4 px-2 text-left hover:bg-gray-50 transition-colors rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-400">{doc.description}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyDocumentsModal;