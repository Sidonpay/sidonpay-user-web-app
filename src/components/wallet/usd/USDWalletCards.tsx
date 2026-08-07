
import { useState } from "react";
import type { USDBankDetails, LiveRate } from "../../../types/usdWallet.types";
import { Copy, Check, Share2, ArrowLeftRight, ArrowDownToLine, Info } from "lucide-react";

/* ---------------------------------- */
/* Balance Card */
/* ---------------------------------- */

interface USDBalanceCardProps {
  balanceUsd: number;
  ngnEquivalent: number;
  isActive?: boolean;
  onConvertToNgn: () => void;
  onAddMoney: () => void;
}

export function USDBalanceCard({
  balanceUsd,
  ngnEquivalent,
  isActive = true,
  onConvertToNgn,
  onAddMoney,
}: USDBalanceCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-2xl leading-none" role="img" aria-label="US flag">
          🇺🇸
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-600" : "bg-gray-400"}`}
          />
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm text-gray-500">
        Available Balance
        <Info className="h-3.5 w-3.5" />
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-green-700">
          ${balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <span className="text-sm font-semibold text-gray-500">USD</span>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        ≈ ₦{ngnEquivalent.toLocaleString("en-NG")} at today's rate
      </p>

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={onConvertToNgn}
          className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Convert to NGN
        </button>
        <button
          onClick={onAddMoney}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Add Money
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Receive-only info banner */
/* ---------------------------------- */

export function USDReceiveOnlyBanner() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-800">
      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
      <p>
        <span className="font-semibold">This wallet is for receiving USD only.</span> To
        transfer money, pay bills, or use other SidonPay services, convert your USD to
        NGN first.
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Bank details card */
/* ---------------------------------- */

interface CopyFieldProps {
  label: string;
  value: string;
  fieldId: string;
  copiedField: string | null;
  onCopy: (fieldId: string, value: string) => void;
}

function CopyField({ label, value, fieldId, copiedField, onCopy }: CopyFieldProps) {
  const isCopied = copiedField === fieldId;
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-gray-900">{value}</p>
      </div>
      <button
        onClick={() => onCopy(fieldId, value)}
        aria-label={`Copy ${label}`}
        className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

interface USDBankDetailsCardProps {
  details: USDBankDetails;
}

export function USDBankDetailsCard({ details }: USDBankDetailsCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (fieldId: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField((current) => (current === fieldId ? null : current)), 1500);
    } catch {
      // clipboard write failed silently
    }
  };

  const allDetailsText = [
    `Account Holder: ${details.accountHolder}`,
    `Receiving Bank: ${details.receivingBank}`,
    `Account Number: ${details.accountNumber}`,
    `Routing Number: ${details.routingNumber}`,
    `SWIFT/BIC Code: ${details.swiftCode}`,
    `Bank Address: ${details.bankAddress}`,
  ].join("\n");

  const handleCopyAll = () => handleCopy("all", allDetailsText);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "USD Bank Account Details", text: allDetailsText });
      } catch {
        // user cancelled share, ignore
      }
    } else {
      handleCopy("share", allDetailsText);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900">Your USD Bank account details</h3>
      <p className="text-sm text-gray-500">Share these details to receive USD</p>

      <div className="mt-3">
        <CopyField label="Account Holder" value={details.accountHolder} fieldId="holder" copiedField={copiedField} onCopy={handleCopy} />
        <CopyField label="Receiving Bank" value={details.receivingBank} fieldId="bank" copiedField={copiedField} onCopy={handleCopy} />
        <CopyField label="Account Number" value={details.accountNumber} fieldId="account" copiedField={copiedField} onCopy={handleCopy} />
        <CopyField label="Routing Number" value={details.routingNumber} fieldId="routing" copiedField={copiedField} onCopy={handleCopy} />
        <CopyField label="SWIFT / BIC Code" value={details.swiftCode} fieldId="swift" copiedField={copiedField} onCopy={handleCopy} />
        <CopyField label="Bank Address" value={details.bankAddress} fieldId="address" copiedField={copiedField} onCopy={handleCopy} />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopyAll}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          {copiedField === "all" ? (
            <>
              <Check className="h-4 w-4 text-green-600" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy All Details
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Share2 className="h-4 w-4" />
          Share Details
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* NGN mini wallet + Live rate panel */
/* ---------------------------------- */

interface ConversionSidePanelProps {
  ngnBalance: number;
  liveRate: LiveRate;
  onConvertUsdToNgn: () => void;
}

export function ConversionSidePanel({
  ngnBalance,
  liveRate,
  onConvertUsdToNgn,
}: ConversionSidePanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50 text-green-700">
            ₦
          </span>
          NGN Wallet
        </div>
        <p className="mt-2 text-xl font-bold text-gray-900">
          ₦{ngnBalance.toLocaleString("en-NG")}
        </p>
        <button
          onClick={onConvertUsdToNgn}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Convert USD → NGN
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          Live Rate
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          1 USD = ₦{liveRate.rate.toLocaleString("en-NG")}
        </p>
        <p className="text-xs text-gray-400">Updated {liveRate.updatedAgo}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Conversion fee</span>
          <span className="font-semibold text-gray-900">{liveRate.conversionFeePercent}%</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-gray-500">Processing time</span>
          <span className="font-semibold text-gray-900">{liveRate.processingTime}</span>
        </div>
      </div>
    </div>
  );
}