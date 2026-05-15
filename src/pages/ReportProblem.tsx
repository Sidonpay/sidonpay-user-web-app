import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Upload, CheckCircle, X } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const issueTypes = [
  "Transaction and Transfers",
  "Card Problem",
  "Wallet and Funding",
  "Account and Security",
  "FX Conversion",
  "Refunds and Dispute",
  "Bills and Payment",
  "Others",
];

type UploadState = "idle" | "uploading" | "success" | "failed";

const generateTicketId = () => {
  return `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
};

const ReportProblem: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedIssue, setSelectedIssue] = useState<string>("Transaction and Transfers");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("johnfrey@gmail.com");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ticketId] = useState<string>(generateTicketId());

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setUploadState("failed");
      setFileName(file.name);
      return;
    }
    setFileName(file.name);
    setUploadState("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("success");
          return 100;
        }
        return prev + Math.floor(Math.random() * 20);
      });
    }, 300);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = () => {
    if (!description || !email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const isValid = description.trim() !== "" && email.trim() !== "";

  if (submitted) {
    return (
      <DashboardLayout userName="Kolawole">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-[#2D7A51]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted</h2>
          <p className="text-sm text-gray-400 mb-6">
            We've received your report and will investigate promptly.
            Expect a response within 24 hours.
          </p>
          <div className="mb-6">
            <p className="text-xs text-gray-400">Your ticket ID</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{ticketId}</p>
          </div>
          <button
            onClick={() => navigate("/help")}
            className="flex items-center gap-2 text-[#2D7A51] text-sm hover:underline"
          >
            ← Back to Help Centre
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto px-2 md:px-0">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Report a Problem</h1>
          <p className="text-sm text-gray-400 mt-1">
            Let us know what went wrong and we'll resolve it as quickly as possible.
          </p>
        </div>

        {/* Issue Type */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Issue Type</p>
          <div className="grid grid-cols-2 gap-2">
            {issueTypes.map((issue) => (
              <button
                key={issue}
                onClick={() => setSelectedIssue(issue)}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition ${
                  selectedIssue === issue
                    ? "bg-[#2D7A51] text-white border-[#2D7A51]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-[#2D7A51]"
                }`}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Someone sent a sum of ₦50,000 to my Sidonpay account on the 23rd of March, 2026 and I am yet to receive it. This is the receipt from the sender bank"
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-400 resize-none text-gray-700 placeholder:text-gray-400"
          />
          <p className="text-right text-xs text-gray-400 mt-1">{description.length} characters</p>
        </div>

        {/* Upload */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Upload</p>
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition"
          >
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">Click to upload</p>
            <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />

          {/* Upload progress */}
          {uploadState !== "idle" && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-600 truncate">{fileName}</p>
                  {uploadState === "failed" && (
                    <button onClick={() => setUploadState("idle")} className="text-gray-400">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      uploadState === "failed" ? "bg-red-500" : "bg-[#2D7A51]"
                    }`}
                    style={{ width: `${uploadState === "failed" ? 100 : uploadProgress}%` }}
                  />
                </div>
                <p className={`text-xs mt-1 ${
                  uploadState === "failed" ? "text-red-500" : uploadState === "success" ? "text-green-500" : "text-gray-400"
                }`}>
                  {uploadState === "uploading" && `uploading...${uploadProgress}%`}
                  {uploadState === "success" && `Successful...100%`}
                  {uploadState === "failed" && "Try Again"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Your Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={`w-full py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            isValid
              ? "bg-[#2D7A51] text-white hover:bg-green-700"
              : "bg-green-100 text-green-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Please wait...
            </>
          ) : (
            "Submit Report"
          )}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ReportProblem;