import { useState, useEffect } from "react";
import SideImage from "../assets/SideImage.png";
import Logo from "../assets/SidonPay Logo.png";
import IconAddMoney from "../assets/icon-add-money.png";
import IconSendMoney from "../assets/icon-send-money.png";
import IconConvert from "../assets/icon-convert.png";
import IconPayBills from "../assets/icon-pay-bills.png";

const slides = [
  {
    icon: IconAddMoney,
    title: "Add Money Instantly",
    description: "Fund your NGN or USD wallet easily using your bank account or card.",
  },
  {
    icon: IconSendMoney,
    title: "Send Money Anywhere",
    description: "Transfer money to other SidonPay users or any bank account instantly.",
  },
  {
    icon: IconConvert,
    title: "Convert Currencies",
    description: "Easily convert funds between your NGN and USD wallets at great rates.",
  },
  {
    icon: IconPayBills,
    title: "Pay Bills With Ease",
    description: "Quickly pay for airtime, data, electricity and cable TV in seconds.",
  },
];

const OnboardingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Background Image — exactly as before */}
      <img
        src={SideImage}
        alt="SidonPay"
        className="w-full h-full object-cover"
      />

      {/* Logo at top left — creative placement */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-xl">
        <img src={Logo} alt="SidonPay" className="w-6 h-6" />
        <span className="text-white font-bold text-sm">SidonPay</span>
      </div>

      {/* Carousel at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent px-6 pt-10 pb-8 flex flex-col items-center">

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mb-3">
          <img
            src={slides[currentSlide].icon}
            alt={slides[currentSlide].title}
            className="w-6 h-6"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white text-center mb-1 transition-all duration-500">
          {slides[currentSlide].title}
        </h2>

        {/* Description */}
        <p className="text-xs text-white opacity-80 text-center leading-relaxed mb-4 transition-all duration-500">
          {slides[currentSlide].description}
        </p>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white opacity-40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;