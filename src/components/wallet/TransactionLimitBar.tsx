interface Props {
    label: string;
    used: number;
    limit: number;
    currency: "NGN" | "USD";
  }
  
  const TransactionLimitBar: React.FC<Props> = ({ label, used, limit, currency }) => {
    const symbol = currency === "USD" ? "$" : "₦";
    const percent = Math.min((used / limit) * 100, 100);
  
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xs text-gray-500">
            {symbol}{used.toLocaleString()}/{symbol}{limit.toLocaleString()}
          </p>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2D7A51] rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  };
  
  export default TransactionLimitBar;