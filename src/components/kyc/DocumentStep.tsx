
import { useRef, useState } from "react";
import { ArrowLeft, Save, Upload, CheckCircle, RotateCw, X, FileText } from "lucide-react";
import { useUser } from "../../context/UserContext";

interface UploadSlotProps {
  label: string;
  description: string;
  fileName: string | null;
  onUpload: (fileName: string) => void;
  onRemove: () => void;
}

const UploadSlot: React.FC<UploadSlotProps> = ({
  label,
  description,
  fileName,
  onUpload,
  onRemove,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (file: File) => {
    setUploading(true);
    // Mock upload delay replace with real upload API call, you gettt.
    setTimeout(() => {
      onUpload(file.name);
      setUploading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
      <p className="text-xs text-gray-400 mb-3">{description}</p>

      {fileName && !uploading ? (
        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-lg bg-[#EAF7EE] flex items-center justify-center shrink-0">
              <FileText size={16} className="text-[#1a6b3c]" />
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-800">
                <CheckCircle size={13} className="text-[#1a6b3c] shrink-0" /> File uploaded
              </p>
              <p className="text-xs text-gray-400 truncate">{fileName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => inputRef.current?.click()}
              className="text-gray-400 hover:text-gray-600"
            >
              <RotateCw size={15} />
            </button>
            <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : uploading ? (
        <div className="border border-gray-200 rounded-xl px-4 py-6 flex flex-col items-center gap-2">
          <RotateCw size={20} className="text-[#1a6b3c] animate-spin" />
          <div className="w-full max-w-[160px] h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#1a6b3c] w-2/3 rounded-full" />
          </div>
          <p className="text-xs text-gray-400">Uploading...</p>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-8 flex flex-col items-center gap-2 hover:border-[#1a6b3c] hover:bg-gray-50"
        >
          <Upload size={18} className="text-gray-400" />
          <p className="text-sm font-medium text-gray-700">Drag &amp; drop or browse files</p>
          <p className="text-xs text-gray-400">JPG, JPEG, PNG or PDF</p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

const DocumentsStep = () => {
  const {
    profile,
    setTier2Step,
    markTier2StepComplete,
    setUtilityBill,
    setPassportPhoto,
    submitTier2Verification,
  } = useUser();

  const [saved, setSaved] = useState(false);

  const bothUploaded = !!profile.utilityBillFile && !!profile.passportPhotoFile;

  const handleSaveProgress = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBack = () => {
    setTier2Step("bvn");
  };

  const handleSubmit = () => {
    if (!bothUploaded) return;
    markTier2StepComplete("documents");
    submitTier2Verification();
  };

  return (
    <div>
      <UploadSlot
        label="Utility Bill"
        description="Upload a recent utility bill (electricity, water, or waste) showing your name and address."
        fileName={profile.utilityBillFile}
        onUpload={setUtilityBill}
        onRemove={() => setUtilityBill(null)}
      />

      <UploadSlot
        label="Passport Photograph"
        description="Upload a clear, recent passport-sized photograph with a white background."
        fileName={profile.passportPhotoFile}
        onUpload={setPassportPhoto}
        onRemove={() => setPassportPhoto(null)}
      />

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveProgress}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50"
          >
            <Save size={15} /> {saved ? "Saved!" : "Save Progress"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!bothUploaded}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1a6b3c] px-5 py-2.5 rounded-lg hover:bg-[#155c33] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;