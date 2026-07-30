import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Transaction, SavedCard } from "../types/wallet";

interface WalletContextType {
  ngnBalance: number;
  usdBalance: number;
  ngnTransactions: Transaction[];
  usdTransactions: Transaction[];
  savedCards: SavedCard[];
  addTransaction: (transaction: Transaction) => void;
  getDailyOutgoingTotal: (currency: "NGN" | "USD") => number;
  addCard: (card: SavedCard) => void;
  removeCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
}

const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

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

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ngnBalance, setNgnBalance] = useState<number>(20000000.0);
  const [usdBalance, setUsdBalance] = useState<number>(0.0);
  const [ngnTransactions, setNgnTransactions] = useState<Transaction[]>(initialNgnTransactions);
  const [usdTransactions, setUsdTransactions] = useState<Transaction[]>(initialUsdTransactions);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(initialSavedCards);

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
        return filtered.map((c, i) =>
          i === 0 ? { ...c, isDefault: true } : c
        );
      }
      return filtered;
    });
  };

  const setDefaultCard = (id: string) => {
    setSavedCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === id }))
    );
  };

  return (
    <WalletContext.Provider
      value={{
        ngnBalance,
        usdBalance,
        ngnTransactions,
        usdTransactions,
        savedCards,
        addTransaction,
        getDailyOutgoingTotal,
        addCard,
        removeCard,
        setDefaultCard,
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