import { useEffect, useState } from "react";
import { RefreshCw, ArrowLeft, Clock, TrendingUp } from "lucide-react";
import type { ConversionQuote } from "../../../types/wallet";
import { formatMoney, currencyFlag } from "../../../utils/currency";

interface LiveQuoteViewProps {
  quote: ConversionQuote;
  onBack: () => void;
  onConfirm: () => void;
  onExpire: () => void;
}

const LiveQuoteView: React.FC<LiveQuoteViewProps> = ({
  quote,
  onBack,
  onConfirm,
  onExpire,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(0, Math.round((quote.expiresAt - Date.now()) / 1000))
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onExpire]);

  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="max-w-xl mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <h3 className="text-base font-bold text-gray-800">Live FX Quote</h3>
      <p className="text-xs text-gray-400 mb-4">Review your transparent conversion quote.</p>

      <div className="border-2 border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Exchange Rate
          </p>
          <button
            type="button"
            onClick={onExpire}
            className="flex items-center gap-1 text-xs font-semibold text-[#2D7A51] hover:text-green-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="flex items-center gap-1">
            {currencyFlag(quote.fromCurrency)} 1 {quote.fromCurrency}
          </span>
          <TrendingUp className="w-4 h-4 text-[#2D7A51]" />
          <span className="flex items-center gap-1">
            {currencyFlag(quote.toCurrency)}{" "}
            {quote.appliedRate.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
            {quote.toCurrency}
          </span>
        </div>
        <div className="border-t border-gray-100 my-3" />
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" /> Updated just now
          </p>
          <p className="text-xs font-medium text-amber-600">
            Quote valid {mm}:{ss}
          </p>
        </div>
      </div>

      <div className="border-2 border-gray-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Conversion Breakdown
        </p>
        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">You convert</dt>
            <dd className="font-semibold text-gray-800">
              {formatMoney(quote.amount, quote.fromCurrency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Exchange rate</dt>
            <dd className="font-semibold text-gray-800">
              1 {quote.fromCurrency} ={" "}
              {quote.appliedRate.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
              {quote.toCurrency}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">FX spread</dt>
            <dd className="font-medium text-gray-500">
              −{formatMoney(quote.fxSpread, quote.toCurrency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Conversion fee</dt>
            <dd className="font-medium text-gray-500">
              {formatMoney(quote.feeFromCurrency, quote.fromCurrency)} ·{" "}
              {formatMoney(quote.feeToCurrency, quote.toCurrency)}
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
          className="flex-1 bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-5 py-3 hover:bg-green-700 transition-colors"
        >
          Review &amp; Confirm →
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
      >
        ← Start over
      </button>
    </div>
  );
};

export default LiveQuoteView;