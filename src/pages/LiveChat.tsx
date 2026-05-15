import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Paperclip } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

interface Message {
  id: number;
  text: string;
  sender: "support" | "user";
  time: string;
}

const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
};

const LiveChat: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! Welcome to SidonPay Support. I'm here to help you with anything. How can I assist you today?",
      sender: "support",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportReplies = [
    "Please provide the following information:\n• SidonPay account number\n• Amount\n• Date of transaction\nI await your response!",
    "Thank you for providing that information. Let me look into this for you right away.",
    "I can see the issue. Please give me a moment to resolve this for you.",
    "Your issue has been escalated to our technical team. You'll receive an email update within 24 hours.",
    "Is there anything else I can help you with?",
  ];

  const [replyIndex, setReplyIndex] = useState(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: getTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: supportReplies[replyIndex % supportReplies.length],
        sender: "support",
        time: getTime(),
      };
      setMessages((prev) => [...prev, reply]);
      setReplyIndex((prev) => prev + 1);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto flex flex-col bg-white h-[calc(100vh-180px)]">

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 bg-white border-b border-gray-100 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#E0F3E9] flex items-center justify-center shrink-0">
            <span className="text-[#2D7A51] font-bold text-sm">S</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Support</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-green-500">Online now</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
          <div className="text-center">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.sender === "support" && (
                <div className="w-8 h-8 rounded-full bg-[#E0F3E9] flex items-center justify-center shrink-0">
                  <span className="text-[#2D7A51] font-bold text-xs">S</span>
                </div>
              )}
              <div className={`max-w-xs md:max-w-md ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-[#2D7A51] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-700 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
                <p className="text-xs text-gray-400">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
          <button className="text-gray-400 hover:text-gray-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
              input.trim() ? "bg-[#2D7A51] hover:bg-green-700" : "bg-gray-200"
            }`}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveChat;