export type Currency = "NGN" | "USD";
export type TransactionType = "credit" | "debit" | "funding" | "fx";
export type TransactionStatus = "Successful" | "Pending" | "Failed" | "Reversed";
export type CardNetwork = "visa" | "mastercard" | "verve";
export type CardType = "debit" | "credit";

export interface SavedCard {
  id: string;
  last4: string;
  cardholderName: string;
  expiryDate: string;
  network: CardNetwork;
  cardType: CardType;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  txnId: string;
  description: string;
  subLabel: string;
  date: string;
  displayDate: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: Currency;
  subAmount?: number;
  subCurrency?: Currency;
}

export interface WalletData {
  currency: Currency;
  flagSrc: string;
  balance: number;
  cardNumber: string;
  dailyTransferUsed: number;
  dailyTransferLimit: number;
  perTransactionUsed: number;
  perTransactionLimit: number;
  fxRate: {
    pair: string;
    rate: number;
    changeValue: number;
    changePercent: number;
    updatedAt: string;
  };
}

export interface TransactionFilters {
  search: string;
  quickRange: "today" | "7days" | "30days" | null;
  startDate: string | null;
  endDate: string | null;
  types: TransactionType[];
  statuses: TransactionStatus[];
}

export interface UsdBankDetails {
  accountHolder: string;
  receivingBank: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  bankAddress: string;
}

export interface LiveRate {
  usdToNgn: number;
  updatedAgo: string;
  conversionFeePercent: number;
  processingTime: string;
}

export type WalletCurrency = "USD" | "NGN";

export interface ConversionQuote {
  id: string;
  fromCurrency: WalletCurrency;
  toCurrency: WalletCurrency;
  amount: number;
  midRate: number;
  appliedRate: number;
  fxSpread: number;
  feeFromCurrency: number;
  feeToCurrency: number;
  receivable: number;
  createdAt: number;
  expiresAt: number;
}

export type ConversionStatus = "successful" | "pending" | "failed" | "reversed";

export interface ConversionRecord {
  id: string;
  reference: string;
  fromCurrency: WalletCurrency;
  toCurrency: WalletCurrency;
  amount: number;
  rate: number;
  received: number;
  date: string;
  displayDate: string;
  time: string;
  status: ConversionStatus;
}