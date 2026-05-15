import { useState } from "react";
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, Search, Loader } from "lucide-react";
import ThumbsUpIcon from "../assets/thumbs-up-icon.png";
import SadFaceIcon from "../assets/sad-face-icon.png";

type Step = "recipient" | "amount";
type ModalType = "success" | "failed" | "cooldown" | null;

interface Bank {
  name: string;
  logo: string;
  code: string;
}

interface FormData {
  accountNumber: string;
  amount: string;
  note: string;
}

interface TransferLocalBankProps {
  onStepChange?: (step: Step) => void;
}

const banks: Bank[] = [
  { name: "Access Bank", logo: "https://nbl.xyz/library/access-bank.svg", code: "044" },
  { name: "Ecobank Nigeria", logo: "https://nbl.xyz/library/ecobank.svg", code: "050" },
  { name: "Fidelity Bank", logo: "https://nbl.xyz/library/fidelity-bank.svg", code: "070" },
  { name: "First Bank of Nigeria", logo: "https://nbl.xyz/library/first-bank.svg", code: "011" },
  { name: "FCMB", logo: "https://nbl.xyz/library/fcmb.svg", code: "214" },
  { name: "GTBank Plc", logo: "https://nbl.xyz/library/guaranty-trust-bank.svg", code: "058" },
  { name: "Keystone Bank", logo: "https://nbl.xyz/library/keystone-bank.svg", code: "082" },
  { name: "Kuda Bank", logo: "https://nbl.xyz/library/kuda.svg", code: "90267" },
  { name: "Moniepoint MFB", logo: "https://nbl.xyz/library/moniepoint.svg", code: "50515" },
  { name: "OPay", logo: "https://nbl.xyz/library/opay.svg", code: "999992" },
  { name: "Palmpay", logo: "https://nbl.xyz/library/palmpay.svg", code: "999991" },
  { name: "Polaris Bank", logo: "https://nbl.xyz/library/polaris-bank.svg", code: "076" },
  { name: "Providus Bank", logo: "https://nbl.xyz/library/providus-bank.svg", code: "101" },
  { name: "Stanbic IBTC Bank", logo: "https://nbl.xyz/library/stanbic-ibtc.svg", code: "221" },
  { name: "Sterling Bank", logo: "https://nbl.xyz/library/sterling-bank.svg", code: "232" },
  { name: "Union Bank", logo: "https://nbl.xyz/library/union-bank.svg", code: "032" },
  { name: "United Bank for Africa (UBA)", logo: "https://nbl.xyz/library/uba.svg", code: "033" },
  { name: "Unity Bank", logo: "https://nbl.xyz/library/unity-bank.svg", code: "215" },
  { name: "Wema Bank", logo: "https://nbl.xyz/library/wema-bank.svg", code: "035" },
  { name: "Zenith Bank Plc", logo: "https://nbl.xyz/library/zenith-bank.svg", code: "057" },
  { name: "Jaiz Bank", logo: "https://nbl.xyz/library/jaiz-bank.svg", code: "301" },
  { name: "Lotus Bank", logo: "https://nbl.xyz/library/lotus-bank.svg", code: "303" },
  { name: "Taj Bank", logo: "https://nbl.xyz/library/taj-bank.svg", code: "302" },
  { name: "VFD MFB", logo: "https://nbl.xyz/library/vfd.svg", code: "566" },
  { name: "Citibank Nigeria", logo: "https://nbl.xyz/library/citibank.svg", code: "023" },
  { name: "Standard Chartered", logo: "https://nbl.xyz/library/standard-chartered.svg", code: "068" },
  { name: "Heritage Bank", logo: "https://nbl.xyz/library/heritage-bank.svg", code: "030" },
  { name: "SunTrust Bank", logo: "https://nbl.xyz/library/suntrust-bank.svg", code: "100" },
  { name: "Titan Trust Bank", logo: "https://nbl.xyz/library/titan-trust-bank.svg", code: "102" },
  { name: "Parallex Bank", logo: "https://nbl.xyz/library/parallex-bank.svg", code: "526" },
];

const mockAccountNames: Record<string, string> = {
  "0123456789": "Pauline Jackson",
  "0987654321": "John Adewale",
  "0111222333": "Mary Johnson",
  "0123455555": "Samuel Peters",
  "0198765432": "Grace Okafor",
  "0123456780": "David Nwosu",
};

const quickAmounts = ["₦1,000", "₦2,000", "₦5,000", "₦10,000", "₦50,000"];

const BankLogo = ({ bank, size = "w-6 h-6" }: { bank: Bank; size?: string }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${size} rounded-full bg-[#2D7A51] flex items-center justify-center shrink-0`}>
        <span className="text-white text-xs font-bold">
          {bank.name.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={bank.logo}
      alt={bank.name}
      className={`${size} rounded-full object-contain shrink-0 bg-white p-0.5`}
      onError={() => setImgError(true)}
    />
  );
};

const TransferLocalBank: React.FC<TransferLocalBankProps> = ({ onStepChange }) => {
  const [step, setStep] = useState<Step>("recipient");
  const [formData, setFormData] = useState<FormData>({
    accountNumber: "",
    amount: "",
    note: "",
  });
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [detectedBank, setDetectedBank] = useState<Bank | null>(null);
  const [accountName, setAccountName] = useState<string>("");
  const [isDetectingBank, setIsDetectingBank] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [bankSearch, setBankSearch] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [failCount, setFailCount] = useState<number>(0);

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleAccountNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, accountNumber: value }));
    setDetectedBank(null);
    setAccountName("");
    setSelectedBank(null);

    if (value.length === 10) {
      setIsDetectingBank(true);
      setTimeout(() => {
        setIsDetectingBank(false);
        const prefix = value.substring(0, 3);
        const bankMap: Record<string, string> = {
          "012": "058",
          "098": "033",
          "011": "011",
          "019": "057",
          "023": "044",
        };
        const detectedCode = bankMap[prefix];
        const found = banks.find((b) => b.code === detectedCode);
        if (found) setDetectedBank(found);
      }, 1000);
    }
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setShowDropdown(false);
    setBankSearch("");
    setAccountName("");

    if (formData.accountNumber.length === 10) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        const found = mockAccountNames[formData.accountNumber];
        setAccountName(found || "Account Holder");
      }, 1500);
    }
  };

  const handleContinueStep1 = () => {
    if (!accountName || !selectedBank) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("amount");
      onStepChange?.("amount");
    }, 1500);
  };

  const handleBack = () => {
    setStep("recipient");
    onStepChange?.("recipient");
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
      if (isSuccess) {
        setFailCount(0);
        setModal("success");
      } else {
        const newFailCount = failCount + 1;
        setFailCount(newFailCount);
        if (newFailCount >= 3) {
          setModal("cooldown");
        } else {
          setModal("failed");
        }
      }
    }, 2000);
  };
      
   const handleTryAgain = () => {
    // Go back to amount step NOT recipient step
    setModal(null);
    setFormData((prev) => ({ ...prev, amount: "", note: "" }));
    setAmountError("");
  };

  const handleReset = () => {
    setStep("recipient");
    onStepChange?.("recipient");
    setFormData({ accountNumber: "", amount: "", note: "" });
    setSelectedBank(null);
    setDetectedBank(null);
    setAccountName("");
    setAmountError("");
    setModal(null);
    setFailCount(0);
  };

  return (
    <div className="w-full">

      {/* Success Modal */}
      {modal === "success" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transfer successful</h3>
            <p className="text-sm text-gray-500 mb-4">
              Money is on its way to {accountName}
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
           
        {modal === "cooldown" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Transaction failed</h3>
          <p className="text-sm text-gray-500 mb-4">
          You have exceeded the maximum number of attempts.
          Please try again after <span className="font-bold text-red-500">15 minutes</span>.
         </p>
          <img src={SadFaceIcon} alt="failed" className="w-16 h-16 mx-auto mb-6" />
          <button
           onClick={handleReset}
            className="w-full bg-[#2D7A51] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
          Back to Transfer
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
              onClick={handleTryAgain}
              className="w-full bg-[#2D7A51] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}


      {/* Step 1 - Recipient */}
      {step === "recipient" && (
        <div className="flex flex-col gap-4">

          {/* Account Number */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Recipient Account
            </label>
            <input
              type="text"
              placeholder="Enter 10 Digits Account Number"
              value={formData.accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              maxLength={10}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition bg-gray-50"
            />

            {/* Detecting bank */}
            {isDetectingBank && (
              <div className="flex items-center gap-2 mt-2">
                <Loader className="w-3 h-3 text-gray-400 animate-spin" />
                <p className="text-xs text-gray-400">Matching bank</p>
              </div>
            )}

            {/* Detected bank */}
            {detectedBank && !isDetectingBank && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <BankLogo bank={detectedBank} />
                <p className="text-xs text-gray-700 font-medium">{detectedBank.name}</p>
              </div>
            )}
          </div>

          {/* Bank Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-sm transition hover:border-green-400"
            >
              {selectedBank ? (
                <div className="flex items-center gap-2">
                  <BankLogo bank={selectedBank} />
                  <span className="text-gray-700">{selectedBank.name}</span>
                </div>
              ) : (
                <span className="text-gray-400">Select Bank</span>
              )}
              {showDropdown ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {/* Dropdown List */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto mt-1">

                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 sticky top-0 bg-white">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                    className="text-sm outline-none w-full text-gray-600 placeholder:text-gray-400"
                  />
                </div>

                {/* Banks List */}
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.code}
                    onClick={() => handleBankSelect(bank)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-green-50 transition ${
                      selectedBank?.code === bank.code ? "bg-green-50" : ""
                    }`}
                  >
                    <BankLogo bank={bank} size="w-7 h-7" />
                    <span className="text-gray-700">{bank.name}</span>
                  </button>
                ))}

                {filteredBanks.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">No bank found</p>
                )}
              </div>
            )}
          </div>

          {/* Verifying */}
          {isVerifying && (
            <div className="flex items-center gap-2">
              <Loader className="w-3 h-3 text-gray-400 animate-spin" />
              <p className="text-xs text-gray-400">Verifying account details</p>
            </div>
          )}

          {/* Account Name */}
          {accountName && !isVerifying && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-xs text-green-600 font-medium">{accountName}</p>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinueStep1}
            disabled={isLoading || !accountName || !selectedBank}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              accountName && selectedBank && !isLoading
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

      {/* Step 2 - Amount */}
      {step === "amount" && (
        <div className="flex flex-col gap-4">

          {/* Back Arrow */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Recipient Summary Card */}
          <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-gray-500">
                  {accountName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{accountName}</p>
                <p className="text-xs text-gray-400">{formData.accountNumber}</p>
              </div>
            </div>
            {selectedBank && (
              <div className="flex items-center gap-2">
                <BankLogo bank={selectedBank} size="w-6 h-6" />
                <p className="text-xs text-gray-600 hidden sm:block">{selectedBank.name}</p>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Amount</label>
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
            <label className="text-xs font-medium text-gray-600 mb-1 block">Note</label>
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

export default TransferLocalBank;