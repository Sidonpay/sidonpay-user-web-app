import { useState } from "react";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { useUser } from "../context/UserContext";
import CircularProgress from "./CircularProgress";
import TransactionLimitsModal from "../pages/TransactionLimitsModal";
import VerifyDocumentsModal from "../pages/VerifyDocumentsModal";
import BVNModal from "../pages/BVNModal";
import FileUploadModal from "../pages/FileUploadModal";
import AddressModal from "../pages/AddressModal";
import VerifyingModal from "../pages/VerifyingModal";
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

export type DocumentStatus = "idle" | "pending" | "completed" | "failed";

export interface KYCDocument {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
}

type TierTarget = "tier1" | "tier2" | "all";

type ActiveModal =
  | "limits"
  | "verifyDocs"
  | "bvn"
  | "fileUpload"
  | "address"
  | "verifyingBVN"
  | "verifyingDetails"
  | "uploadingFile"
  | "submittedBVN"
  | "submittedFile"
  | "submittedAddress"
  | null;

const StatusBadge = ({ status }: { status: DocumentStatus }) => {
  if (status === "completed") {
    return (
      <span className="flex items-center gap-1 text-xs text-[#1a6b3c] font-semibold">
        <CheckCircle size={13} />
        Completed
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
        Pending
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
        Failed
      </span>
    );
  }
  return null;
};

const KYCTab = () => {
  const { profile } = useUser();

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [tierTarget, setTierTarget] = useState<TierTarget>("all");
  const [selectedDocument, setSelectedDocument] = useState<KYCDocument | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [showAi, setShowAi] = useState<boolean>(false);
  const [documents, setDocuments] = useState<KYCDocument[]>([
    {
      id: "bvn",
      name: "BVN / NIN",
      description: "Bank Verification Number or National ID",
      status: "idle",
    },
    {
      id: "id",
      name: "Valid ID Card",
      description: "Government-issued photo ID",
      status: "idle",
    },
    {
      id: "utility",
      name: "Utility Bill",
      description: "Recent utility bill (< 3 months)",
      status: "idle",
    },
    {
      id: "address",
      name: "Proof of Address",
      description: "Official address verification",
      status: "idle",
    },
  ]);

  const completedCount = documents.filter(
    (d) => d.status === "completed"
  ).length;
  const completionPercent = Math.round(
    (completedCount / documents.length) * 100
  );

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

  const updateDocStatus = (id: string, status: DocumentStatus) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const closeAll = () => {
    setActiveModal(null);
    setSelectedDocument(null);
    setUploadFile(null);
  };

  const handleOpenUpgrade = (tier: TierTarget) => {
    setTierTarget(tier);
    setActiveModal("verifyDocs");
  };

  const handleDocumentSelect = (doc: KYCDocument) => {
    setSelectedDocument(doc);
    if (doc.id === "bvn") setActiveModal("bvn");
    else if (doc.id === "address") setActiveModal("address");
    else setActiveModal("fileUpload");
  };

  const handleBVNSubmit = async (_bvn: string) => {
    setActiveModal("verifyingBVN");
    //Replacing with real API
    await new Promise((r) => setTimeout(r, 2000));
    setActiveModal("submittedBVN");
  };

  const handleFileUpload = async (file: File) => {
    setUploadFile(file);
    setActiveModal("uploadingFile");
    await new Promise((r) => setTimeout(r, 2000));
    setActiveModal("submittedFile");
  };

  const handleAddressSubmit = async (_address: string) => {
    setActiveModal("verifyingDetails");
    await new Promise((r) => setTimeout(r, 2000));
    setActiveModal("submittedAddress");
  };

  const handleDoneBVN = () => {
    if (selectedDocument) updateDocStatus(selectedDocument.id, "pending");
    closeAll();
  };

  const handleDoneFile = () => {
    if (selectedDocument) updateDocStatus(selectedDocument.id, "pending");
    closeAll();
  };

  const handleUploadAnother = () => {
    setSelectedDocument(null);
    setUploadFile(null);
    setActiveModal("verifyDocs");
  };

  // Tier cards

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
      onUpgrade: null,
      buttonLabel: null,
    },
    {
      icon: Tier1Icon,
      name: "Tier 1",
      isCurrent: profile.tier === "Tier 1",
      requirements: [
        {
          label: "BVN / NIN Verification",
          done:
            profile.tier === "Tier 1" || profile.tier === "Tier 2",
        },
        {
          label: "Valid ID Card",
          done:
            profile.tier === "Tier 1" || profile.tier === "Tier 2",
        },
      ],
      dailyLimit: "₦200,000",
      monthlyLimit: "₦5,000,000",
      maxBalance: "₦5,000,000",
      isVerified: profile.tier === "Tier 1",
      onUpgrade: () => handleOpenUpgrade("tier1"),
      buttonLabel: profile.tier === "Tier 0" ? "Upgrade to Tier 1" : null,
    },
    {
      icon: Tier2Icon,
      name: "Tier 2",
      isCurrent: profile.tier === "Tier 2",
      requirements: [
        { label: "Utility Bill", done: profile.tier === "Tier 2" },
        { label: "Proof of Address", done: profile.tier === "Tier 2" },
      ],
      dailyLimit: "₦1,000,000",
      monthlyLimit: "₦50,000,000",
      maxBalance: "Unlimited",
      isVerified: profile.tier === "Tier 2",
      onUpgrade: () => handleOpenUpgrade("tier2"),
      buttonLabel: profile.tier === "Tier 1" ? "Upgrade to Tier 2" : null,
    },
  ];

  // Render

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-100">

        {/* ── Section 1: KYC Overview ── */}
        <div className="py-6">
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
            <span className="text-xs font-semibold text-[#1a6b3c] bg-[#e8f5ee] px-3 py-1 rounded-full">
              ✦ {profile.tier}
            </span>
          </div>

          {/* User info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={PersonIcon} alt="person-icon"/>
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={EmailIcon} alt="email-icon"/>
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="text-sm font-semibold text-gray-800">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={PhoneIcon} alt="phone-icon"/>
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="text-sm font-semibold text-gray-800">{profile.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 shadow-sm bg-white">
              <img src={CalendarIcon} alt="calender-icon" />
              <div>
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="text-sm font-semibold text-gray-800">{formattedDOB}</p>
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Daily Limit", value: profile.dailyLimit },
              { label: "Monthly Limit", value: profile.monthlyLimit },
              { label: "Max Balance", value: profile.maxBalance },
            ].map((item) => (
              <div
                key={item.label}
                className="py-4 px-3 text-center border border-gray-100 rounded-2xl bg-gray-100 shadow-sm"
              >
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveModal("limits")}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:underline mx-auto"
          >
            Manage Transaction Limits
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Section 2 Verification Status */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CircularProgress
                percent={completionPercent}
                size={32}
                strokeWidth={3}
              />
              <div>
                <p className="text-base font-bold text-gray-900">
                  Verification Status
                </p>
                <p className="text-sm text-gray-400">
                  Track your identity verification progress
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
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

          {/* Required Documents */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Required Documents
          </p>

          <div className="flex flex-col gap-2 mb-5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between w-full py-3.5 px-4 rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={DocumentIcon}
                    alt=""
                    className="w-8 h-8 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-400">{doc.description}</p>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>

          {/* Continue Verification */}
          <button
            onClick={() => handleOpenUpgrade("all")}
            className="w-full py-3.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors flex items-center justify-center gap-2"
          >
            Continue Verification
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Section 3 Account Tiers */}
        <div className="py-6">
          <p className="text-base font-bold text-gray-900 mb-1">Account Tiers</p>
          <p className="text-sm text-gray-400 mb-5">
            Compare tier levels and upgrade for higher limits
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-5 border-2 bg-white flex flex-col justify-between shadow-sm transition-all ${
                  tier.isCurrent
                    ? "border-[#A7F3D0] bg-[#f5fbf7]"
                    : "border-gray-200"
                }`}
              >
                {/* CURRENT badge */}
                {tier.isCurrent && (
                  <div className="absolute -top-3.5 left-4">
                    <span className="text-xs font-bold text-white bg-[#059669] px-3 py-1 rounded-full">
                      CURRENT
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2.5 mb-4 mt-1">
                    <img src={tier.icon} alt={tier.name} className="w-7 h-7" />
                    <p className="text-base font-bold text-gray-900">{tier.name}</p>
                  </div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Requirements
                  </p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {tier.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            req.done
                              ? "bg-[#e8f5ee] border-[#1a6b3c]"
                              : "border-gray-300"
                          }`}
                        >
                          <CheckCircle
                            size={11}
                            className={
                              req.done ? "text-[#1a6b3c]" : "text-gray-300"
                            }
                          />
                        </span>
                        {req.label}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2 mb-5">
                    {[
                      { label: "Daily Limit", value: tier.dailyLimit },
                      { label: "Monthly Limit", value: tier.monthlyLimit },
                      { label: "Max Balance", value: tier.maxBalance },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-gray-400">{item.label}</span>
                        <span className="text-xs font-bold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {tier.isVerified && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#1a6b3c] font-semibold py-1">
                      <CheckCircle size={13} />
                      Verified
                    </div>
                  )}
                  {tier.buttonLabel && tier.onUpgrade && (
                    <button
                      onClick={tier.onUpgrade}
                      className="w-full py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] transition-colors flex items-center justify-center gap-2"
                    >
                      {tier.buttonLabel}
                      <ArrowRight size={14} />
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

      {/* Modals */}

      {activeModal === "limits" && (
        <TransactionLimitsModal
          dailyLimit={profile.dailyLimit}
          monthlyLimit={profile.monthlyLimit}
          maxBalance={profile.maxBalance}
          onClose={closeAll}
        />
      )}

      {activeModal === "verifyDocs" && (
        <VerifyDocumentsModal
          documents={documents}
          tierTarget={tierTarget}
          onSelect={handleDocumentSelect}
          onClose={closeAll}
        />
      )}

      {activeModal === "bvn" && (
        <BVNModal
          onBack={() => setActiveModal("verifyDocs")}
          onClose={closeAll}
          onSubmit={handleBVNSubmit}
        />
      )}

      {activeModal === "fileUpload" && selectedDocument && (
        <FileUploadModal
          document={selectedDocument}
          onBack={() => setActiveModal("verifyDocs")}
          onClose={closeAll}
          onUpload={handleFileUpload}
        />
      )}

      {activeModal === "address" && (
        <AddressModal
          onBack={() => setActiveModal("verifyDocs")}
          onClose={closeAll}
          onSubmit={handleAddressSubmit}
        />
      )}

      {activeModal === "verifyingBVN" && (
        <VerifyingModal type="verifying" onClose={closeAll} />
      )}

      {activeModal === "verifyingDetails" && (
        <VerifyingModal type="verifyingDetails" onClose={closeAll}/>
      )}

{activeModal === "uploadingFile" && (
        <VerifyingModal
          type="uploading"
          fileName={uploadFile?.name}
          onClose={closeAll}
        />
      )}

      {activeModal === "submittedBVN" && selectedDocument && (
        <DocumentSubmittedModal
          documentName={selectedDocument.name}
          submitType="number"
          onDone={handleDoneBVN}
        />
      )}

      {activeModal === "submittedFile" && selectedDocument && (
        <DocumentSubmittedModal
          documentName={selectedDocument.name}
          submitType="file"
          onDone={handleDoneFile}
          onUploadAnother={handleUploadAnother}
        />
      )}

      {activeModal === "submittedAddress" && selectedDocument && (
        <DocumentSubmittedModal
          documentName={selectedDocument.name}
          submitType="address"
          onDone={handleDoneFile}
        />
      )}
    </>
  );
};

export default KYCTab;