
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, ArrowLeftRight, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagUSD from "../assets/flag-usd.png";
import TransactionLimitBar from "../components/wallet/TransactionLimitBar";
import FxRateCard from "../components/wallet/FxRateCard";
import TransactionHistory from "../components/wallet/TransactionHistory";
import type { Transaction, WalletData } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

// Mock data
const mockUsdWallet: WalletData = {
  currency: "USD",
  flagSrc: FlagUSD,
  balance: 0.0,
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

const daysAgo = (n: number): string => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split("T")[0];
  };

  const mockUsdTransactions: Transaction[] = [
    {
      id: "1", txnId: "TXN-99288986", description: "Stripe payout", subLabel: "Funding · Stripe ***2323",
      date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
      amount: 28280.50, currency: "USD", subAmount: -140, subCurrency: "USD",
    },
    {
      id: "2", txnId: "TXN-99283742", description: "Payoneer transfer", subLabel: "Funding · Wire transfer",
      date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
      amount: 9875.00, currency: "USD", subAmount: -90, subCurrency: "USD",
    },
    {
      id: "3", txnId: "TXN-99283746", description: "NGN → USD via Flutterwave", subLabel: "FX · Flutterwave",
      date: daysAgo(2), displayDate: daysAgo(2), type: "fx", status: "Successful",
      amount: 14280.50, currency: "USD", subAmount: -100, subCurrency: "USD",
    },
    {
      id: "4", txnId: "TXN-9907096", description: "Plaid ACH pull", subLabel: "Funding · JPMorgan",
      date: daysAgo(4), displayDate: daysAgo(4), type: "funding", status: "Successful",
      amount: 20000.00, currency: "USD", subAmount: -100000, subCurrency: "NGN",
    },
    {
      id: "5", txnId: "TXN-9909746", description: "Coinbase USD wallet", subLabel: "Transfer · Coinbase",
      date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Pending",
      amount: -30000.00, currency: "USD",
    },
    {
      id: "6", txnId: "TXN-99281116", description: "Slack subscription", subLabel: "Bill · 08971111",
      date: daysAgo(5), displayDate: daysAgo(5), type: "credit", status: "Reversed",
      amount: 87.50, currency: "USD",
    },
    {
      id: "7", txnId: "TXN-99283226", description: "NGN + USD via Revolut", subLabel: "FX · Revolut ***456",
      date: daysAgo(5), displayDate: daysAgo(5), type: "fx", status: "Successful",
      amount: 12000.00, currency: "USD", subAmount: -36, subCurrency: "USD",
    },
    {
      id: "8", txnId: "TXN-99283111", description: "Google Workspace", subLabel: "Bill · Annual 57874545",
      date: daysAgo(6), displayDate: daysAgo(6), type: "debit", status: "Failed",
      amount: -336.00, currency: "USD",
    },
    {
      id: "9", txnId: "TXN-99286675", description: "Mercury inbound", subLabel: "Funding · Mercury ***00",
      date: daysAgo(7), displayDate: daysAgo(7), type: "funding", status: "Successful",
      amount: 14280.50, currency: "USD",
    },
  ];

const UsdWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [showAi, setShowAi] = useState<boolean>(false);

  // In a real integration, these would come from a hook like useWallet("USD")
  const wallet = mockUsdWallet;
  const transactions = useMemo(() => mockUsdTransactions, []);

  return (
    <DashboardLayout 
    userName="Freya"
    breadcrumbParent="Dashboard"
    breadcrumbCurrent="USD Wallet"
    >
       
      {/* Breadcrumb-style header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your wallets and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="border-2 border-white-200 rounded-xl p-5 mb-6">
        <img src={wallet.flagSrc} alt={wallet.currency} className="w-10 h-10 rounded-full object-cover mb-3" />
        <p className="text-xs text-gray-400 mb-1">Available Balance</p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-2xl font-bold text-[#2D7A51]">
            {showBalance
              ? `$${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
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
        <p className="text-xs text-[#2D7A51] font-medium">{wallet.cardNumber}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-md">
     <button
       onClick={() => navigate("/add-money")}
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
          used={wallet.dailyTransferUsed}
          limit={wallet.dailyTransferLimit}
          currency="USD"
        />
        <TransactionLimitBar
          label="Per Transaction"
          used={wallet.perTransactionUsed}
          limit={wallet.perTransactionLimit}
          currency="USD"
        />
      </div>

      {/* FX Rate */}
      <FxRateCard {...wallet.fxRate} />

      {/* Transaction History */}
      <TransactionHistory transactions={transactions} />
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