"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Flame,
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { TOOLS_DATABASE, ToolData } from "@/data/toolsData";
import ProgrammingCoursesView from "@/components/ProgrammingCoursesView";

// Helper to render authentic tool logo
function ToolLogo({ type }: { type: ToolData["iconType"] }) {
  switch (type) {
    case "chatgpt":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
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
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#d97706]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3.2" />
          <path
            d="M12 2v3.5m0 13V22M2 12h3.5m13 0H22m-3.5-6.5-2.5 2.5m-8 8-2.5 2.5m0-13 2.5 2.5m8 8 2.5 2.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "midjourney":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18c2-1 4-1 6 0s4 1 6 0 4-1 4-1" />
          <path d="M6 18c1.5 2 4 2.5 6 2.5s4.5-.5 6-2.5H6z" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 3v13" />
          <path d="M12 4c3 3 5 7 5 11h-5V4z" fill="currentColor" fillOpacity="0.15" />
          <path d="M11 7c-2 2-4 5-4 8h4V7z" />
        </svg>
      );
    case "notion":
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
          <span className="font-black text-2xl sm:text-3xl text-gray-900 tracking-tighter font-serif">
            N
          </span>
        </div>
      );
    case "canva":
      return (
        <span className="text-2xl sm:text-3xl font-black text-white italic font-serif select-none">
          C
        </span>
      );
    case "perplexity":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#20808D]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a1 1 0 0 1 1 1v4.06l3.54-3.54a1 1 0 1 1 1.41 1.41L14.41 8.5H19a1 1 0 1 1 0 2h-4.59l3.54 3.54a1 1 0 0 1-1.41 1.41L13 11.91V16a1 1 0 1 1-2 0v-4.09l-3.54 3.54a1 1 0 0 1-1.41-1.41L9.59 10.5H5a1 1 0 1 1 0-2h4.59L6.05 4.96a1 1 0 1 1 1.41-1.41L11 7.09V3a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "zapier":
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#ff4a00]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-3 0V4a1.5 1.5 0 0 1 1.5-1.5zM12 16a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-3 0v-4A1.5 1.5 0 0 1 12 16zM3.77 7.27a1.5 1.5 0 0 1 2.12 0l2.83 2.83a1.5 1.5 0 0 1-2.12 2.12L3.77 9.39a1.5 1.5 0 0 1 0-2.12zm11.56 7.78a1.5 1.5 0 0 1 2.12 0l2.83 2.83a1.5 1.5 0 0 1-2.12 2.12l-2.83-2.83a1.5 1.5 0 0 1 0-2.12zM2.5 12a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 12zm13.5 0a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 0 3h-4A1.5 1.5 0 0 1 16 12z" />
        </svg>
      );
    default:
      return <Sparkles className="w-7 h-7 text-[#563bfa]" />;
  }
}

// Tag styles matching target UI
const getTagBadgeStyle = (tag: string) => {
  const styles: Record<string, string> = {
    Productivity: "bg-[#e8f8f2] text-[#059669] border-[#d1fae5]",
    Writing: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
    Research: "bg-[#ecfeff] text-[#0891b2] border-[#cffafe]",
    Multimodal: "bg-[#f5f3ff] text-[#7c3aed] border-[#ede9fe]",
    Analysis: "bg-[#f0fdf4] text-[#16a34a] border-[#dcfce7]",
    Design: "bg-[#faf5ff] text-[#9333ea] border-[#f3e8ff]",
    Creativity: "bg-[#f0f9ff] text-[#0284c7] border-[#e0f2fe]",
    Art: "bg-[#f8fafc] text-[#475569] border-[#e2e8f0]",
    Notes: "bg-[#eff6ff] text-[#3b82f6] border-[#dbeafe]",
    Knowledge: "bg-[#f5f3ff] text-[#6366f1] border-[#e0e7ff]",
    Content: "bg-[#ecfeff] text-[#0d9488] border-[#ccfbf1]",
    Marketing: "bg-[#faf5ff] text-[#a855f7] border-[#f3e8ff]",
    Learning: "bg-[#f5f3ff] text-[#7c3aed] border-[#ede9fe]",
    Automation: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
    Integration: "bg-[#fdf4ff] text-[#c026d3] border-[#fae8ff]",
    Programming: "bg-[#eef2ff] text-[#4f46e5] border-[#e0e7ff]",
    Coding: "bg-[#eef2ff] text-[#4f46e5] border-[#e0e7ff]",
  };
  return styles[tag] || "bg-gray-50 text-gray-700 border-gray-200";
};

const CATEGORIES = [
  "All",
  "Programming",
  "Productivity",
  "Content",
  "Design",
  "Development",
  "Research",
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && CATEGORIES.includes(cat)) {
        return cat;
      }
    }
    return "All";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>("All");

  const toolsList: ToolData[] = useMemo(() => Object.values(TOOLS_DATABASE), []);
  const categories = CATEGORIES;

  // Listen to browser navigation back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && CATEGORIES.includes(cat)) {
        setActiveCategory(cat);
      } else {
        setActiveCategory("All");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "All") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const filteredTools = useMemo(() => {
    return toolsList.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Programming"
          ? tool.category === "Programming" ||
            tool.category === "Development" ||
            tool.tags.some((t) =>
              ["Programming", "Coding", "Code", "Development"].includes(t)
            ) ||
            tool.id === "claude" ||
            tool.id === "chatgpt"
          : tool.category === activeCategory);
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesTagFilter =
        selectedTagFilter === "All" ||
        (selectedTagFilter === "Programming"
          ? tool.tags.some((t) => ["Programming", "Coding"].includes(t))
          : tool.tags.includes(selectedTagFilter));

      return matchesCategory && matchesSearch && matchesTagFilter;
    });
  }, [toolsList, activeCategory, searchQuery, selectedTagFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9ff] via-[#fbfcff] to-white relative pb-6 md:pb-16 selection:bg-violet-100 selection:text-violet-900">
      <div
        className={`${
          activeCategory === "Programming" ? "max-w-7xl" : "max-w-6xl"
        } mx-auto px-4 sm:px-6 pt-5 sm:pt-8 relative z-10`}
      >
        {/* Category Pills Row (Horizontally scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 min-h-11 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#563bfa] text-white shadow-md shadow-indigo-200"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory === "Programming" ? (
          <div className="-mt-2">
            <ProgrammingCoursesView
              onSwitchCategory={(cat) => handleCategoryChange(cat)}
            />
          </div>
        ) : (
          <>
            {/* Header Block with Decorative Text */}
            <div className="relative mb-6 min-[420px]:pr-20">
              {/* Handwritten Decorative Text on Right */}
              <div className="hidden min-[420px]:block absolute top-0 right-0 sm:right-2 select-none pointer-events-none text-right font-handwriting text-[#8c859d] text-lg sm:text-2xl leading-none rotate-3 opacity-90">
                <div>Right</div>
                <div>Tools</div>
                <div>Brighter</div>
                <div>Results</div>
                <div className="text-sm sm:text-base mt-0.5">💜</div>
              </div>

              {/* Badge: EXPLORE • LEARN • BE PRODUCTIVE */}
              <div className="inline-flex items-center gap-1.5 text-[#563bfa] text-[10px] sm:text-[11px] font-extrabold bg-[#f3efff] px-3.5 py-1.5 rounded-full mb-3 shadow-2xs border border-violet-100/70 uppercase tracking-wide">
                <Sparkles size={13} className="text-[#563bfa] fill-[#563bfa]" />
                <span>Explore • Learn • Be Productive</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-black text-gray-900 tracking-tight leading-[1.1] mb-2.5">
                Explore AI Tools
              </h1>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-md font-normal">
                Discover, learn, and master the best AI tools for your work, study,
                and creativity.
              </p>
            </div>

            {/* Search & Filters Controls */}
        <div className="flex items-center gap-2.5 mb-5">
          {/* Search Box */}
          <div className="min-w-0 flex-1 bg-white border border-gray-200/90 rounded-2xl flex items-center px-3.5 sm:px-4 gap-2.5 shadow-2xs focus-within:border-[#563bfa] focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools, e.g. ChatGPT, Notion, Canva..."
              className="min-w-0 bg-transparent border-none outline-none text-base md:text-sm w-full py-3 text-gray-900 placeholder:text-gray-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="flex size-11 shrink-0 -mr-2 items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filters Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`shrink-0 min-h-11 bg-white border border-gray-200/90 px-3.5 sm:px-4 py-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold shadow-2xs hover:bg-gray-50 transition-all cursor-pointer ${
              filterOpen || selectedTagFilter !== "All"
                ? "border-[#563bfa] text-[#563bfa] bg-[#f8f6ff]"
                : "text-[#563bfa]"
            }`}
          >
            <Filter size={16} className="text-[#563bfa]" strokeWidth={2.4} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Drawer / Dropdown */}
        {filterOpen && (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-4 mb-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-800">
                Filter by Skill / Use Case
              </span>
              <button
                onClick={() => {
                  setSelectedTagFilter("All");
                  setFilterOpen(false);
                }}
                className="text-xs font-bold text-[#563bfa] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "All",
                "Programming",
                "Productivity",
                "Writing",
                "Research",
                "Design",
                "Analysis",
                "Automation",
                "Creativity",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTagFilter(tag);
                    setFilterOpen(false);
                  }}
                  className={`min-h-11 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedTagFilter === tag
                      ? "bg-[#563bfa] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tools List (Exact Card Styling linking to dedicated detail page) */}
        <div className="grid gap-3.5 md:grid-cols-2">
          {filteredTools.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl border border-gray-100 p-8 text-center">
              <p className="text-sm font-bold text-gray-800 mb-1">
                No AI tools found
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Try searching for something else or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setSelectedTagFilter("All");
                }}
                className="bg-[#563bfa] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-2xs hover:shadow-md transition-all p-4 sm:p-5 grid grid-cols-[auto_minmax(0,1fr)] content-start gap-x-3 gap-y-2.5 cursor-pointer hover:border-violet-100"
              >
                {/* Logo Container */}
                <div
                  className={`size-11 sm:size-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${tool.iconBg}`}
                >
                  <ToolLogo type={tool.iconType} />
                </div>

                {/* Card Content Area */}
                <div className="contents">
                  {/* Top row: Name & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 self-center">
                    <h2 className="font-extrabold text-gray-900 text-base leading-tight group-hover:text-[#563bfa] transition-colors">
                      {tool.name}
                    </h2>

                    {tool.badge && (
                      <div
                        className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                          tool.badge.type === "popular"
                            ? "bg-[#fff3e8] text-[#ea580c] border border-orange-100"
                            : tool.badge.type === "trending"
                            ? "bg-[#ede9fe] text-[#7c3aed] border border-violet-100"
                            : "bg-[#e6f9f0] text-[#059669] border border-emerald-100"
                        }`}
                      >
                        {tool.badge.type === "popular" && (
                          <Flame size={12} className="fill-[#ea580c]" />
                        )}
                        {tool.badge.type === "trending" && (
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        )}
                        {tool.badge.type === "new" && (
                          <ArrowDown size={12} strokeWidth={2.5} />
                        )}
                        <span>{tool.badge.text}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="col-span-full text-sm text-gray-500 leading-relaxed">
                    {tool.desc}
                  </p>

                  {/* Bottom row: Tags on left, Learn button on right */}
                  <div className="col-span-full flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md border whitespace-nowrap ${getTagBadgeStyle(
                            tag,
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="ml-auto bg-[#f3efff] group-hover:bg-[#563bfa] text-[#563bfa] group-hover:text-white px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 flex-shrink-0 transition-all shadow-2xs">
                      <span>Learn</span>
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
}
