"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#f8f9ff] via-[#fbfcff] to-white pb-8 md:pb-16 selection:bg-violet-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#563bfa] text-[10px] sm:text-[11px] font-extrabold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs border border-violet-100 uppercase tracking-wide">
            <Mail size={13} className="text-[#563bfa]" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
            Get in Touch
          </h1>
          <p className="text-sm text-gray-600">
            Have a question, feedback, or want to suggest a new AI tool? Send us a
            note!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-4 min-[400px]:p-6 sm:p-8 border border-gray-100/90 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Message Sent!
              </h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Thanks for reaching out! Our team will respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", message: "" });
                }}
                className="mt-4 px-5 py-2 bg-[#563bfa] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Rivers"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base lg:text-sm text-gray-900 outline-none focus:border-[#563bfa] focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base lg:text-sm text-gray-900 outline-none focus:border-[#563bfa] focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base lg:text-sm text-gray-900 outline-none focus:border-[#563bfa] focus:ring-2 focus:ring-violet-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Send Message</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
