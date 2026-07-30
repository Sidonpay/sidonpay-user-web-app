import { useState } from "react";
import { ArrowRight, ArrowLeft, Save, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { getStateNames, getLGAsByState } from "../../data/nigeriaStatesLGA"

const AddressStep = () => {
  const { profile, updateProfile, setKYCStep, markStepComplete } = useUser();

  const [form, setForm] = useState({
    residentialAddress: profile.residentialAddress,
    city: profile.city,
    state: profile.state,
    lga: profile.lga,
    country: profile.country || "Nigeria",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stateOpen, setStateOpen] = useState(false);
  const [lgaOpen, setLgaOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const states = getStateNames();
  const lgas = form.state ? getLGAsByState(form.state) : [];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleStateSelect = (stateName: string) => {
    setForm((prev) => ({ ...prev, state: stateName, lga: "" }));
    setErrors((prev) => ({ ...prev, state: "" }));
    setStateOpen(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.residentialAddress.trim()) newErrors.residentialAddress = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.lga) newErrors.lga = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProgress = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBack = () => {
    updateProfile(form);
    setKYCStep("personalInfo");
  };

  const handleContinue = () => {
    if (!validate()) return;
    updateProfile(form);
    markStepComplete("address");
    setKYCStep("identity");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.residentialAddress}
            onChange={(e) => handleChange("residentialAddress", e.target.value)}
            placeholder="Enter your street address"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
              errors.residentialAddress ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.residentialAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.residentialAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              City / Town <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter city"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#1a6b3c] ${
                errors.city ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              State <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setStateOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between border rounded-lg px-3.5 py-2.5 text-sm text-left ${
                form.state ? "text-gray-800" : "text-gray-400"
              } ${errors.state ? "border-red-400" : "border-gray-200"}`}
            >
              {form.state || "Select state"}
              <ChevronDown size={15} className="text-gray-400" />
            </button>
            {stateOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto">
                {states.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStateSelect(s)}
                    className={`w-full text-left px-3.5 py-2.5 text-sm ${
                      form.state === s
                        ? "bg-[#1a6b3c] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Local Government Area <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              disabled={!form.state}
              onClick={() => setLgaOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between border rounded-lg px-3.5 py-2.5 text-sm text-left ${
                !form.state
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : form.lga
                  ? "text-gray-800"
                  : "text-gray-400"
              } ${errors.lga ? "border-red-400" : "border-gray-200"}`}
            >
              {!form.state ? "Select state first" : form.lga || "Select LGA"}
              <ChevronDown size={15} className="text-gray-400" />
            </button>
            {lgaOpen && form.state && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto">
                {lgas.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      handleChange("lga", l);
                      setLgaOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-sm ${
                      form.lga === l
                        ? "bg-[#1a6b3c] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
            {errors.lga && <p className="text-xs text-red-500 mt-1">{errors.lga}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Country</label>
            <input
              type="text"
              value={form.country}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center gap-3">
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
    </div>
  );
};

export default AddressStep;