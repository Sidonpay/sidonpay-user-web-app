import { ShieldCheck } from "lucide-react";

const KYCTab = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <ShieldCheck size={48} className="text-[#1a6b3c] opacity-40" />
      <h3 className="text-base font-semibold text-gray-600">
        KYC Verification
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Your KYC details and tier upgrade options will appear here.
      </p>
    </div>
  );
};

export default KYCTab;