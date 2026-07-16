import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { value: "500K+", label: "Active Users" },
  { value: "₦2B+", label: "Processed Monthly" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 5s", label: "Avg. Transfer Time" },
];

const missionPoints = [
  "No hidden fees — transparent pricing always",
  "Available 24/7 with real-time notifications",
  "Regulated & compliant with CBN guidelines",
  "Customer support available Mon–Fri, 8am–6pm",
];

const values = [
  {
    icon: <Users size={20} className="text-[#3B6ECC]" />,
    iconBg: "bg-blue-50",
    title: "People First",
    desc: "Every product decision starts with our users. We build tools that genuinely improve financial lives.",
  },
  {
    icon: <Globe size={20} className="text-[#2D7A4F]" />,
    iconBg: "bg-green-50",
    title: "Financial Access",
    desc: "We believe everyone deserves a world-class banking experience, regardless of income or location.",
  },
  {
    icon: <Shield size={20} className="text-[#6B52CC]" />,
    iconBg: "bg-purple-50",
    title: "Trust & Security",
    desc: "We are licensed, regulated, and hold our users' funds with the same care we'd want for our own.",
  },
  {
    icon: <TrendingUp size={20} className="text-[#C97B00]" />,
    iconBg: "bg-yellow-50",
    title: "Continuous Growth",
    desc: "We ship fast, learn faster, and constantly raise the bar for what fintech can be in Africa.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-white pt-16 pb-10 sm:pt-20 sm:pb-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-4">
            About SidonPay
          </p>
          <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#0D1F17] leading-[1.1] tracking-tight mb-5">
            Built for Africa's{" "}
            <span className="text-[#2D7A4F]">financial future.</span>
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-xl mx-auto">
            <span className="font-semibold text-[#2D7A4F]">SidonPay</span> is a
            modern digital wallet designed to give Nigerians and Africans
            everywhere a smarter, faster way to hold money, pay bills, and move
            funds — in both naira and dollars.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-t border-b border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"> 
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center bg-[#FAFAFA] border border-gray-200 rounded-2xl text-center py-6 px-4">
                <p className="text-[26px] sm:text-[30px] font-bold text-[#2D7A4F] tracking-tight">
                  {value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-4">
                Our Mission
              </p>
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#0D1F17] leading-[1.2] tracking-tight mb-6">
                Making financial freedom accessible to everyone
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                Too many Nigerians are underserved by traditional banking —
                long queues, hidden fees, slow transfers, and zero transparency.
                We started SidonPay to change that.
              </p>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                We combine the simplicity of mobile banking with the power of
                multi-currency wallets, real-time transfers, and seamless bill
                payments — so you can manage your money on your terms, anywhere.
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4 lg:justify-center">
              {missionPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 bg-white border border-white-200 rounded-2xl px-4 py-3.5 shadow-sm">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2D7A4F]" />
                  <p className="text-[14px] text-gray-600 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#FAFAFA] py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-2">
              Our Values
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0D1F17] tracking-tight">
              What we stand for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, iconBg, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 flex flex-col gap-4 items-cen text-center sm:items-start sm:text-left"
              >
                <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 self-center sm:self-atart`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0D1F17] mb-1.5">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        

      {/* CTA BANNER */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "linear-gradient(135deg, #2D7A4F 0%, #1e5435 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-white tracking-tight mb-3">
            Join hundreds of thousands already on SidonPay
          </h2>
          <p className="text-sm text-white/70 mb-8 max-w-md mx-auto">
            Create your free account in under 2 minutes and experience banking
            the way it should be.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#2D7A4F] text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Started for Free <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <Footer />
      </div>
   
  );
};

export default AboutPage;