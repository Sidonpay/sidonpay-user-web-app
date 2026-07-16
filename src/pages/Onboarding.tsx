import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Zap,
  Smartphone,
  Tv,
  Droplet,
  Shield,
  Lock,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SlideContent {
  badge: string;
  heading: string;
  highlight: string;
  description: string;
}

const slides: SlideContent[] = [
  {
    badge: 'MULTI-CURRENCY',
    heading: 'Your money,',
    highlight: 'simplified.',
    description:
      'Hold naira and dollars securely, manage balances easily, and move money seamlessly across currencies.',
  },
  {
    badge: 'FAST TRANSFERS',
    heading: 'Send money',
    highlight: 'instantly.',
    description:
      'Transfer funds to banks and other SidonPay users in seconds with transparent transaction tracking.',
  },
  {
    badge: 'BILLS & CONVERT',
    heading: 'Pay bills and convert',
    highlight: 'currencies easily.',
    description:
      'Manage utilities, subscriptions, airtime, and real-time currency conversion from one secure platform.',
  },
  {
    badge: 'SECURITY',
    heading: 'Your money is',
    highlight: 'safe with SidonPay.',
    description:
      'Bank-grade encryption, secure authentication, and reliable infrastructure designed for African users.',
  },
];

const transfers = [
  { name: 'Chioma Okafor', meta: 'Sent · 2m ago', amount: '-₦45,000', out: true },
  { name: 'James Obi', meta: 'Received · 1h ago', amount: '+₦120,000', out: false },
  { name: 'Kemi Adeyemi', meta: 'Sent · 3h ago', amount: '-$200', out: true },
  { name: 'Bello Musa', meta: 'Received · 1d ago', amount: '+₦75,000', out: false },
];

const billIcons = [
  { label: 'Power', icon: Zap, bg: 'bg-amber-50', color: 'text-amber-600' },
  { label: 'Airtime', icon: Smartphone, bg: 'bg-violet-50', color: 'text-violet-600' },
  { label: 'Cable', icon: Tv, bg: 'bg-slate-100', color: 'text-slate-600'},
  { label: 'Water', icon: Droplet, bg: 'bg-sky-50', color: 'text-sky-500'},
];

const securityItems = [
  { icon: Lock, title: 'Bank-grade encryption', sub: '256-bit AES end-to-end' },
  { icon: ShieldCheck, title: 'Secure transfers', sub: 'Every transaction verified' },
  { icon: Smartphone, title: 'Multi-factor authentication', sub: 'Biometric + PIN protection' },
  { icon: BadgeCheck, title: 'CBN Regulated', sub: 'Fully licensed and compliant' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const isFirst = current === 0;
  const isLast = current === slides.length - 1;
  const slide = slides[current];

  const goNext = () => {
    if (isLast) {
      navigate('/signup');
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) setCurrent((prev) => prev - 1);
  };

  const skip = () => navigate('/signup');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
          <span className="text-lg font-bold text-slate-900">SidonPay</span>
        </div>
        {!isLast && (
          <button
            onClick={skip}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main split */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left mockup panel */}
        <div className="relative md:w-1/2 bg-gradient-to-br from-emerald-50 to-emerald-100/60 flex items-center justify-center py-16 px-6 overflow-hidden">
          <span className="absolute left-4 bottom-2 text-7xl md:text-8xl font-bold text-emerald-900/5 select-none">
            {String(current + 1).padStart(2, '0')}
          </span>

          <div className="relative w-full max-w-sm">
            {current === 0 && <WalletsMockup />}
            {current === 1 && <TransfersMockup />}
            {current === 2 && <ConvertMockup />}
            {current === 3 && <SecurityMockup />}
          </div>

          {/* Prev / Next arrows */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => !isLast && setCurrent((p) => p + 1)}
              disabled={isLast}
              className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Right content panel */}
        <div className="md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12">
          <span className="inline-flex items-center gap-1.5 w-fit text-xs font-semibold tracking-wide text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {slide.badge}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {slide.heading}{' '}
            <span className="text-emerald-500">{slide.highlight}</span>
          </h1>

          <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
            {slide.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={goNext}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              {isLast ? 'Get Started' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {isLast ? (
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Already have an account?{' '}
                <span className="text-emerald-600 font-medium">Log In</span>
              </button>
            ) : (
              <button
                onClick={skip}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Skip intro
              </button>
            )}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-slate-400">
              {current + 1}/{slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 py-4 text-center text-sm text-slate-500">
        First time here? Create an account in under 2 minutes. ·{' '}
        <button
          onClick={() => navigate('/dashboard')}
          className="text-emerald-600 font-medium hover:underline"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}

function WalletsMockup() {
    return (
      <div className="relative">
        <div className="relative bg-slate-900 rounded-2xl p-5 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">
                🇳🇬
              </span>
              <div>
                <p className="text-[11px] text-slate-400 tracking-wide">NGN WALLET</p>
                <p className="text-sm font-semibold">Nigerian Naira</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-medium">↗ +2.4%</span>
          </div>
          <p className="text-3xl font-bold mb-1">
            ₦1,240,500<span className="text-base text-slate-400 font-normal">.00</span>
          </p>
          <div className="flex gap-2 mt-5">
            <button className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-lg">
              Send
            </button>
            <button className="bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg">
              Add Money
            </button>
          </div>
  
          {/* Live rate tooltip */}
          <div className="absolute top-14 -right-3 md:-right-6 bg-white rounded-xl shadow-lg px-3.5 py-2.5 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-emerald-600" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 leading-none mb-0.5">Live Rate</p>
              <p className="text-sm font-semibold text-slate-900 leading-none">$1 = ₦1,580</p>
            </div>
          </div>
        </div>
  
        <div className="bg-emerald-800 rounded-2xl p-5 shadow-xl text-white mt-7 ml-6 md:ml-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">
                🇺🇸
              </span>
              <div>
                <p className="text-[11px] text-emerald-200 tracking-wide">USD WALLET</p>
                <p className="text-sm font-semibold">US Dollar</p>
              </div>
            </div>
            <span className="text-xs text-emerald-300 font-medium">↗ +0.8%</span>
          </div>
          <p className="text-3xl font-bold mb-1">
            $4,820<span className="text-base text-emerald-200 font-normal">.00</span>
          </p>
          <div className="flex gap-2 mt-5">
            <button className="bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-lg">
              Convert
            </button>
            <button className="bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-lg">
              Transfer
            </button>
          </div>
        </div>
      </div>
    );
  }


function TransfersMockup() {
    return (
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-slate-900 text-base">Recent Transfers</p>
            <span className="text-xs text-emerald-600 font-medium">View all</span>
          </div>
          <div className="divide-y divide-slate-100">
            {transfers.map((t) => (
              <div key={t.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      t.out ? 'bg-rose-50' : 'bg-emerald-50'
                    }`}
                  >
                    {t.out ? (
                      <ArrowUpRight className="w-4 h-4 text-rose-500" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.meta}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.out ? 'text-slate-900' : 'text-emerald-600'
                  }`}
                >
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
  
        <div className="bg-white rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-500" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900">Instant Transfers</p>
              <p className="text-[11px] text-slate-500">Delivered in under 3 seconds</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
          </span>
        </div>
      </div>
    );
  }


function ConvertMockup() {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            <p className="text-sm font-semibold text-slate-900">Currency Convert</p>
          </div>
  
          <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇺🇸</span>
              <div>
                <p className="text-[11px] text-slate-400 leading-none mb-0.5">From</p>
                <p className="text-sm font-bold text-slate-900 leading-none">USD</p>
              </div>
            </div>
            <span className="text-base font-bold text-slate-900">$100</span>
          </div>
  
          <div className="flex justify-center py-3">
            <span className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-emerald-600" />
            </span>
          </div>
  
          <div className="bg-emerald-50 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇳🇬</span>
              <div>
                <p className="text-[11px] text-slate-500 leading-none mb-0.5">To</p>
                <p className="text-sm font-bold text-emerald-700 leading-none">NGN</p>
              </div>
            </div>
            <span className="text-base font-bold text-emerald-700">₦158,000</span>
          </div>
  
          <p className="text-[11px] text-slate-400 text-center mt-3">
            Rate: $1 = ₦1,580 · Zero fees
          </p>
        </div>
  
        <div className="grid grid-cols-4 gap-2">
          {billIcons.map(({ label, icon: Icon, bg, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1.5"
            >
              <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="text-[11px] font-medium text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }


function SecurityMockup() {
    return (
      <div>

    <div className="flex justify-center mb-6">
     <div className="relative w-52 h-52 rounded-full border border-emerald-200 bg-emerald-50/40 flex items-center justify-center">
     <div className="w-36 h-36 rounded-full bg-emerald-100/70 flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-emerald-200/70 flex items-center justify-center">
        <Shield className="w-9 h-9 text-emerald-600" />
      </div>
      </div>
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-400" />
      <span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-emerald-500" />
      <span className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-amber-400" />
     </div>
     </div>
        
  
        <div className="bg-white rounded-2xl p-4 shadow-xl divide-y divide-slate-100">
          {securityItems.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    );
  }