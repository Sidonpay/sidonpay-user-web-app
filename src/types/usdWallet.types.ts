export type USDTransactionType = "credit" | "debit" | "fx";
export type USDTransactionStatus =
  | "successful"
  | "pending"
  | "reversed"
  | "failed";

export interface USDTransaction {
  id: string;
  txnId: string;
  title: string;
  subtitle: string;
  type: USDTransactionType;
  status: USDTransactionStatus;
  date: string;
  amountUsd: number;
  feeUsd?: number;
}

export interface USDBankDetails {
  accountHolder: string;
  receivingBank: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  bankAddress: string;
}

export interface LiveRate {
  rate: number; // 1 USD = rate NGN
  updatedAgo: string; // "30s ago"
  conversionFeePercent: number; // 0.5
  processingTime: string; // "Instant"
}

export type QuickDateFilter = "today" | "last7" | "last30" | null;

export interface TransactionFilters {
  types: USDTransactionType[] | "all";
  statuses: USDTransactionStatus[] | "all";
}