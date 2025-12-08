import React, { useRef, useState, useEffect } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow only last character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Trigger complete if full
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onComplete(combinedOtp);
    }

    // Move to next input if value is entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move to previous input on backspace if empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center w-full">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-14 border border-gray-200 rounded-lg text-center text-xl font-bold text-gray-700 focus:border-[#2E7D56] focus:ring-1 focus:ring-[#2E7D56] outline-none bg-gray-50 transition-all"
        />
      ))}
    </div>
  );
};

export default OtpInput;
