import { CheckCircle, XCircle} from "lucide-react";
interface Props {
    type: "success" | "error";
    onClose: () => void;
  }
  
  const ProfileFeedbackModal = ({ type, onClose }: Props) => {
    const isSuccess = type === "success";
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center gap-3 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            <>
              <CheckCircle size={44} className="text-[#1a6b3c]" />
              <h3 className="text-lg font-bold text-[#1a6b3c]">Profile Updated</h3>
              <p className="text-sm text-gray-500 text-center">
                Your changes have been saved!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-2.5 rounded-xl bg-[#1a6b3c] text-white text-sm font-medium hover:bg-[#155c33] transition-colors"
              >
                Done
              </button>
            </>
          ) : (
            <>
              <XCircle size={44} className="text-red-500" />
              <h3 className="text-lg font-bold text-red-500">
                Oops, something went wrong
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Check your connection and try again.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default ProfileFeedbackModal;