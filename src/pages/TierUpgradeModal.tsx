
import { useState, useRef } from "react";
import { X, CloudUpload, FileText, Trash2 } from "lucide-react";
import type { KYCDocument } from "../components/KYCTab";

interface Props {
  document: KYCDocument | null;
  onClose: () => void;
  onSubmitted: (doc: KYCDocument) => void;
}

type UploadState = "idle" | "uploading" | "done" | "error";

const TierUpgradeModal = ({ document, onClose, onSubmitted }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bvn, setBvn] = useState("");
  const [bvnError, setBvnError] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const acceptedFormats = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

  const handleFileSelect = (file: File) => {
    setFileError("");

    if (!acceptedFormats.includes(file.type)) {
      setUploadedFile(file);
      setUploadState("error");
      setFileError("Please upload an acceptable file format e.g pdf, jpg or png");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setFileError("File must be less than 25MB");
      return;
    }

    setUploadedFile(file);
    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("done");
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    e.target.value = "";
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadState("idle");
    setUploadProgress(0);
    setFileError("");
  };

  const handleContinue = async () => {
    // Validate BVN
    if (!bvn.trim()) {
      setBvnError("Please enter your BVN or NIN");
      return;
    }
    if (bvn.length < 11) {
      setBvnError("BVN/NIN must be 11 digits");
      return;
    }

    if (uploadState !== "done") return;

    setIsSubmitting(true);

    // 🔁 Replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);

    if (document) {
      onSubmitted(document);
    }
  };

  const canSubmit = bvn.length >= 11 && uploadState === "done" && !isSubmitting;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header — export SidonPay icon from Figma */}
        <div className="flex flex-col gap-1 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#1a6b3c] flex items-center justify-center mb-2">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <p className="text-base font-bold text-gray-900">Tier 1</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kindly provide your valid Bank Verification Number or NIN to continue
          </p>
        </div>

        {/* BVN/NIN Input */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs text-gray-500 font-medium">BVN/NIN</label>
          <input
            type="text"
            value={bvn}
            placeholder="Enter your BVN or NIN"
            maxLength={11}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setBvn(val);
              if (bvnError) setBvnError("");
            }}
            className={`w-full px-4 py-3 text-sm border rounded-xl outline-none transition-all ${
              bvnError
                ? "border-red-400 bg-red-50"
                : bvn.length >= 11
                ? "border-[#1a6b3c] bg-white"
                : "border-gray-200 bg-white focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/10"
            }`}
          />
          {bvnError && <p className="text-[11px] text-red-500">{bvnError}</p>}
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs text-gray-500 font-medium">
            Upload a valid Government ID
          </label>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#c5e0ce] bg-[#f5faf6] rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-[#eaf5ee] transition-colors"
          >
            <CloudUpload size={28} className="text-[#1a6b3c]" />
            <p className="text-sm text-center text-gray-600">
              <span className="text-[#1a6b3c] font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF, JPG or PNG (max. 25MB)</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileInput}
          />

          {/* Uploaded file row */}
          {uploadedFile && (
            <div className="mt-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-700 truncate max-w-[200px]">
                    {uploadedFile.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatFileSize(uploadedFile.size)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {uploadState === "done" && (
                    <span className="text-xs text-gray-400">100%</span>
                  )}
                  {uploadState === "uploading" && (
                    <span className="text-xs text-gray-400">{uploadProgress}%</span>
                  )}
                  <button onClick={handleRemoveFile}>
                    <Trash2 size={13} className="text-red-400 hover:text-red-600" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              {(uploadState === "uploading" || uploadState === "done") && (
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      uploadState === "done" ? "bg-[#1a6b3c]" : "bg-[#1a6b3c]"
                    }`}
                    style={{
                      width: `${uploadState === "done" ? 100 : uploadProgress}%`,
                    }}
                  />
                </div>
              )}

              {/* File error */}
              {fileError && (
                <p className="text-[11px] text-red-500 mt-1">{fileError}</p>
              )}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!canSubmit}
          className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Continue
            </>
          ) : (
            "Continue"
          )}
        </button>

        {/* Bottom note */}
        <p className="text-xs text-gray-400 leading-relaxed">
          <span className="font-semibold text-gray-600">Tier 1:</span> You are required to
          provide your BVN/NIN for this tier. You currently have a medium transaction
          limit. To enjoy a higher transaction limit, please upgrade to tier 2.
        </p>
      </div>
    </div>
  );
};

export default TierUpgradeModal;