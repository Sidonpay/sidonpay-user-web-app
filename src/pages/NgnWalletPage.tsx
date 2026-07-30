import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, ArrowLeftRight, FileText, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagNGN from "../assets/flag-ngn.png";
import TransactionLimitBar from "../components/wallet/TransactionLimitBar";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletActionButton from "../components/wallet/WalletActionButton";
import { useWallet } from "../context/WalletContext";
import AiAssistant from "../components/AiAssistant";

const NgnWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showAi, setShowAi] = useState<boolean>(false);

  const { ngnBalance, ngnTransactions, getDailyOutgoingTotal } = useWallet();
  const transactions = ngnTransactions;
  const dailyUsed = getDailyOutgoingTotal("NGN");

  const actionButtons = [
    { icon: Plus, label: "Add Money", onClick: () => navigate("/add-money") },
    { icon: Send, label: "Send Money", onClick: () => navigate("/transfer") },
    { icon: ArrowLeftRight, label: "Convert", onClick: () => navigate("/convert") },
    { icon: FileText, label: "Pay Bills", onClick: () => navigate("/bill-payments") },
  ];

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="NGN Wallet"
    >
      {/* Welcome header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your wallets and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="border-2 border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <img src={FlagNGN} alt="NGN" className="w-10 h-10 rounded-full object-cover mb-3" />
        <p className="text-xs text-gray-400 mb-1">Available Balance</p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-2xl font-bold text-[#2D7A51]">
            {showBalance
              ? `₦${ngnBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : "₦••••••••"}
          </p>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <Eye className="w-4 h-4 text-[#2D7A51]" />
            ) : (
              <EyeOff className="w-4 h-4 text-[#2D7A51]" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400">Card Number</p>
        <p className="text-xs text-[#2D7A51] font-medium">5432****8901</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-5xl">
        {actionButtons.map((action) => (
          <WalletActionButton key={action.label} {...action} />
        ))}
      </div>

      {/* Transaction Limit */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
          Transaction Limit
        </p>
        <TransactionLimitBar
          label="Daily Transfer"
          used={dailyUsed}
          limit={10000000}
          currency="NGN"
        />
        <TransactionLimitBar
          label="Per Transaction"
          used={0}
          limit={1000000}
          currency="NGN"
        />
      </div>

      <TransactionHistory transactions={transactions} />

      {/* Floating AI Assistant button */}
      <button
        onClick={() => setShowAi(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </button>
      {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
    </DashboardLayout>
  );
};

export default NgnWalletPage;