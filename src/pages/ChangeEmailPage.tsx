import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import VerifyEmailModal from "../components/VerifyEmailModal";
import DashboardLayout from "../components/DashboardLayout";
import AiAssistant from "../components/AiAssistant";
import { MessageCircle } from "lucide-react";

type Method = "sms" | "email";

const ChangeEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentEmail = location.state?.currentEmail || "";

  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAi, setShowAi] = useState<boolean>(false);

  const handleSelect = (method: Method) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleVerified = () => {
    setShowModal(false);
    navigate("/dashboard/account", { state: { emailVerified: true } });
  };

  const options = [
    {
      key: "sms" as Method,
      title: "With Text",
      subtitle: "Receive a code via SMS",
    },
    {
      key: "email" as Method,
      title: "With Email",
      subtitle: "We will send a mail to your current email address",
    },
  ];

  return (
    <DashboardLayout userName="Kolawole">
    <div className="p-4 sm:p-8 w-full max-w-2xl mx-auto">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900">
          Change Email address
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
          To change your email address, you'll need to verify with a
          verification code
        </p>
      </div>

      {/* Method selection */}
      <p className="text-sm font-semibold text-gray-700 mb-3">
        Choose how you want to receive this code
      </p>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedMethod === option.key;
          return (
            <button
              key={option.key}
              onClick={() => handleSelect(option.key)}
              className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl border transition-all duration-200 text-left ${
                isSelected
                  ? "bg-[#1a6b3c] border-[#1a6b3c]"
                  : "bg-[#eaf5ee] border-[#c5e0ce] hover:bg-[#daf0e3]"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {option.title}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isSelected ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {option.subtitle}
                </p>
              </div>
              <ChevronRight
                size={18}
                className={isSelected ? "text-white" : "text-gray-400"}
              />
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedMethod && (
        <VerifyEmailModal
          method={selectedMethod}
          currentEmail={currentEmail}
          onClose={() => {
            setShowModal(false);
            setSelectedMethod(null);
          }}
          onVerified={handleVerified}
        />
      )}

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

export default ChangeEmailPage;