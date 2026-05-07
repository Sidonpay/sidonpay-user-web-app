
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../assets/SidonPay Logo.png";

interface FormData {
  bvnNin: string;
  governmentId: File | null;
}

interface FormErrors {
  bvnNin?: string;
  governmentId?: string;
}

const KYCTierOne: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    bvnNin: "",
    governmentId: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, governmentId: file }));
    setErrors((prev) => ({ ...prev, governmentId: "" }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.bvnNin.trim()) newErrors.bvnNin = "BVN or NIN is required";
    else if (formData.bvnNin.length < 11) newErrors.bvnNin = "BVN or NIN must be 11 digits";
    if (!formData.governmentId) newErrors.governmentId = "Please upload a valid Government ID";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowModal(true);
      }, 1500);
    }
  };

  const isFormFilled = formData.bvnNin && formData.governmentId;

  return (
    <div className="min-h-screen bg-[#E0F3E9] px-6 py-6">

      {/* Under Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Under Review</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your documents are being reviewed. Enjoy your Sidonpay experience.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#2D7A51] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-10">

        {/* Left Arrow */}
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
                s < 2 ? "bg-green-600" : s === 2 ? "bg-gray-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Right Go to Dashboard */}
        <span
          onClick={() => navigate("/dashboard")}
          className="text-sm text-green-600 cursor-pointer hover:underline font-medium"
        >
          Go to Dashboard
        </span>

      </div>

      {/* Card */}
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-lg">

        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Sidonpay Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Tier 1</h2>
        <p className="text-sm text-gray-500 mb-6">
          Kindly provide your valid Bank Verification Number or NIN to continue
        </p>

        {/* BVN/NIN */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">BVN/NIN</label>
          <input
            type="text"
            name="bvnNin"
            placeholder="Enter your BVN or NIN"
            value={formData.bvnNin}
            onChange={handleChange}
            maxLength={11}
            className={`w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 transition ${
              errors.bvnNin ? "border-red-500 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.bvnNin && (
            <p className="text-xs text-red-500 mt-1">{errors.bvnNin}</p>
          )}
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Upload a valid Government ID
          </label>
          <label className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-500">
              <span className="text-green-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG (max. 25MB)</p>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {errors.governmentId && (
            <p className="text-xs text-red-500 mt-1">{errors.governmentId}</p>
          )}

          {/* Upload Progress */}
          {formData.governmentId && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-600 truncate">{formData.governmentId.name}</p>
                <span className="text-xs text-gray-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
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

        {/* Tier 1 info */}
        <p className="text-xs text-gray-400 mt-6">
          <span className="font-semibold text-gray-600">Tier 1:</span> You are required to
          provide your BVN/NIN for this tier. You currently have a medium transaction limit. To
          enjoy a higher transaction limit, please upgrade to tier 2.
        </p>
      </div>
    </div>
  );
};

export default KYCTierOne;