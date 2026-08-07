import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import type { UsdBankDetails } from "../../types/wallet";

interface Props {
  details: UsdBankDetails;
}

interface FieldRowProps {
  label: string;
  value: string;
  fieldId: string;
  copiedField: string | null;
  onCopy: (fieldId: string, value: string) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, value, fieldId, copiedField, onCopy }) => (
  <div className="flex items-start justify-between gap-3 py-3 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
    <button
      onClick={() => onCopy(fieldId, value)}
      aria-label={`Copy ${label}`}
      className="text-gray-400 hover:text-[#2D7A51] transition-colors shrink-0 p-1"
    >
      {copiedField === fieldId ? (
        <Check className="w-4 h-4 text-[#2D7A51]" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  </div>
);

const UsdBankDetailsCard: React.FC<Props> = ({ details }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (fieldId: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField((c) => (c === fieldId ? null : c)), 1500);
    } catch {
      // clipboard write failed silently — non-critical UX
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "USD Bank Account Details", text: allDetailsText });
      } catch {
        // user cancelled share sheet
      }
    } else {
      handleCopy("share", allDetailsText);
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-sm font-bold text-gray-800">Your USD Bank account details</p>
      <p className="text-xs text-gray-400 mt-0.5 mb-2">Share these details to receive USD</p>

      <FieldRow label="Account Holder" value={details.accountHolder} fieldId="holder" copiedField={copiedField} onCopy={handleCopy} />
      <FieldRow label="Receiving Bank" value={details.receivingBank} fieldId="bank" copiedField={copiedField} onCopy={handleCopy} />
      <FieldRow label="Account Number" value={details.accountNumber} fieldId="account" copiedField={copiedField} onCopy={handleCopy} />
      <FieldRow label="Routing Number" value={details.routingNumber} fieldId="routing" copiedField={copiedField} onCopy={handleCopy} />
      <FieldRow label="SWIFT / BIC Code" value={details.swiftCode} fieldId="swift" copiedField={copiedField} onCopy={handleCopy} />
      <FieldRow label="Bank Address" value={details.bankAddress} fieldId="address" copiedField={copiedField} onCopy={handleCopy} />

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={() => handleCopy("all", allDetailsText)}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
        >
          {copiedField === "all" ? (
            <>
              <Check className="w-4 h-4 text-[#2D7A51]" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy All Details
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share Details
        </button>
      </div>
    </div>
  );
};

export default UsdBankDetailsCard;