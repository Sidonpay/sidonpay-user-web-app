import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Circle } from "lucide-react";
import type { WalletCurrency } from "../../../types/wallet";

interface ProcessingViewProps {
  fromCurrency: WalletCurrency;
  toCurrency: WalletCurrency;
  onComplete: () => void;
}

const STEPS = [
  "Validating wallet balance",
  "Running compliance checks",
  "Applying exchange rate",
  "Settling to destination wallet",
  "Generating receipt",
];

const STEP_DELAY_MS = 700;

const ProcessingView: React.FC<ProcessingViewProps> = ({
  fromCurrency,
  toCurrency,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      const finish = setTimeout(onComplete, STEP_DELAY_MS);
      return () => clearTimeout(finish);
    }
    const timer = setTimeout(() => setActiveStep((s) => s + 1), STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [activeStep, onComplete]);

  return (
    <div className="flex flex-col items-center text-center py-16">
      <Loader2 className="w-9 h-9 text-[#2D7A51] animate-spin mb-4" />
      <h3 className="text-base font-bold text-gray-800">Processing your conversion</h3>
      <p className="text-xs text-gray-400 mb-6">
        {fromCurrency} → {toCurrency} · Please keep this window open.
      </p>

      <ul className="space-y-2.5 text-left w-full max-w-xs">
        {STEPS.map((label, i) => {
          const done = i < activeStep;
          const current = i === activeStep;
          return (
            <li key={label} className="flex items-center gap-2.5">
              {done ? (
                <CheckCircle2 className="w-4 h-4 text-[#2D7A51] shrink-0" />
              ) : current ? (
                <Loader2 className="w-4 h-4 text-[#2D7A51] animate-spin shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
              <span
                className={`text-sm ${
                  done || current
                    ? "font-medium text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProcessingView;