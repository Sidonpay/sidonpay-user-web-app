import { useState } from "react";
import { MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import TransferSidonpay from "./TransferSidonpay";
import TransferLocalBank from "./TransferLocalBank";
import WithPinCheck from "../components/withPinCheck";
import AiAssistant from "../components/AiAssistant";

type Step = "recipient" | "amount";

const Transfer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sidonpay" | "localbank">("sidonpay");
  const [showSelectBeneficiary, setShowSelectBeneficiary] = useState<boolean>(true);
  const [showAi, setShowAi] = useState<boolean>(false);

  const handleStepChange = (step: Step) => {
    setShowSelectBeneficiary(step === "recipient" && activeTab === "sidonpay");
  };

  return (
    <WithPinCheck>
      <DashboardLayout userName="Kolawole" showSelectBeneficiary={showSelectBeneficiary}>
        <div className="max-w-2xl mx-auto">

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Transfer Money
          </h2>

          {/* Wallet Balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#E0F3E9] rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Available Balance</p>
              <p className="text-sm font-semibold text-gray-800">NGN 7,265,000</p>
              <p className="text-xs text-gray-400 mt-1">From your primary wallet</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Available Balance</p>
              <p className="text-sm font-semibold text-gray-800">USD 3,671,000</p>
              <p className="text-xs text-green-600 mt-1 cursor-pointer hover:underline">
                Convert to NGN
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => {
                setActiveTab("sidonpay");
                setShowSelectBeneficiary(true);
              }}
              className={`pb-3 px-4 text-sm font-medium transition ${
                activeTab === "sidonpay"
                  ? "text-[#2D7A51] border-b-2 border-[#2D7A51]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              To Sidonpay user
            </button>
            <button
              onClick={() => {
                setActiveTab("localbank");
                setShowSelectBeneficiary(false);
              }}
              className={`pb-3 px-4 text-sm font-medium transition ${
                activeTab === "localbank"
                  ? "text-[#2D7A51] border-b-2 border-[#2D7A51]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              To bank account
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "sidonpay" ? (
            <TransferSidonpay onStepChange={handleStepChange} />
          ) : (
            <TransferLocalBank onStepChange={handleStepChange} />
          )}
        </div>

        {/* Floating AI Assistant button */}
        <button
          onClick={() => setShowAi(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>

        {/* AI Assistant overlay */}
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      </DashboardLayout>
    </WithPinCheck>
  );
};

export default Transfer;