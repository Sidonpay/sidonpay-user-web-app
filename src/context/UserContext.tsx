import { createContext, useContext, useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  tier: string;
  dailyLimit: string;
  monthlyLimit: string;
  maxBalance: string;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  tier: "Tier 0",
  dailyLimit: "₦200,000",
  monthlyLimit: "₦5,000,000",
  maxBalance: "₦5,000,000",
};

const UserContext = createContext<UserContextType>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);