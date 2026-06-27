
import { useState, useEffect, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
}

const SimpleDatePicker: React.FC<Props> = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => (value ? new Date(value) : new Date()));
  const [draftDay, setDraftDay] = useState<number | null>(
    value ? new Date(value).getDate() : null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleOk = () => {
    if (draftDay) {
      const selected = new Date(year, month, draftDay);
      onChange(selected.toISOString().split("T")[0]);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setDraftDay(value ? new Date(value).getDate() : null);
    setOpen(false);
  };

  const displayValue = value
    ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:border-gray-300 transition-colors min-w-[120px]"
      >
        <span className={value ? "text-gray-800" : "text-gray-500"}>{displayValue}</span>
        <Calendar size={14} className="text-[#2D7A51] shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-12 w-72 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-30">
          <div className="flex items-center justify-between mb-3">
            <button onClick={goToPrevMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={16} className="text-gray-500" />
            </button>
            <p className="text-sm font-semibold text-gray-800">
              {monthName} {year}
            </p>
            <button onClick={goToNextMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={16} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] text-gray-400 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = draftDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setDraftDay(day)}
                  className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#2D7A51] text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleOk}
              className="text-xs font-semibold text-white bg-[#2D7A51] hover:bg-green-700 px-4 py-1.5 rounded-lg transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleDatePicker;