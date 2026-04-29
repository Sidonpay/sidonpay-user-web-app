
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Logo from "../assets/SidonPay Logo.png";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

const KYCBasicProfile: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/kyc/tier-one");
      }, 1500);
    }
  };

  const isFormFilled = formData.firstName && formData.lastName && formData.dateOfBirth;

  return (
    <div className="min-h-screen bg-[#E0F3E9] px-6 py-6">

      {/* Top Nav */}
      <div className="flex items-center justify-between mb-10">

        {/* Left  Back Arrow */}
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </span>

        {/* Middle  Step Indicators */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition ${
                s === 1 ? "bg-gray-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Top - Go to Dashboard */}
        <span
          onClick={() => navigate("/dashboard")}
          className="text-sm text-green-600 cursor-pointer hover:underline font-medium"
        >
          Go to Dashboard
        </span>

      </div>

      {/* Card */}
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-lg">

        {/* Sidonpay Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Sidonpay Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Basic profile</h2>
        <p className="text-sm text-gray-500 mb-6">
          Kindly provide accurate information to continue
        </p>

        {/* First Name */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Valerie"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
              errors.firstName ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="John"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
              errors.lastName ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-6 w-full">
          <label className="text-xs font-medium text-gray-600 mb-1 block">Date of birth</label>
          <div className="relative w-full">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <CalendarDays className="w-4 h-4" />
            </span>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date: Date | null) => {
                setFormData((prev) => ({ ...prev, dateOfBirth: date }));
                setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
              }}
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              wrapperClassName="w-full"
              className={`w-full bg-gray-50 border rounded-lg pl-4 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
                errors.dateOfBirth ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            isFormFilled
              ? "bg-[#2D7A51] text-white hover:bg-green-700"
              : "bg-green-100 text-green-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Please wait...
            </>
          ) : (
            "Continue"
          )}
        </button>

        {/* Tier 0 info */}
        <p className="text-xs text-gray-400 mt-6">
          <span className="font-semibold text-gray-600">Tier 0:</span> Only your basic level
          information is required for this tier. You have a low transaction limit. To enjoy a
          higher transaction limit, please upgrade to tier 1.
        </p>
      </div>
    </div>
  );
};

export default KYCBasicProfile;