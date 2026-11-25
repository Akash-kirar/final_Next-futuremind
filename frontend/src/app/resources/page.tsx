"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Download,
  Check,
  FileText,
  X,
  ArrowRight,
} from "lucide-react";
import PromptLibraryView from "@/components/PromptLibraryView";

interface ResourceItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Templates" | "Guides" | "Cheat Sheets" | "Prompt Library" | "eBooks";
  format: string;
  size: string;
  popular?: boolean;
  theme: "red" | "blue" | "orange" | "purple" | "green" | "pink" | "indigo";
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadedItems, setDownloadedItems] = useState<Record<string, boolean>>({});
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"default" | "size-asc" | "size-desc">("default");
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const categories = ["All", "Templates", "Guides", "Cheat Sheets", "Prompt Library", "eBooks"];

  const resources: ResourceItem[] = [
    {
      id: "chatgpt-prompts-100",
      title: "100+ ChatGPT Prompts for Productivity",
      subtitle: "Boost your work, study and creativity.",
      category: "Prompt Library",
      format: "PDF",
      size: "2.5 MB",
      popular: true,
      theme: "red",
    },
    {
      id: "ai-tools-comparison-2025",
      title: "AI Tools Comparison Guide 2025",
      subtitle: "Compare top AI tools and find the best one for your needs.",
      category: "Guides",
      format: "PDF",
      size: "1.8 MB",
      theme: "blue",
    },
    {
      id: "social-media-prompt-templates",
      title: "Social Media Prompt Templates",
      subtitle: "Ready-to-use prompts for Instagram, LinkedIn, Twitter and more.",
      category: "Templates",
      format: "PDF",
      size: "1.2 MB",
      theme: "orange",
    },
    {
      id: "master-prompt-library-1000",
      title: "Complete 1,000+ Master AI Prompt Library",
      subtitle: "Battle-tested prompts for copywriting, coding, marketing & research.",
      category: "Prompt Library",
      format: "PDF • Notion",
      size: "3.4 MB",
      popular: true,
      theme: "purple",
    },
    {
      id: "resume-template-ai-optimized",
      title: "Resume Template (AI Optimized)",
      subtitle: "Create a professional resume with AI (ATS-friendly).",
      category: "Templates",
      format: "PDF",
      size: "856 KB",
      theme: "purple",
    },
    {
      id: "ai-for-students-guide",
      title: "AI for Students Guide",
      subtitle: "Learn how to use AI for studying, research and better results.",
      category: "Guides",
      format: "PDF",
      size: "1.4 MB",
      theme: "green",
    },
    {
      id: "coding-dev-prompt-library",
      title: "Developer Prompt Library & Architecture Pack",
      subtitle: "Precision engineering prompts for debugging, refactoring, and system design.",
      category: "Prompt Library",
      format: "PDF • JSON",
      size: "2.2 MB",
      theme: "blue",
    },
    {
      id: "prompt-cheat-sheet-printable",
      title: "Prompt Cheat Sheet (Printable)",
      subtitle: "A quick reference guide for powerful prompts.",
      category: "Cheat Sheets",
      format: "PDF",
      size: "690 KB",
      theme: "pink",
    },
    {
      id: "nextfuturemind-career-ebook",
      title: "AI Career Playbook & Architecture Handbook",
      subtitle: "Step-by-step roadmap to become an AI-first builder and prompt designer.",
      category: "eBooks",
      format: "eBook • PDF",
      size: "4.8 MB",
      theme: "indigo",
    },
    {
      id: "midjourney-prompt-bible",
      title: "Midjourney V6 Lighting & Composition Cheatsheet",
      subtitle: "Complete parameter reference for photorealistic cinematic prompts.",
      category: "Cheat Sheets",
      format: "PDF",
      size: "1.9 MB",
      theme: "orange",
    },
  ];

  const handleDownload = (item: ResourceItem) => {
    setDownloadedItems((prev) => ({ ...prev, [item.id]: true }));
    setDownloadToast(`Downloaded "${item.title}"`);
    setTimeout(() => setDownloadToast(null), 3000);

    // Trigger file download
    const blob = new Blob(
      [
        `# ${item.title}\n\n` +
          `Category: ${item.category}\n` +
          `Resource Size: ${item.size}\n\n` +
          `---\n` +
          `Thank you for downloading from NextFutureMind!\n` +
          `Learn Today, Apply Tomorrow 💜\n` +
          `Visit: https://nextfuturemind.com\n\n` +
          `[Resource Content Included: ${item.subtitle}]`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredResources = resources
    .filter((res) => {
      const matchesCategory =
        selectedCategory === "All" || res.category === selectedCategory;
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "size-asc") {
        return parseFloat(a.size) - parseFloat(b.size);
      }
      if (sortBy === "size-desc") {
        return parseFloat(b.size) - parseFloat(a.size);
      }
      return 0;
    });

  if (selectedCategory === "Prompt Library") {
    return <PromptLibraryView />;
  }

  return (
    <div className="min-h-full bg-[#fcfdff] pb-8 md:pb-16 selection:bg-violet-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 flex flex-col gap-4">
        {/* Top Header: Free Resources + Whimsical Script */}
        <div className="flex items-start justify-between gap-2 pt-1">
          <div>
            <h1 className="text-[30px] sm:text-[34px] font-black text-gray-900 tracking-tight leading-none">
              Free <span className="text-[#563bfa]">Resources</span>
            </h1>
            <p className="text-[13px] sm:text-[13.5px] text-gray-500 font-normal mt-2 max-w-lg leading-[1.3]">
              Templates, guides, cheat sheets and more to boost your productivity.
            </p>
          </div>

          {/* Top-Right Whimsical Script: "Learn Today Apply Tomorrow 💜" */}
          <div className="select-none pr-1 pt-0.5 flex-shrink-0">
            <div className="font-handwriting text-[#623af8] text-[15px] sm:text-[16px] font-bold leading-[1.12] -rotate-3 text-right">
              <div>Learn</div>
              <div>Today</div>
              <div>Apply</div>
              <div>Tomorrow</div>
              <div className="text-xs mt-0.5 text-right">💜</div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap py-1 -mx-1 px-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            if (cat === "Prompt Library") {
              return (
                <Link
                  key={cat}
                  href="/prompts"
                  onClick={() => setSelectedCategory("Prompt Library")}
                  className={`inline-flex min-h-11 shrink-0 items-center px-4 py-2 rounded-full text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#563bfa] text-white shadow-xs shadow-indigo-200"
                      : "bg-[#f1f3f7] hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {cat}
                </Link>
              );
            }

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex min-h-11 shrink-0 items-center px-4 py-2 rounded-full text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#563bfa] text-white shadow-xs shadow-indigo-200"
                    : "bg-[#f1f3f7] hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Filter Button Row */}
        <div className="flex items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-0 flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search resources (e.g. prompts, templates, guides...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 bg-[#fbfbfe] rounded-2xl border border-gray-200/90 text-base lg:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#563bfa] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer flex-shrink-0 active:scale-98"
          >
            <SlidersHorizontal size={14} className="text-gray-600" />
            <span>Filter</span>
          </button>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))] gap-3 sm:gap-4">
          {filteredResources.map((item) => {
            const isDownloaded = downloadedItems[item.id];

            return (
              <div
                key={item.id}
                className="@container min-w-0 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-2 hover:border-violet-200 transition-all group"
              >
                {/* Top Row: Left Icon + Content + Right Action / Badge */}
                <div className="flex grow flex-col justify-between gap-3 @min-[24rem]:flex-row">
                  {/* Left Side: Category Themed Icon Box */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Themed Icon Box matching screenshot */}
                    <div className="flex-shrink-0 pt-0.5">
                      {item.theme === "red" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#fff0f2] flex flex-col items-center justify-center relative shadow-2xs border border-red-100/80">
                          {/* Mini folded corner document */}
                          <div className="relative text-red-500 flex flex-col items-center">
                            <FileText size={20} strokeWidth={2.4} />
                            <span className="text-[7.5px] font-black uppercase tracking-tighter text-white bg-red-500 px-1 rounded-[3px] leading-tight mt-0.5">
                              PDF
                            </span>
                          </div>
                        </div>
                      )}

                      {item.theme === "blue" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#edf5ff] flex items-center justify-center text-[#2563eb] shadow-2xs border border-blue-100/80">
                          <div className="w-6 h-7 bg-white rounded-[4px] border border-blue-300 flex flex-col justify-center px-1 gap-0.5 shadow-2xs">
                            <div className="h-0.5 w-full bg-blue-500 rounded-full" />
                            <div className="h-0.5 w-3/4 bg-blue-500 rounded-full" />
                            <div className="h-0.5 w-4/5 bg-blue-500 rounded-full" />
                          </div>
                        </div>
                      )}

                      {item.theme === "orange" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#fff7ec] flex items-center justify-center text-[#ea580c] shadow-2xs border border-orange-100/80">
                          <div className="w-6 h-7 bg-white rounded-[4px] border border-amber-300 flex flex-col justify-center px-1 gap-0.5 shadow-2xs">
                            <div className="h-0.5 w-full bg-amber-500 rounded-full" />
                            <div className="h-0.5 w-4/5 bg-amber-500 rounded-full" />
                            <div className="h-0.5 w-2/3 bg-amber-500 rounded-full" />
                          </div>
                        </div>
                      )}

                      {item.theme === "purple" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#f5f0ff] flex items-center justify-center text-[#7c3aed] shadow-2xs border border-purple-100/80">
                          <div className="w-6 h-7 bg-white rounded-[4px] border border-violet-300 flex flex-col justify-center px-1 gap-0.5 shadow-2xs">
                            <div className="h-0.5 w-full bg-[#563bfa] rounded-full" />
                            <div className="h-0.5 w-3/4 bg-[#563bfa] rounded-full" />
                            <div className="h-0.5 w-4/5 bg-[#563bfa] rounded-full" />
                          </div>
                        </div>
                      )}

                      {item.theme === "green" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ecfdf3] flex items-center justify-center text-[#16a34a] shadow-2xs border border-emerald-100/80">
                          <div className="w-6 h-7 bg-white rounded-[4px] border border-emerald-300 flex items-center justify-center shadow-2xs">
                            <span className="text-[11px] font-black text-emerald-600">
                              X
                            </span>
                          </div>
                        </div>
                      )}

                      {item.theme === "pink" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#fff0f6] flex items-center justify-center text-[#db2777] shadow-2xs border border-pink-100/80">
                          <div className="w-6 h-7 bg-white rounded-[4px] border border-pink-300 flex flex-col justify-center items-center px-1 shadow-2xs">
                            <div className="w-3.5 h-3 bg-pink-100 rounded-[2px] border border-pink-400 flex items-center justify-center">
                              <span className="text-[8px] leading-none text-pink-600">▲</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {item.theme === "indigo" && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] shadow-2xs border border-indigo-100/80">
                          <FileText size={22} strokeWidth={2.4} />
                        </div>
                      )}
                    </div>

                    {/* Title and Subtitle */}
                    <div className="flex flex-col min-w-0">
                      <h2 className="font-bold text-[14px] sm:text-[15px] text-gray-900 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 font-normal leading-snug mt-0.5">
                        {item.subtitle}
                      </p>

                      {/* PDF & File Size Info */}
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-gray-400 font-normal mt-1">
                        <FileText size={12} strokeWidth={2} />
                        <span>
                          {item.format} • {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Badge + Download Action */}
                  <div className="flex flex-wrap items-center justify-end gap-2 @min-[24rem]:flex-col @min-[24rem]:items-end shrink-0">
                    {item.popular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#f4f0ff] text-[#563bfa]">
                        <span>🔥</span>
                        <span>Most Popular</span>
                      </span>
                    )}

                    <button
                      onClick={() => handleDownload(item)}
                      className={`inline-flex min-h-11 items-center gap-1 text-xs font-bold py-1.5 px-3.5 rounded-xl transition-all cursor-pointer active:scale-98 ${
                        isDownloaded
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-[#f4f1ff] hover:bg-[#563bfa] text-[#563bfa] hover:text-white"
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <Check size={13} strokeWidth={3} />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download size={13} strokeWidth={2.5} />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-2xs">
              <FileText size={36} className="mx-auto text-gray-300 mb-2" />
              <h3 className="font-bold text-sm text-gray-800">
                No resources match your search
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Try searching with different keywords or switch the category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 px-4 py-2 bg-[#563bfa] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Banner: "More Learning Resources Coming Soon!" + Books Stack + Plant */}
        <div className="relative min-h-44 sm:min-h-60 overflow-hidden rounded-3xl bg-gradient-to-r from-[#fbf8ff] via-[#f3ecff] to-[#e7dbff] p-5 sm:p-6 border border-purple-100/90 shadow-2xs mt-1">
          {/* Top-Right Whimsical Handwritten Script */}
          <div className="absolute top-3.5 right-4 z-20 text-right select-none pointer-events-none font-handwriting text-[#7c3aed] text-[13.5px] sm:text-[14.5px] font-bold leading-[1.12] rotate-2">
            <div>Small</div>
            <div>Steps</div>
            <div>Big</div>
            <div>Progress</div>
            <div className="text-xs mt-0.5">💜</div>
          </div>

          {/* Right Side Illustration: Stack of 3D Books + Potted Plant */}
          <div className="absolute -bottom-1 right-2 w-48 sm:w-56 h-36 sm:h-40 origin-bottom-right scale-50 min-[440px]:scale-75 sm:scale-100 select-none pointer-events-none flex items-end justify-end">
            {/* 3D Stack of Pastel Books */}
            <div className="relative w-36 sm:w-40 flex flex-col items-center mb-1 mr-6">
              {/* Book 1: Templates (Top) */}
              <div className="w-24 h-5.5 bg-[#dbeafe] border-t border-l border-r border-blue-200 rounded-t-sm shadow-xs flex items-center justify-center text-[8px] font-bold text-blue-900 transform -rotate-1">
                Templates
              </div>
              {/* Book 2: Guides */}
              <div className="w-26 h-5.5 bg-[#ede9fe] border border-purple-200 rounded-sm shadow-xs flex items-center justify-center text-[8.5px] font-bold text-purple-900 transform rotate-1 -mt-0.5">
                Guides
              </div>
              {/* Book 3: Cheat Sheets */}
              <div className="w-28 h-6 bg-[#d1fae5] border border-emerald-200 rounded-sm shadow-xs flex items-center justify-center text-[9px] font-bold text-emerald-900 transform -rotate-0.5 -mt-0.5">
                Cheat Sheets
              </div>
              {/* Book 4: Prompts */}
              <div className="w-30 h-6 bg-[#ffedd5] border border-orange-200 rounded-sm shadow-xs flex items-center justify-center text-[9.5px] font-bold text-orange-900 transform rotate-1 -mt-0.5">
                Prompts
              </div>
              {/* Book 5: eBooks (Bottom) */}
              <div className="w-32 h-6.5 bg-[#ddd6fe] border border-indigo-200 rounded-b-sm shadow-sm flex items-center justify-center text-[10px] font-bold text-indigo-950 -mt-0.5">
                eBooks
              </div>
            </div>

            {/* Cute Potted Houseplant */}
            <div className="absolute bottom-1 right-0 flex flex-col items-center">
              {/* Plant Leaves */}
              <div className="relative w-12 h-14">
                {/* Leaf 1 */}
                <div className="absolute bottom-3 left-1 w-4 h-8 bg-emerald-600 rounded-full transform -rotate-35 shadow-xs" />
                {/* Leaf 2 */}
                <div className="absolute bottom-4 left-3.5 w-4 h-9 bg-emerald-500 rounded-full transform -rotate-10 shadow-xs" />
                {/* Leaf 3 */}
                <div className="absolute bottom-4 right-3.5 w-4 h-9 bg-emerald-600 rounded-full transform rotate-15 shadow-xs" />
                {/* Leaf 4 */}
                <div className="absolute bottom-2.5 right-1 w-4 h-7 bg-emerald-700 rounded-full transform rotate-40 shadow-xs" />
              </div>
              {/* Ceramic Pot */}
              <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-b-lg shadow-sm flex items-center justify-center -mt-2">
                <div className="w-6 h-1 bg-amber-800/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Left Side Content: Heading, Subtitle & CTA */}
          <div className="relative z-10 mr-22 min-[440px]:mr-36 sm:mr-56 flex flex-col">
            <h2 className="text-[18px] sm:text-[20px] font-black text-gray-900 leading-[1.18] tracking-tight mb-1.5">
              More Learning Resources
              <br />
              Coming Soon!
            </h2>

            <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mb-3.5 font-normal">
              Join our community to get updates, new templates and exclusive content.
            </p>

            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer w-fit"
            >
              <span>Join Community</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#563bfa]" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  Filter Resources
                </h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1.5">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-1.5 px-2.5 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-[#563bfa] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1.5">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "default" | "size-asc" | "size-desc")
                  }
                  className="w-full p-2 rounded-xl border border-gray-200 text-base lg:text-sm font-semibold outline-none focus:border-[#563bfa]"
                >
                  <option value="default">Default Recommended</option>
                  <option value="size-asc">Smallest File Size</option>
                  <option value="size-desc">Largest File Size</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSortBy("default");
                    setShowFilterModal(false);
                  }}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 py-2 rounded-xl bg-[#563bfa] text-white font-bold hover:bg-[#472ee0] cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-[calc(var(--bottom-nav-height)+1rem)] w-max max-w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl animate-in slide-in-from-bottom-2">
          <Check size={14} className="text-emerald-400" strokeWidth={3} />
          <span>{downloadToast}</span>
        </div>
      )}
    </div>
  );
}
