
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, HelpCircle, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.subject || !form.message) return;
    setSubmitted(true);
  };

  const isDisabled =
    !form.fullName || !form.email || !form.subject || !form.message;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#F0F7F2] py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-xs font-semibold text-[#2D7A4F] uppercase tracking-widest mb-3">
            Contact Us
          </p>
          <h1 className="text-[34px] sm:text-[60px] font-bold text-[#0D1F17] tracking-tight mb-3">
            We're here to help
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Reach out to our support team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section className="bg-white py-14 sm:py-16 flex-1">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left — Get in touch */}
            <div className="lg:w-[280px] flex-shrink-0">
              <h2 className="text-base font-semibold text-[#0D1F17] mb-6">
                Get in touch
              </h2>

              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={17} className="text-[#2D7A4F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0D1F17] mb-0.5">Email us</p>
                  <a
                    href="mailto:support@sidonpay.com"
                    className="text-sm text-[#2D7A4F] hover:underline"
                  >
                    support@sidonpay.com
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle size={17} className="text-[#2D7A4F]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0D1F17] mb-0.5">Help Center</p>
                  <Link to="/help" className="text-sm text-[#2D7A4F] hover:underline">
                    Visit our Help Center
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Browse categories and chat with a support.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                    <Send size={24} className="text-[#2D7A4F]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1F17]">Message sent!</h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    Thanks for reaching out. Our support team will get back to
                    you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ fullName: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-2 text-sm text-[#2D7A4F] hover:underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className=" border border-gray-200 p-8 rounded-2xl shadow-sm">
                  <h2 className="text-base font-semibold text-[#0D1F17] mb-6">
                    Send us a message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Emeka Okonkwo"
                        className="w-full border border-gray-200 rounded-2xl px-3.5 py-2.5 text-sm text-[#0D1F17] placeholder-gray-400 focus:outline-none focus:border-[#2D7A4F] focus:ring-1 focus:ring-[#2D7A4F]/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full border border-gray-200 rounded-2xl px-3.5 py-2.5 text-sm text-[#0D1F17] placeholder-gray-400 focus:outline-none focus:border-[#2D7A4F] focus:ring-1 focus:ring-[#2D7A4F]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Transfer issue, Account verification..."
                      className="w-full border border-gray-200 rounded-2xl px-3.5 py-2.5 text-sm text-[#0D1F17] placeholder-gray-400 focus:outline-none focus:border-[#2D7A4F] focus:ring-1 focus:ring-[#2D7A4F]/20 transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full border border-gray-200 rounded-2xl px-3.5 py-2.5 text-sm text-[#0D1F17] placeholder-gray-400 focus:outline-none focus:border-[#2D7A4F] focus:ring-1 focus:ring-[#2D7A4F]/20 transition-colors resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2D7A4F] hover:bg-[#235f3c] disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 text-sm font-semibold px-7 py-3.5 rounded-full transition-colors"
                  >
                    <Send size={15} />
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;