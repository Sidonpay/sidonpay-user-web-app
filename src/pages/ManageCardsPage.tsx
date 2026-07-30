
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Trash2,
  Shield,
  Star,
  X,
  MessageCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "../context/WalletContext";
import type { SavedCard } from "../types/wallet";
import AiAssistant from "../components/AiAssistant";

const networkLogo = (network: SavedCard["network"]) => {
  if (network === "visa") {
    return (
      <span className="text-white font-extrabold italic text-lg tracking-tight">
        VISA
      </span>
    );
  }
  if (network === "mastercard") {
    return (
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
        <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90 -ml-3" />
      </div>
    );
  }
  return (
    <span className="text-white font-bold text-sm tracking-widest">VERVE</span>
  );
};

const CardTile: React.FC<{
  card: SavedCard;
  onRemove: (card: SavedCard) => void;
  onSetDefault: (id: string) => void;
}> = ({ card, onRemove, onSetDefault }) => {
  const bgColor = card.isDefault
    ? "bg-gradient-to-br from-blue-600 to-blue-800"
    : "bg-gradient-to-br from-gray-800 to-gray-900";

  return (
    <div className={`${bgColor} rounded-2xl p-5 text-white relative`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          {card.isDefault && (
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit">
              <Star size={9} fill="white" />
              DEFAULT
            </span>
          )}
          <span className="text-xs text-white/70 uppercase tracking-wider">
            {card.cardType} Card
          </span>
        </div>
        {networkLogo(card.network)}
      </div>

      <p className="text-base font-mono tracking-[0.2em] mb-4">
        •••• •••• •••• {card.last4}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">
            Card Holder
          </p>
          <p className="text-sm font-semibold uppercase">{card.cardholderName}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">
            Expires
          </p>
          <p className="text-sm font-semibold">{card.expiryDate}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4">
        {!card.isDefault && (
          <button
            onClick={() => onSetDefault(card.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium py-2 rounded-lg transition-colors"
          >
            <Star size={12} />
            Set Default
          </button>
        )}
        <button
          onClick={() => onRemove(card)}
          className={`flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 rounded-lg transition-colors ${
            card.isDefault ? "w-full" : "flex-1"
          }`}
        >
          <Trash2 size={12} />
          Remove
        </button>
      </div>
    </div>
  );
};

// ── Delete confirmation modal ──
const DeleteModal: React.FC<{
  card: SavedCard;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ card, onCancel, onConfirm }) => {
  const bgColor = "bg-gradient-to-br from-gray-800 to-gray-900";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-1">Remove this card?</h3>
        <p className="text-xs text-gray-500 mb-4">
          This card will be permanently removed from your saved cards. You can add it again later.
        </p>

        {/* Mini card preview inside modal */}
        <div className={`${bgColor} rounded-xl p-4 text-white mb-5`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60 uppercase tracking-wider">
              {card.cardType} Card
            </span>
            {networkLogo(card.network)}
          </div>
          <p className="text-sm font-mono tracking-widest mb-2">
            •••• •••• •••• {card.last4}
          </p>
          <div className="flex items-end justify-between">
            <p className="text-xs font-semibold uppercase">{card.cardholderName}</p>
            <p className="text-xs font-semibold">{card.expiryDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 size={14} />
            Remove Card
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedCards, removeCard, setDefaultCard } = useWallet();
  const [cardToDelete, setCardToDelete] = useState<SavedCard | null>(null);
  const [showAi, setShowAi] = useState<boolean>(false);

  const handleConfirmRemove = () => {
    if (cardToDelete) {
      removeCard(cardToDelete.id);
      setCardToDelete(null);
    }
  };

  return (
    <DashboardLayout
      userName="Freya"
      breadcrumbParent="Dashboard"
      breadcrumbCurrent="Saved Cards"
    >
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <h1 className="text-xl font-bold text-gray-800 mb-1">Saved Cards</h1>
        <p className="text-sm text-gray-400 mb-6">Manage your linked debit and credit cards</p>
        {savedCards.length === 0 && (
          <div className="flex items-start gap-3 bg-[#EEF7F0] border border-green-200 rounded-xl p-4 mb-6">
            <Shield size={16} className="text-[#2D7A51] shrink-0 mt-0.5" />
            <p className="text-xs text-[#2D7A51] leading-relaxed">
              Cards are tokenized and stored securely via Paystack Vault. Your full card number is never stored.
            </p>
          </div>
        )}

        {/* Empty state */}
        {savedCards.length === 0 && (
          <div className="border border-gray-100 rounded-2xl bg-gray-50 flex flex-col items-center justify-center py-14 px-6 text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center mb-4">
              <CreditCard size={22} className="text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">No card saved yet</p>
            <p className="text-xs text-gray-400 max-w-[220px]">
              Add a debit or credit card to fund your wallet instantly without entering details each time
            </p>
          </div>
        )}

        {/* Cards list */}
        {savedCards.length > 0 && (
          <div className="flex flex-col gap-4 mb-6">
            {savedCards.map((card) => (
              <CardTile
                key={card.id}
                card={card}
                onRemove={setCardToDelete}
                onSetDefault={setDefaultCard}
              />
            ))}
          </div>
        )}
        <button
          onClick={() => navigate("/add-card")}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-[#2D7A51] hover:text-[#2D7A51] text-gray-500 text-sm font-medium py-3.5 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Card
        </button>
      </div>
      {cardToDelete && (
        <DeleteModal
          card={cardToDelete}
          onCancel={() => setCardToDelete(null)}
          onConfirm={handleConfirmRemove}
        />
      )}

      {/* Floating AI Assistant */}
      <button
        onClick={() => setShowAi(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D7A51] rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition z-40"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </button>
      {showAi && <AiAssistant onClose={() => setShowAi(false)} />}
    </DashboardLayout>
  );
};

export default ManageCardsPage;