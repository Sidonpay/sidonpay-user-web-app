import { useState, useMemo } from "react";
import { Search, History as HistoryIcon, Plus } from "lucide-react";
import type { ConversionRecord, ConversionStatus, WalletCurrency } from "../../../types/wallet";
import { formatMoney, currencyFlag } from "../../../utils/currency";

interface ConvertHistoryProps {
  conversions: ConversionRecord[];
  onNewConversion: () => void;
}

type StatusFilter = "all" | ConversionStatus;
type PairFilter = "all" | "USD-NGN" | "NGN-USD";

const statusStyles: Record<ConversionStatus, string> = {
  successful: "bg-green-50 text-green-600",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-red-50 text-red-500",
  reversed: "bg-gray-100 text-gray-500",
};

const pairKey = (from: WalletCurrency, to: WalletCurrency): PairFilter =>
  `${from}-${to}` as PairFilter;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const ConvertHistory: React.FC<ConvertHistoryProps> = ({ conversions, onNewConversion }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [pairFilter, setPairFilter] = useState<PairFilter>("all");

  const filtered = useMemo(() => {
    return conversions.filter((c) => {
      const matchesSearch =
        search.trim() === "" ||
        c.reference.toLowerCase().includes(search.toLowerCase()) ||
        pairKey(c.fromCurrency, c.toCurrency).toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesPair =
        pairFilter === "all" || pairKey(c.fromCurrency, c.toCurrency) === pairFilter;
      return matchesSearch && matchesStatus && matchesPair;
    });
  }, [conversions, search, statusFilter, pairFilter]);

  return (
    <div>
      <h3 className="text-base font-bold text-gray-800">Convert History</h3>
      <p className="text-xs text-gray-400 mb-4">
        View conversion transactions between your NGN and USD wallets.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 border-2 border-gray-200 rounded-xl px-3.5 py-2.5">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by reference or pair..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 min-w-0"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="border-2 border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-700 outline-none bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="reversed">Reversed</option>
        </select>
        <select
          value={pairFilter}
          onChange={(e) => setPairFilter(e.target.value as PairFilter)}
          className="border-2 border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-700 outline-none bg-white"
        >
          <option value="all">All Pairs</option>
          <option value="USD-NGN">USD-NGN</option>
          <option value="NGN-USD">NGN-USD</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16">
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <HistoryIcon className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700">No FX conversions found</p>
          <p className="text-xs text-gray-400 mb-4">
            Try adjusting your filters, or start a new currency conversion.
          </p>
          <button
            type="button"
            onClick={onNewConversion}
            className="flex items-center gap-1.5 bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-4 py-2.5 hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Conversion
          </button>
        </div>
      ) : (
        <>
          <div className="hidden sm:block border-2 border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b-2 border-gray-200">
                  <th className="py-3 px-4">Pair</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Rate</th>
                  <th className="py-3 px-4 text-right">Received</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className={i !== filtered.length - 1 ? "border-b border-gray-200" : ""}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                      {currencyFlag(c.fromCurrency)} → {currencyFlag(c.toCurrency)}{" "}
                      {c.fromCurrency}/{c.toCurrency}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {formatMoney(c.amount, c.fromCurrency)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500">
                      {c.rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800">
                      {formatMoney(c.received, c.toCurrency)}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{c.reference}</td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      <p>{formatDate(c.date)}</p>
                      <p className="text-xs text-gray-400">{c.time}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards, no horizontal scroll */}
          <div className="sm:hidden flex flex-col gap-3">
            {filtered.map((c) => (
              <div key={c.id} className="border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800 text-sm">
                    {currencyFlag(c.fromCurrency)} → {currencyFlag(c.toCurrency)}{" "}
                    {c.fromCurrency}/{c.toCurrency}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="text-gray-400">Amount</dt>
                  <dd className="text-right font-medium text-gray-700">
                    {formatMoney(c.amount, c.fromCurrency)}
                  </dd>
                  <dt className="text-gray-400">Rate</dt>
                  <dd className="text-right font-medium text-gray-700">
                    {c.rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </dd>
                  <dt className="text-gray-400">Received</dt>
                  <dd className="text-right font-semibold text-gray-800">
                    {formatMoney(c.received, c.toCurrency)}
                  </dd>
                </dl>
                <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>{c.reference}</span>
                  <span>
                    {formatDate(c.date)} · {c.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ConvertHistory;