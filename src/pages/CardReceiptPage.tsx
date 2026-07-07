
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import AiAssistant from "../components/AiAssistant";
import { useState } from "react";

interface LocationState {
  gatewayState: "success" | "pending" | "failed";
  amount: number;
  fee: number;
  total: number;
  referenceCode: string;
  transactionId: string;
  dateStr: string;
  timeStr: string;
}

const CardReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [showAi, setShowAi] = useState(false);

  if (!state?.amount) {
    navigate("/ngn-wallet");
    return null;
  }

  const { gatewayState, amount, fee, total, referenceCode, dateStr, timeStr } = state;

  const statusLabel =
    gatewayState === "success"
      ? "Successful"
      : gatewayState === "pending"
      ? "Pending"
      : "Failed";

  const statusBg =
    gatewayState === "success"
      ? "bg-[#EEF7F0] border-green-200"
      : gatewayState === "pending"
      ? "bg-yellow-50 border-yellow-200"
      : "bg-red-50 border-red-200";

  const statusIcon =
    gatewayState === "success" ? (
      <CheckCircle2 size={28} className="text-[#2D7A51]" />
    ) : gatewayState === "pending" ? (
      <Loader2 size={28} className="text-yellow-500" />
    ) : (
      <XCircle size={28} className="text-red-500" />
    );

  const statusBadge =
    gatewayState === "success"
      ? "bg-green-100 text-[#2D7A51]"
      : gatewayState === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-600";

  const receiptRows = [
    ["Transaction Type", "Add Money — Funding"],
    ["Method", "Card"],
    ["Amount", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
    ["Fee", `₦${fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
    ["Total Charged", `₦${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
    ["Wallet", "NGN"],
    ["Date", dateStr],
    ["Time", timeStr],
    ["Reference ID", referenceCode],
    ["Status", statusLabel],
  ];

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Receipt"
    >
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Receipt</h1>
        <p className="text-sm text-gray-400 mb-6">Transaction summary</p>

        {/* Status card */}
        <div className={`rounded-2xl border p-6 text-center mb-6 ${statusBg}`}>
          <div className="flex items-center justify-center mb-2">
            {statusIcon}
          </div>
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${statusBadge}`}>
            {statusLabel}
          </span>
          <p className="text-2xl font-bold text-gray-800">
            ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">NGN Wallet</p>
        </div>

        {/* Receipt rows */}
        <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-6">
          {receiptRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Action buttons — differ by status */}
        {gatewayState === "success" && (
          <>
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors mb-3"
            >
              Done
            </button>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              <Download size={15} />
              Download Receipt
            </button>
          </>
        )}

        {gatewayState === "pending" && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => navigate("/dashboard/help/live-chat")}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/ngn-wallet")}
                className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
              >
                Check Status
              </button>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              <Download size={15} />
              Download Receipt
            </button>
          </>
        )}

        {gatewayState === "failed" && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => navigate("/dashboard/help/live-chat")}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/add-money")}
                className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
              >
                Change Payment Method
              </button>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              <Download size={15} />
              Download Receipt
            </button>
          </>
        )}
      </div>

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

export default CardReceiptPage;