import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronRight, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagNGN from "../assets/flag-ngn.png";
import FlagUSD from "../assets/flag-usd.png";
import TransactionRow from "../components/wallet/TransactionRow";
import type { Transaction, Currency } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

// generate dates relative to today
const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

// Mock wallet summaries
const ngnWalletSummary = {
  currency: "NGN" as Currency,
  flagSrc: FlagNGN,
  balance: 20000000.0,
  cardNumber: "5432****8901",
};

const usdWalletSummary = {
  currency: "USD" as Currency,
  flagSrc: FlagUSD,
  balance: 1847.50,
  cardNumber: "5432****8901",
};

// Mock combined transactions
const mockAllTransactions: Transaction[] = [
  {
    id: "1", txnId: "TXN-99283746", description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "2", txnId: "TXN-99283746", description: "To Adaeze Ekon", subLabel: "Transfer · Visa ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "debit", status: "Failed",
    amount: -175.00, currency: "USD", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "3", txnId: "TXN-99283746", description: "From Tunde Silas", subLabel: "Transfer · Opay ***4421",
    date: daysAgo(2), displayDate: daysAgo(2), type: "credit", status: "Successful",
    amount: 80000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "4", txnId: "TXN-99283746", description: "Netflix Subscription", subLabel: "Bill · Meter 047312589",
    date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Pending",
    amount: -55.00, currency: "USD", subAmount: -100.00, subCurrency: "NGN",
  },
  {
    id: "5", txnId: "TXN-99283746", description: "DSTV Premium", subLabel: "Bill · 089766",
    date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Reversed",
    amount: 30000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "6", txnId: "TXN-99283746", description: "NGN to USD", subLabel: "FX · Conversion",
    date: daysAgo(4), displayDate: daysAgo(4), type: "fx", status: "Successful",
    amount: -250000.00, currency: "NGN", subAmount: -250.00, subCurrency: "NGN",
  },
  {
    id: "7", txnId: "TXN-99283746", description: "IKEDC Electricity", subLabel: "Bill · Meter 578744545",
    date: daysAgo(6), displayDate: daysAgo(6), type: "debit", status: "Failed",
    amount: -12000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "8", txnId: "TXN-99283746", description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(7), displayDate: daysAgo(7), type: "funding", status: "Failed",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
];

type WalletFilter = "all" | "NGN" | "USD";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNGN, setShowNGN] = useState<boolean>(true);
  const [showUSD, setShowUSD] = useState<boolean>(true);
  const [showAi, setShowAi] = useState<boolean>(false);
  const [activeWallet, setActiveWallet] = useState<WalletFilter>("all");
  const visibleTransactions = useMemo(() => {
    if (activeWallet === "all") return mockAllTransactions;
    return mockAllTransactions.filter((tx) => tx.currency === activeWallet);
  }, [activeWallet]);

  return (
    <DashboardLayout userName="Freya">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your wallets and transactions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setActiveWallet(activeWallet === "NGN" ? "all" : "NGN")}
          className={`text-left border-2 rounded-xl p-4 transition-colors ${
            activeWallet === "NGN" ? "border-[#2D7A51]" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <img src={ngnWalletSummary.flagSrc} alt="NGN" className="w-10 h-10 rounded-full object-cover mb-3" />
          <p className="text-xs text-gray-400 mb-1">Available Balance</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-[#2D7A51]">
              {showNGN
                ? `₦${ngnWalletSummary.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : "₦••••••••"}
            </p>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowNGN(!showNGN);
              }}
            >
              {showNGN ? (
                <Eye className="w-4 h-4 text-[#2D7A51]" />
              ) : (
                <EyeOff className="w-4 h-4 text-[#2D7A51]" />
              )}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-gray-400">Card Number</p>
              <p className="text-xs text-[#2D7A51] font-medium">{ngnWalletSummary.cardNumber}</p>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate("/ngn-wallet");
              }}
              className="flex items-center gap-0.5 text-xs text-[#2D7A51] hover:underline font-medium"
            >
              View <ChevronRight size={14} />
            </span>
          </div>
        </button>

        {/* USD Wallet */}
        <button
          onClick={() => setActiveWallet(activeWallet === "USD" ? "all" : "USD")}
          className={`text-left border-2 rounded-xl p-4 transition-colors ${
            activeWallet === "USD" ? "border-[#2D7A51]" : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <img src={usdWalletSummary.flagSrc} alt="USD" className="w-10 h-10 rounded-full object-cover mb-3" />
          <p className="text-xs text-gray-400 mb-1">Available Balance</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-[#2D7A51]">
              {showUSD
                ? `$${usdWalletSummary.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : "$••••••"}
            </p>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowUSD(!showUSD);
              }}
            >
              {showUSD ? (
                <Eye className="w-4 h-4 text-[#2D7A51]" />
              ) : (
                <EyeOff className="w-4 h-4 text-[#2D7A51]" />
              )}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-gray-400">Card Number</p>
              <p className="text-xs text-[#2D7A51] font-medium">{usdWalletSummary.cardNumber}</p>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate("/usd-wallet");
              }}
              className="flex items-center gap-0.5 text-xs text-[#2D7A51] hover:underline font-medium"
            >
              View <ChevronRight size={14} />
            </span>
          </div>
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-gray-800">Recent Transactions</p>
          <span
            onClick={() => navigate("/transactions")}
            className="text-xs text-[#2D7A51] cursor-pointer hover:underline font-medium"
          >
            View all
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {visibleTransactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      </div>

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

export default Dashboard;