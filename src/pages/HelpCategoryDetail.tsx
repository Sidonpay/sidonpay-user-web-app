// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronDown, ChevronUp, ArrowLeft} from "lucide-react";
// import DashboardLayout from "../components/DashboardLayout";

// interface FAQ {
//   question: string;
//   answer: string;
// }

// interface CategoryData {
//   title: string;
//   faqs: FAQ[];
// }

// const categoryData: Record<string, CategoryData> = {
//   "payments-transfers": {
//     title: "Payments & Transfers",
//     faqs: [
//       {
//         question: "Why can't I transfer?",
//         answer: "Transfers may take 1–3 business days depending on the recipient's bank. International transfers can take up to 5 business days.",
//       },
//       {
//         question: "How do I send money to another SidonPay user?",
//         answer: "Go to Transfer Money, select 'To SidonPay user', enter the recipient's account number, enter the amount and click Continue.",
//       },
//       {
//         question: "What is the maximum transfer limit?",
//         answer: "The maximum transfer limit per transaction is ₦5,000,000. For higher limits, please upgrade your account tier.",
//       },
//       {
//         question: "Why is my transfer pending?",
//         answer: "Transfers can be pending due to bank processing times, security checks, or network issues. If it stays pending for more than 24 hours, contact support.",
//       },
//     ],
//   },
//   "security-privacy": {
//     title: "Security & Privacy",
//     faqs: [
//       {
//         question: "How do I set up 2FA?",
//         answer: "Go to Settings > Security > Two-Factor Authentication and follow the steps to enable 2FA on your account.",
//       },
//       {
//         question: "How do I change my password?",
//         answer: "Go to Settings > Security > Change Password. You'll need your current password and a new one.",
//       },
//       {
//         question: "What should I do if my account is compromised?",
//         answer: "Immediately change your password, disable your PIN, and contact our support team. We'll help you secure your account.",
//       },
//       {
//         question: "How is my data protected?",
//         answer: "We use bank-grade encryption to protect all your data. Your personal information is never shared with third parties without your consent.",
//       },
//     ],
//   },
//   "cards-account": {
//     title: "Cards & Account",
//     faqs: [
//       {
//         question: "How do I create a virtual card?",
//         answer: "Go to Virtual Cards in the menu and click Create Card. Follow the steps to set up your virtual card.",
//       },
//       {
//         question: "How do I update my profile?",
//         answer: "Go to Account > Profile and update your details. Some details may require verification.",
//       },
//       {
//         question: "How do I freeze my card?",
//         answer: "Go to Virtual Cards, select the card you want to freeze and toggle the freeze option.",
//       },
//       {
//         question: "How do I delete my account?",
//         answer: "To delete your account, contact our support team. Note that this action is irreversible and all data will be lost.",
//       },
//     ],
//   },
//   "wallet-funding": {
//     title: "Wallet & Funding",
//     faqs: [
//       {
//         question: "How do I add money to my wallet?",
//         answer: "Click Add Money on your dashboard, choose your preferred method (bank transfer or card), and follow the steps.",
//       },
//       {
//         question: "How long does funding take?",
//         answer: "Bank transfers typically take 1–30 minutes. Card payments are instant.",
//       },
//       {
//         question: "What currencies are supported?",
//         answer: "We currently support NGN and USD. More currencies will be added soon.",
//       },
//       {
//         question: "What is the minimum deposit?",
//         answer: "The minimum deposit is ₦100 for NGN and $1 for USD wallets.",
//       },
//     ],
//   },
//   "bills-services": {
//     title: "Bills & Services",
//     faqs: [
//       {
//         question: "How do I pay for airtime?",
//         answer: "Go to Bill Payments > Airtime, enter the phone number and amount, then click Pay.",
//       },
//       {
//         question: "Can I schedule bill payments?",
//         answer: "Scheduled payments are coming soon. For now, you can make instant payments from the Bill Payments section.",
//       },
//       {
//         question: "What bills can I pay?",
//         answer: "You can pay for airtime, data, electricity, cable TV (DSTV, GOTV), and more.",
//       },
//       {
//         question: "What do I do if my bill payment failed?",
//         answer: "If payment was deducted but service not received, wait 30 minutes. If the issue persists, contact support with your transaction ID.",
//       },
//     ],
//   },
// };

// const HelpCategoryDetail: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const data = id ? categoryData[id] : null;

//   if (!data) {
//     return (
//       <DashboardLayout userName="Kolawole">
//         <div className="flex flex-col items-center justify-center min-h-[50vh]">
//           <p className="text-gray-400 text-sm">Category not found</p>
//           <button
//             onClick={() => navigate("/help/categories")}
//             className="mt-4 text-[#2D7A51] text-sm hover:underline"
//           >
//             ← Back to Help Categories
//           </button>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout userName="Kolawole">
//       <div className="max-w-3xl mx-auto px-2 md:px-0">

//         {/* Back button */}
//         <button
//           onClick={() => navigate("/help/categories")}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span className="text-sm">Back</span>
//         </button>

//         {/* Header */}
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{data.title}</h1>
//         <p className="text-xs text-gray-400 mb-6">{data.faqs.length} articles</p>

//         {/* FAQ Accordion */}
//         <div className="flex flex-col gap-2 mb-10">
//           {data.faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="border rounded-xl overflow-hidden bg-white shadow-md"
//             >
//               <button
//                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                 className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition"
//               >
//                 <span className="text-sm font-medium text-gray-800">{faq.question}</span>
//                 {openIndex === index ? (
//                   <ChevronUp className="w-4 h-4 text-black-400 shrink-0" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4 text-black-400 shrink-0" />
//                 )}
//               </button>
//               {openIndex === index && (
//                 <div className="px-4 pb-4">
//                   <p className="text-sm text-gray-500">{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Still need help */}
//         <div className="border-t border-gray-100 pt-6">
//           <p className="text-sm font-semibold text-green-800">Still need help?</p>
//           <p className="text-xs font-medium text-green-800 mt-1">Our team is available 24/7 to assist you?</p>
//           <button
//             onClick={() => navigate("/help/live-chat")}
//             className="flex items-center gap-1 font-semibold text-green-800 mt-8 text-sm mt-2 hover:underline"
//           >
//             Contact support ↗
//           </button>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default HelpCategoryDetail;



import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

interface FAQ {
  question: string;
  answer: string;
}

interface CategoryData {
  title: string;
  faqs: FAQ[];
}

const categoryData: Record<string, CategoryData> = {
  "payments-transfers": {
    title: "Payments & Transfers",
    faqs: [
      {
        question: "Why can't I transfer?",
        answer: "Transfers may take 1–3 business days depending on the recipient's bank. International transfers can take up to 5 business days.",
      },
      {
        question: "How do I send money to another SidonPay user?",
        answer: "Go to Transfer Money, select 'To SidonPay user', enter the recipient's account number, enter the amount and click Continue.",
      },
      {
        question: "What is the maximum transfer limit?",
        answer: "The maximum transfer limit per transaction is ₦5,000,000. For higher limits, please upgrade your account tier.",
      },
      {
        question: "Why is my transfer pending?",
        answer: "Transfers can be pending due to bank processing times, security checks, or network issues. If it stays pending for more than 24 hours, contact support.",
      },
    ],
  },
  "security-privacy": {
    title: "Security & Privacy",
    faqs: [
      {
        question: "How do I set up 2FA?",
        answer: "Go to Settings > Security > Two-Factor Authentication and follow the steps to enable 2FA on your account.",
      },
      {
        question: "How do I change my password?",
        answer: "Go to Settings > Security > Change Password. You'll need your current password and a new one.",
      },
      {
        question: "What should I do if my account is compromised?",
        answer: "Immediately change your password, disable your PIN, and contact our support team. We'll help you secure your account.",
      },
      {
        question: "How is my data protected?",
        answer: "We use bank-grade encryption to protect all your data. Your personal information is never shared with third parties without your consent.",
      },
    ],
  },
  "cards-account": {
    title: "Cards & Account",
    faqs: [
      {
        question: "How do I create a virtual card?",
        answer: "Go to Virtual Cards in the menu and click Create Card. Follow the steps to set up your virtual card.",
      },
      {
        question: "How do I update my profile?",
        answer: "Go to Account > Profile and update your details. Some details may require verification.",
      },
      {
        question: "How do I freeze my card?",
        answer: "Go to Virtual Cards, select the card you want to freeze and toggle the freeze option.",
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, contact our support team. Note that this action is irreversible and all data will be lost.",
      },
    ],
  },
  "wallet-funding": {
    title: "Wallet & Funding",
    faqs: [
      {
        question: "How do I add money to my wallet?",
        answer: "Click Add Money on your dashboard, choose your preferred method (bank transfer or card), and follow the steps.",
      },
      {
        question: "How long does funding take?",
        answer: "Bank transfers typically take 1–30 minutes. Card payments are instant.",
      },
      {
        question: "What currencies are supported?",
        answer: "We currently support NGN and USD. More currencies will be added soon.",
      },
      {
        question: "What is the minimum deposit?",
        answer: "The minimum deposit is ₦100 for NGN and $1 for USD wallets.",
      },
    ],
  },
  "bills-services": {
    title: "Bills & Services",
    faqs: [
      {
        question: "How do I pay for airtime?",
        answer: "Go to Bill Payments > Airtime, enter the phone number and amount, then click Pay.",
      },
      {
        question: "Can I schedule bill payments?",
        answer: "Scheduled payments are coming soon. For now, you can make instant payments from the Bill Payments section.",
      },
      {
        question: "What bills can I pay?",
        answer: "You can pay for airtime, data, electricity, cable TV (DSTV, GOTV), and more.",
      },
      {
        question: "What do I do if my bill payment failed?",
        answer: "If payment was deducted but service not received, wait 30 minutes. If the issue persists, contact support with your transaction ID.",
      },
    ],
  },
};

const HelpCategoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const data = id ? categoryData[id] : null;

  if (!data) {
    return (
      <DashboardLayout userName="Kolawole">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-gray-400 text-sm">Category not found</p>
          <button
            onClick={() => navigate("/dashboard/help/categories")}
            className="mt-4 text-[#2D7A51] text-sm hover:underline"
          >
            ← Back to Help Categories
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName="Kolawole">
      <div className="max-w-3xl mx-auto px-2 md:px-0">

        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard/help/categories")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{data.title}</h1>
        <p className="text-xs text-gray-400 mb-6">{data.faqs.length} articles</p>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-2 mb-10">
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-white shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition"
              >
                <span className="text-sm font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-black-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-black-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm font-semibold text-green-800">Still need help?</p>
          <p className="text-xs font-medium text-green-800 mt-1">Our team is available 24/7 to assist you?</p>
          <button
            onClick={() => navigate("/dashboard/help/live-chat")}
            className="flex items-center gap-1 font-semibold text-green-800 mt-8 text-sm mt-2 hover:underline"
          >
            Contact support ↗
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpCategoryDetail;