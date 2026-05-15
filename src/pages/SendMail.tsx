import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const topics = [
  "General Inquiry",
  "Transaction and Transfers",
  "Wallet and Funding",
  "FX Conversion",
  "Bills and Payment",
  "Card Issue",
  "Account and Security",
  "Refunds and Dispute",
];

const SendMail: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isValid = name.trim() && email.trim() && selectedTopic && message.trim();

  const handleSubmit = () => {
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <DashboardLayout userName="Kolawole">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Sent</h2>
          <p className="text-sm text-gray-400 mb-6">
            We've sent a confirmation to {email}.<br />
            Our team will reply within 24 hours.
          </p>
          <button
            onClick={() => navigate("/help")}
            className="flex items-center gap-2 text-[#2D7A51] text-sm hover:underline"
          >
            ← Back to Help Centre
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto px-2 md:px-0">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <Mail className="w-7 h-7 text-[#2D7A51]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Send us an Email</h1>
          <p className="text-sm text-gray-400 mt-1">
            We're here to help! Expect a response within 24 hours
          </p>
        </div>

        {/* Your Name */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Your Name</p>
          <input
            type="text"
            placeholder="John Frey"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Your Email */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Your Email</p>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Topic */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Topic</p>
          <div className="grid grid-cols-4 gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`py-2.5 px-3  text-xs font-medium border rounded-md  transition ${
                  selectedTopic === topic
                    ? "bg-[#2D7A51] text-white border-[#2D7A51]"
                    : "bg-green-100 text-gray-600 border-gray-200 hover:border-green-400 hover:text-[#2D7A51]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Message</p>
          <textarea
            placeholder="Tell us how we can help you..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-400 resize-none text-gray-700 placeholder:text-gray-400"
          />
          <p className="text-right text-xs text-gray-400 mt-1">{message.length} characters</p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={`w-full py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            isValid
              ? "bg-[#2D7A51] text-white hover:bg-green-700"
              : "bg-green-100 text-green-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Please wait...
            </>
          ) : (
            "Send Email"
          )}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default SendMail;