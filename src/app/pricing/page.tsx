"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Crown,
  ArrowRight,
  GraduationCap,
  Wrench,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  X,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  {
    question: "Can I upgrade later?",
    answer:
      "Yes! You can start on the Free plan and upgrade to Pro whenever you're ready to unlock all deep tutorials, 1,000+ premium prompts, and certification.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, MasterCard, Rupay), UPI (Google Pay, PhonePe, Paytm), and Net Banking with secure 256-bit encryption.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Yes! Every Pro learner receives an industry-recognized certificate of completion after finishing course tracks and milestone projects.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 100% money-back guarantee within 7 days of upgrading to Pro if you're not completely satisfied with our learning platform.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<"free" | "pro">("pro");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleOpenCheckout = (plan: "free" | "pro") => {
    setSelectedPlanForModal(plan);
    setCheckoutSuccess(false);
    setShowCheckoutModal(true);
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      setShowCheckoutModal(false);
      setCheckoutSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-full bg-[#fcfdff] pb-8 md:pb-16 selection:bg-violet-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        {/* Top Header Section */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h1 className="text-[32px] sm:text-[38px] font-black text-gray-900 tracking-tight leading-[1.08] mb-1.5">
              Choose Your <span className="text-[#563bfa]">Plan</span>
            </h1>
            <p className="text-xs sm:text-[13.5px] text-gray-500 font-normal">
              Start free and upgrade anytime.
            </p>
          </div>

          {/* Top Right Handwritten Text ("Invest In Your Future 💜") */}
          <div className="text-right font-handwriting text-[#7c3aed] text-[14px] sm:text-[15px] leading-[1.15] rotate-1 select-none pointer-events-none flex-shrink-0 pt-1 pr-1">
            <div>Invest</div>
            <div>In Your</div>
            <div>Future</div>
            <div className="text-xs mt-0.5">💜</div>
          </div>
        </div>

        {/* Billing Cycle Switcher: Monthly | Yearly | Save 50% */}
        <div className="flex items-center justify-center gap-1.5 bg-[#f3f4f8] p-1.5 rounded-full w-fit max-w-full mx-auto mb-6 shadow-2xs">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`min-h-11 px-3.5 min-[400px]:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-[#563bfa] text-white shadow-md shadow-indigo-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`min-h-11 px-3.5 min-[400px]:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              billingCycle === "yearly"
                ? "bg-[#563bfa] text-white shadow-md shadow-indigo-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
          </button>
          <span className="bg-[#e6fcf5] text-[#0ca678] font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-emerald-100">
            Save 50%
          </span>
        </div>

        {/* Two Pricing Cards (Free vs Pro) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          {/* Card 1: Free */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">
                  ₹0
                </span>
                <span className="text-xs text-gray-400 font-medium">/ month</span>
              </div>
              <p className="text-xs text-gray-500 mb-4 font-normal">
                Perfect to get started
              </p>

              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  "Access to free tutorials",
                  "Limited prompt library",
                  "Community access",
                  "Basic resources",
                  "Standard support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-gray-700">
                    <Check size={14} className="text-[#10b981] flex-shrink-0" strokeWidth={2.8} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout("free")}
              className="w-full py-2.5 px-4 rounded-2xl border border-[#563bfa] text-[#563bfa] hover:bg-violet-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Card 2: Pro (Highlighted with badge) */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#563bfa]/60 shadow-md shadow-indigo-100/50 flex flex-col justify-between relative hover:shadow-lg transition-all">
            {/* Top Right "Most Popular" Pill */}
            <div className="absolute top-4 right-4 bg-[#563bfa] text-white text-[10px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
              <Crown size={12} className="fill-amber-300 text-amber-300" />
              <span>Most Popular</span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl sm:text-4xl font-black text-gray-900">
                  {billingCycle === "yearly" ? "₹249" : "₹499"}
                </span>
                <span className="text-xs text-gray-400 font-medium">/ month</span>
              </div>
              <p className="text-xs text-gray-500 mb-4 font-normal">
                For serious learners & creators
              </p>

              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  "Access to all tutorials",
                  "1000+ premium prompts",
                  "Download resources (templates, guides)",
                  "Project-based learning",
                  "Certificate of completion",
                  "Priority support",
                  "Early access to new tools",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-gray-700">
                    <Check size={14} className="text-[#563bfa] flex-shrink-0" strokeWidth={2.8} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleOpenCheckout("pro")}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#563bfa] hover:bg-[#472ee0] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 4 Metrics / Stats Row */}
        <div className="grid grid-cols-2 min-[480px]:grid-cols-4 gap-x-2 gap-y-4 text-center mb-8 py-2">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center mb-1.5 shadow-2xs">
              <GraduationCap size={18} strokeWidth={2.2} />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              1000+
            </span>
            <span className="text-xs text-gray-500 leading-tight mt-0.5">
              Learning Resources
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center mb-1.5 shadow-2xs">
              <Wrench size={18} strokeWidth={2.2} />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              50+
            </span>
            <span className="text-xs text-gray-500 leading-tight mt-0.5">
              AI Tools Covered
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center mb-1.5 shadow-2xs">
              <Users size={18} strokeWidth={2.2} />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              10K+
            </span>
            <span className="text-xs text-gray-500 leading-tight mt-0.5">
              Active Learners
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center mb-1.5 shadow-2xs">
              <ShieldCheck size={18} strokeWidth={2.2} />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              95%
            </span>
            <span className="text-xs text-gray-500 leading-tight mt-0.5">
              User Satisfaction
            </span>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-black text-gray-900">
              Frequently Asked Questions
            </h2>
            <button
              onClick={() => setOpenFaqIndex(null)}
              className="text-[#563bfa] text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>See All</span>
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-bold text-gray-800 hover:text-gray-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-gray-400 flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3.5 text-xs text-gray-500 leading-relaxed pt-0 border-t border-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Promo Banner ("Invest in Your Skills. Build a Better Tomorrow.") */}
        <div className="relative min-h-44 sm:min-h-56 overflow-hidden rounded-3xl bg-gradient-to-r from-[#f7f2ff] via-[#f2ebff] to-[#e8dcff] p-5 sm:p-6 border border-purple-100/90 shadow-2xs mb-4">
          {/* Top Right Handwritten Text */}
          <div className="absolute top-3.5 right-3.5 z-20 text-right select-none pointer-events-none font-handwriting text-[#7c3aed] text-[13px] sm:text-[14px] leading-[1.15] rotate-1">
            <div>Better</div>
            <div>Skills</div>
            <div>Brighter</div>
            <div>Future</div>
            <div className="text-xs mt-0.5">💜</div>
          </div>

          {/* Student photo & laptop lid */}
          <div className="absolute -bottom-1 right-0 w-44 sm:w-48 h-36 origin-bottom-right scale-65 min-[440px]:scale-80 sm:scale-100 select-none pointer-events-none">
            <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden ml-auto border-2 border-white/90 shadow-xs relative">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=320&auto=format&fit=crop"
                alt="AI Learner"
                fill
                sizes="104px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-1 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400/80 rounded-t-lg px-2 py-1 shadow-md w-32 text-center">
              <span className="text-[8px] font-black text-gray-800 tracking-tight block">
                NextFutureMind
              </span>
            </div>
          </div>

          {/* Left Text & CTA */}
          <div className="relative z-10 mr-20 min-[440px]:mr-32 sm:mr-48 flex flex-col">
            <h2 className="text-[18px] sm:text-[20px] font-black text-gray-900 leading-[1.18] mb-1.5 tracking-tight">
              Invest in Your Skills.
              <br />
              Build a Better Tomorrow.
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mb-3.5 font-normal">
              Join thousands of learners and unlock your full potential with AI.
            </p>
            <button
              onClick={() => handleOpenCheckout("pro")}
              className="inline-flex items-center gap-1.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-md shadow-indigo-200 transition-all w-fit cursor-pointer"
            >
              <span>Upgrade to Pro Today</span>
              <ArrowRight size={13} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </div>

      {/* Checkout / Activation Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm max-h-full overflow-y-auto overscroll-contain w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {selectedPlanForModal === "pro" ? "Upgrade to Pro" : "Start Free"}
                </h3>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-black text-base text-gray-900 mb-1">
                  Welcome to {selectedPlanForModal === "pro" ? "Pro Mind" : "NextFutureMind"}!
                </h4>
                <p className="text-xs text-gray-500">
                  Your access has been activated. Enjoy learning!
                </p>
              </div>
            ) : (
              <form onSubmit={handleCompleteCheckout} className="flex flex-col gap-3.5">
                <div className="p-3 bg-[#f8f9fc] rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1">
                    <span>Plan:</span>
                    <span className="text-[#563bfa] uppercase">
                      {selectedPlanForModal} ({billingCycle})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span>Total Due:</span>
                    <span className="text-base text-gray-900">
                      {selectedPlanForModal === "pro"
                        ? billingCycle === "yearly"
                          ? "₹2,999 / year"
                          : "₹499 / month"
                        : "₹0 Free"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Akash Kumar"
                    className="w-full px-3.5 py-2 text-base lg:text-sm rounded-xl border border-gray-200 outline-none focus:border-[#563bfa]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="akash@example.com"
                    className="w-full px-3.5 py-2 text-base lg:text-sm rounded-xl border border-gray-200 outline-none focus:border-[#563bfa]"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold cursor-pointer shadow-md shadow-indigo-200"
                  >
                    Confirm & Start
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
