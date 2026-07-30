import { useState } from "react";
import { ArrowRight, Save, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";

const genderOptions = ["Male", "Female"];

const PersonalInfoStep = () => {
  const { profile, updateProfile, setKYCStep, markStepComplete } = useUser();

  const [form, setForm] = useState({
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    phoneNumber: profile.phoneNumber,
    email: profile.email,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genderOpen, setGenderOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProgress = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleContinue = () => {
    if (!validate()) return;
    updateProfile(form);
    markStepComplete("personalInfo");
    setKYCStep("address");
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Mikasa"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
              errors.firstName ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Middle Name (Optional)
          </label>
          <input
            type="text"
            value={form.middleName}
            onChange={(e) => handleChange("middleName", e.target.value)}
            placeholder="Yeager"
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Ackerman"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
              errors.lastName ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] text-gray-700 ${
              errors.dateOfBirth ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Gender <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setGenderOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between border rounded-lg px-3.5 py-2.5 text-sm text-left ${
              form.gender ? "text-gray-800" : "text-gray-400"
            } ${errors.gender ? "border-red-400" : "border-gray-200"}`}
          >
            {form.gender || "Select gender"}
            <ChevronDown size={15} className="text-gray-400" />
          </button>
          {genderOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    handleChange("gender", option);
                    setGenderOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-sm ${
                    form.gender === option
                      ? "bg-[#1a6b3c] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="+234 801 234 5678"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
              errors.phoneNumber ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="mikasaackerman@gmail.com"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
              errors.email ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleSaveProgress}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50"
        >
          <Save size={15} /> {saved ? "Saved!" : "Save Progress"}
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1a6b3c] px-5 py-2.5 rounded-lg hover:bg-[#155c33]"
        >
          Continue <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;