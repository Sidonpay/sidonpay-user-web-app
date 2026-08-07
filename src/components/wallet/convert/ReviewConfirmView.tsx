import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { ConversionQuote } from "../../../types/wallet";
import { formatMoney } from "../../../utils/currency";

interface ReviewConfirmViewProps {
  quote: ConversionQuote;
  onBack: () => void;
  onConfirm: () => void;
  onStartOver: () => void;
}

const ReviewConfirmView: React.FC<ReviewConfirmViewProps> = ({
  quote,
  onBack,
  onConfirm,
  onStartOver,
}) => (
  <div className="max-w-xl mx-auto">
    <h3 className="text-base font-bold text-gray-800">Review &amp; Confirm</h3>
    <p className="text-xs text-gray-400 mb-4">
      Confirm the details below to complete your conversion.
    </p>

    <div className="border-2 border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Conversion Summary
        </p>
        <span className="flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> Quote Ready
        </span>
      </div>
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">From</dt>
          <dd className="font-semibold text-gray-800">
            {quote.fromCurrency === "USD" ? "Dollar Wallet" : "Naira Wallet"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">To</dt>
          <dd className="font-semibold text-gray-800">
            {quote.toCurrency === "USD" ? "Dollar Wallet" : "Naira Wallet"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Amount</dt>
          <dd className="font-semibold text-gray-800">
            {formatMoney(quote.amount, quote.fromCurrency)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Rate</dt>
          <dd className="font-semibold text-gray-800">
            1 {quote.fromCurrency} ={" "}
            {quote.appliedRate.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            {quote.toCurrency}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Fee</dt>
          <dd className="font-medium text-gray-500">
            {formatMoney(quote.feeFromCurrency, quote.fromCurrency)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">FX Spread</dt>
          <dd className="font-medium text-gray-500">
            {formatMoney(quote.fxSpread, quote.toCurrency)}
          </dd>
        </div>
      </dl>
      <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-800">You receive</p>
        <p className="text-lg font-bold text-[#2D7A51]">
          {formatMoney(quote.receivable, quote.toCurrency)}
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3 mt-4">
      <CheckCircle2 className="w-4 h-4 text-[#2D7A51] mt-0.5 shrink-0" />
      <p className="text-xs text-gray-600">
        By confirming, you authorise SidonPay to debit{" "}
        {formatMoney(quote.amount, quote.fromCurrency)} from your wallet and credit{" "}
        {formatMoney(quote.receivable, quote.toCurrency)}. Rates are locked at confirmation.
      </p>
    </div>

    <div className="flex gap-3 mt-5">
      <button
        type="button"
        onClick={onBack}
        className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl px-5 py-3 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="flex-1 flex items-center justify-center gap-2 bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-5 py-3 hover:bg-green-700 transition-colors"
      >
        <CheckCircle2 className="w-4 h-4" /> Confirm Conversion
      </button>
    </div>

    <button
      type="button"
      onClick={onStartOver}
      className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
    >
      ← Start over
    </button>
  </div>
);

export default ReviewConfirmView;