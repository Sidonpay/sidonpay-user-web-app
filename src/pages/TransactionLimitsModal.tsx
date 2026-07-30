import { useState } from "react";
import { X, ChevronRight, TrendingUp, TrendingDown, Shield, Info } from "lucide-react";
import EditLimitModal from "./EditLimitModal";

interface Props {
  dailyLimit: string;
  monthlyLimit: string;
  maxBalance: string;
  onClose: () => void;
}

interface LimitItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  cap: string;
  percent: number;
}

const TransactionLimitsModal = ({
  dailyLimit,
  monthlyLimit,
  maxBalance,
  onClose,
}: Props) => {
  const [editingLimit, setEditingLimit] = useState<LimitItem | null>(null);

  const limits: LimitItem[] = [
    {
      icon: <TrendingUp size={16} className="text-[#1a6b3c]" />,
      title: "Daily Transaction Limit",
      subtitle: "Maximum amount you can transact per day",
      amount: dailyLimit,
      cap: dailyLimit,
      percent: 100,
    },
    {
      icon: <TrendingDown size={16} className="text-[#1a6b3c]" />,
      title: "Monthly Transaction Limit",
      subtitle: "Maximum amount you can transact per month",
      amount: monthlyLimit,
      cap: monthlyLimit,
      percent: 100,
    },
    {
      icon: <Shield size={16} className="text-[#1a6b3c]" />,
      title: "Maximum Wallet Balance",
      subtitle: "Maximum balance you can hold in your wallet",
      amount: maxBalance,
      cap: maxBalance,
      percent: 100,
    },
  ];
  if (editingLimit) {
    return (
      <EditLimitModal
        title={editingLimit.title}
        currentLimit={editingLimit.amount}
        tierCap={editingLimit.cap}
        onBack={() => setEditingLimit(null)}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center shrink-0">
            <Shield size={18} className="text-[#1a6b3c]" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Transaction Limits</p>
            <p className="text-xs text-gray-400">Tier 1 limits apply</p>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2.5 bg-[#e8f5ee] border border-[#c5e0ce] rounded-xl px-4 py-3 mb-5">
          <Info size={14} className="text-[#1a6b3c] mt-0.5 shrink-0" />
          <p className="text-xs text-[#1a6b3c] leading-relaxed">
            You can set limits up to your Tier 1 maximum. Upgrade your tier to
            unlock higher limits.
          </p>
        </div>

        {/* Limit rows */}
        <div className="flex flex-col gap-3">
          {limits.map((limit, i) => (
            <button
              key={i}
              onClick={() => setEditingLimit(limit)}
              className="w-full border border-gray-100 rounded-2xl p-4 text-left hover:border-[#1a6b3c] hover:bg-[#f5faf6] transition-all duration-150 group"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors">
                    {limit.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 text-left">
                      {limit.title}
                    </p>
                    <p className="text-xs text-gray-400 text-left">
                      {limit.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-[#1a6b3c] shrink-0 transition-colors"
                />
              </div>

              {/* Amount and percent */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-base font-bold text-gray-900">
                  {limit.amount}
                  <span className="text-xs text-gray-400 font-normal ml-1.5">
                    / {limit.cap} cap
                  </span>
                </p>
                <p className="text-xs text-gray-400">{limit.percent}% of cap</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1a6b3c] rounded-full transition-all duration-500"
                  style={{ width: `${limit.percent}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionLimitsModal;