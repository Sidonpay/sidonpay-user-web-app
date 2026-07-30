import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Search,
  LogOut,
  HelpCircle,
  ArrowLeftRight,
  Receipt,
  Gift,
  CreditCard,
  Layers,
  LayoutDashboard,
  Menu,
  UserCircle,
  X,
  Settings,
} from "lucide-react";
import DashboardLogo from "../assets/Dashboard-Logo.png";
import BreadcrumbIcon from "../assets/breadcrumb-icon.png";
import TierIcon from "../assets/tier-icon.png";
import AvatarKolawole from "../assets/avatar-kolawole.png";
import NotifPayment from "../assets/notif-payment.png";
import NotifUser from "../assets/notif-user.png";
import NotifMaintenance from "../assets/notif-maintenance.png";
import NotifRefund from "../assets/notif-refund.png";
import KunleAvatar from "../assets/kunle-avatar.png";
import BolaAvatar from "../assets/bola-avatar.png";
import SholaAvatar from "../assets/shola-avatar.png";
import LatiAvatar from "../assets/lati-avatar.png";

interface Notification {
  message: string;
  time: string;
  type: "payment" | "user" | "maintenance" | "refund";
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  tier?: string;
  notifications?: Notification[];
  showSelectBeneficiary?: boolean;
  breadcrumbParent?: string;
  breadcrumbCurrent?: string;
}

const selectBeneficiary = [
  { name: "Kunle Adeyeye", avatar: KunleAvatar },
  { name: "Bola Adejo", avatar: BolaAvatar },
  { name: "Shola Adeniyi", avatar: SholaAvatar },
  { name: "Lati Olaoye", avatar: LatiAvatar },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userName = "Kolawole",
  tier = "Tier 1",
  showSelectBeneficiary = false,
  breadcrumbParent = "Dashboards",
  breadcrumbCurrent = "Home",
  notifications = [
    { message: "Payment Successful to Fo...", time: "Just now", type: "payment" },
    { message: "New users registered.", time: "59 minutes ago", type: "user" },
    { message: "Maintenance Notice", time: "12 hours ago", type: "maintenance" },
    { message: "Refund Requested from Sa...", time: "Today, 11:59 AM", type: "refund" },
  ],
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showMobileProfile, setShowMobileProfile] = useState<boolean>(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard/help") ||
      location.pathname === "/settings"
    ) {
      setShowMore(true);
    }
  }, [location.pathname]);

  const navItems = [
    { label: "Overview", icon: <LayoutDashboard className="w-4 h-4" />, path: "/dashboard" },
    { label: "Transfer Money", icon: <ArrowLeftRight className="w-4 h-4" />, path: "/transfer" },
    { label: "Bill Payments", icon: <Receipt className="w-4 h-4" />, path: "/bill-payments" },
    { label: "Gift Cards", icon: <Gift className="w-4 h-4" />, path: "/gift-cards" },
    { label: "Account", icon: <UserCircle size={18} />, path: "/dashboard/account" },
    { label: "Virtual Cards", icon: <CreditCard className="w-4 h-4" />, path: "/virtual-cards" },
    { label: "Multi-Currency Cards", icon: <Layers className="w-4 h-4" />, path: "/multi-currency" },
  ];

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      payment: NotifPayment,
      user: NotifUser,
      maintenance: NotifMaintenance,
      refund: NotifRefund,
    };
    return (
      <img src={icons[type]} alt={type} className="w-9 h-9 rounded-xl shrink-0" />
    );
  };

  const isMoreActive =
    location.pathname.startsWith("dashboard/help") ||
    location.pathname === "/settings";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1">

        {/* Logo */}
        <div className="px-4 mb-6">
          <img src={DashboardLogo} alt="SidonPay" className="h-8" />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setShowMobileMenu(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left w-full ${
                location.pathname === item.path
                  ? "bg-[#2D7A51] text-white"
                  : "text-[#2D7A51] hover:bg-green-100"
              }`}
            >
              <span className={`p-1.5 rounded-lg ${
                location.pathname === item.path
                  ? "bg-white bg-opacity-20"
                  : "bg-[#2D7A51]"
              }`}>
                <span className="text-white">{item.icon}</span>
              </span>
              {item.label}
            </button>
          ))}

          {/* More button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition w-full ${
              isMoreActive
                ? "bg-[#2D7A51] text-white"
                : "text-[#2D7A51] hover:bg-green-100"
            }`}
          >
            <span className={`p-1.5 rounded-lg ${
              isMoreActive ? "bg-white bg-opacity-20" : "bg-[#2D7A51]"
            }`}>
              <Layers className="w-4 h-4 text-white" />
            </span>
            More
            {showMore ? (
              <ChevronUp className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto" />
            )}
          </button>

          {/* More Dropdown */}
          {showMore && (
            <div className="flex flex-col gap-1 pl-2 mt-1">

              {/* Settings */}
              <button
                onClick={() => {
                  navigate("/settings");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition w-full ${
                  location.pathname === "/settings"
                    ? "bg-[#2D7A51] text-white"
                    : "text-[#2D7A51] hover:bg-green-100"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${
                  location.pathname === "/settings"
                    ? "bg-white bg-opacity-20"
                    : "bg-[#2D7A51]"
                }`}>
                  <Settings className="w-4 h-4 text-white" />
                </span>
                Settings
              </button>

              {/* Help Centre */}
              <button
                onClick={() => {
                  navigate("/dashboard/help");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition w-full ${
                  location.pathname.startsWith("/dashboard/help")
                    ? "bg-[#2D7A51] text-white"
                    : "text-[#2D7A51] hover:bg-green-100"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${
                  location.pathname.startsWith("/dashboard/help")
                    ? "bg-white bg-opacity-20"
                    : "bg-[#2D7A51]"
                }`}>
                  <HelpCircle className="w-4 h-4 text-white" />
                </span>
                Help Centre
              </button>

              {/* Logout */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#2D7A51] hover:bg-green-100 transition w-full"
              >
                <span className="p-1.5 rounded-lg bg-[#2D7A51]">
                  <LogOut className="w-4 h-4 text-white" />
                </span>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-56 bg-[#E0F3E9] flex-col py-4 fixed h-full border-r border-green-100">
        <SidebarContent />
      </div>
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#E0F3E9] py-4 shadow-xl">
            <div className="flex justify-end px-4 mb-2">
              <button onClick={() => setShowMobileMenu(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 md:ml-56 flex flex-col">

        {/* Top Navbar */}
        <div className="w-full bg-white px-4 md:px-6 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

           <div className="flex items-center gap-2 text-xs text-gray-400">
          <img src={BreadcrumbIcon} alt="dashboard" className="w-5 h-5" />
          <span className="hidden sm:block">{breadcrumbParent}</span>
          <span className="hidden sm:block">/</span>
          <span className="text-gray-800 font-bold">{breadcrumbCurrent}</span>
        </div>
        </div>
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-72">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <div
              onClick={() => setShowMobileProfile(!showMobileProfile)}
              className="flex items-center justify-between gap-3 cursor-pointer shrink-0 min-w-[120px] md:min-w-[150px]"
            >
              <img
                src={AvatarKolawole}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700 flex-1 text-center hidden sm:block">
                {userName}
              </span>
              {showMobileProfile ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
            {showMobileProfile && (
              <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl p-4 z-50 md:hidden flex flex-col gap-4 border border-gray-100">

                {/* Tier Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={TierIcon} alt="tier" className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700 leading-tight">{tier}</p>
                      <p className="text-xs text-gray-400 leading-tight">Tier limit stated here</p>
                    </div>
                  </div>
                  <span
                    onClick={() => navigate("/upgrade")}
                    className="text-xs text-green-600 cursor-pointer hover:underline font-medium shrink-0 ml-2"
                  >
                    Upgrade
                  </span>
                </div>

                {/* Notifications */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Notifications</p>
                  <div className="flex flex-col gap-3">
                    {notifications.map((notif, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {getNotificationIcon(notif.type)}
                        <div>
                          <p className="text-xs text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p
                    onClick={() => navigate("/notifications")}
                    className="text-xs text-gray-700 cursor-pointer underline mt-3 font-medium"
                  >
                    All Notifications
                  </p>
                </div>

                {/* Team Members - mobile */}
                {showSelectBeneficiary && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Select Beneficiary</p>
                    <div className="flex flex-col gap-3">
                      {selectBeneficiary.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <p className="text-xs text-gray-600 font-medium">{member.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1">

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
            {children}
          </div>

          <div className="hidden md:flex w-64 bg-white border-l border-gray-100 p-4 flex-col gap-4 shrink-0">

            {/* Tier Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={TierIcon} alt="tier" className="w-6 h-6 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-700 leading-tight">{tier}</p>
                  <p className="text-xs text-gray-400 leading-tight">Tier limit stated here</p>
                </div>
              </div>
              <span
                onClick={() => navigate("/upgrade")}
                className="text-xs text-green-600 cursor-pointer hover:underline font-medium shrink-0 ml-2"
              >
                Upgrade
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Notifications</p>
              <div className="flex flex-col gap-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {getNotificationIcon(notif.type)}
                    <div>
                      <p className="text-xs text-gray-600">{notif.message}</p>
                      <p className="text-xs text-gray-400">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p
                onClick={() => navigate("/notifications")}
                className="text-xs text-gray-700 cursor-pointer underline mt-3 font-medium"
              >
                All Notifications
              </p>
            </div>
            {showSelectBeneficiary && (
              <div>
                <p className="text-sm font-semibold text-green-700 mb-3">Select Beneficiary</p>
                <div className="flex flex-col gap-3">
                  {selectBeneficiary.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-xs text-gray-600 font-medium">{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;