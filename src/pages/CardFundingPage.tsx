import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Ban,
  Clock,
  MessageCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { Transaction } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

type GatewayState = "processing" | "success" | "pending" | "failed" | "cancelled";

interface LocationState {
  amount: number;
  fee: number;
  total: number;
  referenceCode: string;
  method: string;
}

const generateTxnId = (): string => {
  const random = Math.floor(10000000 + Math.random() * 90000000);
  return `TXN-${random}`;
};

const CardFundingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction } = useWallet();

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.amount) {
      navigate("/add-money");
    }
  }, [state, navigate]);

  const { amount = 0, fee = 0, total = 0, referenceCode = "" } = state || {};

  const [gatewayState, setGatewayState] = useState<GatewayState>("processing");
  const [showAi, setShowAi] = useState(false);
  const [transactionId] = useState(generateTxnId());

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

useEffect(() => {
    if (gatewayState !== "processing") return;
    const timer = setTimeout(() => {
      const outcomes: GatewayState[] = ["success", "success", "success", "pending", "failed"];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      setGatewayState(result);
    }, 2500);
    return () => clearTimeout(timer);
  }, [gatewayState]);

useEffect(() => {
    if (gatewayState === "processing") return;
    const now = new Date();
    const transaction: Transaction = {
      id: transactionId,
      txnId: transactionId,
      description: "Card Top-up",
      subLabel: `Funding · Visa***${Math.floor(1000 + Math.random() * 9000)}`,
      date: now.toISOString().split("T")[0],
      displayDate: now.toISOString().split("T")[0],
      type: "funding",
      status: gatewayState === "success"
        ? "Successful"
        : gatewayState === "pending"
        ? "Pending"
        : "Failed",
      amount,
      currency: "NGN",
    };
    addTransaction(transaction);
  }, [gatewayState]);

  const goToReceipt = (gs: "success" | "pending" | "failed") => {
    navigate("/card-receipt", {
      state: { gatewayState: gs, amount, fee, total, referenceCode, transactionId, dateStr, timeStr },
    });
  };

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Card Funding"
    >
      {/* PROCESSING */}
      {gatewayState === "processing" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setGatewayState("cancelled")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Card Funding</h1>
          <p className="text-sm text-gray-400 mb-6">Secure checkout powered by Interswitch</p>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center py-16 px-6 text-center">
            <Loader2 size={36} className="text-gray-400 animate-spin mb-4" />
            <p className="text-base font-bold text-gray-800 mb-1">Redirecting...</p>
            <p className="text-xs text-gray-400">
              Redirecting to secure payment gateway. Please do not close this window.
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {gatewayState === "success" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Card Funding</h1>
          <p className="text-sm text-gray-400 mb-6">Secure checkout powered by Interswitch</p>
          <div className="bg-[#EEF7F0] border border-green-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <CheckCircle2 size={36} className="text-[#2D7A51] mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Payment Successful</p>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Your card payment was processed successfully. Funds have been added to your wallet.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>
          <button
            onClick={() => goToReceipt("success")}
            className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            View Receipt
          </button>
        </div>
      )}

      {/* PENDING */}
      {gatewayState === "pending" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Card Funding</h1>
          <p className="text-sm text-gray-400 mb-6">Secure checkout powered by Interswitch</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <Clock size={36} className="text-yellow-500 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Payment Pending</p>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Your payment is being verified. This can take a few minutes. We'll notify you once confirmed.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>
          <button
            onClick={() => goToReceipt("pending")}
            className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            View Status
          </button>
        </div>
      )}

      {/* FAILED */}
      {gatewayState === "failed" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/add-money")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Card Funding</h1>
          <p className="text-sm text-gray-400 mb-6">We couldn't confirm your payment</p>
          <div className="bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <XCircle size={36} className="text-red-500 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Payment Failed</p>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Your card was declined or the payment could not be processed. Please try again or use a different card.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            Back to Wallet
          </button>
        </div>
      )}

      {/* CANCELLED */}
      {gatewayState === "cancelled" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/add-money")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Card Funding</h1>
          <p className="text-sm text-gray-400 mb-6">Payment cancelled by user</p>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <Ban size={36} className="text-gray-400 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Payment Cancelled</p>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              You cancelled the payment. No funds were deducted. You can try again anytime.
            </p>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            Back to Wallet
          </button>
        </div>
      )}

      {/* Floating AI Assistant */}
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

export default CardFundingPage;