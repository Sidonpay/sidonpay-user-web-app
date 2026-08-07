import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type {
  Transaction,
  SavedCard,
  UsdBankDetails,
  LiveRate,
  WalletCurrency,
  ConversionQuote,
  ConversionRecord,
} from "../types/wallet";

interface WalletContextType {
  ngnBalance: number;
  usdBalance: number;
  ngnTransactions: Transaction[];
  usdTransactions: Transaction[];
  savedCards: SavedCard[];
  usdBankDetails: UsdBankDetails;
  liveRate: LiveRate;
  conversions: ConversionRecord[];
  maxConversionUsd: number;
  addTransaction: (transaction: Transaction) => void;
  getDailyOutgoingTotal: (currency: "NGN" | "USD") => number;
  addCard: (card: SavedCard) => void;
  removeCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
  convertUsdToNgn: (amountUsd: number) => void;
  getWalletBalance: (currency: WalletCurrency) => number;
  createQuote: (
    fromCurrency: WalletCurrency,
    toCurrency: WalletCurrency,
    amount: number
  ) => ConversionQuote;
  confirmConversion: (quote: ConversionQuote) => ConversionRecord;
}

const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

const MAX_CONVERSION_USD = 5000;
const SPREAD_PERCENT = 0.002;
const QUOTE_TTL_MS = 2 * 60 * 1000;

const initialNgnTransactions: Transaction[] = [
  {
    id: "1", txnId: "TXN-99283746",
    description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "2", txnId: "TXN-99283747",
    description: "From Uzumaki Naruto", subLabel: "Transfer · Wema ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 80000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "3", txnId: "TXN-99283748",
    description: "From Gojo Satoru", subLabel: "Transfer · Opay ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 800000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "4", txnId: "TXN-99283749",
    description: "From Uchiha Madara", subLabel: "Transfer · Opay ***4421",
    date: daysAgo(1), displayDate: daysAgo(1), type: "credit", status: "Successful",
    amount: 800000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "5", txnId: "TXN-99287166",
    description: "DSTV Premium", subLabel: "Bill · 089766",
    date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Reversed",
    amount: 30000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "6", txnId: "TXN-99283750",
    description: "USD to NGN", subLabel: "FX · Conversion",
    date: daysAgo(4), displayDate: daysAgo(4), type: "fx", status: "Successful",
    amount: 250000.00, currency: "NGN", subAmount: -250.00, subCurrency: "USD",
  },
  {
    id: "7", txnId: "TXN-89766",
    description: "IKEDC Electricity", subLabel: "Bill · Meter 047312589",
    date: daysAgo(5), displayDate: daysAgo(5), type: "debit", status: "Pending",
    amount: -50000.00, currency: "NGN", subAmount: -100.00, subCurrency: "NGN",
  },
  {
    id: "8", txnId: "TXN-99283751",
    description: "IKEDC Electricity", subLabel: "Bill · Meter 578744545",
    date: daysAgo(6), displayDate: daysAgo(6), type: "debit", status: "Failed",
    amount: -12000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
  {
    id: "9", txnId: "TXN-99283752",
    description: "Bank Transfer top-up", subLabel: "Funding · GTBank ***4421",
    date: daysAgo(7), displayDate: daysAgo(7), type: "funding", status: "Failed",
    amount: 250000.00, currency: "NGN", subAmount: -26.88, subCurrency: "NGN",
  },
];

const initialUsdTransactions: Transaction[] = [
  {
    id: "u1", txnId: "TXN-99288986",
    description: "Stripe payout", subLabel: "Funding · Stripe ***2323",
    date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
    amount: 28280.50, currency: "USD", subAmount: -140, subCurrency: "USD",
  },
  {
    id: "u2", txnId: "TXN-99283742",
    description: "Payoneer transfer", subLabel: "Funding · Wire transfer",
    date: daysAgo(1), displayDate: daysAgo(1), type: "funding", status: "Successful",
    amount: 9875.00, currency: "USD", subAmount: -90, subCurrency: "USD",
  },
  {
    id: "u3", txnId: "TXN-99283743",
    description: "NGN → USD via Flutterwave", subLabel: "FX · Flutterwave",
    date: daysAgo(2), displayDate: daysAgo(2), type: "fx", status: "Successful",
    amount: 14280.50, currency: "USD", subAmount: -100, subCurrency: "USD",
  },
  {
    id: "u4", txnId: "TXN-9907096",
    description: "Plaid ACH pull", subLabel: "Funding · JPMorgan",
    date: daysAgo(4), displayDate: daysAgo(4), type: "funding", status: "Successful",
    amount: 20000.00, currency: "USD", subAmount: -100000, subCurrency: "NGN",
  },
  {
    id: "u5", txnId: "TXN-9909746",
    description: "Coinbase USD wallet", subLabel: "Transfer · Coinbase",
    date: daysAgo(4), displayDate: daysAgo(4), type: "debit", status: "Pending",
    amount: -30000.00, currency: "USD",
  },
  {
    id: "u6", txnId: "TXN-99281116",
    description: "Slack subscription", subLabel: "Bill · 08971111",
    date: daysAgo(5), displayDate: daysAgo(5), type: "credit", status: "Reversed",
    amount: 87.50, currency: "USD",
  },
  {
    id: "u7", txnId: "TXN-99283226",
    description: "NGN + USD via Revolut", subLabel: "FX · Revolut ***456",
    date: daysAgo(5), displayDate: daysAgo(5), type: "fx", status: "Successful",
    amount: 12000.00, currency: "USD", subAmount: -36, subCurrency: "USD",
  },
  {
    id: "u8", txnId: "TXN-99283111",
    description: "Google Workspace", subLabel: "Bill · Annual 57874545",
    date: daysAgo(6), displayDate: daysAgo(6), type: "debit", status: "Failed",
    amount: -336.00, currency: "USD",
  },
  {
    id: "u9", txnId: "TXN-99286675",
    description: "Mercury inbound", subLabel: "Funding · Mercury ***00",
    date: daysAgo(7), displayDate: daysAgo(7), type: "funding", status: "Successful",
    amount: 14280.50, currency: "USD",
  },
];

const initialSavedCards: SavedCard[] = [];

const initialUsdBankDetails: UsdBankDetails = {
  accountHolder: "Mikasa Ackerman",
  receivingBank: "Community Federal Savings Bank",
  accountNumber: "3204-8811-0029",
  routingNumber: "026073150",
  swiftCode: "FBNINGLAXX",
  bankAddress: "35-19 Jamaica Avenue, Woodhaven, NY 11421, USA",
};

const initialLiveRate: LiveRate = {
  usdToNgn: 1620,
  updatedAgo: "30s ago",
  conversionFeePercent: 0.5,
  processingTime: "Instant",
};

const initialConversions: ConversionRecord[] = [
  {
    id: "fx1", reference: "FX-2026-88412", fromCurrency: "USD", toCurrency: "NGN",
    amount: 500, rate: 1580, received: 788000, date: "2026-07-27", displayDate: "2026-07-27",
    time: "10:24 AM", status: "successful",
  },
  {
    id: "fx2", reference: "FX-2026-88398", fromCurrency: "NGN", toCurrency: "USD",
    amount: 200000, rate: 0.000633, received: 125.5, date: "2026-07-26", displayDate: "2026-07-26",
    time: "4:48 PM", status: "successful",
  },
  {
    id: "fx3", reference: "FX-2026-88310", fromCurrency: "USD", toCurrency: "NGN",
    amount: 1000, rate: 1578, received: 1570000, date: "2026-07-24", displayDate: "2026-07-24",
    time: "9:02 AM", status: "successful",
  },
  {
    id: "fx4", reference: "FX-2026-88201", fromCurrency: "USD", toCurrency: "NGN",
    amount: 250, rate: 1581, received: 393750, date: "2026-07-21", displayDate: "2026-07-21",
    time: "2:15 PM", status: "pending",
  },
  {
    id: "fx5", reference: "FX-2026-88098", fromCurrency: "NGN", toCurrency: "USD",
    amount: 50000, rate: 0.000631, received: 31, date: "2026-07-18", displayDate: "2026-07-18",
    time: "11:30 AM", status: "failed",
  },
];

const generateReference = (): string =>
  `FX-2026-${Math.floor(80000 + Math.random() * 9999)}`;

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ngnBalance, setNgnBalance] = useState<number>(20000000.0);
  const [usdBalance, setUsdBalance] = useState<number>(1847.50);
  const [ngnTransactions, setNgnTransactions] = useState<Transaction[]>(initialNgnTransactions);
  const [usdTransactions, setUsdTransactions] = useState<Transaction[]>(initialUsdTransactions);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(initialSavedCards);
  const [usdBankDetails] = useState<UsdBankDetails>(initialUsdBankDetails);
  const [liveRate] = useState<LiveRate>(initialLiveRate);
  const [conversions, setConversions] = useState<ConversionRecord[]>(initialConversions);

  const addTransaction = (transaction: Transaction) => {
    if (transaction.currency === "NGN") {
      setNgnTransactions((prev) => [transaction, ...prev]);
      setNgnBalance((prev) => prev + transaction.amount);
    } else {
      setUsdTransactions((prev) => [transaction, ...prev]);
      setUsdBalance((prev) => prev + transaction.amount);
    }
  };

  const getDailyOutgoingTotal = (currency: "NGN" | "USD"): number => {
    const today = new Date().toISOString().split("T")[0];
    const transactions = currency === "NGN" ? ngnTransactions : usdTransactions;
    return transactions
      .filter(
        (tx) =>
          tx.date === today &&
          (tx.type === "debit" || tx.type === "fx") &&
          tx.amount < 0
      )
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  const addCard = (card: SavedCard) => {
    setSavedCards((prev) => {
      if (prev.length === 0) {
        return [{ ...card, isDefault: true }];
      }
      return [...prev, card];
    });
  };

  const removeCard = (id: string) => {
    setSavedCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      const removedCard = prev.find((c) => c.id === id);
      if (removedCard?.isDefault && filtered.length > 0) {
        return filtered.map((c, i) => (i === 0 ? { ...c, isDefault: true } : c));
      }
      return filtered;
    });
  };

  const setDefaultCard = (id: string) => {
    setSavedCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  const getWalletBalance = (currency: WalletCurrency): number =>
    currency === "USD" ? usdBalance : ngnBalance;

  const convertUsdToNgn = (amountUsd: number) => {
    if (amountUsd <= 0 || amountUsd > usdBalance) return;

    const feeUsd = amountUsd * (liveRate.conversionFeePercent / 100);
    const netUsd = amountUsd - feeUsd;
    const ngnCredited = netUsd * liveRate.usdToNgn;
    const today = new Date().toISOString().split("T")[0];
    const sharedId = Date.now();

    setUsdBalance((prev) => prev - amountUsd);
    setUsdTransactions((prev) => [
      {
        id: `usd-fx-${sharedId}`,
        txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
        description: "USD → NGN via SidonPay",
        subLabel: "FX · Conversion",
        date: today,
        displayDate: today,
        type: "fx",
        status: "Successful",
        amount: -amountUsd,
        currency: "USD",
        subAmount: -feeUsd,
        subCurrency: "USD",
      },
      ...prev,
    ]);

    setNgnBalance((prev) => prev + ngnCredited);
    setNgnTransactions((prev) => [
      {
        id: `ngn-fx-${sharedId}`,
        txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
        description: "NGN ← USD via SidonPay",
        subLabel: "FX · Conversion",
        date: today,
        displayDate: today,
        type: "fx",
        status: "Successful",
        amount: ngnCredited,
        currency: "NGN",
      },
      ...prev,
    ]);
  };

  const createQuote = (
    fromCurrency: WalletCurrency,
    toCurrency: WalletCurrency,
    amount: number
  ): ConversionQuote => {
    const midRate = fromCurrency === "USD" ? liveRate.usdToNgn : 1 / liveRate.usdToNgn;
    const appliedRate = midRate * (1 - SPREAD_PERCENT);
    const fxSpread = amount * midRate * SPREAD_PERCENT;
    const feeFromCurrency = amount * (liveRate.conversionFeePercent / 100);
    const feeToCurrency = feeFromCurrency * appliedRate;
    const receivable = amount * appliedRate - feeToCurrency;
    const now = Date.now();

    return {
      id: `quote-${now}`,
      fromCurrency,
      toCurrency,
      amount,
      midRate,
      appliedRate,
      fxSpread,
      feeFromCurrency,
      feeToCurrency,
      receivable,
      createdAt: now,
      expiresAt: now + QUOTE_TTL_MS,
    };
  };

  const confirmConversion = (quote: ConversionQuote): ConversionRecord => {
    const { fromCurrency, toCurrency, amount, appliedRate, receivable } = quote;
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const reference = generateReference();
    const sharedId = Date.now();

    if (fromCurrency === "USD") {
      setUsdBalance((prev) => prev - amount);
      setNgnBalance((prev) => prev + receivable);
      setUsdTransactions((prev) => [
        {
          id: `usd-fx-${sharedId}`,
          txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
          description: "USD → NGN via SidonPay",
          subLabel: `FX · ${reference}`,
          date: today,
          displayDate: today,
          type: "fx",
          status: "Successful",
          amount: -amount,
          currency: "USD",
        },
        ...prev,
      ]);
      setNgnTransactions((prev) => [
        {
          id: `ngn-fx-${sharedId}`,
          txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
          description: "NGN ← USD via SidonPay",
          subLabel: `FX · ${reference}`,
          date: today,
          displayDate: today,
          type: "fx",
          status: "Successful",
          amount: receivable,
          currency: "NGN",
        },
        ...prev,
      ]);
    } else {
      setNgnBalance((prev) => prev - amount);
      setUsdBalance((prev) => prev + receivable);
      setNgnTransactions((prev) => [
        {
          id: `ngn-fx-${sharedId}`,
          txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
          description: "NGN → USD via SidonPay",
          subLabel: `FX · ${reference}`,
          date: today,
          displayDate: today,
          type: "fx",
          status: "Successful",
          amount: -amount,
          currency: "NGN",
        },
        ...prev,
      ]);
      setUsdTransactions((prev) => [
        {
          id: `usd-fx-${sharedId}`,
          txnId: `TXN-${Math.floor(90000000 + Math.random() * 9999999)}`,
          description: "USD ← NGN via SidonPay",
          subLabel: `FX · ${reference}`,
          date: today,
          displayDate: today,
          type: "fx",
          status: "Successful",
          amount: receivable,
          currency: "USD",
        },
        ...prev,
      ]);
    }

    const record: ConversionRecord = {
      id: `fx-${sharedId}`,
      reference,
      fromCurrency,
      toCurrency,
      amount,
      rate: appliedRate,
      received: receivable,
      date: today,
      displayDate: today,
      time,
      status: "successful",
    };

    setConversions((prev) => [record, ...prev]);
    return record;
  };

  return (
    <WalletContext.Provider
      value={{
        ngnBalance,
        usdBalance,
        ngnTransactions,
        usdTransactions,
        savedCards,
        usdBankDetails,
        liveRate,
        conversions,
        maxConversionUsd: MAX_CONVERSION_USD,
        addTransaction,
        getDailyOutgoingTotal,
        addCard,
        removeCard,
        setDefaultCard,
        convertUsdToNgn,
        getWalletBalance,
        createQuote,
        confirmConversion,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};