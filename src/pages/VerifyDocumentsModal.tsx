import { X, ChevronRight, FileText } from "lucide-react";
import type { KYCDocument } from "../components/KYCTab";

interface Props {
  documents: KYCDocument[];
  onSelect: (doc: KYCDocument) => void;
  onClose: () => void;
}

const VerifyDocumentsModal = ({ documents, onSelect, onClose }: Props) => {
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
          <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center">
            <FileText size={20} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Verify Documents</p>
            <p className="text-xs text-gray-400">Select a document to continue</p>
          </div>
        </div>

        {/* Document list */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Required Documents
        </p>

        <div className="flex flex-col gap-1">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelect(doc)}
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-gray-400" />
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