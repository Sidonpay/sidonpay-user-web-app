import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Transaction, TransactionFilters, TransactionType, TransactionStatus } from "../../types/wallet";
import { filterTransactions } from "../../utils/walletHelpers";
import TransactionRow from "./TransactionRow";
import TransactionFilterDropdown from "./TransactionFilterDropdown";
import SimpleDatePicker from "./SimpleDatePicker";

interface Props {
  transactions: Transaction[];
}

const QUICK_RANGES: { label: string; value: TransactionFilters["quickRange"] }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
];

const typeLabel: Record<TransactionType, string> = {
  credit: "Credit",
  debit: "Debit",
  funding: "Funding",
  fx: "FX",
};

const TransactionHistory: React.FC<Props> = ({ transactions }) => {
  const [filters, setFilters] = useState<TransactionFilters>({
    search: "",
    quickRange: "7days",
    startDate: null,
    endDate: null,
    types: [],
    statuses: [],
  });

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const removeType = (type: TransactionType) =>
    setFilters((f) => ({ ...f, types: f.types.filter((t) => t !== type) }));

  const removeStatus = (status: TransactionStatus) =>
    setFilters((f) => ({ ...f, statuses: f.statuses.filter((s) => s !== status) }));

  const clearAllChips = () =>
    setFilters((f) => ({ ...f, types: [], statuses: [] }));

  const hasActiveChips = filters.types.length > 0 || filters.statuses.length > 0;

  return (
    <div>
      <p className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
        Transaction History
      </p>

      {/* Search + Date Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for transaction"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-2">
          <SimpleDatePicker
            label="Start date"
            value={filters.startDate}
            onChange={(date) => setFilters((f) => ({ ...f, startDate: date }))}
          />
          <SimpleDatePicker
            label="End date"
            value={filters.endDate}
            onChange={(date) => setFilters((f) => ({ ...f, endDate: date }))}
          />
          <TransactionFilterDropdown
            selectedTypes={filters.types}
            selectedStatuses={filters.statuses}
            onApply={(types, statuses) => setFilters((f) => ({ ...f, types, statuses }))}
          />
        </div>
      </div>

      {/* Quick Range Chips */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {QUICK_RANGES.map((range) => (
          <button
            key={range.label}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                quickRange: f.quickRange === range.value ? null : range.value,
              }))
            }
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filters.quickRange === range.value
                ? "bg-[#2D7A51] border-[#2D7A51] text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Active Filter Chips */}
      {hasActiveChips && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {filters.types.map((type) => (
            <span
              key={type}
              className="flex items-center gap-1 text-xs font-medium bg-[#E0F3E9] text-[#2D7A51] px-3 py-1 rounded-full"
            >
              {typeLabel[type]}
              <button onClick={() => removeType(type)} className="hover:text-red-500">
                ×
              </button>
            </span>
          ))}
          {filters.statuses.map((status) => (
            <span
              key={status}
              className="flex items-center gap-1 text-xs font-medium bg-[#E0F3E9] text-[#2D7A51] px-3 py-1 rounded-full"
            >
              {status}
              <button onClick={() => removeStatus(status)} className="hover:text-red-500">
                ×
              </button>
            </span>
          ))}
          <button
            onClick={clearAllChips}
            className="text-xs font-medium text-gray-500 hover:text-red-500 px-2"
          >
            Clear all ×
          </button>
        </div>
      )}

      {/* Transaction List */}
      <div className="flex flex-col gap-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
        ) : (
          <p className="text-sm text-gray-400 text-center py-10">
            Your transactions will appear here
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;