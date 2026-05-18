import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import PersonalInfoTab from "../components/PersonalInfoTab";
import KYCTab from "../pages/KYCTab";
import SecurityTab from "../components/SecurityTab";
import DashboardLayout from "../components/DashboardLayout";
import AiAssistant from "../components/AiAssistant";
import { MessageCircle } from "lucide-react";

type AccountTab = "personal" | "kyc" | "security";

const AccountPage = () => {
    const location = useLocation();
    const defaultTab = location.state?.activeTab ?? "personal";
    const emailVerified = location.state?.emailVerified ?? false;
    const [activeTab, setActiveTab] = useState<AccountTab>(defaultTab);
    const [showAi, setShowAi] = useState<boolean>(false);

  const tabs: { key: AccountTab; label: string }[] = [
    { key: "personal", label: "Personal Information" },
    { key: "kyc", label: "KYC" },
    { key: "security", label: "Security" },
  ];

  return (
    <DashboardLayout userName="Kolawole" showSelectBeneficiary={activeTab === "security"}>
    <div className="p-4 sm:p-6 w-full max-w-3xl mx-auto">

      <ProfileHeader />

      {/* Tab bar */}
      <div className="mt-8 flex items-center w-full bg-white border border-gray-200 rounded-full overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 text-center ${
              activeTab === tab.key
                ? "bg-[#1a6b3c] text-white rounded-full mx-1 my-1"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "personal" && (
        <PersonalInfoTab emailVerified={emailVerified}/>
        )}
        {activeTab === "kyc" && <KYCTab />}
        {activeTab === "security" && <SecurityTab />}
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
      </DashboardLayout>
  );
};

export default AccountPage;