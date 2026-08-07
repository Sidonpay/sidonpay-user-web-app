import { CheckCircle2, Download, Share2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ConversionRecord } from "../../../types/wallet";
import { formatMoney } from "../../../utils/currency";

interface SuccessViewProps {
  record: ConversionRecord;
  feeFromCurrency: number;
  fxSpread: number;
  onBackToWallet: () => void;
  onStartOver: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({
  record,
  feeFromCurrency,
  fxSpread,
  onBackToWallet,
  onStartOver,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto py-6">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
        <CheckCircle2 className="w-7 h-7 text-[#2D7A51]" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">Conversion Successful</h3>
      <p className="text-xs text-gray-400 mb-5">Ref · {record.reference}</p>

      <div className="w-full border-2 border-gray-200 rounded-xl p-4 text-left">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Receipt
          </p>
          <span className="flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Successful
          </span>
        </div>
        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">From</dt>
            <dd className="font-semibold text-gray-800">
              {record.fromCurrency === "USD" ? "Dollar Wallet" : "Naira Wallet"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">To</dt>
            <dd className="font-semibold text-gray-800">
              {record.toCurrency === "USD" ? "Dollar Wallet" : "Naira Wallet"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Amount converted</dt>
            <dd className="font-semibold text-gray-800">
              {formatMoney(record.amount, record.fromCurrency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Exchange rate</dt>
            <dd className="font-semibold text-gray-800">
              1 {record.fromCurrency} ={" "}
              {record.rate.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
              {record.toCurrency}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Fee</dt>
            <dd className="font-medium text-gray-500">
              {formatMoney(feeFromCurrency, record.fromCurrency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">FX spread</dt>
            <dd className="font-medium text-gray-500">
              {formatMoney(fxSpread, record.toCurrency)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Date &amp; time</dt>
            <dd className="font-medium text-gray-500">
              {new Date(record.date).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-800">You received</p>
          <p className="text-lg font-bold text-[#2D7A51]">
            {formatMoney(record.received, record.toCurrency)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full mt-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex flex-col items-center gap-1.5 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">Download</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ text: `Conversion receipt · ${record.reference}` });
            }
          }}
          className="flex flex-col items-center gap-1.5 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">Share</span>
        </button>
        <button
          type="button"
          onClick={() => navigate("/transaction-history")}
          className="flex flex-col items-center gap-1.5 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">View Txn</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onBackToWallet}
        className="w-full bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-5 py-3 mt-4 hover:bg-green-700 transition-colors"
      >
        ← Back to Wallet
      </button>
      <button
        type="button"
        onClick={onStartOver}
        className="text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
      >
        ← Start over
      </button>
    </div>
  );
};

export default SuccessView;