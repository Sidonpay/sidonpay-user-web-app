// import { useEffect, useRef, useState } from "react";
// import {
//   ArrowLeft,
//   CheckCircle,
//   Clock,
//   ShieldCheck,
//   User,
//   MapPin,
//   FileText,
// } from "lucide-react";
// import { useUser } from "../../context/UserContext";
// import PersonalInfoStep from "./PersonalInfoStep";
// import AddressStep from "./AddressStep";
// import IdentityStep from "./IdentityStep";

// interface Tier1VerificationProps {
//   onBackToProfile: () => void;
// }

// const Tier1Verification: React.FC<Tier1VerificationProps> = ({ onBackToProfile }) => {
//   const { profile, startTier1Verification } = useUser();
//   const [celebrate, setCelebrate] = useState(false);
//   const prevStatusRef = useRef(profile.kycStatus);

//   useEffect(() => {
//     if (profile.kycStatus === "not_started") {
//       startTier1Verification();
//     }
//   }, []);

//   useEffect(() => {
//     if (prevStatusRef.current === "pending_review" && profile.kycStatus === "verified") {
//       setCelebrate(true);
//     }
//     prevStatusRef.current = profile.kycStatus;
//   }, [profile.kycStatus]);

//   const stepConfig = [
//     { key: "personalInfo", label: "Personal Info", icon: User },
//     { key: "address", label: "Address", icon: MapPin },
//     { key: "identity", label: "Identity", icon: FileText },
//   ] as const;

//   // Pending review
//   if (profile.kycStatus === "pending_review") {
//     return (
//       <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-8 sm:p-10 flex flex-col items-center text-center">
//         <button
//           onClick={onBackToProfile}
//           className="flex items-center gap-1.5 text-sm text-gray-500 self-start mb-6 hover:text-gray-700"
//         >
//           <ArrowLeft size={15} /> Back to Profile
//         </button>

//         <div className="flex items-center gap-2 mb-6">
//           <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
//             <Clock size={16} className="text-amber-500" />
//           </span>
//           <p className="text-sm font-bold text-gray-900">Tier 1 — Basic Verification</p>
//           <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
//             Pending Review
//           </span>
//         </div>

//         <span className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-5">
//           <Clock size={28} className="text-amber-500" />
//         </span>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">Under Review</h2>
//         <p className="text-sm text-gray-500 max-w-sm mb-5">
//           Your Tier 1 verification is being reviewed by our compliance team. This usually
//           takes 24–48 hours.
//         </p>

//         <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
//           <Clock size={13} /> Estimated review time: 24–48 hours
//         </span>

//         <button
//           onClick={onBackToProfile}
//           className="text-sm font-semibold text-[#1a6b3c] hover:underline"
//         >
//           ← Back to KYC Overview
//         </button>
//       </div>
//     );
//   }

//   // Celebration (one-time, right after approval)
//   if (profile.kycStatus === "verified" && celebrate) {
//     return (
//       <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-8 sm:p-10 flex flex-col items-center text-center">
//         <span className="w-16 h-16 rounded-full bg-[#EAF7EE] flex items-center justify-center mb-5">
//           <CheckCircle size={28} className="text-[#1a6b3c]" />
//         </span>

//         <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Complete</h2>
//         <p className="text-sm text-gray-500 max-w-sm mb-5">
//           Congratulations! Your Tier 1 verification has been approved. Your new limits are
//           now active.
//         </p>

//         <div className="border border-gray-100 rounded-xl px-6 py-4 mb-6 w-full max-w-xs">
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2 text-center">
//             New Limits
//           </p>
//           <div className="flex flex-col gap-1.5 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-500">Daily</span>
//               <span className="font-bold text-gray-900">{profile.dailyLimit}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Monthly</span>
//               <span className="font-bold text-gray-900">{profile.monthlyLimit}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Max Balance</span>
//               <span className="font-bold text-gray-900">{profile.maxBalance}</span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => setCelebrate(false)}
//           className="text-sm font-semibold text-[#1a6b3c] hover:underline"
//         >
//           ← Back to KYC Overview
//         </button>
//       </div>
//     );
//   }

//   // Persistent detailed verified card
//   if (profile.kycStatus === "verified") {
//     return (
//       <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
//         <div className="p-5 sm:p-7 pb-0">
//           <button
//             onClick={onBackToProfile}
//             className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
//           >
//             <ArrowLeft size={15} /> Back to Profile
//           </button>

//           <div className="flex items-center gap-2 mb-6">
//             <span className="w-8 h-8 rounded-full bg-[#EAF7EE] flex items-center justify-center">
//               <CheckCircle size={16} className="text-[#1a6b3c]" />
//             </span>
//             <p className="text-sm font-bold text-gray-900">Tier 1 — Basic Verification</p>
//             <span className="text-xs font-semibold text-[#1a6b3c] bg-[#EAF7EE] px-2.5 py-1 rounded-full">
//               Verified
//             </span>
//           </div>
//         </div>

//         <div className="mx-5 sm:mx-7 rounded-xl overflow-hidden border border-gray-100">
//           <div className="bg-[#1a6b3c] px-5 sm:px-6 py-5 flex items-center gap-3">
//             <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
//               <ShieldCheck size={18} className="text-white" />
//             </span>
//             <div>
//               <p className="text-base font-bold text-white">Tier 1 Verification</p>
//               <p className="text-xs text-white/80">
//                 Basic identity verification to unlock your wallet
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 px-5 sm:px-6 py-5 bg-white">
//             <div>
//               <p className="text-xs text-gray-400 mb-1">Daily Limit</p>
//               <p className="text-base font-bold text-gray-900">{profile.dailyLimit}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1">Monthly Limit</p>
//               <p className="text-base font-bold text-gray-900">{profile.monthlyLimit}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 mb-1">Max Balance</p>
//               <p className="text-base font-bold text-gray-900">{profile.maxBalance}</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 sm:px-7 py-5">
//           <div className="border border-gray-100 rounded-xl p-4">
//             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
//               Features Unlocked
//             </p>
//             <ul className="flex flex-col gap-2">
//               {["NGN Wallet", "Local transfers", "Bill payments", "Airtime & Data"].map((f) => (
//                 <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
//                   <CheckCircle size={14} className="text-[#1a6b3c] shrink-0" /> {f}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="border border-gray-100 rounded-xl p-4">
//             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
//               Requirements
//             </p>
//             <ul className="flex flex-col gap-2">
//               {["Personal information", "NIN (National Identification Number)", "Residential address"].map(
//                 (r) => (
//                   <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" /> {r}
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gray-100">
//           <div>
//             <p className="text-sm font-semibold text-gray-900">Verification complete!</p>
//             <p className="text-xs text-gray-400">You have full Tier 1 access.</p>
//           </div>
//           <span className="flex items-center gap-1 text-xs font-semibold text-[#1a6b3c] bg-[#EAF7EE] px-3 py-1.5 rounded-full shrink-0">
//             <CheckCircle size={13} /> Verified
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // Active form — Personal Info / Address / Identity
//   return (
//     <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-5 sm:p-7">
//       <button
//         onClick={onBackToProfile}
//         className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
//       >
//         <ArrowLeft size={15} /> Back to Profile
//       </button>

//       <div className="mb-6">
//         <h2 className="text-lg font-bold text-gray-900">Tier 1 Verification</h2>
//         <p className="text-sm text-gray-400">Complete all steps to verify your identity</p>
//       </div>

//       <div className="flex items-center mb-8 overflow-x-auto">
//         {stepConfig.map((step, i) => {
//           const isDone = profile.kycCompletedSteps.includes(step.key);
//           const isCurrent = step.key === profile.kycCurrentStep;
//           const Icon = step.icon;

//           return (
//             <div key={step.key} className="flex items-center flex-1 min-w-0 last:flex-none">
//               <div className="flex items-center gap-1.5 shrink-0">
//                 <span
//                   className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
//                     isDone
//                       ? "bg-[#1a6b3c] text-white"
//                       : isCurrent
//                       ? "bg-[#EAF7EE] text-[#1a6b3c]"
//                       : "bg-gray-100 text-gray-400"
//                   }`}
//                 >
//                   {isDone ? <CheckCircle size={13} /> : <Icon size={12} />}
//                 </span>
//                 <span
//                   className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
//                     isDone || isCurrent ? "text-gray-800" : "text-gray-400"
//                   }`}
//                 >
//                   {step.label}
//                 </span>
//               </div>
//               {i < stepConfig.length - 1 && (
//                 <div
//                   className={`h-0.5 flex-1 mx-2 sm:mx-3 min-w-[16px] ${
//                     isDone ? "bg-[#1a6b3c]" : "bg-gray-200"
//                   }`}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {profile.kycCurrentStep === "personalInfo" && <PersonalInfoStep />}
//       {profile.kycCurrentStep === "address" && <AddressStep />}
//       {profile.kycCurrentStep === "identity" && <IdentityStep />}
//     </div>
//   );
// };

// export default Tier1Verification;




import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  User,
  MapPin,
  FileText,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import PersonalInfoStep from "./PersonalInfoStep";
import AddressStep from "./AddressStep";
import IdentityStep from "./IdentityStep";

interface Tier1VerificationProps {
  onBackToProfile: () => void;
}

const Tier1Verification: React.FC<Tier1VerificationProps> = ({ onBackToProfile }) => {
  const { profile, startTier1Verification } = useUser();
  const [celebrate, setCelebrate] = useState(false);
  const prevStatusRef = useRef(profile.kycStatus);

  useEffect(() => {
    if (profile.kycStatus === "not_started") {
      startTier1Verification();
    }
  }, []);

  useEffect(() => {
    if (prevStatusRef.current === "pending_review" && profile.kycStatus === "verified") {
      setCelebrate(true);
      const timer = setTimeout(() => setCelebrate(false), 6000);
      return () => clearTimeout(timer);
    }
    prevStatusRef.current = profile.kycStatus;
  }, [profile.kycStatus]);

  const stepConfig = [
    { key: "personalInfo", label: "Personal Info", icon: User },
    { key: "address", label: "Address", icon: MapPin },
    { key: "identity", label: "Identity", icon: FileText },
  ] as const;

  // Pending review
  if (profile.kycStatus === "pending_review") {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-8 sm:p-10 flex flex-col items-center text-center">
        <button
          onClick={onBackToProfile}
          className="flex items-center gap-1.5 text-sm text-gray-500 self-start mb-6 hover:text-gray-700"
        >
          <ArrowLeft size={15} /> Back to Profile
        </button>

        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock size={16} className="text-amber-500" />
          </span>
          <p className="text-sm font-bold text-gray-900">Tier 1 — Basic Verification</p>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            Pending Review
          </span>
        </div>

        <span className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-5">
          <Clock size={28} className="text-amber-500" />
        </span>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Under Review</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-5">
          Your Tier 1 verification is being reviewed by our compliance team. This usually
          takes 24–48 hours.
        </p>

        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full mb-6">
          <Clock size={13} /> Estimated review time: 24–48 hours
        </span>

        <button
          onClick={onBackToProfile}
          className="text-sm font-semibold text-[#1a6b3c] hover:underline"
        >
          ← Back to KYC Overview
        </button>
      </div>
    );
  }

  // Celebration (one-time, right after approval)
  if (profile.kycStatus === "verified" && celebrate) {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-8 sm:p-10 flex flex-col items-center text-center">
        <span className="w-16 h-16 rounded-full bg-[#EAF7EE] flex items-center justify-center mb-5">
          <CheckCircle size={28} className="text-[#1a6b3c]" />
        </span>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Complete</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-5">
          Congratulations! Your Tier 1 verification has been approved. Your new limits are
          now active.
        </p>

        <div className="border border-gray-100 rounded-xl px-6 py-4 mb-6 w-full max-w-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2 text-center">
            New Limits
          </p>
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Daily</span>
              <span className="font-bold text-gray-900">{profile.dailyLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Monthly</span>
              <span className="font-bold text-gray-900">{profile.monthlyLimit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Max Balance</span>
              <span className="font-bold text-gray-900">{profile.maxBalance}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onBackToProfile}
          className="text-sm font-semibold text-[#1a6b3c] hover:underline"
        >
          ← Back to KYC Overview
        </button>
      </div>
    );
  }

  // Persistent detailed verified card
  if (profile.kycStatus === "verified") {
    return (
      <div className="border border-gray-100 rounded-2xl shadow-sm bg-white overflow-hidden">
        <div className="p-5 sm:p-7 pb-0">
          <button
            onClick={onBackToProfile}
            className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
          >
            <ArrowLeft size={15} /> Back to Profile
          </button>

          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#EAF7EE] flex items-center justify-center">
              <CheckCircle size={16} className="text-[#1a6b3c]" />
            </span>
            <p className="text-sm font-bold text-gray-900">Tier 1 — Basic Verification</p>
            <span className="text-xs font-semibold text-[#1a6b3c] bg-[#EAF7EE] px-2.5 py-1 rounded-full">
              Verified
            </span>
          </div>
        </div>

        <div className="mx-5 sm:mx-7 rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-[#1a6b3c] px-5 sm:px-6 py-5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </span>
            <div>
              <p className="text-base font-bold text-white">Tier 1 Verification</p>
              <p className="text-xs text-white/80">
                Basic identity verification to unlock your wallet
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 sm:px-6 py-5 bg-white">
            <div>
              <p className="text-xs text-gray-400 mb-1">Daily Limit</p>
              <p className="text-base font-bold text-gray-900">{profile.dailyLimit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Monthly Limit</p>
              <p className="text-base font-bold text-gray-900">{profile.monthlyLimit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Max Balance</p>
              <p className="text-base font-bold text-gray-900">{profile.maxBalance}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 sm:px-7 py-5">
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
              Features Unlocked
            </p>
            <ul className="flex flex-col gap-2">
              {["NGN Wallet", "Local transfers", "Bill payments", "Airtime & Data"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-[#1a6b3c] shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
              Requirements
            </p>
            <ul className="flex flex-col gap-2">
              {["Personal information", "NIN (National Identification Number)", "Residential address"].map(
                (r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" /> {r}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-900">Verification complete!</p>
            <p className="text-xs text-gray-400">You have full Tier 1 access.</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#1a6b3c] bg-[#EAF7EE] px-3 py-1.5 rounded-full shrink-0">
            <CheckCircle size={13} /> Verified
          </span>
        </div>
      </div>
    );
  }

  // Active form — Personal Info / Address / Identity
  return (
    <div className="border border-gray-100 rounded-2xl shadow-sm bg-white p-5 sm:p-7">
      <button
        onClick={onBackToProfile}
        className="flex items-center gap-1.5 text-sm text-gray-500 mb-5 hover:text-gray-700"
      >
        <ArrowLeft size={15} /> Back to Profile
      </button>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Tier 1 Verification</h2>
        <p className="text-sm text-gray-400">Complete all steps to verify your identity</p>
      </div>

      <div className="flex items-center mb-8 overflow-x-auto">
        {stepConfig.map((step, i) => {
          const isDone = profile.kycCompletedSteps.includes(step.key);
          const isCurrent = step.key === profile.kycCurrentStep;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex items-center flex-1 min-w-0 last:flex-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isDone
                      ? "bg-[#1a6b3c] text-white"
                      : isCurrent
                      ? "bg-[#EAF7EE] text-[#1a6b3c]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? <CheckCircle size={13} /> : <Icon size={12} />}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                    isDone || isCurrent ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < stepConfig.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 sm:mx-3 min-w-[16px] ${
                    isDone ? "bg-[#1a6b3c]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {profile.kycCurrentStep === "personalInfo" && <PersonalInfoStep />}
      {profile.kycCurrentStep === "address" && <AddressStep />}
      {profile.kycCurrentStep === "identity" && <IdentityStep />}
    </div>
  );
};

export default Tier1Verification;