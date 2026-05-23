import { useState } from "react";
import { ChevronRight, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { useUser } from "../context/UserContext";
import CircularProgress from "./CircularProgress";
import TransactionLimitsModal from "../pages/TransactionLimitsModal";
import VerifyDocumentsModal from "../pages/VerifyDocumentsModal";
import TierUpgradeModal from "../pages/TierUpgradeModal";
import DocumentSubmittedModal from "../pages/DocumentSubmittedModal";
import KYCCrownIcon from "../assets/kyc-crown-icon.png";
import PersonIcon from "../assets/kyc-person-icon.png";
import EmailIcon from "../assets/kyc-email-icon.png";
import PhoneIcon from "../assets/kyc-phone-icon.png";
import CalendarIcon from "../assets/kyc-calendar-icon.png";
import DocumentIcon from "../assets/kyc-document-icon.png";
import Tier0Icon from "../assets/tier0-star-icon.png";
import Tier1Icon from "../assets/tier1-flash-icon.png";
import Tier2Icon from "../assets/tier2-crown-icon.png";
import AiAssistant from "../components/AiAssistant";

export type DocumentStatus = "pending" | "completed" | "required";
export interface KYCDocument {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
}

type ActiveModal = "limits" | "verify" | "upgrade" | "submitted" | null;

const KYCTab = () => {
  const { profile } = useUser();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedDocument, setSelectedDocument] = useState<KYCDocument | null>(null);
  const [submittedDocument, setSubmittedDocument] = useState<KYCDocument | null>(null);
  const [showAi, setShowAi] = useState<boolean>(false);

  const [documents, setDocuments] = useState<KYCDocument[]>([
    {
      id: "bvn",
      name: "BVN / NIN",
      description: "Enter your 11-digit number",
      status: "pending",
    },
    {
      id: "id",
      name: "Valid ID Card",
      description: "Government-issued photo ID",
      status: "pending",
    },
    {
      id: "utility",
      name: "Utility Bill",
      description: "Recent utility bill (< 3 months)",
      status: "pending",
    },
    {
      id: "address",
      name: "Proof of Address",
      description: "Official address verification",
      status: "pending",
    },
  ]);

  const completedCount = documents.filter((d) => d.status === "completed").length;
  const completionPercent = Math.round((completedCount / documents.length) * 100);
  const fullName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.lastName || "";

  const formattedDOB = profile.dateOfBirth
    ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleDocumentSelect = (doc: KYCDocument) => {
    setSelectedDocument(doc);
    setActiveModal("upgrade");
  };

  const handleDocumentSubmitted = (doc: KYCDocument) => {
    setSubmittedDocument(doc);
    setActiveModal("submitted");
  };

  const handleDone = () => {
    if (submittedDocument) {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === submittedDocument.id ? { ...d, status: "completed" } : d
        )
      );
    }
    setActiveModal(null);
    setSubmittedDocument(null);
    setSelectedDocument(null);
  };

  const handleUploadAnother = () => {
    setSubmittedDocument(null);
    setActiveModal("verify");
  };

  const tiers = [
    {
      icon: Tier0Icon,
      name: "Tier 0",
      isCurrent: profile.tier === "Tier 0",
      requirements: [
        { label: "Automatic for all new users", done: true },
        { label: "No verification required", done: true },
      ],
      dailyLimit: "₦50,000",
      monthlyLimit: "₦300,000",
      maxBalance: "₦300,000",
      isVerified: true,
      buttonLabel: null,
    },
    {
      icon: Tier1Icon,
      name: "Tier 1",
      isCurrent: profile.tier === "Tier 1",
      requirements: [
        { label: "BVN / NIN Verification", done:profile.tier === "Tier 1" || profile.tier === "Tier 2"},
        { label: "Valid ID Card", done: profile.tier === "Tier 1" || profile.tier === "Tier 2"},
      ],
      dailyLimit: "₦200,000",
      monthlyLimit: "₦5,000,000",
      maxBalance: "₦5,000,000",
      isVerified: profile.tier === "Tier 1",
      buttonLabel: profile.tier === "Tier 0" ? "Upgrade to Tier 1" : null,
    },
    {
      icon: Tier2Icon,
      name: "Tier 2",
      isCurrent: profile.tier === "Tier 2",
      requirements: [
        { label: "Utility Bill", done: profile.tier === "Tier 2"},
        { label: "Proof of Address", done: profile.tier === "Tier 2" },
      ],
      dailyLimit: "₦1,000,000",
      monthlyLimit: "₦50,000,000",
      maxBalance: "Unlimited",
      isVerified: profile.tier === "Tier 2",
      buttonLabel: profile.tier === "Tier 1" ? "Upgrade to Tier 2" : null,
    },
  ];

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-100">

        {/* ── Section 1: KYC Overview ── */}
        <div className="py-6">

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <img src={KYCCrownIcon} alt="KYC" className="w-8 h-8" />
              <div>
                <p className="text-base font-bold text-gray-900">KYC Overview</p>
                <p className="text-sm text-gray-400">
                  Your identity verification summary
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#1a6b3c] bg-[#e8f5ee] px-3 py-1 rounded-full">
              ✦ {profile.tier}
            </span>
          </div>

          {/* User info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={PersonIcon} alt="person-icon" />
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">
                  {fullName !== "-"? fullName : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 shadow-sm bg-white ">
              <img src={EmailIcon} alt="email-icon" />
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={PhoneIcon} alt="" />
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm font-semibold text-gray-800">
                  {profile.phoneNumber}
                </p>
              </div>
            </div>

            {/* Date of Birth*/}
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={CalendarIcon} alt="" />
              <div>
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formattedDOB !== "-"? formattedDOB : ""}
                </p>
              </div>
            </div>

          </div>

          {/* Limits */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="py-4 px-3 text-center border border-gray-100 rounded-md  bg-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Daily Limit</p>
              <p className="text-sm font-bold text-gray-900">{profile.dailyLimit}</p>
            </div>
            <div className="py-4 px-3 text-center border border-gray-100 rounded-md  bg-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Monthly Limit</p>
              <p className="text-sm font-bold text-gray-900">{profile.monthlyLimit}</p>
            </div>
            <div className="py-4 px-3 text-center border border-gray-100 rounded-md  bg-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">Max Balance</p>
              <p className="text-sm font-bold text-gray-900">{profile.maxBalance}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal("limits")}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:underline mx-auto"
          >
            Manage Transaction Limits
            <ArrowRight size={15} />
          </button>
        </div>

        {/* ── Section 2: Verification Status ── */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CircularProgress percent={completionPercent} size={32} strokeWidth={3}/>
              <div>
                <p className="text-base font-bold text-black-900">
                  Verification Status
                </p>
                <p className="text-sm text-gray-400">
                  Track your identity verification progress
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#1a6b3c]  bg-green-100 px-3 py-1 rounded-full">
              {completionPercent === 100 ? "Completed" : "In Progress"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">Completion</p>
            <p className="text-sm font-bold text-[#1a6b3c]">{completionPercent}%</p>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-[#1a6b3c] rounded-full transition-all duration-700"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          {/* Documents */}
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
            Required Documents
          </p>

         <div className="flex flex-col gap-2">
         {documents.map((doc) => (
         <button
         key={doc.id}
         onClick={() => handleDocumentSelect(doc)}
         className="flex items-center justify-between w-full py-3.5 px-4 text-left hover:bg-gray-100 transition-colors rounded-xl border border-gray-200 shadow-sm bg-white"
    >
          <div className="flex items-center gap-3">
         <img src={DocumentIcon} alt="" />
         <div>
          <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
          <p className="text-xs text-gray-400">{doc.description}</p>
          </div>
        </div>
         {doc.status === "completed" ? (
         <span className="flex items-center gap-1 text-xs text-[#1a6b3c] font-semibold">
          <CheckCircle size={14} />
          Completed
        </span>
        ) : doc.status === "required" ? (
         <span className="text-xs text-amber-500 font-semibold">
          ⚠ Required
        </span>
        ) : (
        <ChevronRight size={16} />
      )}
       </button>
      ))}
      </div>

          <button
            onClick={() => setActiveModal("verify")}
            className="mt-5 w-full py-3.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors flex items-center justify-center gap-2"
          >
            Continue Verification
            <ArrowRight size={16} />
          </button>
          
        </div>
        {/* ── Section 3: Account Tiers ── */}
        <div className="py-2">
         <p className="text-base font-bold text-gray-900 mb-1">Account Tiers</p>
         <p className="text-sm text-gray-400 mb-6">
         Compare tier levels and upgrade for higher limits
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {tiers.map((tier) => (
        <div
         key={tier.name}
         className={`relative rounded-2xl p-5 border-2 bg-white flex flex-col justify-between ${
          tier.isCurrent
            ? "border-[#A7F3D0] shadow-md"
            : "border-gray-200 shadow-sm"
        }`}
       >
        {/* CURRENT badge */}
         {tier.isCurrent && (
          <div className="absolute -top-3.5 left-4">
            <span className="text-xs font-bold text-white bg-[#1a6b3c] px-3 py-1 rounded-full">
              CURRENT
            </span>
          </div>
        )}

        {/* Top section */}
        <div>
          {/* Icon + Name */}
          <div className="flex items-center gap-2.5 mb-4 mt-1">
            <img
              src={tier.icon}
              alt={tier.name}
            />
            <p className="text-base font-bold text-gray-900">{tier.name}</p>
          </div>

          {/* Requirements */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Requirements
          </p>
          <ul className="flex flex-col gap-2 mb-5">
            {tier.requirements.map((req, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs text-gray-700"
              >
                {req.done ? (
                  <span className="w-4 h-4 rounded-full bg-[#e8f5ee] border border-[#1a6b3c] flex items-center justify-center shrink-0">
                    <CheckCircle size={11} className="text-[#1a6b3c]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <CheckCircle size={11} className="text-gray-300" />
                  </span>
                )}
                {req.label}
              </li>  
            ))}
          </ul>

          {/* Limits */}
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Daily Limit</span>
              <span className="text-xs font-bold text-gray-900">
                {tier.dailyLimit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Monthly Limit</span>
              <span className="text-xs font-bold text-gray-900">
                {tier.monthlyLimit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Max Balance</span>
              <span className="text-xs font-bold text-gray-900">
                {tier.maxBalance}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div>
          {tier.isVerified && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#1a6b3c] font-semibold py-1">
              <CheckCircle size={14} />
              Verified
            </div>
          )}
          {tier.buttonLabel && (
            <button
              onClick={() => setActiveModal("upgrade")}
              className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors flex items-center justify-center gap-2"
            >
              {tier.buttonLabel}
              <ArrowRight size={15} />
            </button>
          )}
        </div>

      </div>
    ))}
  </div>
</div>

        <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>

        {/* AI Assistant overlay */}
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      </div>

      {/* ── Modals ── */}
      {activeModal === "limits" && (
        <TransactionLimitsModal
          dailyLimit={profile.dailyLimit}
          monthlyLimit={profile.monthlyLimit}
          maxBalance={profile.maxBalance}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "verify" && (
        <VerifyDocumentsModal
          documents={documents}
          onSelect={handleDocumentSelect}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "upgrade" && (
        <TierUpgradeModal
          document={selectedDocument}
          onClose={() => setActiveModal(null)}
          onSubmitted={handleDocumentSubmitted}
        />
      )}
      {activeModal === "submitted" && submittedDocument && (
        <DocumentSubmittedModal
          documentName={submittedDocument.name}
          onDone={handleDone}
          onUploadAnother={handleUploadAnother}
        />
      )}
    </>
    
  );
};

export default KYCTab;