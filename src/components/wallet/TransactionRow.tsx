import { ArrowDown, ArrowUp, ArrowLeftRight } from "lucide-react";
import type { Transaction } from "../../types/wallet";
import { formatCurrency } from "../../utils/walletHelpers";

const statusStyles: Record<Transaction["status"], string> = {
  Successful: "bg-green-50 text-green-600",
  Pending: "bg-yellow-50 text-yellow-600",
  Failed: "bg-red-50 text-red-600",
  Reversed: "bg-purple-50 text-purple-600",
};

const TransactionIcon: React.FC<{ type: Transaction["type"] }> = ({ type }) => {
  if (type === "fx") {
    return (
      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <ArrowLeftRight className="w-4 h-4 text-blue-500" />
      </div>
    );
  }
  if (type === "credit" || type === "funding") {
    return (
      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <ArrowDown className="w-4 h-4 text-green-500" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
      <ArrowUp className="w-4 h-4 text-red-500" />
    </div>
  );
};

const TransactionRow: React.FC<{ tx: Transaction }> = ({ tx }) => {
  return (
    <div className="p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">

      {/* ── DESKTOP / TABLET: single-line, fixed columns, pixel-matches Figma ── */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-3 w-[260px] shrink-0 min-w-0">
          <TransactionIcon type={tx.type} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{tx.description}</p>
            <p className="text-xs text-gray-400 truncate">{tx.subLabel}</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 capitalize w-20 shrink-0">{tx.type}</div>
        <div className="text-xs text-gray-400 w-32 shrink-0 truncate">{tx.txnId}</div>
        <div className="text-xs text-gray-400 w-28 shrink-0">{tx.displayDate}</div>

        <div className="flex flex-col items-end w-32 shrink-0">
          <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
            {formatCurrency(tx.amount, tx.currency)}
          </p>
          {tx.subAmount !== undefined && tx.subCurrency && (
            <p className="text-xs text-gray-400 whitespace-nowrap">
              {formatCurrency(tx.subAmount, tx.subCurrency)}
            </p>
          )}
        </div>

        <div className="w-28 shrink-0 flex justify-end">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[tx.status]}`}
          >
            {tx.status}
          </span>
        </div>
      </div>

      {/* ── MOBILE: stacked card layout ── */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <TransactionIcon type={tx.type} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{tx.description}</p>
            <p className="text-xs text-gray-400 truncate">{tx.subLabel}</p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
              {formatCurrency(tx.amount, tx.currency)}
            </p>
            {tx.subAmount !== undefined && tx.subCurrency && (
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {formatCurrency(tx.subAmount, tx.subCurrency)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-50 flex-wrap">
          <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
            <span className="capitalize text-gray-500">{tx.type}</span>
            <span>{tx.displayDate}</span>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[tx.status]}`}
          >
            {tx.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;