import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { WalletCurrency } from "../../../types/wallet";
import { currencyFlag, currencyLabel, formatMoney } from "../../../utils/currency";

interface WalletSelectProps {
  value: WalletCurrency;
  otherValue: WalletCurrency;
  usdBalance: number;
  ngnBalance: number;
  onChange: (currency: WalletCurrency) => void;
}

const WalletSelect: React.FC<WalletSelectProps> = ({
  value,
  otherValue,
  usdBalance,
  ngnBalance,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const balanceFor = (currency: WalletCurrency) =>
    currency === "USD" ? usdBalance : ngnBalance;

  const options: WalletCurrency[] = ["USD", "NGN"];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 border-2 border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 transition-colors bg-white"
      >
        <div className="flex items-center gap-2.5 text-left">
          <span className="text-xl leading-none">{currencyFlag(value)}</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{currencyLabel(value)}</p>
            <p className="text-xs text-gray-400">
              Available · {formatMoney(balanceFor(value), value)}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 w-full bg-white border-2 border-gray-100 rounded-xl shadow-lg overflow-hidden">
          {options.map((currency) => {
            const disabled = currency === otherValue;
            const selected = currency === value;
            return (
              <button
                key={currency}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onChange(currency);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-left transition-colors ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl leading-none">{currencyFlag(currency)}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {currencyLabel(currency)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatMoney(balanceFor(currency), currency)}
                    </p>
                  </div>
                </div>
                {selected && <Check className="w-4 h-4 text-[#2D7A51]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WalletSelect;