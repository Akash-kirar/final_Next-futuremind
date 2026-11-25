"use client";
import {
  ChevronLeft,
  BarChart2,
  Heart,
  ChevronRight,
  BookOpen,
  Download,
  Bookmark,
  Award,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function MyLearning() {
  const courses = [
    {
      title: "ChatGPT Complete Guide",
      tag: "Beginner",
      tagColor: "text-emerald-600 bg-emerald-50",
      progress: 60,
      lessons: "12/20",
      desc: "Learn how to use ChatGPT effectively in real life.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", // generic replacement
    },
    {
      title: "Google Gemini for Productivity",
      tag: "Beginner",
      tagColor: "text-emerald-600 bg-emerald-50",
      progress: 20,
      lessons: "4/20",
      desc: "Boost your productivity with Google Gemini.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg", // generic replacement
    },
    {
      title: "Notion AI for Organization",
      tag: "Intermediate",
      tagColor: "text-violet-600 bg-violet-100",
      progress: 40,
      lessons: "6/15",
      desc: "Organize, plan and boost productivity.",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", // generic replacement
    },
  ];

  const quickLinks = [
    { name: "Downloads", icon: Download },
    { name: "Saved", icon: Bookmark },
    { name: "Certificates", icon: Award },
    { name: "Learning History", icon: Clock },
  ];

  return (
    <div className="flex flex-col bg-gray-50 pt-4 pb-6">
      <div className="px-4 py-2 flex flex-col md:max-w-3xl md:mx-auto w-full gap-5">
        {/* Mobile Back Button & Header */}
        <div className="flex items-center gap-3 mb-2 md:hidden">
          <Link
            href="/profile"
            className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer inline-flex"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </Link>
        </div>

        {/* Header Title & Quote Card */}
        <div className="grid gap-3 min-[28rem]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] min-[28rem]:items-start sm:gap-5">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight mb-2">
              My <span className="text-violet-600">Learning</span>
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Track your progress, continue learning and build a better you.
            </p>
          </div>

          <div className="bg-indigo-50/70 p-3 rounded-2xl flex items-center justify-between gap-2 relative shadow-sm border border-indigo-100/50">
            <div className="flex items-start gap-2">
              <BarChart2
                size={16}
                className="text-violet-600 shrink-0 mt-0.5"
              />
              <p className="text-xs text-gray-700 font-medium leading-snug">
                Consistency today creates a smarter tomorrow.
              </p>
            </div>
            <Heart
              size={12}
              className="text-violet-600 fill-current shrink-0"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 [&>button]:min-h-11 [&>button]:px-1">
          <button className="bg-violet-600 text-white flex-1 py-2.5 rounded-xl text-xs font-semibold shadow-sm">
            In Progress (3)
          </button>
          <button className="bg-gray-100 text-gray-600 flex-1 py-2.5 rounded-xl text-xs font-medium hover:bg-gray-200 transition">
            Completed (5)
          </button>
          <button className="bg-gray-100 text-gray-600 flex-1 py-2.5 rounded-xl text-xs font-medium hover:bg-gray-200 transition">
            Bookmarks (2)
          </button>
        </div>

        {/* Course List */}
        <div className="flex flex-col gap-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3 sm:gap-4 cursor-pointer hover:shadow-md transition"
            >
              <div className="size-11 sm:size-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden p-2">
                <img
                  src={course.iconUrl}
                  alt={course.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight pr-2">
                    {course.title}
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 shrink-0 mt-0.5"
                  />
                </div>

                <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${course.tagColor}`}
                  >
                    {course.tag}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5 flex items-center pr-8 relative">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                  <span className="text-[9px] font-bold text-gray-500 absolute right-0">
                    {course.progress}%
                  </span>
                </div>

                <p className="text-xs text-gray-500">{course.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning Banner */}
        <div className="mt-2">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            Continue Learning
          </h2>
          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-4 flex flex-col gap-3 min-[28rem]:flex-row min-[28rem]:items-center min-[28rem]:justify-between shadow-md">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  Pick up where you left off
                </h3>
                <p className="text-[11px] text-indigo-100">
                  You&apos;re making great progress!
                </p>
              </div>
            </div>
            <button className="min-h-11 bg-white text-violet-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:bg-gray-50 transition cursor-pointer">
              Continue <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-2 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Links</h2>
          <div className="grid grid-cols-2 min-[28rem]:grid-cols-4 gap-2">
            {quickLinks.map((link, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 gap-2 cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-violet-600">
                  <link.icon size={22} strokeWidth={2} />
                </div>
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {link.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
