import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Maximize2, Send, Paperclip, Sparkles, Bot, Headphones, AlertCircle, PlusCircle, Smartphone, Clock } from "lucide-react";
import AvatarKolawole from "../assets/avatar-kolawole.png";

interface AiMessage {
  id: number;
  text: string;
  sender: "ai" | "user";
  time: string;
}

interface AiAssistantProps {
  onClose: () => void;
}

const quickReplies = [
  { label: "My transfer failed", icon: <AlertCircle className="w-4 h-4 text-red-500" /> },
  { label: "I can't add money", icon: <PlusCircle className="w-4 h-4 text-green-500" /> },
  { label: "Airtime not received", icon: <Smartphone className="w-4 h-4 text-blue-500" /> },
  { label: "My transaction is pending", icon: <Clock className="w-4 h-4 text-blue-400" /> },
];

const getTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
};

const aiReplies: Record<string, string> = {
  "My transfer failed": "Please provide the following information. I await your response.\n\nSidonPay account number\nAmount\nDate of transaction",
  "I can't add money": "Please provide the following information. I await your response.\n\nYour account number\nAmount you tried to add\nPayment method used",
  "Airtime not received": "Please provide the following information. I await your response.\n\nPhone number\nAmount\nDate of purchase",
  "My transaction is pending": "Please provide the following information. I await your response.\n\nSidonPay account number\nAmount\nDate of transaction",
};

const AiAssistant: React.FC<AiAssistantProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [showInitial, setShowInitial] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickReply = (text: string) => {
    if (text === "Chat with a live agent") {
      onClose();
      navigate("/help/live-chat");
      return;
    }

    setShowInitial(false);

    const welcomeMsg: AiMessage = {
      id: Date.now() - 2,
      text: "Hi there!\nWelcome to SidonPay Support.\nI am here to help you with anything. How can I assist you? I await your response",
      sender: "ai",
      time: getTime(),
    };

    const userMsg: AiMessage = {
      id: Date.now(),
      text,
      sender: "user",
      time: getTime(),
    };

    setMessages([welcomeMsg, userMsg]);

    setTimeout(() => {
      const reply = aiReplies[text] || "Please provide more details so I can assist you better.";
      const aiMsg: AiMessage = {
        id: Date.now() + 1,
        text: reply,
        sender: "ai",
        time: getTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (showInitial) {
      setShowInitial(false);
      const welcomeMsg: AiMessage = {
        id: Date.now() - 2,
        text: "Hi there!\nWelcome to SidonPay Support.\nI am here to help you with anything. How can I assist you? I await your response",
        sender: "ai",
        time: getTime(),
      };
      const userMsg: AiMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
        time: getTime(),
      };
      setMessages([welcomeMsg, userMsg]);
    } else {
      const userMsg: AiMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
        time: getTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    setInput("");

    setTimeout(() => {
      const aiMsg: AiMessage = {
        id: Date.now() + 1,
        text: "Please provide more details so I can assist you better. I await your response.",
        sender: "ai",
        time: getTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-4 md:right-6 w-[92vw] md:w-[420px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden"
      style={{ maxHeight: "560px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E0F3E9] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#2D7A51]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Sidon Assistant</p>
            <p className="text-xs text-gray-400">
              {showInitial ? "Always here to help" : "typically replies in few minutes"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { onClose(); navigate("/help/live-chat"); }}
            className="text-gray-400 hover:text-gray-600"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">

        {/* Initial state */}
        {showInitial && (
          <div className="flex flex-col items-center px-4 py-6">
            {/* Robot icon */}
            <div className="w-16 h-16 rounded-full bg-[#E0F3E9] flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-[#2D7A51]" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Hello, there!</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              I can help with transactions, balances, security, and more. How can i be of help?
            </p>

            {/* Quick replies 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 w-full mb-3">
              {quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => handleQuickReply(reply.label)}
                  className="flex items-center gap-2 px-3 py-3 bg-gray-50 rounded-xl text-xs text-gray-700 hover:bg-green-50 hover:text-[#2D7A51] transition text-left"
                >
                  {reply.icon}
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Chat with live agent - full width */}
            <button
              onClick={() => handleQuickReply("Chat with a live agent")}
              className="flex items-center justify-center gap-2 w-full px-3 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-green-50 hover:text-[#2D7A51] transition"
            >
              <Headphones className="w-4 h-4 text-[#2D7A51]" />
              Chat with a live agent
            </button>
          </div>
        )}

        {/* Chat state */}
        {!showInitial && (
          <div className="flex flex-col gap-4 p-4">
            {/* Today label */}
            <div className="text-center">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col gap-1">
                {/* Sender label */}
                <p className={`text-xs text-gray-400 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  sidonpay ai assist
                </p>

                <div className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-[#E0F3E9] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-[#2D7A51]" />
                    </div>
                  )}
                  {msg.sender === "user" && (
                    <img
                      src={AvatarKolawole}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-white border border-gray-100 text-gray-700 shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
                <p className={`text-xs text-gray-400 ${msg.sender === "user" ? "text-right" : "text-left ml-10"}`}>
                  {msg.time}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
        <button className="text-gray-400 hover:text-gray-600 shrink-0">
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition shrink-0 ${
            input.trim() ? "bg-[#2D7A51] hover:bg-green-700" : "bg-gray-100"
          }`}
        >
          <Send className={`w-4 h-4 ${input.trim() ? "text-white" : "text-gray-400"}`} />
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;