 import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Props {
  value: string;
  onChange: (date: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  placeholder?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DatePicker = ({
  value,
  onChange,
  isEditing,
  onEdit,
  placeholder = "Select date of birth",
}: Props) => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    value ? new Date(value).getMonth() : today.getMonth()
  );
  const [viewYear, setViewYear] = useState(
    value ? new Date(value).getFullYear() : today.getFullYear()
  );
  const [mode, setMode] = useState<"calendar" | "month" | "year">("calendar");
  const ref = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  // Open calendar automatically when edit mode is activated
  useEffect(() => {
    if (isEditing) {
      setOpen(true);
    } else {
      setOpen(false);
      setMode("calendar");
    }
  }, [isEditing]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setMode("calendar");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDisplay = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const formatted = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(formatted);
    setOpen(false);
    setMode("calendar");
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const daysInMonth = getDaysInMonth(viewMonth, viewYear);
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
  const calendarCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const years = Array.from(
    { length: today.getFullYear() - 1940 + 1 },
    (_, i) => today.getFullYear() - i
  );

  return (
    <div className="relative w-full" ref={ref}>

      {/* ── Input row — always visible, never unmounts ── */}
      <div
        className={`flex items-center w-full border rounded-xl transition-all duration-150 bg-white ${
          isEditing
            ? "border-[#1a6b3c] ring-2 ring-[#1a6b3c]/10"
            : "border-gray-200"
        }`}
      >
        <input
          readOnly
          value={selectedDate ? formatDisplay(selectedDate) : ""}
          placeholder={placeholder}
          onClick={() => { if (isEditing) setOpen((p) => !p); }}
          className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 cursor-pointer"
        />

        {/* Edit button — when not editing */}
        {!isEditing && (
          <button
            onClick={onEdit}
            className="mr-2 px-3 py-1 bg-[#1a6b3c] text-white text-xs font-semibold rounded-lg hover:bg-[#155c33] transition-colors shrink-0"
          >
            Edit
          </button>
        )}

        {/* Calendar icon — when editing */}
        {isEditing && (
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((p) => !p); }}
            className="px-4 py-3 text-gray-400 hover:text-[#1a6b3c] transition-colors"
          >
            <Calendar size={16} />
          </button>
        )}
      </div>

      {/* Calendar dropdown */}
      {open && isEditing && (
        <div className="absolute top-full left-0 z-[200] mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-72">

          {/* Calendar Mode */}
          {mode === "calendar" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevMonth(); }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setMode("month"); }}
                    className="text-sm font-bold text-gray-800 hover:text-[#1a6b3c] transition-colors px-1"
                  >
                    {MONTHS[viewMonth]}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setMode("year"); }}
                    className="text-sm font-bold text-gray-800 hover:text-[#1a6b3c] transition-colors px-1"
                  >
                    {viewYear}
                  </button>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNextMonth(); }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1">
                {calendarCells.map((day, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {day ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                        className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-150 ${
                          isSelected(day)
                            ? "bg-[#1a6b3c] text-white font-bold"
                            : isToday(day)
                            ? "border border-[#1a6b3c] text-[#1a6b3c] font-bold"
                            : "text-gray-700 hover:bg-[#eaf5ee] hover:text-[#1a6b3c]"
                        }`}
                      >
                        {day}
                      </button>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Month Mode */}
          {mode === "month" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">Select Month</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setMode("calendar"); }}
                  className="text-xs text-[#1a6b3c] font-semibold hover:underline"
                >
                  Back
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((month, i) => (
                  <button
                    key={month}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMonth(i);
                      setMode("calendar");
                    }}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      viewMonth === i
                        ? "bg-[#1a6b3c] text-white"
                        : "text-gray-600 hover:bg-[#eaf5ee] hover:text-[#1a6b3c]"
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Year Mode */}
          {mode === "year" && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">Select Year</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setMode("calendar"); }}
                  className="text-xs text-[#1a6b3c] font-semibold hover:underline"
                >
                  Back
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewYear(year);
                      setMode("calendar");
                    }}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      viewYear === year
                        ? "bg-[#1a6b3c] text-white"
                        : "text-gray-600 hover:bg-[#eaf5ee] hover:text-[#1a6b3c]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default DatePicker;