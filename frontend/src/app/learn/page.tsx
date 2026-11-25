"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  ArrowRight,
  PlaySquare,
  Sparkles,
  X,
  Play,
  Check,
  BookOpen,
} from "lucide-react";

interface Course {
  id: string;
  toolSlug: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  lessons: number;
  hours: number | string;
  logoType:
    | "chatgpt"
    | "gemini"
    | "claude"
    | "midjourney"
    | "canva"
    | "notion"
    | "zapier"
    | "python";
  logoBg: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  syllabus: { title: string; duration: string; completed?: boolean }[];
}

const COURSES_DATA: Course[] = [
  {
    id: "c-chatgpt",
    toolSlug: "chatgpt",
    name: "ChatGPT Complete Guide (Beginner to Advanced)",
    level: "Beginner",
    lessons: 12,
    hours: "2 hours",
    logoType: "chatgpt",
    logoBg: "bg-[#10a37f]",
    badgeBg: "bg-[#ecfdf5]",
    badgeText: "text-[#10b981]",
    description:
      "Master prompt crafting, custom instructions, GPT-4o multimodal workflows, and everyday workplace productivity hacks.",
    syllabus: [
      { title: "ChatGPT Core Concepts & Architecture", duration: "10:15", completed: true },
      { title: "The 4-Part Prompt Formula That Never Fails", duration: "14:20", completed: true },
      { title: "Using ChatGPT for Summaries, Reports & Email", duration: "12:45" },
      { title: "Advanced Problem Solving & Data Analysis", duration: "18:30" },
    ],
  },
  {
    id: "c-gemini",
    toolSlug: "gemini",
    name: "Google Gemini for Productivity",
    level: "Beginner",
    lessons: 10,
    hours: "1.5 hours",
    logoType: "gemini",
    logoBg: "bg-white border border-gray-100",
    badgeBg: "bg-[#ecfdf5]",
    badgeText: "text-[#10b981]",
    description:
      "Harness the power of 2M+ token contexts, Google Workspace integration (Docs, Gmail, Sheets), and multimodal video/audio analysis.",
    syllabus: [
      { title: "Introduction to Google Gemini & Workspace Sync", duration: "08:50", completed: true },
      { title: "Analyzing 100+ Page PDFs in Seconds", duration: "14:10" },
      { title: "Automating Gmail Drafts & Calendar Agendas", duration: "11:25" },
      { title: "Multimodal Video & Image Reasoning", duration: "16:40" },
    ],
  },
  {
    id: "c-claude",
    toolSlug: "claude",
    name: "Claude for Deep Analysis & Writing",
    level: "Intermediate",
    lessons: 11,
    hours: "2 hours",
    logoType: "claude",
    logoBg: "bg-[#fef3c7]",
    badgeBg: "bg-[#fef3c7]",
    badgeText: "text-[#d97706]",
    description:
      "Master nuanced long-form writing, technical whitepapers, complex logic, and interactive Claude Artifacts.",
    syllabus: [
      { title: "Claude 3.5 Sonnet: Prompt Architecture", duration: "12:10", completed: true },
      { title: "Building Interactive React Apps with Artifacts", duration: "18:40" },
      { title: "Synthesizing Academic Papers & Legal Contracts", duration: "15:20" },
      { title: "Prompt Chaining & Multi-Step Logic", duration: "14:15" },
    ],
  },
  {
    id: "c-midjourney",
    toolSlug: "midjourney",
    name: "Midjourney & Generative AI Design",
    level: "Advanced",
    lessons: 14,
    hours: "2.5 hours",
    logoType: "midjourney",
    logoBg: "bg-gray-100",
    badgeBg: "bg-[#ede9fe]",
    badgeText: "text-[#7c3aed]",
    description:
      "Learn camera lighting, photorealistic parameters, consistent character design, and commercial brand assets.",
    syllabus: [
      { title: "Midjourney v6 Core Parameters & Syntax", duration: "14:20", completed: true },
      { title: "Lighting, Camera Lenses & Cinematic Renders", duration: "16:50" },
      { title: "Maintaining Consistent Characters & Styles", duration: "18:30" },
      { title: "Commercial Packaging & Brand Identity Systems", duration: "20:10" },
    ],
  },
];

// Helper to render high-fidelity brand SVGs exactly as shown in the reference image
function BrandLogo({ type }: { type: Course["logoType"] }) {
  switch (type) {
    case "chatgpt":
      return (
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.67 5.999a4.4755 4.4755 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.6562 9.5378V7.2054a.0804.0804 0 0 1 .0332-.0615L14.53 4.0538a4.4992 4.4992 0 0 1 6.14 1.9452zm-8.835-2.0003a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V7.493a4.504 4.504 0 0 1 4.4945-4.4943zm.8893 7.8488 2.6105 1.5065-2.6105 1.5065-2.6105-1.5065z" />
        </svg>
      );
    case "gemini":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.4 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.24C.45 8.14 0 9.9 0 12s.45 3.86 1.24 5.43l4.04-3.14z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.57l4.04 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
          />
        </svg>
      );
    case "claude":
      return (
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 text-[#d97706]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Anthropic classic starburst rays */}
          <path d="M12 2.5a1.2 1.2 0 0 1 1.2 1.2v3.1a1.2 1.2 0 1 1-2.4 0V3.7a1.2 1.2 0 0 1 1.2-1.2zm0 14a1.2 1.2 0 0 1 1.2 1.2v3.1a1.2 1.2 0 1 1-2.4 0v-3.1a1.2 1.2 0 0 1 1.2-1.2zM2.5 12a1.2 1.2 0 0 1 1.2-1.2h3.1a1.2 1.2 0 1 1 0 2.4H3.7a1.2 1.2 0 0 1-1.2-1.2zm14 0a1.2 1.2 0 0 1 1.2-1.2h3.1a1.2 1.2 0 1 1 0 2.4h-3.1a1.2 1.2 0 0 1-1.2-1.2zm-11.23-6.1a1.2 1.2 0 0 1 1.7 0l2.2 2.2a1.2 1.2 0 1 1-1.7 1.7l-2.2-2.2a1.2 1.2 0 0 1 0-1.7zm9.86 9.86a1.2 1.2 0 0 1 1.7 0l2.2 2.2a1.2 1.2 0 0 1-1.7 1.7l-2.2-2.2a1.2 1.2 0 0 1 0-1.7zm-9.86 0a1.2 1.2 0 0 1 0 1.7l-2.2 2.2a1.2 1.2 0 0 1-1.7-1.7l2.2-2.2a1.2 1.2 0 0 1 1.7 0zm9.86-9.86a1.2 1.2 0 0 1 0-1.7l2.2-2.2a1.2 1.2 0 1 1 1.7 1.7l-2.2 2.2a1.2 1.2 0 0 1-1.7 0z" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      );
    case "midjourney":
      return (
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 text-gray-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 18c2-1 4-1 6 0s4 1 6 0 4-1 4-1" />
          <path
            d="M6 18c1.5 2 4 2.5 6 2.5s4.5-.5 6-2.5H6z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path d="M12 3v13" />
          <path
            d="M12 4c3 3 5 7 5 11h-5V4z"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <path d="M11 7c-2 2-4 5-4 8h4V7z" />
        </svg>
      );
    case "canva":
      return (
        <span className="text-2xl sm:text-3xl font-black text-white italic font-serif select-none">
          C
        </span>
      );
    case "notion":
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
          <span className="font-black text-2xl sm:text-3xl text-gray-900 tracking-tighter font-serif">
            N
          </span>
        </div>
      );
    case "zapier":
      return (
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 text-[#ff4a00]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="2.8" />
          <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 14a1.5 1.5 0 0 1 1.5 1.5v4.5a1.5 1.5 0 0 1-3 0v-4.5A1.5 1.5 0 0 1 12 16zM3.5 10.5a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 0 3H5a1.5 1.5 0 0 1-1.5-1.5zm12.5 0a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 0 3H17.5a1.5 1.5 0 0 1-1.5-1.5zM4.93 4.93a1.5 1.5 0 0 1 2.12 0l3.18 3.18a1.5 1.5 0 0 1-2.12 2.12L4.93 7.05a1.5 1.5 0 0 1 0-2.12zm10.96 10.96a1.5 1.5 0 0 1 2.12 0l3.18 3.18a1.5 1.5 0 0 1-2.12 2.12l-3.18-3.18a1.5 1.5 0 0 1 0-2.12zm-10.96 0a1.5 1.5 0 0 1 2.12 0l3.18-3.18a1.5 1.5 0 0 1 2.12 2.12L7.05 19.07a1.5 1.5 0 0 1-2.12-2.12zm10.96-10.96a1.5 1.5 0 0 1 2.12 0l3.18-3.18a1.5 1.5 0 1 1 2.12 2.12l-3.18 3.18a1.5 1.5 0 0 1-2.12 0z" />
        </svg>
      );
    case "python":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24">
          <path
            fill="#387EB8"
            d="M11.91 2c-5.48 0-5.14 2.37-5.14 2.37l.01 2.47h5.24v.74H4.55S2 7.29 2 12.77s2.24 5.3 2.24 5.3h1.34v-2.61s-.07-3.1 3.05-3.1h5.23s2.96.05 2.96-2.88V4.88s.42-2.88-4.91-2.88zm-2.85 1.54a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"
          />
          <path
            fill="#FFE052"
            d="M12.09 22c5.48 0 5.14-2.37 5.14-2.37l-.01-2.47H12v-.74h7.47s2.55.29 2.55-5.19-2.24-5.3-2.24-5.3h-1.34v2.61s.07 3.1-3.05 3.1H10.2s-2.96-.05-2.96 2.88v4.6s-.42 2.88 4.91 2.88zm2.85-1.54a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"
          />
        </svg>
      );
    default:
      return <Sparkles className="w-7 h-7 text-[#563bfa]" />;
  }
}

export default function LearnPage() {
  const [selectedTab, setSelectedTab] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(
    null
  );

  const tabs: ("All" | "Beginner" | "Intermediate" | "Advanced")[] = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Beginner")
      return course.level === "Beginner" || course.level === "All Levels";
    if (selectedTab === "Intermediate") return course.level === "Intermediate";
    if (selectedTab === "Advanced") return course.level === "Advanced";
    return true;
  });

  return (
    <div className="bg-[#fcfdff] pb-6 md:pb-12 selection:bg-violet-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        {/* Top Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div className="flex-[1_1_10rem]">
            <h1 className="text-[32px] sm:text-[38px] font-black text-gray-900 tracking-tight leading-[1.08] mb-1.5">
              Learn Step
              <br className="sm:hidden" />{" "}
              by Step
            </h1>
            <p className="text-sm text-gray-500 font-normal">
              Practical tutorials for real-world skills.
            </p>
          </div>

          {/* Top Right "Small Steps Big Future 💜" Badge */}
          <div className="bg-[#f0edff]/90 border border-violet-100/90 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5 shadow-2xs flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <GraduationCap
                className="text-[#563bfa]"
                size={22}
                strokeWidth={2.2}
              />
            </div>
            <div className="flex flex-col text-left leading-none pr-1">
              <span className="font-handwriting text-[#563bfa] text-[13px] sm:text-[14px] leading-tight font-bold">
                Small Steps
              </span>
              <span className="font-handwriting text-[#563bfa] text-[13px] sm:text-[14px] leading-tight font-bold flex items-center gap-1">
                Big Future <span className="text-xs">💜</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs (All, Beginner, Intermediate, Advanced) */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`min-h-11 px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#563bfa] text-white shadow-md shadow-indigo-200/80"
                    : "bg-[#f3f4f8] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Courses List */}
        <div className="grid gap-3.5 sm:gap-4 md:grid-cols-2 mb-7">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${course.toolSlug}`}
              id={`learn-course-${course.toolSlug}`}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-2xs hover:shadow-md transition-all flex items-center gap-3.5 sm:gap-4 group cursor-pointer"
            >
              {/* Brand Logo Container */}
              <div
                className={`size-11 sm:size-15 rounded-2xl ${course.logoBg} flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
              >
                <BrandLogo type={course.logoType} />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                {/* Level Badge */}
                <span
                  className={`${course.badgeBg} ${course.badgeText} text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md inline-block mb-1`}
                >
                  {course.level}
                </span>

                {/* Course Name */}
                <h3 className="font-extrabold text-[15px] text-gray-900 leading-snug mb-1.5 group-hover:text-[#563bfa] transition-colors">
                  {course.name}
                </h3>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <PlaySquare size={13} className="text-gray-400" />
                    <span>{course.lessons} lessons</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-gray-400" />
                    <span>{course.hours}</span>
                  </span>
                </div>
              </div>

              {/* Purple/Blue Right Arrow */}
              <div className="rounded-full flex items-center justify-center text-[#563bfa] group-hover:translate-x-1 transition-transform flex-shrink-0">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Full-width "Buy more course" Button */}
        <Link
          href="/tools"
          id="buy-more-courses-btn"
          className="w-full mb-5 py-3.5 px-6 bg-gradient-to-r from-[#563bfa] to-[#7928ca] hover:from-[#472fe0] hover:to-[#6b22b5] text-white font-extrabold text-[14.5px] sm:text-[15.5px] rounded-2xl sm:rounded-3xl shadow-[0_4px_16px_rgba(86,59,250,0.22)] flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] group cursor-pointer"
        >
          <GraduationCap size={19} strokeWidth={2.3} />
          <span>Buy more course</span>
          <ArrowRight size={17} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform ml-1" />
        </Link>

        {/* "Learn Today Build a Smarter Tomorrow" Promo Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f8f4ff] via-[#f2ebff] to-[#e8ddff] p-5 sm:p-6 border border-purple-100/90 shadow-2xs mb-4">
          {/* Handwritten script on top right */}
          <div className="absolute top-3 right-3 z-20 text-right select-none pointer-events-none font-handwriting text-[#7c3aed] text-[13px] sm:text-[14px] leading-[1.15] rotate-1">
            <div>Better</div>
            <div>Skills</div>
            <div>Brighter</div>
            <div>Tomorrow</div>
            <div className="text-xs mt-0.5">💜</div>
          </div>

          {/* Student photo & laptop lid */}
          <div className="absolute bottom-0 right-0 w-[30%] max-w-36 select-none pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=320&auto=format&fit=crop"
              alt="AI Student"
              className="w-4/5 max-w-24 aspect-square rounded-full object-cover ml-auto border-2 border-white/90 shadow-xs"
            />
            <div className="relative -mt-1 ml-auto bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400/80 rounded-t-lg px-1 py-1 shadow-md w-full text-center">
              <span className="text-[8px] font-black text-gray-800 tracking-tight block">
                NextFutureMind
              </span>
            </div>
          </div>

          {/* Left Text & CTA */}
          <div className="relative z-10 w-[68%] flex flex-col">
            <h2 className="text-[19px] sm:text-[21px] font-black text-gray-900 leading-[1.15] mb-1.5 tracking-tight">
              Learn Today
              <br />
              Build a Smarter Tomorrow
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mb-3.5 font-normal">
              Get practical skills. Create real projects.
              <br />
              Grow with AI.
            </p>
            <Link
              href="/tools"
              className="inline-flex min-h-11 items-center gap-1.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-md shadow-indigo-200 transition-all w-fit cursor-pointer"
            >
              <span>Start Learning Now</span>
              <ArrowRight size={13} strokeWidth={2.6} />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Course Player / Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl border border-gray-100 max-h-full overflow-y-auto overscroll-contain">
            {/* Modal Header */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${activeCourseModal.logoBg} flex items-center justify-center flex-shrink-0 shadow-2xs`}
                  >
                    <BrandLogo type={activeCourseModal.logoType} />
                  </div>
                  <div>
                    <span
                      className={`${activeCourseModal.badgeBg} ${activeCourseModal.badgeText} text-[10.5px] font-bold px-2 py-0.5 rounded-md inline-block mb-1`}
                    >
                      {activeCourseModal.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                      {activeCourseModal.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mb-4 leading-relaxed bg-gray-50 p-3 rounded-2xl">
                {activeCourseModal.description}
              </p>

              {/* Lessons Syllabus */}
              <div className="mb-4">
                <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#563bfa]" />
                  <span>Interactive Lessons ({activeCourseModal.lessons})</span>
                </h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {activeCourseModal.syllabus.map((lesson, idx) => (
                    <div
                      key={lesson.title}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-violet-100 hover:bg-violet-50/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            lesson.completed
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {lesson.completed ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className="text-xs font-bold text-gray-800">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <Link
                href={`/tools/${activeCourseModal.toolSlug}`}
                className="flex-1 py-3 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={15} className="fill-white" />
                <span>Open Full Course & Tool Hub</span>
              </Link>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
