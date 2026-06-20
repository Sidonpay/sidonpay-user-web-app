import { Link } from "react-router-dom";
import {
  Wallet,
  ArrowLeftRight,
  Receipt,
  ShieldCheck,
  UserCircle,
  Mail,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  {
    icon: <Wallet size={20} className="text-[#3B6ECC]" />,
    iconBg: "bg-blue-50",
    title: "Wallet & Funding",
    desc: "Add money, manage balances, and top up your NGN or USD wallet.",
  },
  {
    icon: <ArrowLeftRight size={20} className="text-[#2D7A4F]" />,
    iconBg: "bg-green-50",
    title: "Transfers & Payments",
    desc: "Send money to bank accounts or other SidonPay users instantly.",
  },
  {
    icon: <Receipt size={20} className="text-[#C97B00]" />,
    iconBg: "bg-yellow-50",
    title: "Bills & Services",
    desc: "Airtime, data, electricity, cable TV, and other utility payments.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#6B52CC]" />,
    iconBg: "bg-purple-50",
    title: "Security & Verification",
    desc: "BVN verification, two-factor auth, and keeping your account safe.",
  },
  {
    icon: <UserCircle size={20} className="text-[#CC4B4B]" />,
    iconBg: "bg-red-50",
    title: "Account & Profile",
    desc: "Update your profile, change password, and manage settings.",
  },
];

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#F0F7F2] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-3">
            Help Center
          </p>
          <h1 className="text-[30px] sm:text-[40px] font-bold text-[#0D1F17] tracking-tight">
            How can we help you?
          </h1>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-base font-semibold text-[#0D1F17] mb-7">
            Browse by category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(({ icon, iconBg, title, desc }) => (
              <button
                key={title}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#2D7A4F]/30 hover:shadow-sm text-left transition-all group"
              >
                <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0D1F17] mb-1 group-hover:text-[#2D7A4F] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STILL NEED HELP */}
      <section className="bg-[#FAFAFA] border-t border-gray-100 py-14 sm:py-16">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[20px] font-bold text-[#0D1F17] mb-2">
            Still need help?
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Our support team is available Monday – Friday, 8am – 6pm WAT.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:support@sidonpay.com"
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-[#0D1F17] text-sm font-medium px-5 py-3.5 rounded-full transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              <Mail size={15} className="text-[#2D7A4F] flex-shrink-0" />
              <span className="text-[#2D7A4F]">support@sidonpay.com</span> 
            </a>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-[#2D7A4F]/50 bg-green text-sm font-medium px-5 py-3.5 rounded-full transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              <MessageCircle size={15} className="text-[#2D7A4F] flex-shrink-0" />
             <span className="text-[#2D7A4F]" > Contact Support</span>
            </Link>

            <Link
              to="/contact?subject=Report+a+Problem"
              className="flex items-center justify-center gap-2 border border-red-200 hover:border-red-300 bg-red-50 text-red-600 text-sm font-medium px-5 py-3.5 rounded-full transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              <AlertTriangle size={15} className="flex-shrink-0" />
            <span> Report a Problem</span> 
            </Link>
          </div>
        </div>
      </section>
 
      <Footer />
    </div>
  );
};

export default HelpPage;