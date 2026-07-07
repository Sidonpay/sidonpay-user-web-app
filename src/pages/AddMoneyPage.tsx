import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Landmark,
  CreditCard,
  Phone,
  Building2,
  Clock,
  Copy,
  MapPin,
  UserCheck,
  Banknote,
  CheckCircle2,
  Download,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import AiAssistant from "../components/AiAssistant";
import type { Transaction } from "../types/wallet";

type FundingMethod = "bank-transfer" | "card" | "ussd" | "agent-deposit";
type Step = "method" | "agent-details" | "receipt";

const MIN_AMOUNT = 100;

const methods: {
  id: FundingMethod;
  icon: React.ElementType;
  title: string;
  desc: string;
  available: boolean;
}[] = [
  {
    id: "bank-transfer",
    icon: Landmark,
    title: "Bank Transfer",
    desc: "Pay via direct bank transfer",
    available: true,
  },
  {
    id: "card",
    icon: CreditCard,
    title: "Card",
    desc: "Fund with debit or credit card",
    available: true,
  },
  {
    id: "ussd",
    icon: Phone,
    title: "USSD",
    desc: "Dial a USSD code on your phone",
    available: true,
  },
  {
    id: "agent-deposit",
    icon: Building2,
    title: "Bank / Agent Deposit",
    desc: "Deposit at a bank branch or agent",
    available: true,
  },
];

const methodLabel: Record<FundingMethod, string> = {
  "bank-transfer": "Bank Transfer",
  card: "Card",
  ussd: "USSD",
  "agent-deposit": "Agent Deposit",
};

const processingTime: Record<FundingMethod, string> = {
  "bank-transfer": "5-15 minutes",
  card: "Instant",
  ussd: "1-3 minutes",
  "agent-deposit": "15-60 minutes",
};

const calculateFee = (method: FundingMethod, amount: number): number => {
  if (method === "card") return Math.round(amount * 0.01 * 100) / 100;
  if (method === "ussd") return 50;
  return 0;
};

const generateReference = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `REF-${year}-${random}`;
};

const generateTxnId = (): string => {
  const random = Math.floor(10000000 + Math.random() * 90000000);
  return `TXN-${random}`;
};

const AddMoneyPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useWallet();

  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<FundingMethod | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [referenceCode] = useState<string>(generateReference());
  const [copied, setCopied] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState<Transaction | null>(null);
  const [showAi, setShowAi] = useState<boolean>(false);

  const numericAmount = parseFloat(amount) || 0;
  const isAmountValid = amount !== "" && numericAmount >= MIN_AMOUNT;
  const showError = touched && amount !== "" && !isAmountValid;
  const canContinue = selectedMethod !== null && isAmountValid;

  const fee = selectedMethod ? calculateFee(selectedMethod, numericAmount) : 0;
  const total = numericAmount + fee;

  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
      setTouched(true);
    }
  };

  const completeDeposit = (
    status: "Successful" | "Pending",
    subLabel: string,
    description: string,
    finalAmount: number
  ) => {
    const now = new Date();
    const transaction: Transaction = {
      id: generateTxnId(),
      txnId: generateTxnId(),
      description,
      subLabel,
      date: now.toISOString().split("T")[0],
      displayDate: now.toISOString().split("T")[0],
      type: "funding",
      status,
      amount: finalAmount,
      currency: "NGN",
    };
    addTransaction(transaction);
    setCompletedTransaction(transaction);
    setStep("receipt");
  };

  const handleContinue = () => {
    if (!canContinue || !selectedMethod) return;

    if (selectedMethod === "agent-deposit") {
      setStep("agent-details");
      return;
    }

    if (selectedMethod === "bank-transfer") {
        navigate("/bank-transfer", {
          state: {
            amount: numericAmount,
            fee,
            total,
            referenceCode,
          },
        });
        return;
      }

    if (selectedMethod === "card") {
      navigate("/card-funding", {
        state: {
          amount: numericAmount,
          fee,
          total,
          referenceCode,
          method: methodLabel[selectedMethod],
        }, 
      });
      return;
    }

    if (selectedMethod === "ussd") {
        navigate("/add-money/ussd", {
            state: {
                amount: numericAmount,
                fee,
                total,
                referenceCode,
            },
        });
        return;
    }
    return;
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmAgentDeposit = () => {
    completeDeposit(
      "Successful",
      "Funding · E-pay ***88",
      "Agent Deposit",
      numericAmount
    );
  };

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Add Money"
    >
      {/* Funding Method + Amount */}
      {step === "method" && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/ngn-wallet")}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <button
              onClick={() => navigate("/manage-cards")}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CreditCard size={15} />
              Manage cards
            </button>
          </div>

          <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
            Funding Method
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {methods.map(({ id, icon: Icon, title, desc, available }) => (
              <button
                key={id}
                onClick={() => {
                  if (!available) return;
                  setSelectedMethod(id);
                  setAmount("");
                  setTouched(false);
                }}
                className={`text-left p-4 rounded-xl border-2 transition-colors relative ${
                  !available
                    ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                    : selectedMethod === id
                    ? "border-[#2D7A51] bg-[#EEF7F0]"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <Icon
                  size={20}
                  className={available ? "text-gray-400 mb-2" : "text-gray-300 mb-2"}
                />
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                {!available && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Coming soon
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Amount — only shows after selecting an AVAILABLE method */}
          {selectedMethod && (
            <>
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
                Amount
              </p>
              <div
                className={`flex items-center border rounded-xl overflow-hidden mb-1.5 ${
                  showError ? "border-red-400" : "border-gray-200"
                }`}
              >
                <span className="bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-500 border-r border-gray-200">
                  ₦
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="0.00"
                  autoFocus
                  className="flex-1 px-4 py-3.5 text-sm outline-none text-gray-800"
                />
                <span className="px-4 text-xs font-medium text-gray-400">NGN</span>
              </div>

              {showError ? (
                <p className="text-xs text-red-500 mb-6">Minimum amount is ₦100</p>
              ) : (
                <p className="text-xs text-gray-400 mb-6">Minimum: ₦100</p>
              )}

              {isAmountValid && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">
                    Breakdown
                  </p>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">Amount</span>
                    <span className="text-gray-800 font-medium">
                      ₦{numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Fee</span>
                    {fee === 0 ? (
                      <span className="text-[#2D7A51] font-medium">Free</span>
                    ) : (
                      <span className="text-gray-800 font-medium">
                        ₦{fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                    <span className="text-gray-800 font-bold">Total</span>
                    <span className="text-gray-800 font-bold">
                      ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                <Clock size={13} />
                Estimated processing time:{" "}
                <span className="font-semibold text-gray-600">
                  {processingTime[selectedMethod]}
                </span>
              </p>

              <button
                onClick={handleContinue}
                disabled={!canContinue}
                className="w-full bg-[#2D7A51] hover:bg-green-700 disabled:bg-[#A8C9B5] disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
              >
                Continue
              </button>
            </>
          )}
        </div>
      )}

      {/* Agent / Bank Deposit Details */}
      {step === "agent-details" && (
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep("method")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <h1 className="text-xl font-bold text-gray-800 mb-1">
            Agent / Bank Deposit
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Walk in and deposit cash using your reference code
          </p>

          <div className="bg-[#0D1B2A] rounded-2xl p-6 text-center mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Your Reference Code
            </p>
            <p className="text-2xl font-bold text-white tracking-wide mb-2">
              {referenceCode}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Show this to the teller or agent
            </p>
            <button
              onClick={handleCopyReference}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Copy size={13} />
              {copied ? "Copied!" : "Copy Reference"}
            </button>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {[
              {
                icon: MapPin,
                step: "01",
                title: "Visit a bank branch or agent",
                desc: "Go to any branch of your registered bank or a licensed agent near you.",
              },
              {
                icon: UserCheck,
                step: "02",
                title: "Provide your reference code",
                desc: "Show or read out the reference code above to the teller or agent.",
              },
              {
                icon: Banknote,
                step: "03",
                title: "Pay the amount",
                desc: "Hand over the exact amount in cash. Keep your receipt as proof of payment.",
              },
            ].map(({ icon: Icon, step: s, title, desc }) => (
              <div
                key={s}
                className="flex items-start gap-3 border border-gray-200 rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EEF7F0] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#2D7A51]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">
                    Step {s}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-xl p-4 mb-4">
            <span className="text-sm text-gray-500">Amount to deposit</span>
            <span className="text-sm font-bold text-gray-800">
              ₦{numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-yellow-700">
              Awaiting confirmation
            </p>
            <p className="text-xs text-yellow-600 mt-0.5">Ref: {referenceCode}</p>
          </div>

          <button
            onClick={handleConfirmAgentDeposit}
            className="w-full bg-[#2D7A51] hover:bg-green-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
          >
            I've Made the Deposit
          </button>
        </div>
      )}

      {/* Receipt */}
      {step === "receipt" && completedTransaction && selectedMethod && (
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Receipt</h1>
          <p className="text-sm text-gray-400 mb-6">Transaction summary</p>

          <div className="bg-[#EEF7F0] border border-green-200 rounded-2xl p-6 text-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={20} className="text-[#2D7A51]" />
            </div>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 bg-green-100 text-[#2D7A51]">
              {completedTransaction.status}
            </span>
            <p className="text-2xl font-bold text-gray-800">
              ₦{completedTransaction.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-gray-500 mt-1">NGN Wallet</p>
          </div>

          <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-6">
            {[
              ["Transaction Type", "Add Money — Funding"],
              ["Method", methodLabel[selectedMethod]],
              [
                "Amount",
                `₦${completedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
              ],
              ["Fee", "Free"],
              [
                "Total Charged",
                `₦${completedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
              ],
              ["Wallet", "NGN"],
              [
                "Date",
                new Date(completedTransaction.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
              ],
              [
                "Time",
                new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              ],
              ["Reference ID", referenceCode],
              ["Status", completedTransaction.status],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
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

export default AddMoneyPage;