import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type KYCStatus =
  | "not_started"
  | "in_progress"
  | "pending_review"
  | "verified"
  | "rejected";

interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  residentialAddress: string;
  city: string;
  state: string;
  lga: string;
  country: string;
  nin: string;
  tier: string;
  dailyLimit: string;
  monthlyLimit: string;
  maxBalance: string;
  avatarUrl: string | null;
  joinedDate: string;
  kycStatus: KYCStatus;
  kycCurrentStep: "personalInfo" | "address" | "identity";
  kycCompletedSteps: string[];
  bvn: string;
  utilityBillFile: string | null;
  passportPhotoFile: string | null;
  tier2Status: KYCStatus;
  tier2CurrentStep: "bvn" | "documents";
  tier2CompletedSteps: string[];
  tier3Status: KYCStatus;
  tier3CurrentStep: "positionFace" | "blink" | "turnHead";
  tier3CompletedSteps: string[];
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  setAvatar: (dataUrl: string) => void;
  setKYCStep: (step: UserProfile["kycCurrentStep"]) => void;
  markStepComplete: (step: string) => void;
  submitTier1Verification: () => void;
  startTier1Verification: () => void;
  resetKYC: () => void;
  setTier2Step: (step: UserProfile["tier2CurrentStep"]) => void;
  markTier2StepComplete: (step: string) => void;
  setUtilityBill: (fileName: string | null) => void;
  setPassportPhoto: (fileName: string | null) => void;
  submitTier2Verification: () => void;
  startTier2Verification: () => void;
  startTier3Verification: () => void;
  setTier3Step: (step: UserProfile["tier3CurrentStep"]) => void;
  markTier3StepComplete: (step: string) => void;
  submitTier3Verification: () => void;
}

const STORAGE_KEY = "sidonpay_user_profile";

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  residentialAddress: "",
  city: "",
  state: "",
  lga: "",
  country: "Nigeria",
  nin: "",
  tier: "Tier 0",
  dailyLimit: "₦0",
  monthlyLimit: "₦0",
  maxBalance: "₦0",
  avatarUrl: null,
  joinedDate: new Date().toISOString(),
  kycStatus: "not_started",
  kycCurrentStep: "personalInfo",
  kycCompletedSteps: [],
  bvn: "",
  utilityBillFile: null,
  passportPhotoFile: null,
  tier2Status: "not_started",
  tier2CurrentStep: "bvn",
  tier2CompletedSteps: [],
  tier3Status: "not_started",
  tier3CurrentStep: "positionFace",
  tier3CompletedSteps: [],
};

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

const UserContext = createContext<UserContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
  setAvatar: () => {},
  setKYCStep: () => {},
  markStepComplete: () => {},
  submitTier1Verification: () => {},
  startTier1Verification: () => {},
  resetKYC: () => {},
  setTier2Step: () => {},
  markTier2StepComplete: () => {},
  setUtilityBill: () => {},
  setPassportPhoto: () => {},
  submitTier2Verification: () => {},
  startTier2Verification: () => {},
  startTier3Verification: () => {},
  setTier3Step: () => {},
  markTier3StepComplete: () => {},
  submitTier3Verification: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
      kycStatus:
        prev.kycStatus === "not_started" ? "in_progress" : prev.kycStatus,
    }));
  };

  const setAvatar = (dataUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: dataUrl }));
  };

  const setKYCStep = (step: UserProfile["kycCurrentStep"]) => {
    setProfile((prev) => ({ ...prev, kycCurrentStep: step }));
  };

  const markStepComplete = (step: string) => {
    setProfile((prev) => ({
      ...prev,
      kycCompletedSteps: prev.kycCompletedSteps.includes(step)
        ? prev.kycCompletedSteps
        : [...prev.kycCompletedSteps, step],
    }));
  };

  const startTier1Verification = () => {
    setProfile((prev) =>
      prev.kycStatus === "not_started" ? { ...prev, kycStatus: "in_progress" } : prev
    );
  };

  const submitTier1Verification = () => {
    setProfile((prev) => ({ ...prev, kycStatus: "pending_review" }));
    setTimeout(() => {
      setProfile((prev) =>
        prev.kycStatus === "pending_review"
          ? {
              ...prev,
              kycStatus: "verified",
              tier: "Tier 1",
              dailyLimit: "₦200,000",
              monthlyLimit: "₦5,000,000",
              maxBalance: "₦500,000",
            }
          : prev
      );
    }, 8000);
  };

  const resetKYC = () => {
    setProfile((prev) => ({
      ...prev,
      kycStatus: "not_started",
      kycCurrentStep: "personalInfo",
      kycCompletedSteps: [],
    }));
  };

  const setTier2Step = (step: UserProfile["tier2CurrentStep"]) => {
    setProfile((prev) => ({ ...prev, tier2CurrentStep: step }));
  };

  const markTier2StepComplete = (step: string) => {
    setProfile((prev) => ({
      ...prev,
      tier2CompletedSteps: prev.tier2CompletedSteps.includes(step)
        ? prev.tier2CompletedSteps
        : [...prev.tier2CompletedSteps, step],
    }));
  };

  const setUtilityBill = (fileName: string | null) => {
    setProfile((prev) => ({ ...prev, utilityBillFile: fileName }));
  };

  const setPassportPhoto = (fileName: string | null) => {
    setProfile((prev) => ({ ...prev, passportPhotoFile: fileName }));
  };

  const startTier2Verification = () => {
    setProfile((prev) =>
      prev.tier2Status === "not_started" ? { ...prev, tier2Status: "in_progress" } : prev
    );
  };

  const submitTier2Verification = () => {
    setProfile((prev) => ({ ...prev, tier2Status: "pending_review" }));

    setTimeout(() => {
      setProfile((prev) =>
        prev.tier2Status === "pending_review"
          ? {
              ...prev,
              tier2Status: "verified",
              tier: "Tier 2",
              dailyLimit: "₦2,000,000",
              monthlyLimit: "₦20,000,000",
              maxBalance: "₦5,000,000",
            }
          : prev
      );
    }, 8000);
  };

  const startTier3Verification = () => {
    setProfile((prev) =>
      prev.tier3Status === "not_started" ? { ...prev, tier3Status: "in_progress" } : prev
    );
  };

  const setTier3Step = (step: UserProfile["tier3CurrentStep"]) => {
    setProfile((prev) => ({ ...prev, tier3CurrentStep: step }));
  };

  const markTier3StepComplete = (step: string) => {
    setProfile((prev) => ({
      ...prev,
      tier3CompletedSteps: prev.tier3CompletedSteps.includes(step)
        ? prev.tier3CompletedSteps
        : [...prev.tier3CompletedSteps, step],
    }));
  };

  const submitTier3Verification = () => {
    setProfile((prev) => ({
      ...prev,
      tier3Status: "verified",
      tier: "Tier 3",
      dailyLimit: "₦10,000,000",
      monthlyLimit: "₦100,000,000",
      maxBalance: "₦50,000,000",
    }));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        setAvatar,
        setKYCStep,
        markStepComplete,
        submitTier1Verification,
        startTier1Verification,
        resetKYC,
        setTier2Step,
        markTier2StepComplete,
        setUtilityBill,
        setPassportPhoto,
        submitTier2Verification,
        startTier2Verification,
        startTier3Verification,
        setTier3Step,
        markTier3StepComplete,
        submitTier3Verification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);