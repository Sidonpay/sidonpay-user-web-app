import type { WalletCurrency } from "../types/wallet";

export const formatMoney = (value: number, currency: WalletCurrency): string => {
  const symbol = currency === "USD" ? "$" : "₦";
  return `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const currencyFlag = (currency: WalletCurrency): string =>
  currency === "USD" ? "🇺🇸" : "🇳🇬";

export const currencyLabel = (currency: WalletCurrency): string =>
  currency === "USD" ? "Dollar Wallet" : "Naira Wallet";