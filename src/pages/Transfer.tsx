import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import TransferSidonpay from "./TransferSidonpay";
import TransferLocalBank from "./TransferLocalBank";

const Transfer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sidonpay" | "localbank">("sidonpay");
  const [showTeamMembers, setShowTeamMembers] = useState<boolean>(true);

  return (
    <DashboardLayout userName="Kolawole" showTeamMembers={showTeamMembers}>
      <div className="max-w-2xl mx-auto">

        {/* Page Title */}
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
            onClick={() => setActiveTab("sidonpay")}
            className={`pb-3 px-4 text-sm font-medium transition ${
              activeTab === "sidonpay"
                ? "text-[#2D7A51] border-b-2 border-[#2D7A51]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            To Sidonpay user
          </button>
          <button
            onClick={() => setActiveTab("localbank")}
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
          <TransferSidonpay onStepChange={(step) => setShowTeamMembers(step === "recipient")} />
        ) : (
          <TransferLocalBank />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transfer;