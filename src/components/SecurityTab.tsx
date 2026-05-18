import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
      enabled ? "bg-[#1a6b3c]" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);


interface RowProps {
  title: string;
  subtitle: string;
  right: React.ReactNode;
  highlight?: boolean;
  onClick?: () => void;
}

const Row = ({ title, subtitle, right, highlight = false, onClick }: RowProps) => (
  <div
  onClick={onClick}
    className={`flex items-center justify-between px-5 py-4 rounded-2xl ${
      highlight ? "bg-[#1a6b3c]" : "bg-[#eaf5ee]"
    }`}
  >
    <div className="flex flex-col gap-0.5">
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-xs ${
          highlight ? "text-green-100" : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>
    </div>
    <div className="shrink-0 ml-4">{right}</div>
  </div>
);

  const SecurityTab = () => {
  const navigate = useNavigate();
  const pinActivated = localStorage.getItem("pinActivated") === "true";

  const [twoFA, setTwoFA] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [activeRow, setActiveRow] = useState<string>("pin");

  return (
    <div className="flex flex-col gap-6">

      {/* ── Section 1: Manage PIN and Security ── */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-700">
          Manage PIN and Security
        </p>

        {/* Transaction PIN */}
        <Row
          highlight={activeRow === "pin"}
          title="Transaction PIN"
          subtitle={
            pinActivated
              ? "Your 4-digit PIN is active and secure"
              : "Add an extra layer of security to your account"
          }
          right={
            <button
              onClick={() =>
                navigate(
                  pinActivated
                    ? "/dashboard/account/change-pin"
                    : "/dashboard/account/setup-pin"
                )
              }
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                pinActivated
                  ? "bg-white text-[#1a6b3c] hover:bg-gray-100"
                  : "bg-[#1a6b3c] text-white hover:bg-[#155c33]"
              }`}
            >
              {pinActivated ? "Change PIN" : "Setup Pin"}
            </button>
          }
          onClick={() => setActiveRow("pin")}
        />

        {/* Two-Factor Authentication */}
        <Row
        highlight={activeRow === "2fa"}
          title="Two-Factor Authentication"
          subtitle="Add an extra layer of security to your account"
          right={
            <Toggle enabled={twoFA} onChange={() => setTwoFA((p) => !p)} />
          }
          onClick={() => setActiveRow("2fa")}
        />
      </div>

      {/* ── Section 2: Notification Preferences ── */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-700">
          Notification Preferences
        </p>

        {/* Email Notifications */}
        <Row
         highlight={activeRow === "email"}
          title="Email Notifications"
          subtitle="Receive updates and confirmations via email"
          right={
            <Toggle
              enabled={emailNotif}
              onChange={() => setEmailNotif((p) => !p)}
            />
          }
          onClick={() => setActiveRow("email")}
        />

        {/* SMS Notifications */}
        <Row
         highlight={activeRow === "sms"}
          title="SMS Notifications"
          subtitle="Get important alerts via text message"
          right={
            <Toggle
              enabled={smsNotif}
              onChange={() => setSmsNotif((p) => !p)}
            />
          }
          onClick={() => setActiveRow("sms")}
        />
      </div>

    </div>
  );
};

export default SecurityTab;