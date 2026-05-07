import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowDown, ArrowUp } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import FlagNGN from "../assets/flag-ngn.png";
import FlagUSD from "../assets/flag-usd.png";
import IconAddMoney from "../assets/icon-add-money.png";
import IconSendMoney from "../assets/icon-send-money.png";
import IconConvert from "../assets/icon-convert.png";
import IconPayBills from "../assets/icon-pay-bills.png";
import IconNGNtoUSD from "../assets/ngn-usd-icon.png";

interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  type: "credit" | "debit" | "conversion";
}

interface QuickAction {
  label: string;
  icon: string;
  path: string;
  description: string;
  step: number;
}

const transactions: Transaction[] = [
  { id: 1, description: "Salary Deposit", date: "Today", amount: "+₦250,000.00", status: "Success", type: "credit" },
  { id: 2, description: "Transfer to John Bill", date: "Yesterday", amount: "-₦50,000.00", status: "Pending", type: "debit" },
  { id: 3, description: "NGN to USD Conversion", date: "Yesterday", amount: "+$750.00", status: "Success", type: "conversion" },
  { id: 4, description: "Transfer to Beuld Pith", date: "March 3rd 2026, 10:32am", amount: "-₦20,000.00", status: "Failed", type: "debit" },
  { id: 5, description: "Electricity Bill", date: "March 2nd 2026, 9:54am", amount: "-₦5,000.00", status: "Success", type: "debit" },
  { id: 6, description: "Airtime", date: "February 27th 2026, 8:00pm", amount: "-₦4,000.00", status: "Success", type: "debit" },
];

const quickActions: QuickAction[] = [
  {
    label: "Add Money",
    icon: IconAddMoney,
    path: "/add-money",
    description: "Fund your wallet using your bank or card.",
    step: 1,
  },
  {
    label: "Send Money",
    icon: IconSendMoney,
    path: "/transfer",
    description: "Transfer money to other Sidonpay users or directly to a bank account.",
    step: 2,
  },
  {
    label: "Convert",
    icon: IconConvert,
    path: "/convert",
    description: "Easily convert funds between your NGN and USD wallets.",
    step: 3,
  },
  {
    label: "Pay Bills",
    icon: IconPayBills,
    path: "/bill-payments",
    description: "Quickly pay for airtime, data, electricity and TV subscriptions.",
    step: 4,
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNGN, setShowNGN] = useState<boolean>(true);
  const [showUSD, setShowUSD] = useState<boolean>(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success": return "text-green-600";
      case "Pending": return "text-yellow-600";
      case "Failed": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTransactionIcon = (type: string) => {
    if (type === "credit") {
      return (
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <ArrowDown className="w-4 h-4 text-green-500" />
        </div>
      );
    }
    if (type === "conversion") {
      return (
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <img src={IconNGNtoUSD} alt="conversion" className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <ArrowUp className="w-4 h-4 text-red-500" />
      </div>
    );
  };

  return (
    <DashboardLayout userName="Kolawole">

      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your wallets and transactions</p>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* NGN Wallet */}
        <div className="border border-gray-100 rounded-xl p-4">
          <div className="mb-3">
            <img src={FlagNGN} alt="NGN" className="w-10 h-10 rounded-full object-cover" />
          </div>
          <p className="text-xs text-gray-400 mb-1">Available Balance</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-[#2D7A51]">
              {showNGN ? "₦20,000,000.00" : "₦••••••••"}
            </p>
            <button onClick={() => setShowNGN(!showNGN)}>
              {showNGN ? (
                <Eye className="w-4 h-4 text-[#2D7A51]" />
              ) : (
                <EyeOff className="w-4 h-4 text-[#2D7A51]" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-gray-400">Card Number</p>
              <p className="text-xs text-[#2D7A51] font-medium">5432****8901</p>
            </div>
            <span
              onClick={() => navigate("/ngn-wallet")}
              className="text-xs text-[#2D7A51] cursor-pointer hover:underline font-medium"
            >
              View →
            </span>
          </div>
        </div>

        {/* USD Wallet */}
        <div className="border border-gray-100 rounded-xl p-4">
          <div className="mb-3">
            <img src={FlagUSD} alt="USD" className="w-10 h-10 rounded-full object-cover" />
          </div>
          <p className="text-xs text-gray-400 mb-1">Available Balance</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-[#2D7A51]">
              {showUSD ? "$0.00" : "$••••"}
            </p>
            <button onClick={() => setShowUSD(!showUSD)}>
              {showUSD ? (
                <Eye className="w-4 h-4 text-[#2D7A51]" />
              ) : (
                <EyeOff className="w-4 h-4 text-[#2D7A51]" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-gray-400">Card Number</p>
              <p className="text-xs text-[#2D7A51] font-medium">5432****8901</p>
            </div>
            <span
              onClick={() => navigate("/usd-wallet")}
              className="text-xs text-[#2D7A51] cursor-pointer hover:underline font-medium"
            >
              View →
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="bg-[#E0F3E9] rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-green-100 transition"
          >
            <img src={action.icon} alt={action.label} className="w-6 h-6" />
            <p className="text-xs font-medium text-[#2D7A51]">{action.label}</p>
          </button>
        ))}
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold text-gray-800">Recent Transactions</p>
          <span
            onClick={() => navigate("/transactions")}
            className="text-xs text-[#2D7A51] cursor-pointer hover:underline font-medium"
          >
            View All
          </span>
        </div>

        <div className="flex flex-col">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3">
                {getTransactionIcon(tx.type)}
                <div>
                  <p className="text-sm font-semibold text-gray-800">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-bold text-gray-800">{tx.amount}</p>
                <span className={`text-xs font-medium ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;