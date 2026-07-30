import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Lock,
  ShieldCheck,
  Globe,
  Sparkles,
  User,
  Mail,
  Phone,
  Calendar,
  Crown,
  AlertTriangle,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import CircularProgress from "./CircularProgress";
import TransactionLimitsModal from "../pages/TransactionLimitsModal";
import AiAssistant from "../components/AiAssistant";
import Tier1Verification from "./kyc/Tier1Verification";
import Tier2Verification from "./kyc/Tier2Verification";
import Tier3Verification from "./kyc/Tier3Verification";

const KYCTab = () => {
  const { profile } = useUser();
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showTier2Verification, setShowTier2Verification] = useState(false);
  const [showTier3Verification, setShowTier3Verification] = useState(false);

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
    : "—";

  const isVerified = profile.kycStatus === "verified";
  const isPending = profile.kycStatus === "pending_review";

  const verifiedTiersCount =
    (isVerified ? 1 : 0) +
    (profile.tier2Status === "verified" ? 1 : 0) +
    (profile.tier3Status === "verified" ? 1 : 0);
  const completionPercent = Math.round((verifiedTiersCount / 3) * 100);

  const tiers = [
    {
      name: "Tier 1",
      icon: <ShieldCheck size={20} className="text-white" />,
      iconBg: "bg-[#1a6b3c]",
      dailyLimit: "₦200,000",
      monthlyLimit: "₦5,000,000",
      maxBalance: "₦500,000",
      features: ["NGN Wallet", "Local transfers", "Bill payments", "Airtime & Data"],
      requirements: [
        "Personal information",
        "NIN (National Identification Number)",
        "Residential address",
      ],
      isCurrent: profile.tier === "Tier 1",
      isLocked: false,
    },
    {
      name: "Tier 2",
      icon: <Globe size={20} className="text-white" />,
      iconBg: "bg-[#7C3AED]",
      dailyLimit: "₦2,000,000",
      monthlyLimit: "₦20,000,000",
      maxBalance: "₦5,000,000",
      features: ["USD Wallet", "International transfers", "Currency conversion", "Higher limits"],
      requirements: [
        "BVN (Bank Verification Number)",
        "Utility bill",
        "Passport photograph",
        "Phone verification",
      ],
      isCurrent: profile.tier === "Tier 2",
      isLocked: !isVerified,
    },
    {
      name: "Tier 3",
      icon: <Sparkles size={20} className="text-white" />,
      iconBg: "bg-[#F59E0B]",
      dailyLimit: "₦10,000,000",
      monthlyLimit: "₦100,000,000",
      maxBalance: "₦50,000,000",
      features: ["Unlimited features", "Premium support", "Advanced limits", "Priority processing"],
      requirements: ["Facial recognition", "Liveness verification"],
      isCurrent: profile.tier === "Tier 3",
      isLocked: profile.tier2Status !== "verified",
    },
  ];

  const steps = [
    { label: "Unverified", sub: "Create your account", done: true, current: false },
    {
      label: "Tier 1",
      sub: "Basic verification",
      done: isVerified,
      current: !isVerified,
    },
    {
      label: "Tier 2",
      sub: "Enhanced verification",
      done: profile.tier2Status === "verified",
      current: isVerified && profile.tier2Status !== "verified",
    },
    {
      label: "Tier 3",
      sub: "Full verification",
      done: profile.tier3Status === "verified",
      current: profile.tier2Status === "verified" && profile.tier3Status !== "verified",
    },
  ];

  // Tier 1 Verification flow
  if (showVerification || isPending) {
    return (
      <>
        <div className="pb-24">
          <Tier1Verification onBackToProfile={() => setShowVerification(false)} />
        </div>

        <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      </>
    );
  }

  // Tier 2 Verification flow
  if (showTier2Verification || profile.tier2Status === "pending_review") {
    return (
      <>
        <div className="pb-24">
          <Tier2Verification onBackToProfile={() => setShowTier2Verification(false)} />
        </div>

        <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      </>
    );
  }

  // Tier 3 Verification flow
  if (showTier3Verification) {
    return (
      <>
        <div className="pb-24">
          <Tier3Verification onBackToProfile={() => setShowTier3Verification(false)} />
        </div>

        <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 pb-24">
        {/* Alert banner — Tier 1 */}
        {!isVerified && !isPending && (
          <div className="flex items-center justify-between gap-3 bg-[#EAF7EE] border border-[#B7E4C7] rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="w-10 h-10 rounded-lg bg-white border border-[#B7E4C7] flex items-center justify-center shrink-0">
                <AlertTriangle size={17} className="text-[#1a6b3c]" />
              </span>
              <p className="text-sm text-[#1a6b3c] truncate min-w-0">
                Verify your identity to start transacting. Complete Tier 1 to unlock your NGN wallet.
              </p>
            </div>
            <button
              onClick={() => setShowVerification(true)}
              className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a6b3c] px-4 py-2 rounded-lg shrink-0"
            >
              Upgrade Now <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Alert banner Tier 2 */}
        {isVerified && profile.tier2Status === "not_started" && (
          <div className="flex items-center justify-between gap-3 bg-[#EAF7EE] border border-[#B7E4C7] rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="w-10 h-10 rounded-lg bg-white border border-[#B7E4C7] flex items-center justify-center shrink-0">
                <AlertTriangle size={17} className="text-[#1a6b3c]" />
              </span>
              <p className="text-sm text-[#1a6b3c] truncate min-w-0">
                Verify your identity to start transacting. Complete Tier 2 to unlock your wallet.
              </p>
            </div>
            <button
              onClick={() => setShowTier2Verification(true)}
              className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a6b3c] px-4 py-2 rounded-lg shrink-0"
            >
              Start Now <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Alert banner Tier 3 */}
        {profile.tier2Status === "verified" && profile.tier3Status === "not_started" && (
          <div className="flex items-center justify-between gap-3 bg-[#EAF7EE] border border-[#B7E4C7] rounded-xl px-4 py-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="w-10 h-10 rounded-lg bg-white border border-[#B7E4C7] flex items-center justify-center shrink-0">
                <AlertTriangle size={17} className="text-[#1a6b3c]" />
              </span>
              <p className="text-sm text-[#1a6b3c] truncate min-w-0">
                Verify your identity to start transacting. Complete Tier 3 to unlock your wallet.
              </p>
            </div>
            <button
              onClick={() => setShowTier3Verification(true)}
              className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a6b3c] px-4 py-2 rounded-lg shrink-0"
            >
              Start Now <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Account Verification card */}
        <div className="border border-gray-100 rounded-2xl p-5 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#EAF7EE] flex items-center justify-center shrink-0">
                <Crown size={20} className="text-[#1a6b3c]" />
              </span>
              <div>
                <p className="text-base font-bold text-gray-900">Account Verification</p>
                <p className="text-xs text-gray-400">
                  {completionPercent === 100
                    ? "Verified"
                    : isVerified
                    ? "In Progress"
                    : "Not Started"}{" "}
                  · {profile.tier}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                profile.tier2Status === "verified"
                  ? setShowTier3Verification(true)
                  : isVerified
                  ? setShowTier2Verification(true)
                  : setShowVerification(true)
              }
              className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a6b3c] px-4 py-2 rounded-lg shrink-0"
            >
              Upgrade Account <ArrowRight size={15} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
              <CircularProgress percent={completionPercent} size={72} strokeWidth={6} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                    <User size={15} className="text-gray-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{fullName || "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-gray-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Email</p>
                    <p
                      className="text-sm font-semibold text-gray-800 truncate"
                      title={profile.email}
                    >
                      {profile.email || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-gray-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {profile.phoneNumber || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                    <Calendar size={15} className="text-gray-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                      Date of Birth
                    </p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{formattedDOB}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl px-4 py-3 shrink-0 w-full sm:w-auto sm:min-w-[150px] bg-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">
                Current Limits
              </p>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Daily</span>
                  <span className="font-bold text-gray-900">
                    {isVerified ? profile.dailyLimit : "NO"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Monthly</span>
                  <span className="font-bold text-gray-900">
                    {isVerified ? profile.monthlyLimit : "NO"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Max Balance</span>
                  <span className="font-bold text-gray-900">
                    {isVerified ? profile.maxBalance : "NO"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowLimitsModal(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:underline mx-auto mt-5"
          >
            Manage Transaction Limits <ArrowRight size={15} />
          </button>
        </div>

        {/* Verification Progress card */}
        <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm bg-white">
          <p className="text-sm font-bold text-gray-700 mb-4 sm:mb-5">Verification Progress</p>
          <div className="flex items-start w-full">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 shrink-0 text-xs sm:text-sm ${
                      step.done
                        ? "bg-[#1a6b3c] border-[#1a6b3c] text-white"
                        : step.current
                        ? "border-[#1a6b3c] text-[#1a6b3c]"
                        : "border-gray-200 text-gray-300"
                    }`}
                  >
                    {step.done ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-700 text-center leading-tight px-0.5">
                    {step.label}
                  </p>
                  <p className="hidden md:block text-[11px] text-gray-400 text-center leading-tight">
                    {step.sub}
                  </p>
                  {step.current && (
                    <span className="text-[8px] sm:text-[10px] font-semibold text-blue-600 bg-blue-50 px-1 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                      In Progress
                    </span>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-0.5 mx-0.5 sm:mx-2 w-3 sm:w-auto sm:flex-1 shrink-0 sm:shrink ${
                      step.done ? "bg-[#1a6b3c]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account Tiers */}
        <div>
          <p className="text-base font-bold text-gray-900 mb-4">Account Tiers</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-5 border-2 bg-white flex flex-col justify-between ${
                  tier.isCurrent ? "border-[#1a6b3c]" : "border-gray-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${tier.iconBg}`}>{tier.icon}</div>
                    {tier.isLocked && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Lock size={11} /> Locked
                      </span>
                    )}
                  </div>
                  <p className="text-base font-bold text-gray-900 mb-3">{tier.name}</p>

                  <div className="flex flex-col gap-1.5 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily limit</span>
                      <span className="font-bold text-gray-900">{tier.dailyLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly limit</span>
                      <span className="font-bold text-gray-900">{tier.monthlyLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max balance</span>
                      <span className="font-bold text-gray-900">{tier.maxBalance}</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                    Features Unlocked
                  </p>
                  <ul className="flex flex-col gap-1 mb-4">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-700">
                        <CheckCircle size={12} className="text-[#1a6b3c]" /> {f}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                    Requirements
                  </p>
                  <ul className="flex flex-col gap-1 mb-5">
                    {tier.requirements.map((r) => (
                      <li key={r} className="text-xs text-gray-500">
                        • {r}
                      </li>
                    ))}
                  </ul>
                </div>

                  {tier.name === "Tier 1" && !isVerified && !isPending && (
                  <button
                    onClick={() => setShowVerification(true)}
                    className="w-full py-2.5 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    Upgrade to Tier 1 <ArrowRight size={14} />
                  </button>
                )}
                {tier.name === "Tier 1" && isVerified && (
                  <button
                    onClick={() => setShowVerification(true)}
                    className="w-full py-2.5 bg-[#EAF7EE] text-[#1a6b3c] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#DCF0E4] transition-colors"
                  >
                    <CheckCircle size={14} /> Completed
                  </button>
                )}

                {tier.name === "Tier 2" &&
                  isVerified &&
                  profile.tier2Status !== "verified" &&
                  profile.tier2Status !== "pending_review" && (
                    <button
                      onClick={() => setShowTier2Verification(true)}
                      className="w-full py-2.5 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                      Upgrade to Tier 2 <ArrowRight size={14} />
                    </button>
                  )}
                {tier.name === "Tier 2" && profile.tier2Status === "verified" && (
                  <button
                    onClick={() => setShowTier2Verification(true)}
                    className="w-full py-2.5 bg-[#EEF2FF] text-[#7C3AED] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#E0E7FF] transition-colors"
                  >
                    <CheckCircle size={14} /> Completed
                  </button>
                )}

                {tier.name === "Tier 3" &&
                  profile.tier2Status === "verified" &&
                  profile.tier3Status !== "verified" && (
                    <button
                      onClick={() => setShowTier3Verification(true)}
                      className="w-full py-2.5 bg-[#F59E0B] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                      Upgrade to Tier 3 <ArrowRight size={14} />
                    </button>
                  )}
                {tier.name === "Tier 3" && profile.tier3Status === "verified" && (
                  <button
                    onClick={() => setShowTier3Verification(true)}
                    className="w-full py-2.5 bg-amber-50 text-[#F59E0B] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors"
                  >
                    <CheckCircle size={14} /> Completed
                  </button>
                )}

                {tier.isLocked && (
                  <button
                    disabled
                    className="w-full py-2.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Lock size={13} /> Locked
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAi(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </button>

      {showAi && <AiAssistant onClose={() => setShowAi(false)} />}

      {showLimitsModal && (
        <TransactionLimitsModal
          dailyLimit={profile.dailyLimit}
          monthlyLimit={profile.monthlyLimit}
          maxBalance={profile.maxBalance}
          onClose={() => setShowLimitsModal(false)}
        />
      )}
    </>
  );
};

export default KYCTab;