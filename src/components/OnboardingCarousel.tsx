// import { useState, useEffect } from "react";
// import IconAddMoney from "../assets/icon-add-money.png";
// import IconSendMoney from "../assets/icon-send-money.png";
// import IconConvert from "../assets/icon-convert.png";
// import IconPayBills from "../assets/icon-pay-bills.png";

// const slides = [
//   {
//     icon: IconAddMoney,
//     title: "Add Money Instantly",
//     description: "Fund your NGN or USD wallet easily using your bank account or card. Fast, secure and reliable.",
//     color: "bg-green-100",
//   },
//   {
//     icon: IconSendMoney,
//     title: "Send Money Anywhere",
//     description: "Transfer money to other SidonPay users or directly to any bank account in Nigeria instantly.",
//     color: "bg-blue-50",
//   },
//   {
//     icon: IconConvert,
//     title: "Convert Currencies",
//     description: "Easily convert funds between your NGN and USD wallets at the best available rates.",
//     color: "bg-purple-50",
//   },
//   {
//     icon: IconPayBills,
//     title: "Pay Bills With Ease",
//     description: "Quickly pay for airtime, data, electricity, cable TV and other utility bills in seconds.",
//     color: "bg-orange-50",
//   },
// ];

// const OnboardingCarousel: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState<number>(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#E0F3E9] px-10 py-12 relative overflow-hidden">

//       {/* Background decorative circles */}
//       <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-[#2D7A51] opacity-10" />
//       <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 rounded-full bg-[#2D7A51] opacity-10" />

//       {/* Logo at top */}
//       <div className="absolute top-8 left-8">
//         <p className="text-[#2D7A51] font-bold text-xl">SidonPay</p>
//       </div>

//       {/* Slide content */}
//       <div className="flex flex-col items-center text-center max-w-xs z-10">

//         {/* Icon */}
//         <div className={`w-24 h-24 rounded-3xl ${slides[currentSlide].color} flex items-center justify-center mb-8 shadow-sm transition-all duration-500`}>
//           <img
//             src={slides[currentSlide].icon}
//             alt={slides[currentSlide].title}
//             className="w-12 h-12 transition-all duration-500"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-3 transition-all duration-500">
//           {slides[currentSlide].title}
//         </h2>

//         {/* Description */}
//         <p className="text-sm text-gray-500 leading-relaxed transition-all duration-500">
//           {slides[currentSlide].description}
//         </p>
//       </div>

//       {/* Dots */}
//       <div className="flex items-center gap-2 mt-10 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`rounded-full transition-all duration-300 ${
//               index === currentSlide
//                 ? "w-6 h-2.5 bg-[#2D7A51]"
//                 : "w-2.5 h-2.5 bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Bottom text */}
//       <p className="absolute bottom-8 text-xs text-gray-400 z-10">
//         Your trusted financial companion
//       </p>
//     </div>
//   );
// };

// export default OnboardingCarousel;



// import { useState, useEffect } from "react";
// import SideImage from "../assets/SideImage.png";
// import IconAddMoney from "../assets/icon-add-money.png";
// import IconSendMoney from "../assets/icon-send-money.png";
// import IconConvert from "../assets/icon-convert.png";
// import IconPayBills from "../assets/icon-pay-bills.png";

// const slides = [
//   {
//     icon: IconAddMoney,
//     title: "Add Money Instantly",
//     description: "Fund your NGN or USD wallet easily using your bank account or card. Fast, secure and reliable.",
//   },
//   {
//     icon: IconSendMoney,
//     title: "Send Money Anywhere",
//     description: "Transfer money to other SidonPay users or directly to any bank account in Nigeria instantly.",
//   },
//   {
//     icon: IconConvert,
//     title: "Convert Currencies",
//     description: "Easily convert funds between your NGN and USD wallets at the best available rates.",
//   },
//   {
//     icon: IconPayBills,
//     title: "Pay Bills With Ease",
//     description: "Quickly pay for airtime, data, electricity, cable TV and other utility bills in seconds.",
//   },
// ];

// const OnboardingCarousel: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState<number>(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-full">

//       {/* Background Image */}
//       <img
//         src={SideImage}
//         alt="SidonPay"
//         className="w-full h-full object-cover"
//       />

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-40" />

//       {/* Carousel Content — on top of image */}
//       <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-10">

//         {/* Icon */}
//         <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center mb-4">
//           <img
//             src={slides[currentSlide].icon}
//             alt={slides[currentSlide].title}
//             className="w-8 h-8"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-white text-center mb-2 transition-all duration-500">
//           {slides[currentSlide].title}
//         </h2>

//         {/* Description */}
//         <p className="text-sm text-white text-opacity-80 text-center leading-relaxed mb-6 transition-all duration-500">
//           {slides[currentSlide].description}
//         </p>

//         {/* Dots */}
//         <div className="flex items-center gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "w-6 h-2.5 bg-white"
//                   : "w-2.5 h-2.5 bg-white bg-opacity-40"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingCarousel;


// import { useState, useEffect } from "react";
// import SideImage from "../assets/SideImage.png";
// import IconAddMoney from "../assets/icon-add-money.png";
// import IconSendMoney from "../assets/icon-send-money.png";
// import IconConvert from "../assets/icon-convert.png";
// import IconPayBills from "../assets/icon-pay-bills.png";

// const slides = [
//   {
//     icon: IconAddMoney,
//     title: "Add Money Instantly",
//     description: "Fund your NGN or USD wallet easily using your bank account or card. Fast, secure and reliable.",
//   },
//   {
//     icon: IconSendMoney,
//     title: "Send Money Anywhere",
//     description: "Transfer money to other SidonPay users or directly to any bank account in Nigeria instantly.",
//   },
//   {
//     icon: IconConvert,
//     title: "Convert Currencies",
//     description: "Easily convert funds between your NGN and USD wallets at the best available rates.",
//   },
//   {
//     icon: IconPayBills,
//     title: "Pay Bills With Ease",
//     description: "Quickly pay for airtime, data, electricity, cable TV and other utility bills in seconds.",
//   },
// ];

// const OnboardingCarousel: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState<number>(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-full">

//       {/* Image — exactly as it was before */}
//       <img
//         src={SideImage}
//         alt="SidonPay"
//         className="w-full h-full object-cover"
//       />

//       {/* Carousel overlay — just sits on top */}
//       <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center px-8">

//         {/* Icon */}
//         <div className="w-14 h-14 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center mb-3">
//           <img
//             src={slides[currentSlide].icon}
//             alt={slides[currentSlide].title}
//             className="w-7 h-7"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-xl font-bold text-white text-center mb-2">
//           {slides[currentSlide].title}
//         </h2>

//         {/* Description */}
//         <p className="text-xs text-white text-center leading-relaxed mb-5 opacity-90">
//           {slides[currentSlide].description}
//         </p>

//         {/* Dots */}
//         <div className="flex items-center gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "w-6 h-2 bg-white"
//                   : "w-2 h-2 bg-white opacity-40"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingCarousel;



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