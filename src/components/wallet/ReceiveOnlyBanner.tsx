import { Info } from "lucide-react";

const ReceiveOnlyBanner: React.FC = () => (
  <div className="flex items-start gap-2.5 bg-[#E0F3E9] border border-green-100 rounded-lg px-4 py-3 text-sm text-[#2D7A51]">
    <Info className="w-4 h-4 shrink-0 mt-0.5" />
    <p>
      <span className="font-semibold">This wallet is for receiving USD only.</span> To
      transfer money, pay bills, or use other SidonPay services, convert your USD to NGN
      first.
    </p>
  </div>
);

export default ReceiveOnlyBanner;