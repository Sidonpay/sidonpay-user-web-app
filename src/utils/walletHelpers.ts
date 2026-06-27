import type { Transaction, TransactionFilters, Currency } from "../types/wallet";

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = currency === "USD" ? "$" : "₦";
  const sign = amount < 0 ? "-" : amount > 0 ? "+" : "";
  return `${sign}${symbol}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPlainCurrency = (amount: number, currency: Currency): string => {
  const symbol = currency === "USD" ? "$" : "₦";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const isWithinQuickRange = (dateStr: string, range: TransactionFilters["quickRange"]): boolean => {
  if (!range) return true;
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (range === "today") return diffDays === 0;
  if (range === "7days") return diffDays >= 0 && diffDays <= 7;
  if (range === "30days") return diffDays >= 0 && diffDays <= 30;
  return true;
};

const isWithinCustomRange = (
  dateStr: string,
  start: string | null,
  end: string | null
): boolean => {
  if (!start && !end) return true;
  const date = new Date(dateStr).getTime();
  if (start && date < new Date(start).getTime()) return false;
  if (end && date > new Date(end).getTime()) return false;
  return true;
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] => {
  return transactions.filter((tx) => {
    const matchesSearch =
      !filters.search ||
      tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      tx.subLabel.toLowerCase().includes(filters.search.toLowerCase()) ||
      tx.txnId.toLowerCase().includes(filters.search.toLowerCase());

    const matchesQuickRange = isWithinQuickRange(tx.date, filters.quickRange);
    const matchesCustomRange = isWithinCustomRange(tx.date, filters.startDate, filters.endDate);

    const matchesType = filters.types.length === 0 || filters.types.includes(tx.type);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(tx.status);

    return matchesSearch && matchesQuickRange && matchesCustomRange && matchesType && matchesStatus;
  });
};