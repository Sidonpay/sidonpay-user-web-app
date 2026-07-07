import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Shield,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { SavedCard, CardNetwork, CardType } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

interface FormState {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  saveForFuture: boolean;
}

interface FormErrors {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
}

const detectNetwork = (number: string): CardNetwork => {
  const cleaned = number.replace(/\s/g, "");
  if (cleaned.startsWith("4")) return "visa";
  if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard";
  return "verve";
};

const detectCardType = (number: string): CardType => {
  const cleaned = number.replace(/\s/g, "");
  if (cleaned.startsWith("5")) return "credit";
  return "debit";
};

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 16);
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  return cleaned;
};

const generateId = (): string =>
  `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const networkLogo = (network: CardNetwork) => {
  if (network === "visa") {
    return (
      <span className="text-white font-extrabold italic text-lg tracking-tight">
        VISA
      </span>
    );
  }
  if (network === "mastercard") {
    return (
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
        <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90 -ml-3" />
      </div>
    );
  }
  return (
    <span className="text-white font-bold text-sm tracking-widest">VERVE</span>
  );
};

const AddCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCard } = useWallet();

  const [form, setForm] = useState<FormState>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    saveForFuture: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [showAi, setShowAi] = useState<boolean>(false);

  const cleanCardNumber = form.cardNumber.replace(/\s/g, "");
  const network = detectNetwork(form.cardNumber);
  const cardType = detectCardType(form.cardNumber);

  const previewNumber =
    cleanCardNumber.length > 0
      ? cleanCardNumber.padEnd(16, "•").replace(/(.{4})/g, "$1 ").trim()
      : "•••• •••• •••• ••••";
  const previewName = form.cardholderName.trim() || "YOUR NAME";
  const previewExpiry = form.expiryDate || "MM/YY";

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (cleanCardNumber.length !== 16) {
      errs.cardNumber = "Enter a valid 16-digit card number.";
    }
    if (!form.cardholderName.trim()) {
      errs.cardholderName = "Cardholder name is required.";
    }
    const expiryMatch = form.expiryDate.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      errs.expiryDate = "Enter expiry in MM/YY format.";
    } else {
      const month = parseInt(expiryMatch[1]);
      if (month < 1 || month > 12)
        errs.expiryDate = "Enter expiry in MM/YY format.";
    }
    const cleanCvv = form.cvv.replace(/\D/g, "");
    if (cleanCvv.length < 3 || cleanCvv.length > 4) {
      errs.cvv = "Enter a valid CVV.";
    }
    return errs;
  };

  const isFormValid = Object.keys(validate()).length === 0;

  const handleChange = (
    field: keyof FormState,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const getFieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  const handleSubmit = () => {
    setTouched({
      cardNumber: true,
      cardholderName: true,
      expiryDate: true,
      cvv: true,
    });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newCard: SavedCard = {
      id: generateId(),
      last4: cleanCardNumber.slice(-4),
      cardholderName: form.cardholderName.trim().toUpperCase(),
      expiryDate: form.expiryDate,
      network,
      cardType,
      isDefault: false,
    };

    addCard(newCard);
    setSuccess(true);

    setTimeout(() => {
      navigate("/manage-cards");
    }, 1500);
  };

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Add Card"
    >
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <h1 className="text-xl font-bold text-gray-800 mb-1">Add Card</h1>
        <p className="text-sm text-gray-400 mb-6">
          Securely add a debit or credit card
        </p>

        {/* Success state */}
        {success ? (
          <div className="bg-[#EEF7F0] border border-green-200 rounded-2xl flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 size={24} className="text-[#2D7A51]" />
            </div>
            <p className="text-base font-bold text-gray-800 mb-1">
              Card added successfully
            </p>
            <p className="text-xs text-gray-500">
              Card ending with {cleanCardNumber.slice(-4)} has been saved!
            </p>
          </div>
        ) : (
          <>
            {/* Live card preview */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white mb-6">
              <div className="flex items-center justify-between mb-6">
                <CreditCard size={22} className="text-white/80" />
                {networkLogo(network)}
              </div>
              <p className="text-lg font-mono tracking-[0.18em] mb-5">
                {previewNumber}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">
                    Card Holder
                  </p>
                  <p className="text-sm font-semibold uppercase">
                    {previewName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">
                    Expires
                  </p>
                  <p className="text-sm font-semibold">{previewExpiry}</p>
                </div>
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={(e) =>
                  handleChange("cardNumber", formatCardNumber(e.target.value))
                }
                onBlur={() => handleBlur("cardNumber")}
                placeholder="0000 0000 0000 0000"
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  getFieldError("cardNumber")
                    ? "border-red-400 bg-red-50 text-red-700"
                    : "border-gray-200 focus:border-[#2D7A51]"
                }`}
              />
              {getFieldError("cardNumber") && (
                <p className="text-xs text-red-500 mt-1">
                  ⊘ {getFieldError("cardNumber")}
                </p>
              )}
            </div>

            {/* Cardholder Name */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Cardholder Name
              </label>
              <input
                type="text"
                value={form.cardholderName}
                onChange={(e) =>
                  handleChange(
                    "cardholderName",
                    e.target.value.toUpperCase()
                  )
                }
                onBlur={() => handleBlur("cardholderName")}
                placeholder="AS IT APPEARS ON YOUR CARD"
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                  getFieldError("cardholderName")
                    ? "border-red-400 bg-red-50 text-red-700"
                    : "border-gray-200 focus:border-[#2D7A51]"
                }`}
              />
              {getFieldError("cardholderName") && (
                <p className="text-xs text-red-500 mt-1">
                  ⊘ {getFieldError("cardholderName")}
                </p>
              )}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.expiryDate}
                  onChange={(e) =>
                    handleChange("expiryDate", formatExpiry(e.target.value))
                  }
                  onBlur={() => handleBlur("expiryDate")}
                  placeholder="MM/YY"
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                    getFieldError("expiryDate")
                      ? "border-red-400 bg-red-50 text-red-700"
                      : "border-gray-200 focus:border-[#2D7A51]"
                  }`}
                />
                {getFieldError("expiryDate") && (
                  <p className="text-xs text-red-500 mt-1">
                    ⊘ {getFieldError("expiryDate")}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  CVV
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={(e) =>
                    handleChange(
                      "cvv",
                      e.target.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                  onBlur={() => handleBlur("cvv")}
                  placeholder="•••"
                  className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                    getFieldError("cvv")
                      ? "border-red-400 bg-red-50 text-red-700"
                      : "border-gray-200 focus:border-[#2D7A51]"
                  }`}
                />
                {getFieldError("cvv") && (
                  <p className="text-xs text-red-500 mt-1">
                    ⊘ {getFieldError("cvv")}
                  </p>
                )}
              </div>
            </div>

            {/* Save for future use toggle */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Save card for future use
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Securely tokenised — we never store raw card data
                </p>
              </div>
              <button
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    saveForFuture: !prev.saveForFuture,
                  }))
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                  form.saveForFuture ? "bg-[#2D7A51]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.saveForFuture
                      ? "translate-x-5"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Security note */}
            <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
              <Shield size={13} className="text-[#2D7A51]" />
              Secured with 256-bit SSL encryption. PCI DSS compliant.
            </p>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-[#2D7A51] hover:bg-green-700 disabled:bg-[#A8C9B5] disabled:cursor-not-allowed text-white text-sm font-semibold py-3.5 rounded-xl transition-colors"
            >
              Add card
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

export default AddCardPage;