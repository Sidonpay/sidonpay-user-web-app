import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const PinCreated: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout userName="Kolawole">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#2D7A51]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            PIN Created
          </h2>
          <p className="text-sm text-gray-400 mb-10">
            Your transaction PIN has been set successfully. You're all set!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 rounded-lg text-sm font-semibold bg-[#2D7A51] text-white hover:bg-green-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PinCreated;