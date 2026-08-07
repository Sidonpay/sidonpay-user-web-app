
import type { USDBankDetails, LiveRate, USDTransaction } from "../../types/usdWallet.types";
import {
  USDBalanceCard,
  USDReceiveOnlyBanner,
  USDBankDetailsCard,
  ConversionSidePanel,
} from "../../components/wallet/usd/USDWalletCards";
import { TransactionHistory } from "../../components/wallet/usd/TransactionHistory";

// TODO: replace this mock block with values pulled from WalletContext
const MOCK_BANK_DETAILS: USDBankDetails = {
  accountHolder: "Mikasa Ackerman",
  receivingBank: "Community Federal Savings Bank",
  accountNumber: "3204-8811-0029",
  routingNumber: "026073150",
  swiftCode: "FBNINGLAXX",
  bankAddress: "35-19 Jamaica Avenue, Woodhaven, NY 11421, USA",
};

const MOCK_LIVE_RATE: LiveRate = {
  rate: 1620,
  updatedAgo: "30s ago",
  conversionFeePercent: 0.5,
  processingTime: "Instant",
};

const MOCK_TRANSACTIONS: USDTransaction[] = [
  { id: "1", txnId: "TXN-99288986", title: "Stripe payout", subtitle: "Funding · Stripe ***2323", type: "credit", status: "successful", date: "2026-04-22", amountUsd: 28280.5, feeUsd: 140 },
  { id: "2", txnId: "TXN-99283742", title: "Payoneer transfer to USD wallet", subtitle: "Funding · Wire transfer", type: "credit", status: "successful", date: "2026-04-22", amountUsd: 9875, feeUsd: 90 },
  { id: "3", txnId: "TXN-99283746", title: "to Aisha Bello", subtitle: "Transfer · Wise transfer", type: "debit", status: "failed", date: "2026-04-22", amountUsd: -3500, feeUsd: 6.11 },
  { id: "4", txnId: "TXN-99283746", title: "NGN → USD via Flutterwave", subtitle: "FX · Flutterwave", type: "fx", status: "successful", date: "2026-04-21", amountUsd: 14280.5, feeUsd: 100 },
  { id: "5", txnId: "TXN-9909746", title: "Coinbase USD wallet transfer", subtitle: "Transfer · Coinbase", type: "debit", status: "pending", date: "2026-04-19", amountUsd: -30000 },
  { id: "6", txnId: "TXN-9907096", title: "Plaid ACH pull — JPMorgan", subtitle: "Funding · JPMorgan", type: "credit", status: "successful", date: "2026-04-19", amountUsd: 20000, feeUsd: 100 },
  { id: "7", txnId: "TXN-99281116", title: "Slack subscription", subtitle: "Bill · 08971111", type: "credit", status: "reversed", date: "2026-04-18", amountUsd: 87.5 },
  { id: "8", txnId: "TXN-99283746", title: "USD → NGN via Revolut", subtitle: "FX · Revolut", type: "fx", status: "successful", date: "2026-04-18", amountUsd: -12000, feeUsd: 36 },
  { id: "9", txnId: "TXN-99283746", title: "Google Workspace annual plan", subtitle: "Bill · Annual 57874545", type: "debit", status: "failed", date: "2026-04-16", amountUsd: -336, feeUsd: 3.36 },
  { id: "10", txnId: "TXN-99286675", title: "Mercury inbound transfer", subtitle: "Funding · Mercury ***00", type: "credit", status: "successful", date: "2026-04-14", amountUsd: 14280.5 },
];

export function USDWallet() {
  const usdBalance = 1847.5;
  const ngnEquivalent = 2992950;
  const ngnBalance = 324500;

  const handleConvertToNgn = () => {
    // TODO: navigate to /dashboard/convert (USD -> NGN)
  };

  const handleAddMoney = () => {
    // TODO: open Add Money flow
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <nav className="text-sm text-gray-400">
        Dashboard <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">USD Wallet</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back!</h1>
      <p className="text-sm text-gray-500">Manage your wallets and transactions</p>

      <div className="mt-5 flex flex-col gap-5">
        <USDBalanceCard
          balanceUsd={usdBalance}
          ngnEquivalent={ngnEquivalent}
          onConvertToNgn={handleConvertToNgn}
          onAddMoney={handleAddMoney}
        />

        <USDReceiveOnlyBanner />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <USDBankDetailsCard details={MOCK_BANK_DETAILS} />
          <ConversionSidePanel
            ngnBalance={ngnBalance}
            liveRate={MOCK_LIVE_RATE}
            onConvertUsdToNgn={handleConvertToNgn}
          />
        </div>

        <TransactionHistory transactions={MOCK_TRANSACTIONS} />
      </div>
    </div>
  );
}