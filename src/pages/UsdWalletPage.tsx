import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeftRight, ArrowDownToLine, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagUSD from "../assets/flag-usd.png";
import TransactionHistory from "../components/wallet/TransactionHistory";
import UsdBankDetailsCard from "../components/wallet/UsdBankDetailsCard";
import ConversionSidePanel from "../components/wallet/ConversionSidePanel";
import ReceiveOnlyBanner from "../components/wallet/ReceiveOnlyBanner";
import { useWallet } from "../context/WalletContext";
import AiAssistant from "../components/AiAssistant";

const UsdWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showAi, setShowAi] = useState<boolean>(false);

  const {
    usdBalance,
    ngnBalance,
    usdTransactions,
    usdBankDetails,
    liveRate,
  } = useWallet();

  const ngnEquivalent = usdBalance * liveRate.usdToNgn;

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
      <div className="border-2 border-gray-200 rounded-xl p-5 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <img src={FlagUSD} alt="USD" className="w-10 h-10 rounded-full object-cover" />
          <span className="flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            Active
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-1">Available Balance</p>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-2xl font-bold text-[#2D7A51]">
            {showBalance
              ? `$${usdBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : "$••••••"}
          </p>
          <span className="text-xs font-semibold text-gray-400">USD</span>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <Eye className="w-4 h-4 text-[#2D7A51]" />
            ) : (
              <EyeOff className="w-4 h-4 text-[#2D7A51]" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          ≈ ₦{ngnEquivalent.toLocaleString(undefined, { minimumFractionDigits: 0 })} at
          today's rate
        </p>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <button
            onClick={() => navigate("/convert")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-5 py-3 hover:bg-green-700 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Convert to NGN
          </button>
          <button
            onClick={() => navigate("/add-money-usd")}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl px-5 py-3 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Add Money
          </button>
        </div>
      </div>
      <div className="mb-6">
        <ReceiveOnlyBanner />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 mb-6">
        <UsdBankDetailsCard details={usdBankDetails} />
        <ConversionSidePanel
          ngnBalance={ngnBalance}
          liveRate={liveRate}
          onConvert={() => navigate("/convert")}
        />
      </div>

      <TransactionHistory transactions={usdTransactions} />
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