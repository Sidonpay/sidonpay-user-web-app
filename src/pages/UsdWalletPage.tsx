import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, ArrowLeftRight, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagUSD from "../assets/flag-usd.png";
import TransactionLimitBar from "../components/wallet/TransactionLimitBar";
import FxRateCard from "../components/wallet/FxRateCard";
import TransactionHistory from "../components/wallet/TransactionHistory";
import { useWallet } from "../context/WalletContext";
import AiAssistant from "../components/AiAssistant";

const fxRate = {
  pair: "USD → NGN",
  rate: 1351.59,
  changeValue: -3.39,
  changePercent: -0.25,
  updatedAt: "00:01",
};

const UsdWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showAi, setShowAi] = useState<boolean>(false);
  const { usdBalance, usdTransactions } = useWallet();
  const transactions = usdTransactions;

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="USD Wallet"
    >
      {/* Welcome header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your wallets and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="border-2 border-gray-200 rounded-xl p-5 mb-6">
        <img src={FlagUSD} alt="USD" className="w-10 h-10 rounded-full object-cover mb-3" />
        <p className="text-xs text-gray-400 mb-1">Available Balance</p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-2xl font-bold text-[#2D7A51]">
            {showBalance
              ? `$${usdBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : "$••••••"}
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
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
        <button
          onClick={() => navigate("/add-money-usd")}
          className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-[#E0F3E9] flex items-center justify-center">
            <Plus size={16} className="text-[#2D7A51]" />
          </span>
          Add Money
        </button>
        <button
          onClick={() => navigate("/convert")}
          className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-[#E0F3E9] flex items-center justify-center">
            <ArrowLeftRight size={16} className="text-[#2D7A51]" />
          </span>
          Convert
        </button>
      </div>

      {/* Transaction Limit */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide">
          Transaction Limit
        </p>
        <TransactionLimitBar
          label="Daily Transfer"
          used={100000}
          limit={10000000}
          currency="USD"
        />
        <TransactionLimitBar
          label="Per Transaction"
          used={300000}
          limit={1000000}
          currency="USD"
        />
      </div>

      <FxRateCard {...fxRate} />

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

export default UsdWalletPage;