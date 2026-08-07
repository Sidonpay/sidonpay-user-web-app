import { useState } from "react";
import { RefreshCw, MessageCircle, History as HistoryIcon } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { WalletCurrency, ConversionQuote, ConversionRecord } from "../types/wallet";
import ConvertForm from "../components/wallet/convert/ConvertForm";
import LiveQuoteView from "../components/wallet/convert/LiveQuoteView";
import QuoteExpiredView from "../components/wallet/convert/QuoteExpiredView";
import ReviewConfirmView from "../components/wallet/convert/ReviewConfirmView";
import ProcessingView from "../components/wallet/convert/ProcessingView";
import SuccessView from "../components/wallet/convert/SuccessView";
import ConvertHistory from "../components/wallet/convert/ConvertHistory";
import AiAssistant from "../components/AiAssistant";

type Tab = "convert" | "history";
type Step = "form" | "quote" | "expired" | "review" | "processing" | "success";

const ConvertPage: React.FC = () => {
  const { usdBalance, ngnBalance, liveRate, conversions, maxConversionUsd, createQuote, confirmConversion } =
    useWallet();

  const [tab, setTab] = useState<Tab>("convert");
  const [step, setStep] = useState<Step>("form");
  const [showAi, setShowAi] = useState<boolean>(false);

  const [fromCurrency, setFromCurrency] = useState<WalletCurrency>("USD");
  const [toCurrency, setToCurrency] = useState<WalletCurrency>("NGN");
  const [amount, setAmount] = useState<string>("");
  const [quote, setQuote] = useState<ConversionQuote | null>(null);
  const [result, setResult] = useState<ConversionRecord | null>(null);

  const balanceFor = (currency: WalletCurrency) =>
    currency === "USD" ? usdBalance : ngnBalance;

  const maxConvertible =
    fromCurrency === "USD" ? maxConversionUsd : maxConversionUsd * liveRate.usdToNgn;

  const numericAmount = parseFloat(amount || "0");

  const error = (() => {
    if (numericAmount <= 0) return null;
    if (numericAmount > balanceFor(fromCurrency)) return "Amount exceeds available balance";
    if (numericAmount > maxConvertible)
      return `Maximum conversion is ${
        fromCurrency === "USD" ? "$5,000" : `₦${maxConvertible.toLocaleString()}`
      }`;
    return null;
  })();

  const midRate = fromCurrency === "USD" ? liveRate.usdToNgn : 1 / liveRate.usdToNgn;
  const estimatedReceivable = numericAmount * midRate;

  const breadcrumbCurrent = (() => {
    if (tab === "history") return "History";
    if (step === "form") return "";
    return "Live Quote";
  })();

  const resetToForm = () => {
    setStep("form");
    setAmount("");
    setQuote(null);
    setResult(null);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount("");
  };

  const handleGetQuote = () => {
    if (numericAmount <= 0 || error) return;
    setQuote(createQuote(fromCurrency, toCurrency, numericAmount));
    setStep("quote");
  };

  const handleRegenerateQuote = () => {
    setQuote(createQuote(fromCurrency, toCurrency, numericAmount));
    setStep("quote");
  };

  const handleConfirmConversion = () => {
    if (!quote) return;
    setStep("processing");
  };

  const handleProcessingComplete = () => {
    if (!quote) return;
    const record = confirmConversion(quote);
    setResult(record);
    setStep("success");
  };

  return (
    <DashboardLayout userName="Freya" breadcrumbParent="Convert" breadcrumbCurrent={breadcrumbCurrent}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {tab === "convert" ? "Convert Currency" : "Convert History"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {tab === "convert"
              ? "Securely convert funds between your NGN and USD wallets."
              : "View conversion transactions between your NGN and USD wallets."}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => {
              setTab("convert");
              resetToForm();
            }}
            className={`flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 transition-colors ${
              tab === "convert" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Convert
          </button>
          <button
            type="button"
            onClick={() => setTab("history")}
            className={`flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 transition-colors ${
              tab === "history" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
            }`}
          >
            <HistoryIcon className="w-3.5 h-3.5" /> History
          </button>
        </div>
      </div>

      {tab === "history" ? (
        <ConvertHistory
          conversions={conversions}
          onNewConversion={() => {
            setTab("convert");
            resetToForm();
          }}
        />
      ) : (
        <>
          {step === "form" && (
            <ConvertForm
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              usdBalance={usdBalance}
              ngnBalance={ngnBalance}
              midRate={midRate}
              estimatedReceivable={estimatedReceivable}
              maxConvertible={maxConvertible}
              error={error}
              onChangeFrom={(c) => {
                setFromCurrency(c);
                if (c === toCurrency) setToCurrency(fromCurrency);
              }}
              onChangeTo={(c) => {
                setToCurrency(c);
                if (c === fromCurrency) setFromCurrency(toCurrency);
              }}
              onSwap={handleSwap}
              onChangeAmount={setAmount}
              onMax={() =>
                setAmount(Math.min(balanceFor(fromCurrency), maxConvertible).toFixed(2))
              }
              onSubmit={handleGetQuote}
              onRefreshRate={() => {
              }}
            />
          )}

          {step === "quote" && quote && (
            <LiveQuoteView
              quote={quote}
              onBack={() => setStep("form")}
              onConfirm={() => setStep("review")}
              onExpire={() => setStep("expired")}
            />
          )}

          {step === "expired" && (
            <QuoteExpiredView onBack={() => setStep("form")} onRetry={handleRegenerateQuote} />
          )}

          {step === "review" && quote && (
            <ReviewConfirmView
              quote={quote}
              onBack={() => setStep("quote")}
              onConfirm={handleConfirmConversion}
              onStartOver={resetToForm}
            />
          )}

          {step === "processing" && quote && (
            <ProcessingView
              fromCurrency={quote.fromCurrency}
              toCurrency={quote.toCurrency}
              onComplete={handleProcessingComplete}
            />
          )}

          {step === "success" && result && quote && (
            <SuccessView
              record={result}
              feeFromCurrency={quote.feeFromCurrency}
              fxSpread={quote.fxSpread}
              onBackToWallet={resetToForm}
              onStartOver={resetToForm}
            />
          )}
        </>
      )}

      {/* Floating AI Assistant button */}
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

export default ConvertPage;