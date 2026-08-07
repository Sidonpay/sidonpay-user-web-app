import { ArrowLeftRight } from "lucide-react";
import type { LiveRate } from "../../types/wallet";

interface Props {
  ngnBalance: number;
  liveRate: LiveRate;
  onConvert: () => void;
}

const ConversionSidePanel: React.FC<Props> = ({ ngnBalance, liveRate, onConvert }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-gray-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs text-gray-400">NGN Wallet</p>
        <p className="text-lg font-bold text-gray-800 mt-1">
          ₦{ngnBalance.toLocaleString(undefined, { minimumFractionDigits: 0 })}
        </p>
        <button
          onClick={onConvert}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-[#2D7A51] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-green-700 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Convert USD → NGN
        </button>
      </div>

      <div className="border-2 border-gray-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-bold text-[#2D7A51] uppercase tracking-wide">Live Rate</p>
        <p className="text-base font-bold text-gray-800 mt-2">
          1 USD = ₦{liveRate.usdToNgn.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Updated {liveRate.updatedAgo}</p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-gray-400">Conversion fee</span>
          <span className="font-semibold text-gray-800">{liveRate.conversionFeePercent}%</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-400">Processing time</span>
          <span className="font-semibold text-gray-800">{liveRate.processingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversionSidePanel;