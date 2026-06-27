import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { TransactionType, TransactionStatus } from "../../types/wallet";

interface Props {
  selectedTypes: TransactionType[];
  selectedStatuses: TransactionStatus[];
  onApply: (types: TransactionType[], statuses: TransactionStatus[]) => void;
}

const TYPE_OPTIONS: TransactionType[] = ["credit", "debit", "funding", "fx"];
const STATUS_OPTIONS: TransactionStatus[] = ["Pending", "Reversed", "Failed", "Successful"];

const typeLabel: Record<TransactionType, string> = {
  credit: "Credit",
  debit: "Debit",
  funding: "Funding",
  fx: "FX",
};

const TransactionFilterDropdown: React.FC<Props> = ({
  selectedTypes,
  selectedStatuses,
  onApply,
}) => {
  const [open, setOpen] = useState(false);
  const [draftTypes, setDraftTypes] = useState<TransactionType[]>(selectedTypes);
  const [draftStatuses, setDraftStatuses] = useState<TransactionStatus[]>(selectedStatuses);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleType = (type: TransactionType) => {
    setDraftTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: TransactionStatus) => {
    setDraftStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleClear = () => {
    setDraftTypes([]);
    setDraftStatuses([]);
    onApply([], []);
    setOpen(false);
  };

  const handleApply = () => {
    onApply(draftTypes, draftStatuses);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shrink-0"
        aria-label="Filter transactions"
      >
        <SlidersHorizontal size={16} className="text-[#2D7A51]" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-30">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Type
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {TYPE_OPTIONS.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  draftTypes.includes(type)
                    ? "bg-[#E0F3E9] border-[#2D7A51] text-[#2D7A51]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {typeLabel[type]}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Status
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  draftStatuses.includes(status)
                    ? "bg-[#E0F3E9] border-[#2D7A51] text-[#2D7A51]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleClear}
              className="flex-1 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg py-2 transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={handleApply}
              className="flex-1 text-xs font-semibold text-white bg-[#2D7A51] hover:bg-green-700 rounded-lg py-2 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilterDropdown;