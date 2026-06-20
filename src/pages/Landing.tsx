import { Link } from "react-router-dom";
import {
  ArrowRight,
  Wallet,
  Zap,
  Receipt,
  ArrowLeftRight,
  Shield,
  CheckCircle,
  UserPlus,
  ScanFace,
  Rocket,
  Lock,
  ShieldCheck,
} from "lucide-react";
import CardImage from "../assets/ATM.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: <Wallet size={20} className="text-[#3B6ECC]" />,
    iconBg: "bg-blue-50",
    title: "NGN & USD Wallets",
    desc: "Hold and manage your naira and dollar balances in one place.",
  },
  {
    icon: <Zap size={20} className="text-[#2D7A4F]" />,
    iconBg: "bg-green-50",
    title: "Fast Transfers",
    desc: "Send money to any bank account or SidonPay user instantly.",
  },
  {
    icon: <Receipt size={20} className="text-[#C97B00]" />,
    iconBg: "bg-yellow-50",
    title: "Bill Payments",
    desc: "Pay for airtime, data, electricity, and subscriptions seamlessly.",
  },
  {
    icon: <ArrowLeftRight size={20} className="text-[#3B6ECC]" />,
    iconBg: "bg-blue-50",
    title: "Currency Conversion",
    desc: "Swap between NGN and USD at competitive live rates anytime.",
  },
];

const securityBadges = [
  { icon: <Shield size={14} className="text-gray-500" />, label: "Licensed & Regulated" },
  { icon: <CheckCircle size={14} className="text-[#2D7A4F]" />, label: "NDIC Insured" },
  { icon: <Lock size={14} className="text-gray-500" />, label: "256-bit Encryption" },
  { icon: <Shield size={14} className="text-gray-500" />, label: "Fraud Monitoring" },
];

const steps = [
  {
    num: "1",
    icon: <UserPlus size={22} className="text-[#2D7A4F]" />,
    title: "Create Account",
    desc: "Sign up in under 2 minutes with just your email and phone number.",
  },
  {
    num: "2",
    icon: <ScanFace size={22} className="text-[#2D7A4F]" />,
    title: "Verify Identity",
    desc: "Quick BVN verification to secure your account and unlock all features.",
  },
  {
    num: "3",
    icon: <Rocket size={22} className="text-[#2D7A4F]" />,
    title: "Start Transacting",
    desc: "Fund your wallet and begin sending, receiving, and paying bills.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#F0F7F2]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 mb-5" style={{border: "1px solid #e5e7eb", borderRadius: "15px", padding: "8px"}}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F]" />
                <span className="text-[11px] font-semibold text-[#2D7A4F] uppercase tracking-widest">
                  Now available in Nigeria
                </span>
              </div>

              <h1 className="text-[36px] sm:text-[44px] lg:text-[48px] font-bold text-[#0D1F17] leading-[1.12] tracking-tight mb-4">
                Your money,{" "}
                <span className="text-[#2D7A4F]">simplified.</span>
                <br />
                NGN & USD in one app.
              </h1>

              <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Hold naira and dollars, send money instantly, pay bills, and
                convert currencies — all from one secure digital wallet.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-[#2D7A4F] hover:bg-[#235f3c] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors w-full sm:w-[200px] text-center"
                >
                 <span>Create Account </span> 
                  <ArrowRight size={16} className="flex-shrink-0" />
                </Link>
                <Link
                  to="/login"
                  className=" items-center gap-2 bg-white hover:bg-gray-50 text-[#0D1F17] text-sm font-semibold px-7 py-3.5 rounded-full border border-gray-200 transition-colors w-full sm:w-[200px] text-center"
                >
                  Log in
                </Link>
              </div>

              <p className="mt-5 text-xs text-gray-400 flex items-center gap-1.5 justify-center lg:justify-start">
                <ShieldCheck size={14} className="text-[#2D7A4F]" />
                Bank-grade encryption · Licensed & regulated
              </p>
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-center lg:justify-end">
            <img src={CardImage} alt="Sidonpay cards" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-2">
              Everything you need
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0D1F17] tracking-tight">
              One app for all your money
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Built for Africans who want a simpler, faster way to manage their finances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map(({ icon, iconBg, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center sm:items-start sm:text-left gap-3 p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm bg-white">
                <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0D1F17] mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="bg-[#FAFAFA] py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-5">
            <Shield size={22} className="text-[#2D7A4F]" />
          </div>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-[#0D1F17] tracking-tight mb-3">
            Your money is safe with us
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-10">
            SidonPay uses industry-leading security protocols to keep your funds
            and data protected at every step.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {securityBadges.map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-600"
              >
                {icon}
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-2">
              Get started
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0D1F17] tracking-tight">
              Up and running in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line desktop only */}
            <div className="hidden sm:block absolute top-[28px] left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-px bg-gray-200" />

            {steps.map(({ num, icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 relative">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#EEF7F2] flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2D7A4F] text-white text-[10px] font-bold flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0D1F17] mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;