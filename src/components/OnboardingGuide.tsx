import { useNavigate } from "react-router-dom";
import { Wand2, ChevronRight } from "lucide-react";

interface OnboardingGuideProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  stepNumber: number;
  totalSteps: number;
  onClose: () => void;
}

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  title,
  description,
  icon,
  path,
  stepNumber,
  totalSteps,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleNext = () => {
    onClose();
    navigate(path);
  };

  const isLastStep = stepNumber === totalSteps;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">

        {/* Green Header */}
        <div className="bg-[#2D7A51] px-6 py-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-green-200 text-xs">
              Step {stepNumber} of {totalSteps}
            </p>
          </div>
        </div>

        {/* White Content */}
        <div className="bg-white px-6 py-6">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F3E9] flex items-center justify-center">
              <img src={icon} alt={title} className="w-8 h-8" />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm text-center mb-6">
            {description}
          </p>

          {/* Bottom - Dots + Button */}
          <div className="flex items-center justify-between">

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition ${
                    index + 1 === stepNumber ? "bg-[#2D7A51]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Next or Get Started */}
            <button
              onClick={handleNext}
              className="bg-[#2D7A51] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-1"
            >
              {isLastStep ? "Get Started" : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;