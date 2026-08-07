
import { useMemo, useState } from "react";
import type {
  USDTransaction,
  USDTransactionStatus,
  USDTransactionType,
  QuickDateFilter,
  TransactionFilters,
} from "../../../types/usdWallet.types";
import {
  Search,
  Calendar,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

/* ---------------------------------- */
/* Small calendar popover */
/* ---------------------------------- */

interface CalendarPopoverProps {
  value: Date | null;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

function CalendarPopover({ value, onCancel, onConfirm }: CalendarPopoverProps) {
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const [selected, setSelected] = useState<Date | null>(value);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleString("en-US", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; inCurrentMonth: boolean; date: Date }[] = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({ day, inCurrentMonth: false, date: new Date(year, month - 1, day) });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, inCurrentMonth: true, date: new Date(year, month, day) });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const day = cells.length - (startOffset + daysInMonth) + 1;
    cells.push({ day, inCurrentMonth: false, date: new Date(year, month + 1, day) });
  }

  const isSameDay = (a: Date, b: Date | null) =>
    !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="text-xs text-gray-400">{year}</p>
          <p className="text-sm font-semibold text-gray-900">{monthLabel} {year}</p>
        </div>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((wd, i) => (
          <span key={i} className="text-xs font-medium text-gray-400">{wd}</span>
        ))}
        {cells.map((cell, i) => {
          const active = isSameDay(cell.date, selected);
          return (
            <button
              key={i}
              onClick={() => setSelected(cell.date)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                active
                  ? "bg-blue-600 text-white font-semibold"
                  : cell.inCurrentMonth
                  ? "text-gray-800 hover:bg-gray-100"
                  : "text-gray-300"
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex justify-end gap-4 text-sm font-semibold">
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
        <button
          onClick={() => selected && onConfirm(selected)}
          className="text-green-700 hover:text-green-800"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Filter panel */
/* ---------------------------------- */

const TYPE_OPTIONS: { label: string; value: USDTransactionType | "funding" | "all" }[] = [
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
  { label: "Funding", value: "funding" },
  { label: "FX", value: "fx" },
  { label: "All", value: "all" },
];

const STATUS_OPTIONS: { label: string; value: USDTransactionStatus | "all" }[] = [
  { label: "Pending", value: "pending" },
  { label: "Reversed", value: "reversed" },
  { label: "Failed", value: "failed" },
  { label: "Successful", value: "successful" },
  { label: "All", value: "all" },
];

interface FilterPanelProps {
  selectedTypes: string[];
  selectedStatuses: string[];
  onToggleType: (value: string) => void;
  onToggleStatus: (value: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

function FilterPanel({
  selectedTypes,
  selectedStatuses,
  onToggleType,
  onToggleStatus,
  onClearAll,
  onApply,
}: FilterPanelProps) {
  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Type</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) =>
          chip(opt.label, selectedTypes.includes(opt.value), () => onToggleType(opt.value))
        )}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Status</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) =>
          chip(opt.label, selectedStatuses.includes(opt.value), () => onToggleStatus(opt.value))
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onClearAll}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          Clear all
        </button>
        <button
          onClick={onApply}
          className="flex-1 rounded-lg bg-green-700 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Status + row helpers */
/* ---------------------------------- */

const STATUS_STYLES: Record<USDTransactionStatus, string> = {
  successful: "bg-green-100 text-green-700",
  reversed: "bg-indigo-100 text-indigo-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: USDTransactionStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {label}
    </span>
  );
}

function TransactionIcon({ type }: { type: USDTransactionType }) {
  if (type === "fx") {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <ArrowUpDown className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
      {type === "credit" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
    </span>
  );
}

function TransactionRow({ txn }: { txn: USDTransaction }) {
  const isCredit = txn.amountUsd >= 0;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3 sm:flex-1 min-w-0">
        <TransactionIcon type={txn.type} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{txn.title}</p>
          <p className="truncate text-xs text-gray-500">{txn.subtitle}</p>
        </div>
      </div>

      <div className="sm:w-20 text-sm font-semibold">
        <span className={isCredit ? "text-green-600" : "text-red-600"}>
          {isCredit ? "Credit" : "Debit"}
        </span>
      </div>

      <div className="sm:w-32 text-xs text-gray-400">{txn.txnId}</div>
      <div className="sm:w-24 text-xs text-gray-400">{txn.date}</div>

      <div className="sm:w-28 text-right">
        <p className={`text-sm font-bold ${isCredit ? "text-green-600" : "text-red-600"}`}>
          {isCredit ? "+" : "-"}${Math.abs(txn.amountUsd).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        {txn.feeUsd !== undefined && (
          <p className="text-xs text-gray-400">-${txn.feeUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        )}
      </div>

      <div className="sm:w-24 flex sm:justify-end">
        <StatusBadge status={txn.status} />
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Main Transaction History component */
/* ---------------------------------- */

interface TransactionHistoryProps {
  transactions: USDTransaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickDateFilter>("last7");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeCalendar, setActiveCalendar] = useState<"start" | "end" | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [pendingTypes, setPendingTypes] = useState<string[]>([]);
  const [pendingStatuses, setPendingStatuses] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<TransactionFilters>({
    types: "all",
    statuses: "all",
  });

  const toggleType = (value: string) => {
    setPendingTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleStatus = (value: string) => {
    setPendingStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleClearAll = () => {
    setPendingTypes([]);
    setPendingStatuses([]);
    setAppliedFilters({ types: "all", statuses: "all" });
    setShowFilterPanel(false);
  };

  const handleApply = () => {
    setAppliedFilters({
      types: pendingTypes.length ? (pendingTypes as USDTransactionType[]) : "all",
      statuses: pendingStatuses.length ? (pendingStatuses as USDTransactionStatus[]) : "all",
    });
    setShowFilterPanel(false);
  };

  const removeChip = (kind: "type" | "status", value: string) => {
    if (kind === "type") {
      setAppliedFilters((prev) => ({
        ...prev,
        types: prev.types === "all" ? "all" : prev.types.filter((t) => t !== value),
      }));
      setPendingTypes((prev) => prev.filter((v) => v !== value));
    } else {
      setAppliedFilters((prev) => ({
        ...prev,
        statuses: prev.statuses === "all" ? "all" : prev.statuses.filter((s) => s !== value),
      }));
      setPendingStatuses((prev) => prev.filter((v) => v !== value));
    }
  };

  const activeChips = [
    ...(appliedFilters.types === "all" ? [] : appliedFilters.types.map((t) => ({ kind: "type" as const, value: t }))),
    ...(appliedFilters.statuses === "all" ? [] : appliedFilters.statuses.map((s) => ({ kind: "status" as const, value: s }))),
  ];

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
      );
    }

    if (appliedFilters.types !== "all") {
      result = result.filter((t) => appliedFilters.types.includes(t.type));
    }
    if (appliedFilters.statuses !== "all") {
      result = result.filter((t) => appliedFilters.statuses.includes(t.status));
    }

    if (startDate) {
      result = result.filter((t) => new Date(t.date) >= startDate);
    }
    if (endDate) {
      result = result.filter((t) => new Date(t.date) <= endDate);
    }

    return result;
  }, [transactions, search, appliedFilters, startDate, endDate]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-base font-bold uppercase tracking-wide text-gray-900">
        Transaction History
      </h3>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for transaction"
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-green-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setActiveCalendar(activeCalendar === "start" ? null : "start");
              setShowFilterPanel(false);
            }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              activeCalendar === "start"
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {startDate ? startDate.toLocaleDateString("en-CA") : "Start date"}
            <Calendar className="h-4 w-4" />
          </button>
          {activeCalendar === "start" && (
            <CalendarPopover
              value={startDate}
              onCancel={() => setActiveCalendar(null)}
              onConfirm={(date) => {
                setStartDate(date);
                setActiveCalendar(null);
              }}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setActiveCalendar(activeCalendar === "end" ? null : "end");
              setShowFilterPanel(false);
            }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              activeCalendar === "end"
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {endDate ? endDate.toLocaleDateString("en-CA") : "End date"}
            <Calendar className="h-4 w-4" />
          </button>
          {activeCalendar === "end" && (
            <CalendarPopover
              value={endDate}
              onCancel={() => setActiveCalendar(null)}
              onConfirm={(date) => {
                setEndDate(date);
                setActiveCalendar(null);
              }}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowFilterPanel((prev) => !prev);
              setActiveCalendar(null);
            }}
            className={`flex items-center justify-center rounded-xl border p-2.5 transition-colors ${
              showFilterPanel
                ? "border-green-700 bg-green-700 text-white"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          {showFilterPanel && (
            <FilterPanel
              selectedTypes={pendingTypes}
              selectedStatuses={pendingStatuses}
              onToggleType={toggleType}
              onToggleStatus={toggleStatus}
              onClearAll={handleClearAll}
              onApply={handleApply}
            />
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(["today", "last7", "last30"] as QuickDateFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setQuickFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              quickFilter === f
                ? "bg-green-700 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "today" ? "Today" : f === "last7" ? "Last 7 days" : "Last 30 days"}
          </button>
        ))}
      </div>

      {activeChips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span
              key={`${chip.kind}-${chip.value}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700"
            >
              {chip.value.charAt(0).toUpperCase() + chip.value.slice(1)}
              <button onClick={() => removeChip(chip.kind, chip.value)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Clear all <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="mt-4">
        {filteredTransactions.length === 0 ? (
          <p className="py-12 text-center text-sm italic text-gray-400">
            Your transactions will appear here
          </p>
        ) : (
          filteredTransactions.map((txn) => <TransactionRow key={txn.id} txn={txn} />)
        )}
      </div>
    </div>
  );
}