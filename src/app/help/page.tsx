"use client";

import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "How do I choose the best AI tool for my specific task?",
    a: "Start by navigating to our AI Tools directory and filtering by your goal—such as Writing, Coding, Design, or Data Analysis. Each tool profile includes a beginner overview, top use cases, and difficulty ratings.",
  },
  {
    q: "Are the prompts in the Prompt Library free to use?",
    a: "Yes! All prompts in our library are completely free to copy and adapt for your personal and commercial workflows.",
  },
  {
    q: "How often are tool guides and tutorials updated?",
    a: "We review and refresh tool guides weekly as leading models (like GPT-4o, Claude 3.5, Gemini 1.5/2.0) release new features and updates.",
  },
  {
    q: "Can I suggest a new AI tool to be featured?",
    a: "Absolutely! Head over to our Contact page or join the Community to submit a tool recommendation for our testing pipeline.",
  },
  {
    q: "How do I manage my notifications and account settings?",
    a: "Go to your Settings page from the navigation drawer to update your email, learning preferences, and notification frequency.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full bg-gradient-to-b from-[#f8f9ff] via-[#fbfcff] to-white pb-8 md:pb-16 selection:bg-violet-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#563bfa] text-[10px] sm:text-[11px] font-extrabold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs border border-violet-100 uppercase tracking-wide">
            <HelpCircle size={13} className="text-[#563bfa]" />
            <span>Help & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            How can we assist you?
          </h1>
          <p className="text-sm text-gray-600">
            Find quick answers to common questions about NextFutureMind courses,
            tools, and prompts.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white border border-gray-200/90 rounded-2xl flex items-center px-4 py-3 gap-2.5 mb-6 shadow-2xs focus-within:border-[#563bfa]">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs and help topics..."
            className="min-w-0 w-full text-base lg:text-sm text-gray-900 outline-none bg-transparent"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3 mb-8">
          {filteredFaqs.map((faq, i) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50/70 transition-colors"
              >
                <span className="text-sm font-extrabold text-gray-900">
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <ChevronUp size={18} className="text-[#563bfa] flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4.5 pb-4.5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still need help? */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center shadow-2xs">
          <h3 className="font-extrabold text-sm text-gray-900 mb-1">
            Still have questions?
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Our support community is available around the clock.
          </p>
          <div className="flex flex-col min-[400px]:flex-row justify-center gap-2.5">
            <Link
              href="/contact"
              className="bg-[#563bfa] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:bg-[#472ee0] transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/community"
              className="bg-gray-100 text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Ask Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
