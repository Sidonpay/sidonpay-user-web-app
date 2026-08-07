import { AlertTriangle } from "lucide-react";

interface QuoteExpiredViewProps {
  onBack: () => void;
  onRetry: () => void;
}

const QuoteExpiredView: React.FC<QuoteExpiredViewProps> = ({ onBack, onRetry }) => (
  <div className="flex items-center justify-center py-16">
    <div className="max-w-sm w-full bg-amber-50 border-2 border-amber-100 rounded-xl p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-1">Your quote has expired</h3>
      <p className="text-xs text-gray-500 mb-5">
        Exchange rates fluctuate in real time. Generate a fresh quote to continue with
        current rates.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl px-4 py-2.5 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#2D7A51] text-white text-sm font-semibold rounded-xl px-4 py-2.5 hover:bg-green-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
);

export default QuoteExpiredView;