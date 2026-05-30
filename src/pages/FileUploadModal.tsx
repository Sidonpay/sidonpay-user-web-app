
import { useState, useRef } from "react";
import { X, CloudUpload, FileText, Trash2 } from "lucide-react";
import type { KYCDocument } from "../components/KYCTab";

interface Props {
  document: KYCDocument;
  onBack: () => void;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const FileUploadModal = ({ document, onBack, onClose, onUpload }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const accepted = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

  const handleFile = (f: File) => {
    setFileError("");
    if (!accepted.includes(f.type)) {
      setFile(f);
      setFileError("Please upload an acceptable file format e.g pdf, jpg or png");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setFileError("File must be less than 10MB");
      return;
    }
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const canSubmit = file && !fileError;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
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
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <FileText size={22} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              Upload {document.name}
            </p>
            <p className="text-sm text-gray-400">Drag & drop or choose a file</p>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
        >
          <X size={14} />
          Back to documents
        </button>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-[#1a6b3c] hover:bg-[#f5faf6] transition-all mb-3"
        >
          <div className="w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
            <CloudUpload size={26} className="text-[#1a6b3c]" />
          </div>
          <p className="text-base font-bold text-gray-800">Drop your file here</p>
          <p className="text-sm text-gray-500">
            or{" "}
            <span className="text-[#1a6b3c] underline font-medium">
              browse files
            </span>
          </p>
          <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleInput}
        />

        {/* File preview */}
        {file && (
          <div className="mb-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-400 shrink-0" />
                <span className="text-xs text-gray-700 truncate max-w-[220px]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatSize(file.size)}
                </span>
              </div>
              <button onClick={() => { setFile(null); setFileError(""); }}>
                <Trash2 size={13} className="text-red-400 hover:text-red-600" />
              </button>
            </div>
          </div>
        )}

        {fileError && (
          <p className="text-xs text-red-500 mb-3">{fileError}</p>
        )}

        <button
          onClick={() => canSubmit && onUpload(file!)}
          disabled={!canSubmit}
          className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default FileUploadModal;