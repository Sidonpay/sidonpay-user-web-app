// import { X, CheckCircle, FileText } from "lucide-react";

// interface Props {
//   documentName: string;
//   submitType: "number" | "file" | "address";
//   onDone: () => void;
//   onUploadAnother?: () => void;
// }

// const DocumentSubmittedModal = ({
//   documentName,
//   submitType,
//   onDone,
//   onUploadAnother,
// }: Props) => {

//   const isNumber = submitType === "number";

//   const headerTitle = "Submitted!";
//   const headerSubtitle = "Your information is under review";

//   const bodyTitle = isNumber
//     ? "Number Submitted!"
//     : "Document Submitted";

//   const bodySubtitle = isNumber
//     ? "Your BVN/NIN is being verified. This usually takes a few minutes."
//     : "Your document is under review. This usually takes 1-2 business days.";

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
//       onClick={onDone}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close */}
//         <button
//           onClick={onDone}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X size={20} />
//         </button>

//         {/* Mini header */}
//         <div className="flex items-center gap-2 mb-6">
//           <div className="w-9 h-9 rounded-lg bg-[#e8f5ee] flex items-center justify-center shrink-0">
//             <FileText size={16} className="text-[#1a6b3c]" />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-gray-900">{headerTitle}</p>
//             <p className="text-xs text-gray-400">{headerSubtitle}</p>
//           </div>
//         </div>

//         {/* Success icon */}
//         <div className="flex flex-col items-center gap-3 mb-5">
//           <div className="w-16 h-16 rounded-full border-4 border-[#e8f5ee] flex items-center justify-center">
//             <CheckCircle size={36} className="text-[#1a6b3c]" />
//           </div>
//           <h3 className="text-base font-bold text-gray-900">{bodyTitle}</h3>
//           <p className="text-sm text-gray-500 text-center leading-relaxed">
//             {bodySubtitle}
//           </p>
//         </div>

//         {/* Status tag */}
//         <div className="bg-[#f5faf6] border border-[#c5e0ce] rounded-xl px-4 py-3 mb-5">
//           <p className="text-xs font-semibold text-[#1a6b3c]">{documentName}</p>
//           <p className="text-xs text-gray-400 mt-0.5">Status: Under Review</p>
//         </div>
//         {!isNumber && onUploadAnother && (
//           <button
//             onClick={onUploadAnother}
//             className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2"
//           >
//             Upload Another
//           </button>
//         )}

//         {/* Done */}
//         <button
//           onClick={onDone}
//           className="w-full py-2.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors"
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DocumentSubmittedModal;





import { X, CheckCircle, FileText, CloudUpload } from "lucide-react";

type SubmitStatus = "underReview" | "verified" | "failed";

interface Props {
  documentName: string;
  submitType: "number" | "file" | "address";
  status?: SubmitStatus;
  onDone: () => void;
  onUploadAnother?: () => void;
}

const DocumentSubmittedModal = ({
  documentName,
  submitType,
  status = "underReview",
  onDone,
  onUploadAnother,
}: Props) => {

  const isVerified = status === "verified";
  const isFailed = status === "failed";
  const isUnderReview = status === "underReview";

  // ── Header ──
  const headerTitle = isVerified ? "Verified" : "Submitted!";
  const headerSubtitle = isVerified
    ? "Your details have been verified"
    : "Your information is under review";

  // ── Body ──
  const bodyTitle = isFailed
    ? "Verification Failed!"
    : isVerified
    ? "Verified!"
    : submitType === "address"
    ? "Address Submitted!"
    : submitType === "number"
    ? "Number Submitted!"
    : "Document Submitted";

  const bodySubtitle = isFailed
    ? "Your details couldn't be verified. Kindly reupload"
    : isVerified
    ? "Your details have been verified."
    : submitType === "address"
    ? "Your details are being verified. This usually takes a few minutes."
    : submitType === "number"
    ? "Your BVN/NIN is being verified. This usually takes a few minutes."
    : "Your document is under review. This usually takes 1-2 business days.";

  // ── Status tag ──
  const statusText = isFailed
    ? "Failed"
    : isVerified
    ? "Verified"
    : "Under Review";

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
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              isFailed ? "bg-red-50" : "bg-[#e8f5ee]"
            }`}
          >
            <FileText
              size={16}
              className={isFailed ? "text-red-400" : "text-[#1a6b3c]"}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{headerTitle}</p>
            <p className="text-xs text-gray-400">{headerSubtitle}</p>
          </div>
        </div>

        {/* Center icon */}
        <div className="flex flex-col items-center gap-3 mb-5">
          {isFailed ? (
            // Red failed icon
            <div className="w-16 h-16 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center relative">
              <CloudUpload size={26} className="text-red-400" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X size={12} className="text-white" />
              </div>
            </div>
          ) : (
            // Green success icon
            <div className="w-16 h-16 rounded-full border-4 border-[#e8f5ee] flex items-center justify-center">
              <CheckCircle size={36} className="text-[#1a6b3c]" />
            </div>
          )}

          <h3 className="text-base font-bold text-gray-900">{bodyTitle}</h3>
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            {bodySubtitle}
          </p>
        </div>

        {/* Status tag */}
        <div
          className={`rounded-xl px-4 py-3 mb-5 border ${
            isFailed
              ? "bg-red-50 border-red-200"
              : "bg-[#f5faf6] border-[#c5e0ce]"
          }`}
        >
          {/* Show document name only if not address type */}
          {submitType !== "address" && (
            <p
              className={`text-xs font-semibold ${
                isFailed ? "text-red-500" : "text-[#1a6b3c]"
              }`}
            >
              {documentName}
            </p>
          )}
          <p
            className={`text-xs mt-0.5 ${
              isFailed ? "text-red-400" : "text-gray-400"
            }`}
          >
            Status: {statusText}
          </p>
        </div>

        {/* Upload Another — file type under review only */}
        {submitType === "file" && isUnderReview && onUploadAnother && (
          <button
            onClick={onUploadAnother}
            className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2"
          >
            Upload Another
          </button>
        )}

        {/* Done — hide for verified (auto close) or show */}
        {!isVerified && (
          <button
            onClick={onDone}
            className="w-full py-2.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentSubmittedModal;