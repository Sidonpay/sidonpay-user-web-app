
import { X, ChevronRight, TrendingUp, TrendingDown, Shield } from "lucide-react";

interface Props {
  dailyLimit: string;
  monthlyLimit: string;
  maxBalance: string;
  onClose: () => void;
}

const TransactionLimitsModal = ({ dailyLimit, monthlyLimit, maxBalance, onClose }: Props) => {
  const limits = [
    {
      icon: <TrendingUp size={18} className="text-[#1a6b3c]" />,
      title: "Daily Transaction Limit",
      subtitle: "Maximum amount you can transact per day",
      amount: dailyLimit,
      cap: dailyLimit,
      percent: 100,
    },
    {
      icon: <TrendingDown size={18} className="text-[#1a6b3c]" />,
      title: "Monthly Transaction Limit",
      subtitle: "Maximum amount you can transact per month",
      amount: monthlyLimit,
      cap: monthlyLimit,
      percent: 100,
    },
    {
      icon: <Shield size={18} className="text-[#1a6b3c]" />,
      title: "Maximum Wallet Balance",
      subtitle: "Maximum balance you can hold in your wallet",
      amount: maxBalance,
      cap: maxBalance,
      percent: 100,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center">
            <Shield size={20} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Transaction Limits</p>
            <p className="text-xs text-gray-400">Tier 1 limits apply</p>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2 bg-[#e8f5ee] border border-[#c5e0ce] rounded-xl px-4 py-3 mb-5">
          <span className="text-[#1a6b3c] mt-0.5 shrink-0">ℹ️</span>
          <p className="text-xs text-[#1a6b3c] leading-relaxed">
            You can set limits up to your Tier 1 maximum. Upgrade your tier to unlock higher limits.
          </p>
        </div>

        {/* Limit rows */}
        <div className="flex flex-col gap-3">
          {limits.map((limit, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    {limit.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{limit.title}</p>
                    <p className="text-xs text-gray-400">{limit.subtitle}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </div>

              {/* Amount row */}
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-base font-bold text-gray-900">
                  {limit.amount}
                  <span className="text-xs text-gray-400 font-normal ml-1">
                    / {limit.cap} cap
                  </span>
                </p>
                <p className="text-xs text-gray-400">{limit.percent}% of cap</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1a6b3c] rounded-full"
                  style={{ width: `${limit.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionLimitsModal;