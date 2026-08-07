import { ArrowUpDown, RefreshCw, Clock, TrendingUp } from "lucide-react";
import type { WalletCurrency } from "../../../types/wallet";
import { currencyFlag, formatMoney } from "../../../utils/currency";
import WalletSelect from "./WalletSelect";

interface ConvertFormProps {
  fromCurrency: WalletCurrency;
  toCurrency: WalletCurrency;
  amount: string;
  usdBalance: number;
  ngnBalance: number;
  midRate: number;
  estimatedReceivable: number;
  maxConvertible: number;
  error: string | null;
  onChangeFrom: (currency: WalletCurrency) => void;
  onChangeTo: (currency: WalletCurrency) => void;
  onSwap: () => void;
  onChangeAmount: (value: string) => void;
  onMax: () => void;
  onSubmit: () => void;
  onRefreshRate: () => void;
}

const ConvertForm: React.FC<ConvertFormProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  usdBalance,
  ngnBalance,
  midRate,
  estimatedReceivable,
  maxConvertible,
  error,
  onChangeFrom,
  onChangeTo,
  onSwap,
  onChangeAmount,
  onMax,
  onSubmit,
  onRefreshRate,
}) => {
  const fromBalance = fromCurrency === "USD" ? usdBalance : ngnBalance;
  const numericAmount = parseFloat(amount || "0");
  const canSubmit = numericAmount > 0 && !error;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            From
          </p>
          <WalletSelect
            value={fromCurrency}
            otherValue={toCurrency}
            usdBalance={usdBalance}
            ngnBalance={ngnBalance}
            onChange={onChangeFrom}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSwap}
            aria-label="Swap currencies"
            className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-green-100 bg-white hover:bg-green-50 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 text-[#2D7A51]" />
          </button>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            To
          </p>
          <WalletSelect
            value={toCurrency}
            otherValue={fromCurrency}
            usdBalance={usdBalance}
            ngnBalance={ngnBalance}
            onChange={onChangeTo}
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Amount
          </p>
          <div
            className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 transition-colors ${
              error ? "border-red-400" : "border-gray-200 focus-within:border-gray-300"
            }`}
          >
            <span className="text-sm font-semibold text-gray-500">
              {fromCurrency === "USD" ? "$" : "₦"}
            </span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(val)) onChangeAmount(val);
              }}
              className="flex-1 outline-none text-base font-semibold text-gray-800 bg-transparent"
            />
            <button
              type="button"
              onClick={onMax}
              className="text-xs font-semibold text-[#2D7A51] border border-[#2D7A51]/30 bg-green-50 rounded-full px-3 py-1 hover:bg-green-100 transition-colors"
            >
              MAX
            </button>
          </div>

          <div className="flex items-center justify-between mt-1.5 text-xs text-gray-400">
            <span>Available · {formatMoney(fromBalance, fromCurrency)}</span>
            <span>Max {formatMoney(maxConvertible, fromCurrency)}</span>
          </div>

          {error && <p className="text-xs font-medium text-red-500 mt-1.5">{error}</p>}

          <p className="text-xs text-gray-400 mt-3">
            Secured by bank-grade encryption · Mid-market rate applied
          </p>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-5 py-3.5 transition-colors ${
            canSubmit
              ? "bg-[#2D7A51] text-white hover:bg-green-700"
              : "bg-[#6FA98A] text-white cursor-not-allowed"
          }`}
        >
          Get Live Quote →
        </button>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Exchange Rate
            </p>
            <button
              type="button"
              onClick={onRefreshRate}
              className="flex items-center gap-1 text-xs font-semibold text-[#2D7A51] hover:text-green-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <span className="flex items-center gap-1">
              {currencyFlag(fromCurrency)} 1 {fromCurrency}
            </span>
            <TrendingUp className="w-4 h-4 text-[#2D7A51]" />
            <span className="flex items-center gap-1">
              {currencyFlag(toCurrency)}{" "}
              {midRate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCurrency}
            </span>
          </div>
          <div className="border-t border-gray-100 my-3" />
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" /> Updated just now
          </p>
        </div>

        <div className="border-2 border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Estimated Receivable
          </p>
          <p className="text-2xl font-bold text-[#2D7A51]">
            {formatMoney(numericAmount > 0 ? estimatedReceivable : 0, toCurrency)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Before fees &amp; spread. Final amount shown on quote.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConvertForm;