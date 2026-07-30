interface Props {
  percent: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

const CircularProgress = ({
  percent,
  size = 32,
  strokeWidth = 3,
  showLabel = true,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1a6b3c"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold text-[#1a6b3c]"
            style={{ fontSize: size * 0.28 }}
          >
            {percent}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;