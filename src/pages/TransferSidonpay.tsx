import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import ThumbsUpIcon from "../assets/thumbs-up-icon.png";
import SadFaceIcon from "../assets/sad-face-icon.png";

type Step = "recipient" | "amount";
type ModalType = "success" | "failed" | null;

interface FormData {
  recipientAccount: string;
  amount: string;
  note: string;
}

interface TransferSidonpayProps {
  onStepChange: (step: Step) => void;
}

const quickAmounts = ["₦1,000", "₦2,000", "₦5,000", "₦10,000", "₦50,000"];

const mockUsers: Record<string, string> = {
  "0123456789": "Pauline Jackson",
  "0987654321": "John Adewale",
  "0111222333": "Mary Johnson",
  "0123455555": "Samuel Peters",
};

const TransferSidonpay: React.FC<TransferSidonpayProps> = ({ onStepChange }) => {
  const [step, setStep] = useState<Step>("recipient");
  const [formData, setFormData] = useState<FormData>({
    recipientAccount: "",
    amount: "",
    note: "",
  });
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientError, setRecipientError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);

  const verifyAccount = (value: string) => {
    setFormData((prev) => ({ ...prev, recipientAccount: value }));
    setRecipientError("");
    setRecipientName("");

    if (value.length === 10) {
      setTimeout(() => {
        const found = mockUsers[value];
        if (found) {
          setRecipientName(found);
        } else {
          setRecipientError("Please enter a valid account number");
        }
      }, 500);
    }
  };

  const handleContinueStep1 = () => {
    if (!recipientName) {
      setRecipientError("Please enter a valid account number");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("amount");
      onStepChange("amount");
    }, 1500);
  };

  const handleBack = () => {
    setStep("recipient");
    onStepChange("recipient");
  };

  const handleQuickAmount = (amount: string) => {
    const value = amount.replace("₦", "").replace(",", "");
    setFormData((prev) => ({ ...prev, amount: value }));
    setAmountError("");
  };

  const handleContinueStep2 = () => {
    const amount = parseFloat(formData.amount);
    if (!formData.amount) {
      setAmountError("Please enter an amount");
      return;
    }
    if (amount < 10) {
      setAmountError("Kindly enter an amount between ₦10.00 and ₦5,000,000");
      return;
    }
    if (amount > 5000000) {
      setAmountError("Kindly enter an amount between ₦10.00 and ₦5,000,000");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isSuccess = Math.random() > 0.3;
      setModal(isSuccess ? "success" : "failed");
    }, 2000);
  };

  const handleReset = () => {
    setStep("recipient");
    onStepChange("recipient");
    setFormData({ recipientAccount: "", amount: "", note: "" });
    setRecipientName("");
    setRecipientError("");
    setAmountError("");
    setModal(null);
  };

  return (
    <div className="w-full">

      {/* Success Modal */}
      {modal === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transfer successful</h3>
            <p className="text-sm text-gray-500 mb-4">
              Money is on its way to {recipientName}
            </p>
            <img src={ThumbsUpIcon} alt="success" className="w-16 h-16 mx-auto mb-6" />
            <button
              onClick={handleReset}
              className="w-full bg-[#2D7A51] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Failed Modal */}
      {modal === "failed" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transaction failed</h3>
            <p className="text-sm text-gray-500 mb-4">
              Something went wrong. Please check your network and try again
            </p>
            <img src={SadFaceIcon} alt="failed" className="w-16 h-16 mx-auto mb-6" />
            <button
              onClick={handleReset}
              className="w-full bg-[#2D7A51] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Step 1  Recipient */}
      {step === "recipient" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Recipient Account
            </label>
            <input
              type="text"
              placeholder="Sidonpay Account No./Name"
              value={formData.recipientAccount}
              onChange={(e) => verifyAccount(e.target.value)}
              maxLength={10}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition bg-gray-50 ${
                recipientError ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            />
            {recipientError && (
              <p className="text-xs text-red-500 mt-1">{recipientError}</p>
            )}
            {recipientName && !recipientError && (
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-xs text-green-600 font-medium">{recipientName}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleContinueStep1}
            disabled={isLoading || !recipientName}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              recipientName && !isLoading
                ? "bg-[#2D7A51] text-white hover:bg-green-700"
                : "bg-green-100 text-green-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}

      {/* Step 2  Amount */}
      {step === "amount" && (
        <div className="flex flex-col gap-4">

          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Recipient locked */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Recipient Account
            </label>
            <div className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-green-50">
              <p className="text-sm text-gray-700">{formData.recipientAccount}</p>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <p className="text-xs text-green-600 font-medium">{recipientName}</p>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Amount
            </label>
            <div className={`flex items-center border rounded-lg px-4 py-2.5 bg-gray-50 ${
              amountError ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}>
              <span className="text-gray-500 font-medium mr-2">₦</span>
              <input
                type="number"
                placeholder="10.00 - 5,000,000.00"
                value={formData.amount}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, amount: e.target.value }));
                  setAmountError("");
                }}
                className="bg-transparent text-sm outline-none w-full text-gray-700"
              />
            </div>
            {amountError && (
              <p className="text-xs text-red-500 mt-1">{amountError}</p>
            )}
          </div>

          {/* Quick Amounts */}
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmount(amount)}
                className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 hover:bg-green-50 hover:border-green-400 hover:text-green-600 transition"
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Note
            </label>
            <input
              type="text"
              placeholder="What's this for? (Optional)"
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition bg-gray-50"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinueStep2}
            disabled={isLoading || !formData.amount}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              formData.amount && !isLoading
                ? "bg-[#2D7A51] text-white hover:bg-green-700"
                : "bg-green-100 text-green-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferSidonpay;