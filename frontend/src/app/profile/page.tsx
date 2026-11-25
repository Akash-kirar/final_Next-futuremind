"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useTheme, type ThemeMode } from "@/components/ThemeProvider";
import {
  BookOpen,
  Bookmark,
  Download,
  Award,
  Settings as SettingsIcon,
  CircleHelp,
  LogOut,
  ChevronRight,
  X,
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  Play,
  Trash2,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";

// Predefined avatar options matching both reference images
const AVATAR_OPTIONS = [
  {
    id: "clean-shaven",
    name: "Modern Professional",
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=360&auto=format&fit=crop",
  },
  {
    id: "bearded-shades",
    name: "Creative Explorer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=360&auto=format&fit=crop",
  },
  {
    id: "minimal",
    name: "Urban Minimalist",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=360&auto=format&fit=crop",
  },
  {
    id: "tech-lead",
    name: "AI Innovator",
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=360&auto=format&fit=crop",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, updateProfile } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  // User Profile State
  const [userName, setUserName] = useState("Akash Kumar");
  const [userEmail, setUserEmail] = useState("akash@example.com");
  const [userAvatar, setUserAvatar] = useState(AVATAR_OPTIONS[0].src);
  const [editName, setEditName] = useState("Akash Kumar");
  const [editEmail, setEditEmail] = useState("akash@example.com");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].src);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    queueMicrotask(() => {
      setUserName(user.name);
      setUserEmail(user.email);
      if (user.avatarUrl) {
        setUserAvatar(user.avatarUrl);
        setSelectedAvatar(user.avatarUrl);
      }
      setEditName(user.name);
      setEditEmail(user.email);
    });
  }, [user]);

  // Active Modals State
  const [activeModal, setActiveModal] = useState<
    "edit" | "savedCourses" | "prompts" | "downloads" | "certificates" | "changeMode" | "settings" | "support" | "logout" | null
  >(null);

  const applyTheme = (mode: ThemeMode) => setThemeMode(mode);

  // Saved Learning Courses Data
  const [savedCoursesList, setSavedCoursesList] = useState([
    {
      id: "c-chatgpt",
      slug: "chatgpt",
      title: "ChatGPT Complete Course",
      levelBadge: "Beginner to Advanced",
      tagline: "Learn how to use ChatGPT effectively for work, study, and creativity.",
      hours: "12 hours",
      rating: "4.9",
      learners: "12,432 learners",
      price: "₹499",
      originalPrice: "₹1,499",
      discount: "67% OFF",
      savedDate: "Saved 2 days ago",
    },
    {
      id: "c-gemini",
      slug: "gemini",
      title: "Google Gemini for Productivity",
      levelBadge: "Beginner",
      tagline: "Multimodal 2M token reasoning & Google Workspace automation.",
      hours: "1.5 hours",
      rating: "4.8",
      learners: "8,920 learners",
      price: "Free",
      savedDate: "Saved 4 days ago",
    },
    {
      id: "c-claude",
      slug: "claude",
      title: "Claude for Smarter Work",
      levelBadge: "Beginner",
      tagline: "Nuanced writing, Artifacts interactive coding & deep research.",
      hours: "1 hour",
      rating: "4.9",
      learners: "6,150 learners",
      price: "Free",
      savedDate: "Saved 1 week ago",
    },
  ]);

  // Saved Prompts Data
  const savedPrompts = [
    {
      id: 1,
      title: "Mastering System Prompts for Reasoning",
      category: "ChatGPT & Claude",
      text: "Act as a principal AI systems architect. Analyze the trade-offs between zero-shot, few-shot, and chain-of-thought prompting for multi-step financial risk evaluation...",
    },
    {
      id: 2,
      title: "Midjourney Photorealistic Portrait Prompt",
      category: "Image Gen",
      text: "editorial close-up portrait of a thoughtful young engineer, natural sunlight pouring through studio window, 85mm lens, f/1.4, subtle film grain, Hasselblad color grading --ar 16:9 --v 6.0",
    },
    {
      id: 3,
      title: "Clean Next.js 15 Server Action Scaffold",
      category: "Coding",
      text: "Write a type-safe Next.js server action using Zod schema validation with optimistic UI response updates and error toast handling...",
    },
  ];

  // Downloads Data
  const downloadItems = [
    {
      title: "AI Tools & Frameworks Master Cheat Sheet (2026)",
      size: "3.4 MB",
      format: "PDF Guide",
    },
    {
      title: "1,000+ High-Converting Prompt Formulas",
      size: "1.8 MB",
      format: "Notion & PDF",
    },
    {
      title: "NextFutureMind AI Career Acceleration Playbook",
      size: "5.2 MB",
      format: "eBook",
    },
  ];

  // Handle Edit Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");
    const result = await updateProfile(editName, selectedAvatar);
    setIsSaving(false);
    if (!result.success) {
      setSaveError(result.message);
      return;
    }
    setUserName(editName);
    setUserAvatar(selectedAvatar);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleCopyPrompt = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 1800);
  };

  const handleTriggerDownload = (title: string) => {
    const element = document.createElement("a");
    const file = new Blob([`NextFutureMind Resource: ${title}\n\nDownloaded by ${userName} (${userEmail})`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] pb-6 md:pb-16 selection:bg-violet-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 flex flex-col gap-3.5">
        {/* Top Profile Header: Avatar, Name, Email, Edit Profile + Lavender Note */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Left Info: Avatar + Details */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            {/* Avatar with smooth rounded border */}
            <div className="relative size-16 sm:size-[82px] rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-gray-100">
              <Image
                src={userAvatar}
                alt={userName}
                fill
                sizes="82px"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
                priority
              />
            </div>

            {/* Name, Email, Edit Profile Button */}
            <div className="flex min-w-0 flex-col wrap-anywhere">
              <h1 className="text-[21px] sm:text-[23px] font-black text-gray-900 tracking-tight leading-tight">
                {userName}
              </h1>
              <p className="text-[13px] text-gray-500 font-normal mb-2 leading-snug">
                {userEmail}
              </p>
              <button
                onClick={() => {
                  setEditName(userName);
                  setEditEmail(userEmail);
                  setSelectedAvatar(userAvatar);
                  setActiveModal("edit");
                }}
                className="bg-[#563bfa] hover:bg-[#472ee0] text-white min-h-11 text-xs font-bold py-1.5 px-4 sm:px-4.5 rounded-full w-fit shadow-xs shadow-indigo-100 transition-all cursor-pointer active:scale-98"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Top-Right Lavender Handwritten Note ("Better Skills Brighter Tomorrow 💜") */}
          <div className="hidden min-[400px]:flex size-20 sm:size-[102px] bg-[#f4f1ff] rounded-2xl p-2 relative flex-col justify-center items-center text-center shadow-2xs border border-purple-100/70 flex-shrink-0 select-none">
            <div className="font-handwriting text-[#623af8] text-[13.5px] sm:text-[14.5px] font-bold leading-[1.14] -rotate-3 text-center">
              <div>Better</div>
              <div>Skills</div>
              <div>Brighter</div>
              <div>Tomorrow</div>
            </div>
            <span className="absolute bottom-2 right-2 text-xs text-[#623af8] leading-none">
              💜
            </span>
          </div>
        </div>

        {/* Menu Cards Stack */}
        <div className="grid gap-2.5 mt-1 md:grid-cols-2">
          {/* 1. My Learning */}
          <Link
            href="/my-learning"
            className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  My Learning
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Continue your courses
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </Link>

          {/* 2. Saved Learning Courses */}
          <button
            onClick={() => setActiveModal("savedCourses")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Saved Learning Courses
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Your bookmarked courses
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 3. Saved Prompts */}
          <button
            onClick={() => setActiveModal("prompts")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Bookmark size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Saved Prompts
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Your favorite prompts
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 3. Downloads */}
          <button
            onClick={() => setActiveModal("downloads")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Download size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Downloads
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Your resources
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 4. Certificates */}
          <button
            onClick={() => setActiveModal("certificates")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Award size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Certificates
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Your achievements
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 5. Change Mode */}
          <button
            id="profile-change-mode-btn"
            onClick={() => setActiveModal("changeMode")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {themeMode === "dark" ? (
                  <Moon size={20} strokeWidth={2.3} />
                ) : themeMode === "system" ? (
                  <Laptop size={20} strokeWidth={2.3} />
                ) : (
                  <Sun size={20} strokeWidth={2.3} />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                    Change Mode
                  </span>
                  <span className="text-[10px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-bold capitalize">
                    {themeMode}
                  </span>
                </div>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Light &amp; dark theme appearance
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 5. Settings */}
          <button
            onClick={() => setActiveModal("settings")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <SettingsIcon size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Settings
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Manage your account
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 6. Help & Support */}
          <button
            onClick={() => setActiveModal("support")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <CircleHelp size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-gray-900 leading-tight">
                  Help & Support
                </span>
                <span className="text-[11.5px] sm:text-xs text-gray-400 font-normal leading-tight mt-0.5">
                  Get assistance
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#563bfa] transition-colors" />
          </button>

          {/* 7. Logout */}
          <button
            onClick={() => setActiveModal("logout")}
            className="w-full text-left bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-red-100 hover:bg-red-50/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#fff0f0] text-[#ef4444] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <LogOut size={20} strokeWidth={2.3} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[14.5px] sm:text-[15px] text-[#ef4444] leading-tight">
                  Logout
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-[#ef4444] transition-colors" />
          </button>
        </div>

        {/* Bottom Promo Banner: "Work Smarter with AI 👑" + Student Image + "Same Tools Bigger Possibilities 💜" */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#fbf8ff] via-[#f4edff] to-[#e8dcff] p-5 sm:p-6 border border-purple-100/90 shadow-2xs mt-1">
          {/* Top-Right Handwritten Script */}
          <div className="hidden sm:block absolute top-3.5 right-3.5 z-20 text-right select-none pointer-events-none font-handwriting text-[#7c3aed] text-[13px] sm:text-[14px] leading-[1.12] rotate-1">
            <div>Same</div>
            <div>Tools</div>
            <div>Bigger</div>
            <div>Possibilities</div>
            <div className="text-xs mt-0.5">💜</div>
          </div>

          {/* Cheerful Student Background Image with NextFutureMind Branded Laptop */}
          <div className="absolute bottom-0 right-0 w-[32%] sm:w-48 h-30 sm:h-40 select-none pointer-events-none">
            <div className="relative w-full h-full">
              {/* Photo of student in lavender top */}
              <div className="w-full max-w-26 aspect-square sm:size-28 rounded-full overflow-hidden ml-auto border-2 border-white/90 shadow-xs relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=320&auto=format&fit=crop"
                  alt="Student with AI"
                  fill
                  sizes="112px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Silver Laptop Lid with NextFutureMind Branding */}
              <div className="absolute bottom-0 right-2 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400/80 rounded-t-lg px-2.5 py-1.5 shadow-md w-full max-w-34 text-center">
                <span className="text-[8px] sm:text-[8.5px] font-black text-gray-800 tracking-tight block">
                  NextFutureMind
                </span>
              </div>
            </div>
          </div>

          {/* Banner Left Content: Heading with Crown emoji, Subtitle & CTA */}
          <div className="relative z-10 w-2/3 sm:max-w-md flex flex-col">
            <div className="flex items-start gap-1.5 mb-1.5">
              <h2 className="text-[20px] sm:text-[22px] font-black text-gray-900 leading-[1.16] tracking-tight">
                Work Smarter
                <br />
                with AI
              </h2>
              <span className="text-2xl select-none leading-none pt-0.5" role="img" aria-label="Crown">
                👑
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mb-4 font-normal">
              Unlock your potential with the best AI tools, prompts and learning
              resources.
            </p>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold min-h-11 py-2 px-3.5 rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer w-fit"
            >
              <span>Start Learning Today</span>
              <span className="text-sm font-bold">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================== MODALS ===================== */}

      {/* 1. Edit Profile Modal */}
      {activeModal === "edit" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-gray-900">
                Edit Profile
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {saveSuccess ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check size={24} strokeWidth={3} />
                </div>
                <h4 className="font-bold text-base text-gray-900">
                  Profile Updated!
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Your changes have been saved successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-3.5">
                {/* Choose Avatar */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Choose Avatar
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5 p-1">
                    {AVATAR_OPTIONS.map((avatar) => (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar.src)}
                        className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          selectedAvatar === avatar.src
                            ? "border-[#563bfa] ring-2 ring-violet-200 scale-105"
                            : "border-gray-200 hover:border-gray-400 opacity-80"
                        }`}
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full min-h-11 px-3.5 py-2 text-base md:text-sm rounded-xl border border-gray-200 outline-none focus:border-[#563bfa] font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    readOnly
                    aria-describedby="profile-email-help"
                    className="w-full min-h-11 px-3.5 py-2 text-base md:text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none font-medium"
                  />
                  <p id="profile-email-help" className="mt-1 text-[11px] text-gray-500">
                    This is your verified sign-in email.
                  </p>
                </div>

                {saveError && (
                  <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                    {saveError}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="min-h-11 flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="min-h-11 flex-1 py-2.5 rounded-xl bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSaving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Saved Learning Courses Modal */}
      {activeModal === "savedCourses" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <GraduationCap size={17} strokeWidth={2.3} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                    Saved Learning Courses
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {savedCoursesList.length} courses in your watchlist
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {savedCoursesList.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-2.5">
                  <GraduationCap size={24} />
                </div>
                <p className="text-xs font-bold text-gray-700 mb-1">
                  No saved courses yet
                </p>
                <p className="text-[11px] text-gray-400 max-w-xs mb-4">
                  Bookmark courses from the Learn tab or Tools hub to access them here anytime.
                </p>
                <Link
                  href="/learn"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-[#563bfa] text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="overflow-y-auto flex flex-col gap-3 pr-1">
                {savedCoursesList.map((course) => (
                  <div
                    key={course.id}
                    className="p-3.5 bg-[#fbfbfe] rounded-2xl border border-gray-100 hover:border-violet-200 transition-all flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                            {course.levelBadge}
                          </span>
                          <span className="text-[10px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full font-bold">
                            {course.hours}
                          </span>
                          <span className="text-[10.5px] text-gray-500 font-medium">
                            ★ {course.rating}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-[13.5px] text-gray-900 leading-tight">
                          {course.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {course.tagline}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setSavedCoursesList((prev) =>
                            prev.filter((c) => c.id !== course.id)
                          )
                        }
                        className="flex size-11 items-center justify-center text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                        title="Remove from saved"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100/90">
                      <div className="flex flex-wrap items-baseline gap-1.5">
                        <span className="font-black text-xs text-gray-900">
                          {course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {course.originalPrice}
                          </span>
                        )}
                        {course.discount && (
                          <span className="text-[9.5px] font-black bg-red-100 text-red-600 px-1.5 py-0.2 rounded">
                            {course.discount}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 ml-1">
                          • {course.savedDate}
                        </span>
                      </div>

                      <Link
                        href={`/tools/${course.slug}`}
                        onClick={() => setActiveModal(null)}
                        className="min-h-11 py-1.5 px-3 bg-[#563bfa] hover:bg-[#472ee0] text-white text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <Play size={11} className="fill-white" />
                        <span>Start Learning</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Mode Modal */}
      {activeModal === "changeMode" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <Moon size={17} strokeWidth={2.3} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                    Change Mode
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Choose your preferred display appearance
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 mb-5">
              {/* Light Mode Option */}
              <button
                onClick={() => applyTheme("light")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  themeMode === "light"
                    ? "border-[#563bfa] bg-[#f8f7ff] shadow-xs"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      themeMode === "light"
                        ? "bg-[#563bfa] text-white"
                        : "bg-amber-50 text-amber-500"
                    }`}
                  >
                    <Sun size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[13.5px] text-gray-900 leading-tight">
                      Light Mode
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Clean, vibrant, high-contrast bright theme
                    </p>
                  </div>
                </div>
                {themeMode === "light" && (
                  <div className="w-5 h-5 rounded-full bg-[#563bfa] text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* Dark Mode Option */}
              <button
                onClick={() => applyTheme("dark")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  themeMode === "dark"
                    ? "border-[#563bfa] bg-[#f8f7ff] shadow-xs"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      themeMode === "dark"
                        ? "bg-[#563bfa] text-white"
                        : "bg-slate-800 text-slate-100"
                    }`}
                  >
                    <Moon size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[13.5px] text-gray-900 leading-tight">
                      Dark Mode
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Comfortable dim palette, easy on your eyes
                    </p>
                  </div>
                </div>
                {themeMode === "dark" && (
                  <div className="w-5 h-5 rounded-full bg-[#563bfa] text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* System Default */}
              <button
                onClick={() => applyTheme("system")}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  themeMode === "system"
                    ? "border-[#563bfa] bg-[#f8f7ff] shadow-xs"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      themeMode === "system"
                        ? "bg-[#563bfa] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Laptop size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[13.5px] text-gray-900 leading-tight">
                      System Default
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Sync automatically with device preferences
                    </p>
                  </div>
                </div>
                {themeMode === "system" && (
                  <div className="w-5 h-5 rounded-full bg-[#563bfa] text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 2. Saved Prompts Modal */}
      {activeModal === "prompts" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <Bookmark size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Saved Prompts
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex flex-col gap-3 pr-1">
              {savedPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="p-3.5 bg-[#fbfbfe] rounded-2xl border border-gray-100 hover:border-violet-200 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <span className="font-bold text-xs text-gray-900">
                      {prompt.title}
                    </span>
                    <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">
                      {prompt.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2 font-mono bg-white p-2 rounded-xl border border-gray-100 line-clamp-3">
                    {prompt.text}
                  </p>
                  <button
                    onClick={() => handleCopyPrompt(prompt.id, prompt.text)}
                    className="text-xs text-[#563bfa] hover:text-[#472ee0] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPromptId === prompt.id ? (
                      <>
                        <Check size={13} className="text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Downloads Modal */}
      {activeModal === "downloads" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <Download size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Your Downloads
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {downloadItems.map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 bg-[#fbfbfe] rounded-2xl border border-gray-100 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[10.5px] text-gray-400 font-medium">
                      {item.format} • {item.size}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTriggerDownload(item.title)}
                    className="p-2 bg-[#f0edff] text-[#563bfa] hover:bg-[#563bfa] hover:text-white rounded-xl transition-colors cursor-pointer flex-shrink-0"
                    title="Download File"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Certificates Modal */}
      {activeModal === "certificates" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <Award size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Verified Certificates
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Certificate Visual Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/30 border-2 border-indigo-100 text-center mb-4">
              <span className="text-[10px] font-extrabold tracking-widest text-[#563bfa] uppercase block mb-1">
                Certificate of Completion
              </span>
              <h4 className="font-black text-sm text-gray-900 mb-1">
                AI Productivity & Workflow Mastery
              </h4>
              <p className="wrap-anywhere text-[11px] text-gray-500 mb-2">
                Awarded to <span className="font-bold text-gray-900">{userName}</span>
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <Check size={12} strokeWidth={3} />
                <span>Verified by NextFutureMind • Credential ID #NFM-9842</span>
              </div>
            </div>

            <button
              onClick={() => handleTriggerDownload("AI_Productivity_Certificate_NextFutureMind")}
              className="w-full py-2.5 rounded-xl bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF Certificate</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Settings Modal */}
      {activeModal === "settings" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <SettingsIcon size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Account Settings
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs text-gray-700">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-bold">Email Notifications</span>
                <span className="text-emerald-600 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-bold">Course Updates</span>
                <span className="text-emerald-600 font-bold">Weekly</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-bold">Current Plan</span>
                <span className="text-[#563bfa] font-bold">Free Tier</span>
              </div>

              <Link
                href="/pricing"
                onClick={() => setActiveModal(null)}
                className="mt-2 py-2.5 px-3 rounded-xl bg-[#563bfa] text-white font-bold text-center hover:bg-[#472ee0] transition-colors cursor-pointer"
              >
                Upgrade to Pro Plan
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 6. Help & Support Modal */}
      {activeModal === "support" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f0edff] text-[#563bfa] flex items-center justify-center">
                  <CircleHelp size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Help & Support
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Have questions about courses, prompts, or your account? Our team is
              here to help 24/7.
            </p>

            <div className="flex flex-col gap-2 mb-4 text-xs font-semibold">
              <a
                href="mailto:support@nextfuturemind.com"
                className="p-3 bg-[#fbfbfe] hover:bg-violet-50 rounded-xl border border-gray-100 flex items-center justify-between text-gray-800"
              >
                <span className="min-w-0 wrap-anywhere">Email: support@nextfuturemind.com</span>
                <ExternalLink size={14} className="text-gray-400" />
              </a>
              <Link
                href="/pricing"
                onClick={() => setActiveModal(null)}
                className="p-3 bg-[#fbfbfe] hover:bg-violet-50 rounded-xl border border-gray-100 flex items-center justify-between text-gray-800"
              >
                <span>Billing & Subscription FAQ</span>
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 7. Logout Modal */}
      {activeModal === "logout" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-xs w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <LogOut size={22} strokeWidth={2.4} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-1">
              Log Out?
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Are you sure you want to sign out of NextFutureMind?
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="min-h-11 flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signOut();
                  setActiveModal(null);
                  router.replace("/login");
                }}
                className="min-h-11 flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
