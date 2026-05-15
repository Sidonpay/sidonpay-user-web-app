import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  MessageCircle,
  AlertTriangle,
  Wallet,
  ArrowLeftRight,
  Shield,
  Receipt,
  User,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import AiAssistant from "../components/AiAssistant";

const categories = [
  {
    id: "wallet-funding",
    icon: <Wallet className="w-5 h-5 text-blue-500" />,
    title: "Wallet & Funding",
    description: "Add money, manage balances, and top up your NGN or USD wallet.",
  },
  {
    id: "transfers-payments",
    icon: <ArrowLeftRight className="w-5 h-5 text-blue-500" />,
    title: "Transfers & Payments",
    description: "Send money to bank accounts or other SidonPay users instantly.",
  },
  {
    id: "security-verification",
    icon: <Shield className="w-5 h-5 text-purple-500" />,
    title: "Security & Verification",
    description: "BVN verification, two-factor auth, and keeping your account safe.",
  },
  {
    id: "bills-services",
    icon: <Receipt className="w-5 h-5 text-orange-500" />,
    title: "Bills & Services",
    description: "Airtime, data, electricity, cable TV, and other utility payments.",
  },
  {
    id: "account-profile",
    icon: <User className="w-5 h-5 text-red-400" />,
    title: "Account & Profile",
    description: "Update your profile, change password, and manage settings.",
  },
];

const HelpCentre: React.FC = () => {
  const navigate = useNavigate();
  const [showAi, setShowAi] = useState<boolean>(false);

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto px-2 md:px-0">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-[#2D7A51] uppercase tracking-widest mb-1">
            Help Center
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            How can we help you?
          </h1>
        </div>

        {/* Browse by category */}
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Browse by category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/help/categories/${cat.id}`)}
              className="flex items-start gap-3 p-4 border border-white-200 rounded-xl text-left hover:bg-green-50 hover:border-green-200 transition"
            >
              <div className="mt-0.5 shrink-0">{cat.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{cat.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Still need help */}
        <div className="text-center mb-4 ">
          <h2 className="text-lg font-bold text-gray-800">Still need help?</h2>
          <p className="text-xs text-gray-400 mt-4">
            Our support team is available Monday – Friday, 8am – 6pm WAT.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => navigate("/help/send-mail")}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 border mt-4 border-white-200 shadow-md rounded-full text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <Mail className="w-4 h-4" />
            support@sidonpay.com
          </button>
          <button
            onClick={() => navigate("/help/live-chat")}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 border mt-4 border-green-200 shadow-md rounded-full text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </button>
          <button
            onClick={() => navigate("/help/report")}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-red-50 border mt-4 border-red-200 shadow-md rounded-full text-sm text-red-500 hover:bg-red-100 transition"
          >
            <AlertTriangle className="w-4 h-4" />
            Report a Problem
          </button>
        </div>
      </div>

      {/* AI Assistant floating button */}
      <button
        onClick={() => setShowAi(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </button>

      {/* AI Assistant overlay */}
      {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
    </DashboardLayout>
  );
};

export default HelpCentre;