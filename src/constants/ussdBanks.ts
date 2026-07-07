export interface UssdBank {
    id: string;
    name: string;
    code: string;
    shortCode: string;
    initials: string;
    color: string;
  }
  
  export const USSD_BANKS: UssdBank[] = [
    { id: "gtb", name: "GTBank", code: "*737*", shortCode: "737", initials: "GTB", color: "bg-red-500" },
    { id: "zenith", name: "Zenith Bank", code: "*966*", shortCode: "966", initials: "ZEN", color: "bg-red-600" },
    { id: "access", name: "Access Bank", code: "*901*", shortCode: "901", initials: "ACC", color: "bg-orange-500" },
    { id: "firstbank", name: "First Bank", code: "*894*", shortCode: "894", initials: "FBN", color: "bg-blue-900" },
    { id: "uba", name: "UBA", code: "*919*", shortCode: "919", initials: "UBA", color: "bg-red-700" },
    { id: "stanbic", name: "Stanbic IBTC", code: "*909*", shortCode: "909", initials: "STB", color: "bg-blue-600" },
    { id: "polaris", name: "Polaris Bank", code: "*833*", shortCode: "833", initials: "POL", color: "bg-purple-600" },
    { id: "fcmb", name: "FCMB", code: "*329*", shortCode: "329", initials: "FCM", color: "bg-green-600" },
    { id: "ecobank", name: "Ecobank", code: "*326*", shortCode: "326", initials: "ECO", color: "bg-blue-700" },
    { id: "sterling", name: "Sterling Bank", code: "*822*", shortCode: "822", initials: "STL", color: "bg-purple-500" },
  ];