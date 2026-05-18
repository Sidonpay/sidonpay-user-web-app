import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import ProfileFeedbackModal from "./ProfileFeedbackModal";
import emailLockIcon from "../assets/email-icon.png";

const countries = [
  { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
  { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
  { name: "UAE", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "Senegal", code: "SN", dial: "+221", flag: "🇸🇳" },
  { name: "Cameroon", code: "CM", dial: "+237", flag: "🇨🇲" },
  { name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹" },
  { name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿" },
  { name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬" },
  { name: "Rwanda", code: "RW", dial: "+250", flag: "🇷🇼" },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
];

type Country = (typeof countries)[0];

interface Props {
  emailVerified?: boolean;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface EditingState {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phoneNumber: boolean;
}

interface ErrorState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// Validation

const validate = (form: FormState): ErrorState => {
  const e: ErrorState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  if (!form.firstName.trim()) e.firstName = "This field can't be empty.";
  else if (!/^[a-zA-Z\s]+$/.test(form.firstName))
    e.firstName = "Only letters are allowed.";

  if (!form.lastName.trim()) e.lastName = "This field can't be empty.";
  else if (!/^[a-zA-Z\s]+$/.test(form.lastName))
    e.lastName = "Only letters are allowed.";

  if (!form.email.trim()) e.email = "This field can't be empty.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email address.";

  if (!form.phoneNumber.trim()) e.phoneNumber = "This field can't be empty.";

  return e;
};

const hasErrors = (e: ErrorState) => Object.values(e).some((v) => v !== "");

// Country dropdown

const CountryDropdown = ({
  selected,
  onSelect,
}: {
  selected: Country;
  onSelect: (c: Country) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 px-3 py-3 border-r border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors h-full"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-sm font-medium text-gray-700">{selected.dial}</span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-[100] mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onSelect(c);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                  selected.code === c.code
                    ? "bg-[#e8f5ee] text-[#1a6b3c] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-gray-400 text-xs">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Field Component

interface FieldProps {
  label: React.ReactNode;
  value: string;
  placeholder: string;
  isEditing: boolean;
  error: string;
  buttonLabel?: string;
  onEdit: () => void;
  onChange: (v: string) => void;
  type?: string;
}

const Field = ({
  label,
  value,
  placeholder,
  isEditing,
  error,
  buttonLabel = "Edit",
  onEdit,
  onChange,
  type = "text",
}: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-500 font-medium">{label}</label>
    <div
      className={`flex items-center w-full border rounded-xl transition-all duration-150 bg-white ${
        error
          ? "border-red-400"
          : isEditing
          ? "border-[#1a6b3c] ring-2 ring-[#1a6b3c]/10"
          : "border-gray-200"
      }`}
    >
      <input
        type={type}
        value={value}
        readOnly={!isEditing}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
      />
      {!isEditing && (
        <button
          onClick={onEdit}
          className="mr-2 px-3 py-1 bg-[#1a6b3c] text-white text-xs font-semibold rounded-lg hover:bg-[#155c33] transition-colors shrink-0"
        >
          {buttonLabel}
        </button>
      )}
    </div>
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

// Main Component

const PersonalInfoTab = ({ emailVerified = false }: Props) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [editing, setEditing] = useState<EditingState>({
    firstName: false,
    lastName: false,
    email: emailVerified,
    phoneNumber: false,
  });

  const [errors, setErrors] = useState<ErrorState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState<"success" | "error" | null>(null);

  const handleEdit = (field: keyof EditingState) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = async () => {
    const validationErrors = validate(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      setEditing({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
      });
      setModal("success");
    } catch {
      setModal("error");
    } finally {
      setIsSaving(false);
    }
  };

  const anyEditing = Object.values(editing).some(Boolean);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* First Name */}
        <Field
          label="First Name"
          placeholder="Enter first name"
          value={form.firstName}
          isEditing={editing.firstName}
          error={errors.firstName}
          onEdit={() => handleEdit("firstName")}
          onChange={(v) => handleChange("firstName", v)}
        />

        {/* Last Name */}
        <Field
          label="Last Name"
          placeholder="Enter last name"
          value={form.lastName}
          isEditing={editing.lastName}
          error={errors.lastName}
          onEdit={() => handleEdit("lastName")}
          onChange={(v) => handleChange("lastName", v)}
        />

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 font-medium">
            Phone Number
          </label>
          <div
            className={`flex items-center w-full border rounded-xl overflow-visible transition-all duration-150 bg-white ${
              errors.phoneNumber
                ? "border-red-400"
                : editing.phoneNumber
                ? "border-[#1a6b3c] ring-2 ring-[#1a6b3c]/10"
                : "border-gray-200"
            }`}
          >
            <CountryDropdown
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
            <input
              type="tel"
              value={form.phoneNumber}
              readOnly={!editing.phoneNumber}
              placeholder="8012345678"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="flex-1 px-3 py-3 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
            {!editing.phoneNumber && (
              <button
                onClick={() => handleEdit("phoneNumber")}
                className="mr-2 px-3 py-1 bg-[#1a6b3c] text-white text-xs font-semibold rounded-lg hover:bg-[#155c33] transition-colors shrink-0"
              >
                Edit
              </button>
            )}
          </div>
          {errors.phoneNumber && (
            <p className="text-[11px] text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email */}
        <Field
          label={
            <span className="flex items-center gap-1">
              Email address
              <img
                src={emailLockIcon}
                alt="locked"
                className="h-3.5 w-auto"
              />
            </span>
          }
          placeholder="Enter email address"
          value={form.email}
          isEditing={editing.email}
          error={errors.email}
          buttonLabel="Change"
          type="email"
          onEdit={() => navigate("/dashboard/account/change-email", {
            state: {currentEmail: form.email}
          })}
          onChange={(v) => handleChange("email", v)}
        />

        {/* KYC Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500 font-medium">
            KYC Status
          </label>
          <div className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3">
            <span className="text-sm text-amber-400 font-medium">Pending</span>
          </div>
        </div>

      </div>

      {/* Save button */}
      {anyEditing && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-7 py-3 bg-[#1a6b3c] text-white text-sm font-semibold rounded-xl hover:bg-[#155c33] disabled:opacity-60 transition-all"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}

      {modal && (
        <ProfileFeedbackModal type={modal} onClose={() => setModal(null)} />
      )}
    </>
  );
};

export default PersonalInfoTab;