import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  Shield,
  CreditCard,
  Wallet,
  Receipt,
  MessageCircle,
  AlertTriangle,
  Mail,
  Headphones,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const categories = [
  {
    id: "payments-transfers",
    icon: <ArrowLeftRight className="w-5 h-5 text-[#2D7A51]" />,
    title: "Payments & Transfers",
    description: "Send money, transaction issues",
    color: "bg-green-50",
  },
  {
    id: "security-privacy",
    icon: <Shield className="w-5 h-5 text-gray-500" />,
    title: "Security & Privacy",
    description: "2FA, account protection, and privacy settings",
    color: "bg-gray-50",
  },
  {
    id: "cards-account",
    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
    title: "Cards & Account",
    description: "Card usage, account setup, and profile management",
    color: "bg-blue-50",
  },
  {
    id: "wallet-funding",
    icon: <Wallet className="w-5 h-5 text-blue-400" />,
    title: "Wallet & Funding",
    description: "Adding money, deposits, and wallet funding methods",
    color: "bg-blue-50",
  },
  {
    id: "bills-services",
    icon: <Receipt className="w-5 h-5 text-orange-500" />,
    title: "Bills & Services",
    description: "Airtime, data, electricity, and bill payment issues",
    color: "bg-orange-50",
  },
];

const HelpCategories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto px-2 md:px-0">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <Headphones className="w-7 h-7 text-[#2D7A51]" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            How can we help?
          </h1>
          <p className="text-sm text-gray-400 mt-1">Need help? We've got you covered</p>
        </div>

        {/* 3 action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => navigate("/dashboard/help/live-chat")}
            className="flex flex-col items-center gap-2 p-3 border bg-gray shadow-md border-gray-100 rounded-xl hover:bg-green-50 transition"
          >
            <MessageCircle className="w-6 h-6 text-[#2D7A51]" />
            <p className="text-sm font-semibold text-gray-800">Live Chat</p>
            <p className="text-xs text-gray-400">Avg. 2 min reply</p>
          </button>
          <button
            onClick={() => navigate("/dashboard/help/report")}
            className="flex flex-col items-center gap-2 p-3 border bg-gray shadow-md border-gray-100 rounded-xl hover:bg-red-50 transition"
          >
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <p className="text-sm font-semibold text-gray-800">Report a Problem</p>
            <p className="text-xs text-gray-400">File a detailed support ticket</p>
          </button>
          <button
            onClick={() => navigate("/dashboard/help/send-mail")}
            className="flex flex-col items-center gap-2 p-3 border bg-gray shadow-md border-gray-100 rounded-xl hover:bg-blue-50 transition"
          >
            <Mail className="w-6 h-6 text-blue-500" />
            <p className="text-sm font-semibold text-gray-800">Send an Email</p>
            <p className="text-xs text-gray-400">Reach our team directly via email</p>
          </button>
        </div>

        {/* Help Categories list */}
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Help Categories</h2>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/dashboard/help/categories/${cat.id}`)}
              className="flex items-center justify-between p-3 bg-white border shadow-md border-gray-100 rounded-xl hover:bg-green-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${cat.color} flex items-center justify-center shrink-0`}>
                  {cat.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{cat.title}</p>
                  <p className="text-xs text-gray-400">{cat.description}</p>
                </div>
              </div>
              <span className="text-black-400 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpCategories;