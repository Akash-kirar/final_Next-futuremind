"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  BarChart3,
  Users,
  GraduationCap,
  Briefcase,
  Palette,
  MoreHorizontal,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col w-full bg-white selection:bg-violet-100 selection:text-violet-900">
      {/* 1. Hero Section - Styled exactly for mobile & laptop */}
      <section className="relative w-full bg-gradient-to-b from-[#f9f8ff] via-[#fbfaff] to-white overflow-hidden pt-6 pb-8 sm:py-10 lg:py-16 border-b border-gray-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="min-w-0 md:col-span-7 flex flex-col z-10">
              {/* Badge (Exact match: "✦ Your AI Learning Partner") */}
              <div className="inline-flex items-center gap-1.5 text-[#7c3aed] text-xs font-semibold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 md:mb-5 shadow-xs border border-violet-100/70 w-max">
                <Sparkles size={13} className="text-[#7c3aed]" />
                <span>Your AI Learning Partner</span>
              </div>

              {/* Big Heading */}
              <h1 className="text-[clamp(1.875rem,5vw,3.875rem)] font-black text-gray-900 leading-[1.12] mb-3 md:mb-4 tracking-tight">
                Master AI Tools
                <br />
                <span className="text-[#563bfa]">Work Smarter</span>
                <br />
                Build Your Future
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed max-w-xl font-normal">
                Learn how to use the best AI tools with practical tutorials,
                ready-to-use prompts, and real-world examples.
              </p>

              {/* 3 Bullet Checklist (✓ Learn ✓ Apply ✓ Be More Productive) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs sm:text-sm font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={17} className="text-[#563bfa] fill-[#ede9fe]" />
                  Learn
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={17} className="text-[#563bfa] fill-[#ede9fe]" />
                  Apply
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={17} className="text-[#563bfa] fill-[#ede9fe]" />
                  Be More Productive
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col min-[360px]:flex-row min-[360px]:flex-wrap items-stretch gap-3 mb-6 md:mb-8">
                <Link
                  href="/learn"
                  className="bg-[#563bfa] hover:bg-[#472ee0] text-white text-sm sm:text-base font-bold py-3.5 px-4 sm:px-6 rounded-2xl sm:rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Start Learning Free <ArrowRight size={17} />
                </Link>
                <button
                  onClick={() => {
                    const el = document.getElementById("features-grid");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#f5f2ff] hover:bg-violet-100/70 text-[#563bfa] text-sm sm:text-base font-bold py-3.5 px-4 sm:px-6 rounded-2xl sm:rounded-full flex items-center justify-center gap-2.5 border border-violet-100 transition-all cursor-pointer"
                >
                  <Play size={14} className="fill-[#563bfa]" />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof (10K+ learners) */}
              <div className="flex items-center gap-3">
                <div className="flex shrink-0 -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-xs"
                    alt="Learner"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-xs"
                    alt="Learner"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-xs"
                    alt="Learner"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-xs"
                    alt="Learner"
                  />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white bg-[#ede9fe] flex items-center justify-center text-xs font-bold text-[#563bfa] shadow-xs">
                    +
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  <strong className="font-extrabold text-gray-900">10K+</strong> learners are already growing with AI
                </p>
              </div>
            </div>

            {/* Right Graphic Composition */}
            <div className="md:col-span-5 relative mx-auto grid w-full min-w-0 max-w-lg grid-cols-2 gap-x-2 md:max-w-none">
              {/* Decorative Handwritten text: Same Tools Bigger Possibilities */}
              <div className="absolute top-3 right-3 z-10 text-[#7c69eb] font-handwriting text-lg min-[400px]:text-xl lg:text-2xl leading-tight select-none pointer-events-none -rotate-6">
                Same Tools
                <br />
                Bigger
                <br />
                Possibilities
                <span className="text-lg ml-1">💜</span>
              </div>

              {/* Decorative Handwritten text: Better Skills Brighter Tomorrow */}
              <div className="col-start-1 row-start-1 self-end justify-self-start z-10 mb-3 ml-3 text-[#654bc5] font-handwriting text-base min-[400px]:text-lg lg:text-xl leading-tight select-none pointer-events-none -rotate-3">
                Better
                <br />
                Skills
                <br />
                Brighter
                <br />
                Tomorrow <span className="text-sm">💜</span>
              </div>

              {/* Main Photo Card */}
              <div className="relative col-span-2 col-start-1 row-start-1 w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-tr from-[#ebe4ff] to-[#f4f1ff]">
                <img
                  src="/hero_woman_laptop.jpg"
                  alt="AI Learning Companion"
                  className="w-full h-full object-cover object-center"
                />

                {/* NextFutureMind sticker on laptop */}
                <div className="absolute bottom-3 right-[5.5rem] bg-black/60 backdrop-blur-xs text-white text-[7px] sm:text-[8px] font-bold px-2 py-0.5 rounded-sm tracking-wider shadow-xs pointer-events-none">
                  NextFutureMind
                </div>

                {/* Mug Label on desk */}
                <div className="absolute bottom-4 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl shadow-md border border-gray-100 text-center pointer-events-none">
                  <div className="text-[8px] sm:text-[9px] font-black tracking-tight text-gray-800 leading-tight">
                    Good Ideas
                    <br />
                    Build Great
                    <br />
                    Futures 💜
                  </div>
                </div>
              </div>

              {/* Desktop-only floating speech bubble & menu (cleanly hidden on mobile to avoid overlapping face) */}
              <div className="relative z-20 col-start-1 mx-1 -mt-2 hidden self-start rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-lg lg:block">
                <div className="font-extrabold text-sm text-gray-900 flex items-center gap-1 mb-1">
                  Hi! 👋
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed font-medium">
                  I&apos;m your AI Learning companion. Let&apos;s explore tools,
                  prompts and real use cases together!
                </p>
              </div>

              <div className="relative z-20 col-start-2 mx-1 -mt-2 hidden flex-col gap-1.5 rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-lg lg:flex">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#f0eaff] text-[#563bfa] flex items-center justify-center text-xs">
                    🧩
                  </div>
                  <span>Discover Tools</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#f0eaff] text-[#563bfa] flex items-center justify-center text-xs">
                    📺
                  </div>
                  <span>Learn with Tutorials</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#f0eaff] text-[#563bfa] flex items-center justify-center text-xs">
                    📑
                  </div>
                  <span>Get Prompt Templates</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#f0eaff] text-[#563bfa] flex items-center justify-center text-xs">
                    👁️
                  </div>
                  <span>See Real Use Cases</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#f0eaff] text-[#563bfa] flex items-center justify-center text-xs">
                    📈
                  </div>
                  <span>Boost Productivity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools strip */}
      <section className="border-b border-gray-100 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-flow-col auto-cols-[max(3.75rem,18%)] gap-2 overflow-x-auto py-1 snap-x md:grid-flow-row md:grid-cols-9 md:auto-cols-auto md:gap-3 [&>a]:snap-start">
            {/* ChatGPT */}
            <Link
              href="/tools/chatgpt"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e6f9f0] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.67 5.999a4.4755 4.4755 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.6562 9.5378V7.2054a.0804.0804 0 0 1 .0332-.0615L14.53 4.0538a4.4992 4.4992 0 0 1 6.14 1.9452zm-8.835-2.0003a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V7.493a4.504 4.504 0 0 1 4.4945-4.4943zm.8893 7.8488 2.6105 1.5065-2.6105 1.5065-2.6105-1.5065z"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-800">ChatGPT</span>
            </Link>

            {/* Gemini */}
            <Link
              href="/tools/gemini"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#eef5ff] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24Z"
                    fill="url(#gemini_grad)"
                  />
                  <defs>
                    <linearGradient id="gemini_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1B72E8" />
                      <stop offset="0.5" stopColor="#9B51E0" />
                      <stop offset="1" stopColor="#D93025" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-800">Gemini</span>
            </Link>

            {/* Claude */}
            <Link
              href="/tools/claude"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#fff2e8] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ea580c]" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.05-7.05-2.12 2.12m-9.66 9.66-2.12 2.12m0-13.9 2.12 2.12m9.66 9.66 2.12 2.12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-800">Claude</span>
            </Link>

            {/* Midjourney */}
            <Link
              href="/tools/midjourney"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f0f4f9] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <span className="text-xl sm:text-2xl">⛵</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-800">Midjourney</span>
            </Link>

            {/* Notion AI */}
            <Link
              href="/tools/notion"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f5f6f8] border border-gray-200/60 flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter">N</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-800">Notion AI</span>
            </Link>

            {/* More tools */}
            <Link
              href="/tools/canva"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ebf0fe] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <span className="text-2xl font-black text-[#563bfa] italic font-serif">C</span>
              </div>
              <span className="text-xs font-bold text-gray-800">Canva</span>
            </Link>

            <Link
              href="/tools"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#edf4ff] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <span className="text-2xl font-black text-[#0078d4]">C</span>
              </div>
              <span className="text-xs font-bold text-gray-800">Copilot</span>
            </Link>

            <Link
              href="/tools"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e8f7f5] flex items-center justify-center shadow-2xs transition-transform group-hover:-translate-y-1">
                <svg className="w-7 h-7 text-[#0d9488]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 0 1 1 1v4.06l3.54-3.54a1 1 0 1 1 1.41 1.41L14.41 8.5H19a1 1 0 1 1 0 2h-4.59l3.54 3.54a1 1 0 0 1-1.41 1.41L13 11.91V16a1 1 0 1 1-2 0v-4.09l-3.54 3.54a1 1 0 0 1-1.41-1.41L9.59 10.5H5a1 1 0 1 1 0-2h4.59L6.05 4.96a1 1 0 1 1 1.41-1.41L11 7.09V3a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-800">Perplexity</span>
            </Link>

            <Link
              href="/tools"
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#563bfa] shadow-2xs transition-transform group-hover:-translate-y-1">
                <MoreHorizontal size={24} />
              </div>
              <span className="text-xs font-bold text-[#563bfa] flex items-center gap-0.5">
                View All <ChevronRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 w-full">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Step-by-Step Learning */}
          <Link
            href="/learn"
            className="bg-[#f6f4fe] hover:bg-[#ede9fe] p-4 sm:p-5 rounded-2xl border border-violet-100/70 shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 bg-[#ede9fe] group-hover:bg-white text-[#563bfa] rounded-xl flex items-center justify-center mb-3 transition-colors shadow-2xs">
                <BookOpen size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                Step-by-Step Learning
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                From basics to advanced
              </p>
            </div>
          </Link>

          {/* Card 2: Ready-to-Use Prompts */}
          <Link
            href="/learn"
            className="bg-[#f0fdf9] hover:bg-[#dcfce7] p-4 sm:p-5 rounded-2xl border border-emerald-100/70 shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 bg-[#d1fae5] group-hover:bg-white text-[#059669] rounded-xl flex items-center justify-center mb-3 transition-colors shadow-2xs">
                <Zap size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                Ready-to-Use Prompts
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Copy, customize and use
              </p>
            </div>
          </Link>

          {/* Card 3: Boost Productivity */}
          <Link
            href="/learn"
            className="bg-[#fff9f2] hover:bg-[#ffedd5] p-4 sm:p-5 rounded-2xl border border-amber-100/70 shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 bg-[#ffedd5] group-hover:bg-white text-[#d97706] rounded-xl flex items-center justify-center mb-3 transition-colors shadow-2xs">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                Boost Productivity
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Save time, do more
              </p>
            </div>
          </Link>

          {/* Card 4: Join a Growing Community */}
          <Link
            href="/community"
            className="bg-[#f4f8ff] hover:bg-[#e0e7ff] p-4 sm:p-5 rounded-2xl border border-blue-100/70 shadow-xs transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 bg-[#dbeafe] group-hover:bg-white text-[#2563eb] rounded-xl flex items-center justify-center mb-3 transition-colors shadow-2xs">
                <Users size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                Join a Growing Community
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Learn together and grow
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. "Turn AI into your Superpower" Banner Card (Exact match to target) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#0c1023] border border-gray-800 shadow-xl min-h-[160px] sm:min-h-[190px] flex items-center">
          {/* Panoramic background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-lighten"
            style={{ backgroundImage: "url('/banner_horizon.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1023] via-[#141838]/80 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 w-full p-5 sm:p-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            {/* Left: Text and CTA */}
            <div className="max-w-xs sm:max-w-md">
              <h2 className="text-lg sm:text-2xl font-black text-white leading-tight mb-1">
                Turn AI into
                <br className="sm:hidden" /> your Superpower
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 font-medium">
                Learn. Apply. Grow. Repeat.
              </p>
              <Link
                href="/learn"
                className="bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Start Your Journey <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: Cursive handwritten text over sunset */}
            <div className="ml-auto text-right text-[#f0eaff] font-handwriting text-lg sm:text-3xl leading-tight select-none pointer-events-none -rotate-3 pr-2">
              A Smarter
              <br />
              You
              <br />
              Tomorrow <span className="text-base sm:text-xl">💜</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Learning Paths (Exact match to target) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-xl font-black text-gray-900 tracking-tight">
            Popular Learning Paths
          </h2>
          <Link
            href="/learn"
            className="text-xs sm:text-sm font-bold text-[#563bfa] hover:text-[#472ee0] flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Learning paths */}
        <div className="grid md:grid-cols-3 gap-3">
          {/* Path 1: AI for Beginners */}
          <Link
            href="/learn"
            className="min-w-0 bg-[#f8f7ff] hover:bg-[#ede9fe] border border-violet-100/80 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-violet-100 text-[#563bfa] flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                AI for Beginners
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Start your AI journey
              </p>
            </div>
          </Link>

          {/* Path 2: AI for Work */}
          <Link
            href="/learn"
            className="min-w-0 bg-[#f0f9ff] hover:bg-[#e0f2fe] border border-sky-100/80 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center flex-shrink-0">
              <Briefcase size={22} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                AI for Work
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Be more productive
              </p>
            </div>
          </Link>

          {/* Path 3: AI for Creators */}
          <Link
            href="/learn"
            className="min-w-0 bg-[#faf5ff] hover:bg-[#f3e8ff] border border-purple-100/80 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#9333ea] flex items-center justify-center flex-shrink-0">
              <Palette size={22} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                AI for Creators
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Design, content & more
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest learning resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 w-full border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 mb-5 md:mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Latest Learning Resources
          </h2>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {["All", "Tutorials", "Prompts", "Use Cases", "Tips"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-10 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#563bfa] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}

            <Link
              href="/learn"
              className="text-[#563bfa] font-bold flex items-center gap-1 hover:text-[#472ee0] transition-colors text-xs ml-2 cursor-pointer"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Resource 1 */}
          <Link
            href="/learn"
            className="group cursor-pointer flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative aspect-[2/1] lg:aspect-[1.7] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-[#07241c] via-[#093a2e] to-[#041d16] flex items-center justify-center p-4">
                <div className="absolute top-2.5 right-2.5 bg-[#e8fbf2] text-[#10a37f] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Tutorial
                </div>
                <div className="text-emerald-400/90 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.67 5.999a4.4755 4.4755 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.6562 9.5378V7.2054a.0804.0804 0 0 1 .0332-.0615L14.53 4.0538a4.4992 4.4992 0 0 1 6.14 1.9452zm-8.835-2.0003a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V7.493a4.504 4.504 0 0 1 4.4945-4.4943zm.8893 7.8488 2.6105 1.5065-2.6105 1.5065-2.6105-1.5065z"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#563bfa] transition-colors leading-snug">
                ChatGPT Complete Guide
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Learn how to use ChatGPT effectively with real examples.
              </p>
            </div>
          </Link>

          {/* Resource 2 */}
          <Link
            href="/learn"
            className="group cursor-pointer flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative aspect-[2/1] lg:aspect-[1.7] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-[#0c1330] via-[#151c4a] to-[#0a102c] flex items-center justify-center p-4">
                <div className="absolute top-2.5 right-2.5 bg-[#ede9fe] text-[#7c3aed] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Prompt
                </div>
                <div className="flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24Z"
                      fill="url(#gemini_res_grad)"
                    />
                    <defs>
                      <linearGradient id="gemini_res_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4dabf7" />
                        <stop offset="0.5" stopColor="#b197fc" />
                        <stop offset="1" stopColor="#ff8787" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-white font-bold text-base">Gemini</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#563bfa] transition-colors leading-snug">
                50 Powerful Gemini Prompts
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Ready-to-use prompts for daily work, study and productivity.
              </p>
            </div>
          </Link>

          {/* Resource 3 */}
          <Link
            href="/learn"
            className="group cursor-pointer flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative aspect-[2/1] lg:aspect-[1.7] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-[#1c1c1f] via-[#242429] to-[#141416] flex items-center justify-center p-4">
                <div className="absolute top-2.5 right-2.5 bg-[#e0f2fe] text-[#0284c7] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Use Case
                </div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-xl font-black text-gray-900">N</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#563bfa] transition-colors leading-snug">
                Build a Second Brain with Notion
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Organize your life and work with AI powered Notion.
              </p>
            </div>
          </Link>

          {/* Resource 4 */}
          <Link
            href="/learn"
            className="group cursor-pointer flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="relative aspect-[2/1] lg:aspect-[1.7] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-[#00c4cc] via-[#7d2ae8] to-[#563bfa] flex items-center justify-center p-4">
                <div className="absolute top-2.5 right-2.5 bg-[#ffedd5] text-[#ea580c] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Tips
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-black text-white italic font-serif">C</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#563bfa] transition-colors leading-snug">
                Stunning Designs with Canva AI
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                Design faster with AI tools, styles, and prompt guides.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
