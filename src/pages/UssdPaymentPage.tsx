import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ChangeEvent } from "react";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Download,
  Loader2,
  ChevronDown,
  Search,
  RefreshCcw,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { Transaction } from "../types/wallet";
import { USSD_BANKS } from "../constants/ussdBanks";
import type { UssdBank } from "../constants/ussdBanks";
import AiAssistant from "../components/AiAssistant";

type UssdState =
  | "bank-selection"
  | "awaiting"
  | "pending"
  | "success-confirmation"
  | "failed-confirmation"
  | "receipt";

type ResultFlash = "success" | "failed" | null;
type ReceiptStatus = "Successful" | "Failed";

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

const generateSessionId = (): string => {
  return String(Math.floor(1000 + Math.random() * 9000));
};

const UssdPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction } = useWallet();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.amount) navigate("/add-money");
  }, [state, navigate]);

  const { amount = 0, fee = 0, referenceCode = "" } = state || {};

  const [ussdState, setUssdState] = useState<UssdState>("bank-selection");
  const [selectedBank, setSelectedBank] = useState<UssdBank | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionId] = useState(generateSessionId());
  const [resultFlash, setResultFlash] = useState<ResultFlash>(null);
  const [receiptStatus, setReceiptStatus] = useState<ReceiptStatus>("Successful");
  const [showAi, setShowAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txnId] = useState(generateTxnId());

  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

  const dialCode = selectedBank
    ? `*${selectedBank.shortCode}*${amount}*${sessionId}#`
    : "";

  const filteredBanks = USSD_BANKS.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dialCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectBank = (bank: UssdBank) => {
    setSelectedBank(bank);
    setDropdownOpen(false);
    setSearchQuery("");
  };

  const handleGenerateCode = () => {
    if (!selectedBank) return;
    setUssdState("awaiting");
  };

  const runPoll = () => {
    setUssdState("pending");
    setResultFlash(null);
    pollTimeoutRef.current = setTimeout(() => {
      const outcomes: ResultFlash[] = ["success", "success", "success", "failed"];
      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResultFlash(result);
      flashTimeoutRef.current = setTimeout(() => {
        setUssdState(result === "success" ? "success-confirmation" : "failed-confirmation");
        setResultFlash(null);
      }, 1800);
    }, 3500);
  };

  const handleRetryFromFlash = () => {
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    setResultFlash(null);
    setUssdState("awaiting");
  };

  const handleViewReceipt = (status: ReceiptStatus) => {
    const transaction: Transaction = {
      id: txnId,
      txnId,
      description: "USSD top-up",
      subLabel: `Funding · ${selectedBank?.name ?? ""}`,
      date: now.toISOString().split("T")[0],
      displayDate: now.toISOString().split("T")[0],
      type: "funding",
      status,
      amount,
      currency: "NGN",
    };
    addTransaction(transaction);
    setReceiptStatus(status);
    setUssdState("receipt");
  };

  const statusConfig = {
    Successful: {
      bg: "bg-[#EEF7F0] border-green-200",
      iconBg: "bg-green-100",
      icon: <CheckCircle2 size={28} className="text-[#2D7A51]" />,
      badge: "bg-green-100 text-[#2D7A51]",
    },
    Failed: {
      bg: "bg-red-50 border-red-200",
      iconBg: "bg-red-100",
      icon: <XCircle size={28} className="text-red-500" />,
      badge: "bg-red-100 text-red-600",
    },
  };

  const ProviderCard = () => (
    <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg ${selectedBank?.color} text-white text-xs font-bold flex items-center justify-center`}>
          {selectedBank?.initials}
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Selected Provider</p>
          <p className="text-sm font-semibold text-gray-800">{selectedBank?.name}</p>
        </div>
      </div>
      <button
        onClick={() => setUssdState("bank-selection")}
        className="text-xs font-medium text-[#2D7A51] hover:underline"
      >
        Change
      </button>
    </div>
  );

  const DialCodeCard = () => (
    <div className="bg-[#0D1B2A] rounded-2xl p-5 mb-4 text-center">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
        Dial this code from your phone
      </p>
      <p className="text-2xl font-bold text-white tracking-wider mb-3">{dialCode}</p>
      <button
        onClick={handleCopyCode}
        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
      >
        <Copy size={12} />
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );

  const AmountRefRow = () => (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Amount</p>
        <p className="text-base font-bold text-gray-800">
          ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="flex-1 border border-gray-200 rounded-xl p-3 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Reference</p>
        <p className="text-xs font-semibold text-gray-800">{referenceCode}</p>
      </div>
    </div>
  );

  const HowToSteps = () => (
    <div className="border border-gray-100 rounded-xl p-4 mb-4">
      <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">
        How to complete payment
      </p>
      <div className="flex flex-col gap-3">
        {[
          { icon: Phone, title: "Dial the USSD code", text: "Open your phone dialler and dial the code exactly as shown" },
          { icon: CheckCircle2, title: "Confirm on your phone", text: "Follow the on-screen prompts and enter your PIN to authorise" },
          { icon: Loader2, title: "Wait for confirmation", text: "Your bank processes the transaction — usually within 30 seconds" },
          { icon: ArrowLeft, title: "Return here to continue", text: `Tap "I Have Completed This Payment" once your phone shows success` },
        ].map(({ icon: Icon, title, text }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={12} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">{title}</p>
              <p className="text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="NGN Wallet"
      breadcrumbCurrent="USSD Payment"
    >
      {/* ── BANK SELECTION ── */}
      {ussdState === "bank-selection" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/add-money")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">USSD Payment</h1>
          <p className="text-sm text-gray-400 mb-6">Select your bank and generate a payment code</p>

          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            Select your bank / provider
          </p>

          <div className="relative mb-4">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-left"
            >
              {selectedBank ? (
                <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  <span className={`w-6 h-6 rounded ${selectedBank.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                    {selectedBank.initials}
                  </span>
                  {selectedBank.name}
                  <span className="text-gray-400 text-xs">{selectedBank.code}</span>
                </span>
              ) : (
                <span className="text-sm text-gray-400">Choose a bank...</span>
              )}
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                  <Search size={14} className="text-gray-400" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    placeholder="Search bank..."
                    className="w-full text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredBanks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleSelectBank(bank)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded ${bank.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                          {bank.initials}
                        </span>
                        <span className="text-sm text-gray-700">{bank.name}</span>
                      </span>
                      <span className="text-xs text-gray-400">{bank.code}</span>
                    </button>
                  ))}
                  {filteredBanks.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">No banks found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount</p>
            <p className="text-2xl font-bold text-gray-800">
              ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <button
            onClick={handleGenerateCode}
            disabled={!selectedBank}
            className="w-full flex items-center justify-center gap-2 bg-[#2D7A51] hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            Generate USSD Code
          </button>
        </div>
      )}

      {/* ── AWAITING ── */}
      {ussdState === "awaiting" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setUssdState("bank-selection")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">USSD Payment</h1>
          <p className="text-sm text-gray-400 mb-6">Dial the code below from your registered phone number</p>

          <ProviderCard />
          <DialCodeCard />
          <AmountRefRow />
          <HowToSteps />

          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-orange-500" />
              <div>
                <p className="text-xs font-semibold text-orange-700">Awaiting Payment</p>
                <p className="text-xs text-orange-500">Dial the code and complete payment on your phone.</p>
                <p className="text-[10px] text-orange-400">Ref: {referenceCode}</p>
              </div>
            </div>
            <RefreshCcw size={14} className="text-orange-400" />
          </div>

          <button
            onClick={runPoll}
            className="w-full flex items-center justify-center gap-2 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors mb-3"
          >
            <Phone size={15} />
            I Have Completed This Payment
          </button>
          <button
            onClick={runPoll}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
          >
            Refresh Status
          </button>
        </div>
      )}

      {/* ── PENDING (with inline result flash) ── */}
      {ussdState === "pending" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">USSD Payment</h1>
          <p className="text-sm text-gray-400 mb-6">Dial the code below from your registered phone number</p>

          <ProviderCard />
          <DialCodeCard />
          <AmountRefRow />
          <HowToSteps />

          {resultFlash === null && (
            <>
              <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="text-yellow-500 animate-spin" />
                  <div>
                    <p className="text-xs font-semibold text-yellow-700">Pending Confirmation</p>
                    <p className="text-xs text-yellow-600">Waiting for your bank to confirm the transaction...</p>
                    <p className="text-[10px] text-yellow-500">Ref: {referenceCode}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={runPoll}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 border border-gray-100 rounded-xl transition-colors"
              >
                Refresh Status
              </button>
            </>
          )}

          {resultFlash === "success" && (
            <div className="flex items-center gap-2 bg-[#EEF7F0] border border-green-200 rounded-xl px-4 py-3 mb-4">
              <CheckCircle2 size={16} className="text-[#2D7A51]" />
              <div>
                <p className="text-xs font-semibold text-[#2D7A51]">Payment Successful</p>
                <p className="text-xs text-green-600">Your wallet has been credited successfully</p>
              </div>
            </div>
          )}

          {resultFlash === "failed" && (
            <>
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <XCircle size={16} className="text-red-500" />
                <div>
                  <p className="text-xs font-semibold text-red-600">Payment Failed</p>
                  <p className="text-xs text-red-500">We could not confirm your payment. Please try again</p>
                  <p className="text-[10px] text-red-400">Ref: {referenceCode}</p>
                </div>
              </div>
              <button
                onClick={handleRetryFromFlash}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium py-3 rounded-xl transition-colors"
              >
                <XCircle size={14} />
                Retry Payment
              </button>
            </>
          )}
        </div>
      )}

      {/* ── SUCCESS CONFIRMATION ── */}
      {ussdState === "success-confirmation" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">USSD Payment</h1>
          <p className="text-sm text-gray-400 mb-6">Your wallet has been funded</p>

          <div className="flex flex-col items-center text-center mb-6">
            <CheckCircle2 size={40} className="text-[#2D7A51] mb-3" />
            <p className="text-lg font-bold text-gray-800 mb-4">Payment Successful !</p>
            <div className="w-full flex flex-col gap-2 text-sm text-left bg-gray-50 border border-gray-100 rounded-xl p-4">
              {[
                ["Amount Funded", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                ["Reference", referenceCode],
                ["Wallet Credited", "NGN Wallet"],
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
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              View Receipt
            </button>
          </div>
        </div>
      )}

      {/* ── FAILED CONFIRMATION ── */}
      {ussdState === "failed-confirmation" && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/ngn-wallet")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">USSD Payment</h1>
          <p className="text-sm text-gray-400 mb-6">Payment could not be confirmed</p>

          <div className="flex flex-col items-center text-center mb-6">
            <XCircle size={40} className="text-red-500 mb-3" />
            <p className="text-lg font-bold text-gray-800 mb-2">Payment Not Confirmed</p>
            <p className="text-xs text-gray-500 max-w-xs">
              We couldn't confirm your payment from your bank. This could be due to a timeout, incorrect PIN, or insufficient funds.
            </p>
            <p className="text-xs text-gray-400 mt-1">Your account has not been debited. You can safely retry.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUssdState("bank-selection")}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3.5 rounded-xl transition-colors"
            >
              Change Bank
            </button>
            <button
              onClick={() => setUssdState("awaiting")}
              className="flex-1 bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* ── RECEIPT ── */}
      {ussdState === "receipt" && (
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
              ["Method", "USSD"],
              ["Amount", `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
              ["Fee", `₦${fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
              ["Total Charged", `₦${(amount + fee).toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
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
        </div>
      )}

      {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
      <button
        onClick={() => setShowAi(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
      >
        <MessageCircle className="text-white w-5 h-5" />
      </button>
    </DashboardLayout>
  );
};

export default UssdPaymentPage