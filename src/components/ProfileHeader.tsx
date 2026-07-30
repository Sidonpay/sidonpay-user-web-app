import { useRef } from "react";
import { Camera, Calendar } from "lucide-react";
import { useUser } from "../context/UserContext";
import tier1 from "../assets/tier1.png";

const ProfileHeader = () => {
  const { profile, setAvatar } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditPhoto = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please select an image.");
    if (file.size > 5 * 1024 * 1024) return alert("Max 5MB allowed.");
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const initial = profile.firstName?.charAt(0).toUpperCase() || "?";

  const joined = new Date(profile.joinedDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-1.5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-[#d4edda]">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#1a6b3c] text-3xl font-bold">
                  {initial}
                </div>
              )}
            </div>
            <button
              onClick={handleEditPhoto}
              className="absolute bottom-1 right-0 w-7 h-7 rounded-full bg-[#1a6b3c] flex items-center justify-center shadow-md hover:bg-[#155c33] transition-colors"
            >
              <Camera size={13} className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <button
            onClick={handleEditPhoto}
            className="text-xs text-[#1a6b3c] font-medium hover:underline"
          >
            Edit Photo
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={tier1} alt="tier badge" className="h-6 w-auto" />
            <span className="text-sm font-semibold text-gray-800">
              {profile.tier}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">Joined {joined}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;