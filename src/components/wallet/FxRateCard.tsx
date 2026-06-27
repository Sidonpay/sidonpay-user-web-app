
import { RefreshCw, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  pair: string;
  rate: number;
  changeValue: number;
  changePercent: number;
  updatedAt: string;
}

const FxRateCard: React.FC<Props> = ({ pair, rate, changeValue, changePercent, updatedAt }) => {
  const isNegative = changeValue < 0;

  return (
    <div className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 mb-6">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold text-[#2D7A51] bg-[#E0F3E9] px-1.5 py-0.5 rounded">
            FX
          </span>
          <p className="text-xs text-gray-400">{pair}</p>
        </div>
        <p className="text-base font-bold text-gray-800">
          ₦{rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="text-right">
        <div
          className={`flex items-center justify-end gap-1 text-xs font-medium ${
            isNegative ? "text-red-500" : "text-green-600"
          }`}
        >
          {isNegative ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
          {changeValue.toFixed(2)} ({changePercent.toFixed(2)}%)
        </div>
        <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mt-0.5">
          Updated {updatedAt}
          <RefreshCw size={11} className="cursor-pointer hover:text-[#2D7A51]" />
        </div>
      </div>
    </div>
  );
};

export default FxRateCard;