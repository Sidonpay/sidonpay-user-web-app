import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const WalletActionButton: React.FC<Props> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <span className="w-9 h-9 rounded-full bg-[#E0F3E9] flex items-center justify-center">
        <Icon size={16} className="text-[#2D7A51]" />
      </span>
      {label}
    </button>
  );
};

export default WalletActionButton;