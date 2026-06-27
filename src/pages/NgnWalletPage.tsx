import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, ArrowLeftRight, FileText, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagNGN from "../assets/flag-ngn.png";
import TransactionLimitBar from "../components/wallet/TransactionLimitBar";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletActionButton from "../components/wallet/WalletActionButton";
import type { Transaction, WalletData } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

// generate dates relative to today
const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

// Mock data
const mockNgnWallet: WalletData = {
  currency: "NGN",
  flagSrc: FlagNGN,
  balance: 20000000.0,
  cardNumber: "5432****8901",
  dailyTransferUsed: 100000,
  dailyTransferLimit: 10000000,
  perTransactionUsed: 300000,
  perTransactionLimit: 1000000,
  fxRate: {
    pair: "USD → NGN",
    rate: 1351.59,
    changeValue: -3.39,
    changePercent: -0.25,
    updatedAt: "00:01",
  },
};

const mockNgnTransactions: Transaction[] = [
  {
    id: "1", txnId: "TXN-99283746", description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "2", txnId: "TXN-99283746", description: "From Uzumaki Naruto", subLabel: "Transfer · Wema ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 80000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "3", txnId: "TXN-99283746", description: "From Gojo Satoru", subLabel: "Transfer · Opay ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 800000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "4", txnId: "TXN-99283746", description: "From Uchiha Madara", subLabel: "Transfer · Opay ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 800000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "5", txnId: "TXN-99287166", description: "DSTV Premium", subLabel: "Bill · 089766",
    date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Reversed",
    amount: 30000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "6", txnId: "TXN-99283746", description: "USD to NGN", subLabel: "FX · Conversion",
    date: daysAgo(4), displayDate: daysAgo(4), type: "fx", status: "Successful",
    amount: 250000.00, currency: "NGN", subAmount: -250.00, subCurrency: "USD",
  },
  {
    id: "7", txnId: "TXN-89766", description: "IKEDC Electricity", subLabel: "Bill · Meter 047312589",
    date: daysAgo(5), displayDate: daysAgo(5), type: "debit", status: "Pending",
    amount: -50000.00, currency: "NGN", subAmount: -100.00, subCurrency: "NGN",
  },
  {
    id: "8", txnId: "TXN-99283746", description: "IKEDC Electricity", subLabel: "Bill · Meter 578744545",
    date: daysAgo(6), displayDate: daysAgo(6), type: "debit", status: "Failed",
    amount: -12000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "9", txnId: "TXN-99283746", description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(7), displayDate: daysAgo(7), type: "funding", status: "Failed",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
];

const NgnWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showAi, setShowAi] = useState<boolean>(false);

  // In a real integration, these would come from a hook like useWallet("NGN")
  const wallet = mockNgnWallet;
  const transactions = useMemo(() => mockNgnTransactions, []);

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
        <img src={wallet.flagSrc} alt={wallet.currency} className="w-10 h-10 rounded-full object-cover mb-3" />
        <p className="text-xs text-gray-400 mb-1">Available Balance</p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-2xl font-bold text-[#2D7A51]">
            {showBalance
              ? `₦${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
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
        <p className="text-xs text-[#2D7A51] font-medium">{wallet.cardNumber}</p>
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
          used={wallet.dailyTransferUsed}
          limit={wallet.dailyTransferLimit}
          currency="NGN"
        />
        <TransactionLimitBar
          label="Per Transaction"
          used={wallet.perTransactionUsed}
          limit={wallet.perTransactionLimit}
          currency="NGN"
        />
      </div>

      {/* Transaction History */}
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