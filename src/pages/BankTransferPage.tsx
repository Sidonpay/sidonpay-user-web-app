import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Phone,
  ArrowLeftRight,
  CheckCircle,
  Download,
  MessageCircle,
  Loader2,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { Transaction } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

type TransferState =
  | "details"
  | "awaiting"
  | "success-confirmation"
  | "pending"
  | "failed"
  | "taking-longer"
  | "receipt";

type ReceiptStatus = "Successful" | "Pending" | "Failed";

interface LocationState {
  amount: number;
  fee: number;
  total: number;
  referenceCode: string;
}

const generateTxnId = (): string => {
  const random = Math.floor(10000000 + Math.random() * 90000000);
  return `TXN-${random}`;
};

const VIRTUAL_ACCOUNT = "9901234567";
const BANK_NAME = "Providus Bank";
const ACCOUNT_NAME = "LARA FINTECH LTD";

const BankTransferPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction } = useWallet();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.amount) navigate("/add-money");
  }, [state, navigate]);

  const { amount = 0, referenceCode = "" } = state || {};
  const [transferState, setTransferState] = useState<TransferState>("details");
  const [receiptStatus, setReceiptStatus] = useState<ReceiptStatus>("Successful");
  const [showAi, setShowAi] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [txnId] = useState(generateTxnId());

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleIMadeTransfer = () => {
    setTransferState("awaiting");
    // Simulate bank processing — randomly resolves after 3s
    setTimeout(() => {
      const outcomes: Array<TransferState> = [
        "success-confirmation",
        "success-confirmation",
        "pending",
        "failed",
        "taking-longer",
      ];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      setTransferState(result);
    }, 3000);
  };

  const handleViewReceipt = (status: ReceiptStatus) => {
    const transaction: Transaction = {
      id: txnId,
      txnId,
      description: "Bank Transfer top-up",
      subLabel: `Funding · ${BANK_NAME}`,
      date: now.toISOString().split("T")[0],
      displayDate: now.toISOString().split("T")[0],
      type: "funding",
      status,
      amount,
      currency: "NGN",
    };
    addTransaction(transaction);
    setReceiptStatus(status);
    setTransferState("receipt");
  };

  const statusConfig = {
    Successful: {
      bg: "bg-[#EEF7F0] border-green-200",
      iconBg: "bg-green-100",
      icon: <CheckCircle2 size={28} className="text-[#2D7A51]" />,
      badge: "bg-green-100 text-[#2D7A51]",
    },
    Pending: {
      bg: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-100",
      icon: <Loader2 size={28} className="text-yellow-500" />,
      badge: "bg-yellow-100 text-yellow-700",
    },
    Failed: {
      bg: "bg-red-50 border-red-200",
      iconBg: "bg-red-100",
      icon: <XCircle size={28} className="text-red-500" />,
      badge: "bg-red-100 text-red-600",
    },
  };

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="NGN Wallet"
      breadcrumbCurrent="Bank Transfer"
    >
      {/* ── DETAILS STATE ── */}
      {transferState === "details" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/add-money")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">Fund your NGN wallet via bank transfer</p>

          {/* Virtual Account Card */}
          <div className="bg-[#0D1B2A] rounded-2xl p-5 mb-4 text-white">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Virtual Account Number
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold tracking-wider">{VIRTUAL_ACCOUNT}</p>
              <button
                onClick={() => handleCopy(VIRTUAL_ACCOUNT, "account")}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <Copy size={12} />
                {copiedField === "account" ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">{BANK_NAME}</p>
          </div>

          {/* Amount to transfer */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Amount to Transfer
            </p>
            <p className="text-2xl font-bold text-gray-800">
              ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Includes all fees</p>
          </div>

          {/* Copyable fields */}
          <div className="flex flex-col gap-2 mb-4">
            {[
              { label: "Account Name", value: ACCOUNT_NAME, key: "name" },
              { label: "Bank Name", value: BANK_NAME, key: "bank" },
              { label: "Reference / Narration", value: referenceCode, key: "ref" },
            ].map(({ label, value, key }) => (
              <div key={key} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-800">{value}</p>
                </div>
                <button
                  onClick={() => handleCopy(value, key)}
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    copiedField === key
                      ? "bg-green-50 text-[#2D7A51]"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  {copiedField === key ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copiedField === key ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          {/* Processing time note */}
          <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <Clock size={13} className="text-[#2D7A51]" />
            Transfers typically reflect within <span className="font-semibold text-gray-600">1-5 minutes</span>
          </p>

          {/* How to transfer steps */}
          <div className="border border-gray-100 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
              How to Transfer
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: "Open your banking app or visit your bank" },
                { icon: ArrowLeftRight, text: "Transfer to the displayed account number" },
                { icon: CheckCircle, text: "Confirm the account name matches exactly" },
                { icon: CheckCircle2, text: "Complete the transfer" },
                { icon: ArrowLeft, text: `Return here and tap "I Have Made This Transfer"` },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
            <AlertTriangle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">
              Transfer must be from your registered account. Third-party transfers may be delayed or rejected.
            </p>
          </div>

          {/* Awaiting Payment status */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-500" />
              <div>
                <p className="text-xs font-semibold text-blue-700">Awaiting Payment</p>
                <p className="text-xs text-blue-500">Waiting for your transfer...</p>
              </div>
            </div>
            <Loader2 size={14} className="text-blue-400 animate-spin" />
          </div>

          <button
            onClick={handleIMadeTransfer}
            className="w-full flex items-center justify-center gap-2 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors mb-3"
          >
            <CheckCircle2 size={16} />
            I Have Made This Transfer
          </button>

          <button
            onClick={() => navigate("/add-money")}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
          >
            Use Another Method
          </button>
        </div>
      )}

      {/*  AWAITING */}
      {transferState === "awaiting" && (
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">Fund your NGN wallet via bank transfer</p>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center py-16 px-6 text-center">
            <Loader2 size={36} className="text-gray-400 animate-spin mb-4" />
            <p className="text-base font-bold text-gray-800 mb-1">Verifying Transfer...</p>
            <p className="text-xs text-gray-400">
              We're confirming your payment. Please wait a moment.
            </p>
          </div>
        </div>
      )}

      {/* ── SUCCESS CONFIRMATION ── */}
      {transferState === "success-confirmation" && (
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">Your wallet has been funded</p>

          <div className="bg-[#EEF7F0] border border-green-200 rounded-2xl p-6 text-center mb-6">
            <CheckCircle2 size={36} className="text-[#2D7A51] mx-auto mb-3" />
            <p className="text-lg font-bold text-gray-800 mb-1">Transfer Confirmed!</p>
            <p className="text-xs text-gray-500 mb-5">Your NGN wallet has been credited.</p>
            <div className="flex flex-col gap-2 text-sm text-left bg-white rounded-xl p-4">
              {[
                ["Amount Funded", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                ["Reference", referenceCode],
                ["Wallet", "NGN Wallet"],
                ["Time", `${dateStr}, ${timeStr}`],
                ["Status", "Successful"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{label}</span>
                  <span className={`text-xs font-semibold ${value === "Successful" ? "text-[#2D7A51]" : "text-gray-800"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              Back to Wallet
            </button>
            <button
              onClick={() => handleViewReceipt("Successful")}
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              View Receipt
            </button>
          </div>
        </div>
      )}

      {/* ── PENDING ── */}
      {transferState === "pending" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">Fund your NGN wallet via bank transfer</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <Clock size={36} className="text-yellow-500 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Transfer Pending</p>
            <p className="text-xs text-gray-500 mb-4 max-w-xs">
              Your transfer is being processed. This usually takes 1-5 minutes. We'll notify you once confirmed.
            </p>
            <span className="inline-flex items-center bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              Back to Wallet
            </button>
            <button
              onClick={() => handleViewReceipt("Pending")}
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              View Status
            </button>
          </div>
        </div>
      )}

      {/* ── FAILED ── */}
      {transferState === "failed" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/add-money")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">We could not confirm your transfer</p>

          <div className="bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <XCircle size={36} className="text-red-500 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-1">Transfer Not Confirmed</p>
            <p className="text-xs text-gray-500 mb-2 max-w-xs">
              We couldn't verify your transfer. If your account has not been debited — it's safe to retry.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Common causes: incorrect reference, wrong account number, or bank processing issue.
            </p>
            <span className="inline-flex items-center bg-white border border-gray-200 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full">
              Reference: {referenceCode}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleViewReceipt("Failed")}
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              Check Status again
            </button>
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              Go to wallet
            </button>
          </div>
        </div>
      )}

      {/* ── TAKING LONGER ── */}
      {transferState === "taking-longer" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bank Transfer</h1>
          <p className="text-sm text-gray-400 mb-6">Transfer is taking longer than expected</p>

          <div className="border border-orange-200 bg-orange-50 rounded-2xl flex flex-col items-center justify-center py-12 px-6 text-center mb-6">
            <AlertTriangle size={36} className="text-orange-500 mb-3" />
            <p className="text-base font-bold text-gray-800 mb-2">Transfer Taking Longer</p>
            <p className="text-xs text-gray-500 max-w-xs">
              Your transfer may take longer than expected. This is usually resolved within 30 minutes.
              No action is needed — your funds are safe.
            </p>
          </div>

          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
            <AlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-600">
              If your account has been debited and funds haven't reflected after 1 hour, please contact support with your reference ID.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              Go to wallet
            </button>
            <button
              onClick={() => handleViewReceipt("Pending")}
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              Check Status again
            </button>
          </div>
        </div>
      )}

      
{/* ── RECEIPT ── */}
{transferState === "receipt" && (
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Receipt</h1>
          <p className="text-sm text-gray-400 mb-6">Transaction summary</p>

          <div className={`rounded-2xl border p-6 text-center mb-6 ${statusConfig[receiptStatus].bg}`}>
            <div className={`w-10 h-10 rounded-full ${statusConfig[receiptStatus].iconBg} flex items-center justify-center mx-auto mb-2`}>
              {statusConfig[receiptStatus].icon}
            </div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${statusConfig[receiptStatus].badge}`}>
              {receiptStatus}
            </span>
            <p className="text-2xl font-bold text-gray-800">
              ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 mt-1">NGN Wallet</p>
          </div>

          <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-6">
            {[
              ["Transaction Type", "Add Money — Funding"],
              ["Method", "Bank Transfer"],
              ["Amount", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
              ["Fee", "Free"],
              ["Total Charged", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
              ["Wallet", "NGN"],
              ["Date", dateStr],
              ["Time", timeStr],
              ["Reference ID", referenceCode],
              ["Status", receiptStatus],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>

          {receiptStatus === "Successful" && (
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

          {receiptStatus === "Pending" && (
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

          {receiptStatus === "Failed" && (
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

export default BankTransferPage;
          