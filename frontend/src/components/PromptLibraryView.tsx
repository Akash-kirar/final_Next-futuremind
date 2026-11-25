"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  FileText,
  Mail,
  Share2,
  Code2,
  PieChart,
  Image as ImageIcon,
  Video,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ArrowUpDown,
  Copy,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

export interface PromptItem {
  id: string;
  title: string;
  subtitle: string;
  categories: ("Productivity" | "Writing" | "Study" | "Business" | "Creativity" | "Programming")[];
  tags: string[];
  popular?: boolean;
  theme: "emerald" | "rose" | "sky" | "violet" | "orange" | "green" | "red";
  iconType: "resume" | "email" | "social" | "code" | "plan" | "image" | "video";
  fullPrompt: string;
  recommendedModel?: string;
}

const PROMPT_ITEMS: PromptItem[] = [
  {
    id: "resume-prompt",
    title: "Write a Professional Resume",
    subtitle: "Create a ATS-friendly resume for any job role in seconds.",
    categories: ["Productivity", "Writing", "Business"],
    tags: ["ChatGPT", "Career"],
    popular: true,
    theme: "emerald",
    iconType: "resume",
    recommendedModel: "ChatGPT / Claude 3.7",
    fullPrompt: `Act as an executive resume writer and senior recruiter. Write a modern, ATS-compliant resume tailored for the position of [Target Job Title].

Target Company / Industry: [Target Industry]
Years of Experience: [Years of Experience]
Key Core Competencies: [List 3-5 Skills, e.g. React, Next.js, Node, Cloud Architecture]
Top 3 Career Achievements: [Briefly list 2-3 quantified accomplishments]

Structure the resume strictly with:
1. Contact Header Placeholder
2. High-Impact Executive Summary (3-4 sentences highlighting unique value proposition)
3. Core Competencies Table (Categorized by Domain & Technical Tools)
4. Professional Experience with 4 bullet points per role in STAR format (Situation, Task, Action, Result) incorporating hard metrics (% growth, $ saved, hours automated)
5. Education, Relevant Certifications & Accreditations.`,
  },
  {
    id: "cold-email-prompt",
    title: "Write a Cold Email",
    subtitle: "Generate professional cold emails for job or business opportunities.",
    categories: ["Productivity", "Writing", "Business"],
    tags: ["Productivity", "Communication"],
    theme: "rose",
    iconType: "email",
    recommendedModel: "ChatGPT / Gemini",
    fullPrompt: `You are an elite B2B copywriter who specializes in high-response cold outreach. Draft a persuasive, personalized cold email to [Prospect Name / Title] at [Company Name].

Goal: [e.g. Schedule a 15-minute intro call / Propose partnership / Freelance consulting]
My Offer / Solution: [Explain what problem you solve and the value you bring in 1-2 sentences]
Social Proof / Credibility: [Mention a relevant metric or past client result]

Constraints:
- Total length must be strictly under 110 words.
- Subject line must be under 6 words, curiosity-driven with 0 spam words.
- Open with a specific, non-creepy compliment or observation about their company.
- Low-friction, binary Call-to-Action (e.g. "Open to a brief 5-min chat next Tuesday?").`,
  },
  {
    id: "social-media-prompt",
    title: "Create Social Media Content",
    subtitle: "Generate engaging posts for Instagram, LinkedIn, Twitter, and more.",
    categories: ["Writing", "Creativity", "Business"],
    tags: ["Marketing", "Content"],
    theme: "sky",
    iconType: "social",
    recommendedModel: "ChatGPT / Claude",
    fullPrompt: `You are a viral social media growth strategist. Take this core lesson/topic: "[Insert Topic / Idea]" and adapt it into 3 distinct platform formats:

1. LINKEDIN POST:
- 1-line pattern-interrupt hook that stops the scroll.
- Punchy body with line breaks for mobile scanning.
- 3 actionable takeaways with bullet points.
- 1 question prompt at the end to generate comment engagement.

2. TWITTER / X THREAD:
- Hook tweet with high curiosity gap.
- 4 body tweets detailing the insight with zero fluff.
- 1 summary recap tweet with a call to retweet.

3. INSTAGRAM CAPTION:
- Visual hook for carousel cover.
- Relatable storytelling caption.
- 10 targeted, non-saturated hashtags.`,
  },
  {
    id: "explain-complex-prompt",
    title: "Explain a Complex Topic",
    subtitle: "Make any topic easy to understand with simple examples.",
    categories: ["Study", "Productivity"],
    tags: ["Learning", "Education"],
    theme: "violet",
    iconType: "code",
    recommendedModel: "Gemini 2.5 / Claude",
    fullPrompt: `Act as a world-class educator and communicator using the Feynman Technique. Explain the following complex subject: "[Insert Topic, e.g. Transformer Attention Mechanism / Quantum Entanglement / Zero-Knowledge Proofs]"

Provide the explanation in 4 graduated levels:
1. ELI5 (Explain Like I'm 5): Use an everyday physical playground analogy.
2. High School Level: Explain the key mechanics, why it matters, and how it works under the hood.
3. Industry Practitioner Level: Discuss architecture, trade-offs, and practical implementation bottlenecks.
4. Pop Quiz: 3 multiple-choice conceptual questions to test my understanding.`,
  },
  {
    id: "plan-day-prompt",
    title: "Plan My Day with AI",
    subtitle: "Create a personalized daily plan for maximum productivity.",
    categories: ["Productivity"],
    tags: ["Productivity", "Lifestyle"],
    theme: "orange",
    iconType: "plan",
    recommendedModel: "ChatGPT / Gemini",
    fullPrompt: `You are an executive productivity coach skilled in time-blocking, chronobiology, and the Eisenhower matrix. Optimize my workday today based on my inputs:

Available Hours: [e.g. 9:00 AM - 6:00 PM]
Energy Peak: [Morning / Afternoon / Evening]
Top Must-Win Priority (MIP): [The #1 task that moves the needle]
Other Tasks: [List remaining tasks and meetings]

Generate:
1. 30-minute block-by-block daily schedule with deep-work focus sprints (90 min max).
2. Built-in Pomodoro breaks and transition buffers.
3. A shutdown ritual checklist for 5:30 PM to clear open loops.`,
  },
  {
    id: "generate-images-prompt",
    title: "Generate AI Images",
    subtitle: "Create stunning images with detailed prompts.",
    categories: ["Creativity"],
    tags: ["Creativity", "Design"],
    theme: "green",
    iconType: "image",
    recommendedModel: "Midjourney v6.1 / Imagen 3",
    fullPrompt: `Create 3 ultra-realistic, cinematic AI image generation prompts for Midjourney and Imagen based on this idea: "[Insert Subject / Visual Scene]"

For each prompt specify:
- Subject & Focal Action: Detailed character, pose, and emotion.
- Environment & Set Design: Background geometry, depth of field, atmospheric elements (fog, particles, haze).
- Camera & Optics: Camera sensor (e.g. Arri Alexa 65, Hasselblad), lens focal length (35mm / 85mm anamorphic), aperture (f/1.4), film grain.
- Lighting: Volumetric lighting, golden hour rim lights, cinematic chiaroscuro color contrast.
- Parameters: Aspect ratio (--ar 16:9), stylize (--s 250), and style raw.`,
  },
  {
    id: "youtube-script-prompt",
    title: "Create a YouTube Script",
    subtitle: "Generate a complete video script with hooks, outline, and CTA.",
    categories: ["Writing", "Creativity", "Business"],
    tags: ["Video", "Content"],
    theme: "red",
    iconType: "video",
    recommendedModel: "ChatGPT / Claude",
    fullPrompt: `You are a top YouTube retention editor and scriptwriter. Write an engaging, fast-paced video script for:
Title: "[Insert Video Title]"
Target Audience: [Target Viewer Profile, e.g. Beginners in AI]
Target Duration: [e.g. 8-10 minutes]

Format the script with two columns: [AUDIO / SPOKEN WORDS] and [VISUALS / B-ROLL CUES]:
1. The 0-30 Second Hook: Visual pattern interrupt + high-stakes curiosity gap + promise payoff.
2. The Re-Hook (30-60s): Validating why traditional approaches fail and introducing our framework.
3. Content Core (3 Chapters): Packed with actionable insights, screen-recording cues, and zero fluff.
4. Seamless CTA: Bridge directly from the conclusion into a related video recommendation without saying "In conclusion" or "That's all for today".`,
  },
  {
    id: "code-assistant-prompt",
    title: "Code Debugging & Full Stack Architecture",
    subtitle: "Debug complex code errors, write clean tests, and optimize algorithms.",
    categories: ["Programming", "Productivity"],
    tags: ["Coding", "Development"],
    theme: "violet",
    iconType: "code",
    popular: true,
    recommendedModel: "Claude 3.5 Sonnet / ChatGPT",
    fullPrompt: `You are a Principal Staff Software Engineer and clean-code architect. Review and optimize this code snippet or solve this technical problem:
[Insert Language, Framework, or Code Snippet]

Please provide:
1. Root-cause analysis of any bugs, edge-case vulnerabilities, or performance bottlenecks.
2. Production-grade refactored code with TypeScript types, proper error handling, and comments.
3. Unit test cases covering happy path and critical boundary conditions.`,
  },
];

export default function PromptLibraryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [activeModalPrompt, setActiveModalPrompt] = useState<PromptItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"popular" | "alpha">("popular");
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);

  const categories = ["All", "Programming", "Productivity", "Writing", "Study", "Business", "Creativity"];

  const featuredPrompts = [
    {
      id: "resume-prompt",
      title: "Write a Professional Resume",
      tag: "Career",
      tagColor: "bg-blue-50 text-blue-600",
      iconBg: "bg-[#edf5ff] text-blue-500",
      icon: FileText,
    },
    {
      id: "study-plan-prompt",
      title: "Create a Study Plan with AI",
      tag: "Study",
      tagColor: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-[#ecfdf3] text-emerald-500",
      icon: BarChart3,
    },
    {
      id: "business-ideas-prompt",
      title: "Generate Business Ideas",
      tag: "Business",
      tagColor: "bg-orange-50 text-orange-600",
      iconBg: "bg-[#fffbeb] text-amber-500",
      icon: Lightbulb,
    },
  ];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPrompt = (prompt: PromptItem) => {
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = useMemo(() => {
    return PROMPT_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.categories.includes(
          selectedCategory as "Productivity" | "Writing" | "Study" | "Business" | "Creativity" | "Programming"
        );
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === "popular") {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      return a.title.localeCompare(b.title);
    });
  }, [selectedCategory, searchQuery, sortOption]);

  return (
    <div className="bg-[#fcfdff] pb-6 md:pb-12 selection:bg-violet-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-7 flex flex-col gap-4 sm:gap-5">
        {/* Top Header: Title + Better Prompts Badge */}
        <div className="flex flex-wrap items-start justify-between gap-3 pt-1">
          <div className="min-w-0 flex-[1_1_11rem]">
            <h1 className="text-[30px] sm:text-[34px] font-black text-gray-900 tracking-tight leading-none">
              Prompt Library
            </h1>
            <p className="text-sm text-gray-500 font-normal mt-2 max-w-prose leading-snug">
              Ready-to-use prompts to save your time and get better results.
            </p>
          </div>

          {/* Top-Right "Better Prompts Brighter Results" Badge Card */}
          <div className="bg-gradient-to-br from-[#f2efff] to-[#e8e4ff] rounded-2xl p-2.5 sm:p-3 border border-purple-100/90 shadow-2xs flex items-center gap-2 flex-shrink-0 select-none">
            <div className="text-[#6342ff]">
              <Sparkles size={20} className="fill-[#6342ff]" />
            </div>
            <div className="flex flex-col">
              <span className="font-handwriting text-[#5030e5] font-bold text-[13px] sm:text-[14px] leading-[1.1]">
                Better Prompts
              </span>
              <span className="font-handwriting text-[#5030e5] font-bold text-[13px] sm:text-[14px] leading-[1.1] relative">
                Brighter Results
                {/* Curved underline */}
                <svg
                  className="w-full h-1.5 text-[#563bfa] absolute -bottom-0.5 left-0"
                  viewBox="0 0 70 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C20 1 50 1 69 5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap py-0.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-11 shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
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

        {/* Search Bar & Filters Button */}
        <div className="flex items-center gap-2.5">
          <div className="relative min-w-0 flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search prompts (e.g. resume, content, marketing...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-11 pl-9 pr-10 py-2 bg-[#fbfbfe] rounded-2xl border border-gray-200/90 text-base md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#563bfa] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersModal(true)}
            className="min-h-11 bg-white border border-gray-200/90 hover:border-gray-300 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer flex-shrink-0 active:scale-98"
          >
            <SlidersHorizontal size={14} className="text-gray-600" />
            <span>Filters</span>
          </button>
        </div>

        {/* Featured Prompts Section */}
        <div className="bg-[#fcfaff] rounded-3xl p-3.5 border border-purple-100/60 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#6342ff] fill-[#6342ff]" />
              <div>
                <h2 className="font-bold text-[14px] text-gray-900 leading-tight">
                  Featured Prompts
                </h2>
                <p className="text-[11px] text-gray-400 font-normal leading-tight">
                  Most useful and trending prompts, handpicked for you.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory("All")}
              className="min-h-11 shrink-0 text-[#563bfa] text-xs font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Featured Horizontal Cards */}
          <div className="grid min-[30rem]:grid-cols-3 gap-2 sm:gap-3">
            {featuredPrompts.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    const found = PROMPT_ITEMS.find((p) => p.id === item.id);
                    if (found) setActiveModalPrompt(found);
                  }}
                  className="bg-white rounded-2xl p-3 border border-gray-100/90 shadow-2xs flex items-center justify-between gap-2 min-[30rem]:flex-col min-[30rem]:items-start hover:border-violet-200 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 min-[30rem]:block">
                    <div
                      className={`w-8 h-8 shrink-0 sm:w-9 sm:h-9 rounded-xl ${item.iconBg} flex items-center justify-center min-[30rem]:mb-2 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent size={18} strokeWidth={2.2} />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${item.tagColor} w-fit`}
                  >
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Prompts Section Header */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-[17px] font-black text-gray-900 tracking-tight">
            All Prompts
          </h2>

          {/* Sort Dropdown */}
          <button
            onClick={() =>
              setSortOption((prev) => (prev === "popular" ? "alpha" : "popular"))
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200/90 rounded-xl text-xs font-bold text-gray-700 shadow-2xs hover:bg-gray-50 cursor-pointer"
          >
            <ArrowUpDown size={12} className="text-gray-500" />
            <span>{sortOption === "popular" ? "Most Popular" : "Alphabetical"}</span>
          </button>
        </div>

        {/* Prompts Cards List */}
        <div className="grid gap-3 md:grid-cols-2">
          {filteredPrompts.map((item) => {
            const isBookmarked = bookmarkedIds[item.id];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-2 hover:border-violet-200 transition-all group"
              >
                <div className="flex h-full flex-col justify-between gap-3">
                  {/* Left Icon + Text details */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Themed Icon Box matching screenshot */}
                    <div className="flex-shrink-0 pt-0.5">
                      {item.iconType === "resume" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#ecfdf5] flex items-center justify-center text-emerald-600 shadow-2xs border border-emerald-100/80">
                          <FileText size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "email" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#fff0f2] flex items-center justify-center text-rose-500 shadow-2xs border border-rose-100/80">
                          <Mail size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "social" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#eff6ff] flex items-center justify-center text-sky-500 shadow-2xs border border-sky-100/80">
                          <Share2 size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "code" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#f5f3ff] flex items-center justify-center text-violet-600 shadow-2xs border border-violet-100/80">
                          <Code2 size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "plan" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#fff7ed] flex items-center justify-center text-orange-500 shadow-2xs border border-orange-100/80">
                          <PieChart size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "image" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#ecfdf5] flex items-center justify-center text-emerald-500 shadow-2xs border border-emerald-100/80">
                          <ImageIcon size={20} strokeWidth={2.4} />
                        </div>
                      )}

                      {item.iconType === "video" && (
                        <div className="w-11 h-11 rounded-2xl bg-[#fff1f2] flex items-center justify-center text-rose-500 shadow-2xs border border-rose-100/80">
                          <Video size={20} strokeWidth={2.4} />
                        </div>
                      )}
                    </div>

                    {/* Title and Subtitle */}
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-[14px] sm:text-[14.5px] text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 font-normal leading-snug mt-0.5">
                        {item.subtitle}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md ${
                              idx === 0
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Popular Badge + Bookmark + Use Prompt */}
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <div className="flex items-center gap-1">
                      {item.popular && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fff4ea] text-[#f97316]">
                          <span>🔥</span>
                          <span>Popular</span>
                        </span>
                      )}
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`size-11 inline-flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? "text-[#563bfa]"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Save Prompt"}
                      >
                        <Bookmark
                          size={16}
                          className={isBookmarked ? "fill-[#563bfa]" : ""}
                        />
                      </button>
                    </div>

                    <div className="ml-auto flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(item);
                        }}
                        className={`min-h-11 inline-flex items-center gap-1 text-xs font-bold px-2.5 rounded-lg border transition-all cursor-pointer active:scale-95 ${
                          copiedId === item.id
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-[#f8fafc] hover:bg-gray-100 border-gray-200/80 text-gray-700"
                        }`}
                        title="Copy prompt"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={12} className="text-emerald-600" strokeWidth={3} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} className="text-gray-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveModalPrompt(item)}
                        className="min-h-11 inline-flex items-center gap-1 text-xs font-bold px-3 rounded-xl bg-[#f4f0ff] hover:bg-[#563bfa] text-[#563bfa] hover:text-white transition-all cursor-pointer active:scale-98"
                      >
                        <span>Use Prompt</span>
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPrompts.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-2xs">
              <Search size={32} className="mx-auto text-gray-300 mb-2" />
              <h4 className="font-bold text-sm text-gray-800">
                No prompts found
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                Try a different search keyword or category tab.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 px-4 py-2 bg-[#563bfa] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Use Prompt Modal */}
      {activeModalPrompt && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 max-h-full overflow-y-auto overscroll-contain">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 uppercase tracking-wide">
                  {activeModalPrompt.recommendedModel || "Prompt Blueprint"}
                </span>
                <h3 className="font-extrabold text-lg text-gray-900 mt-1 leading-snug">
                  {activeModalPrompt.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activeModalPrompt.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveModalPrompt(null)}
                className="size-11 shrink-0 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
                aria-label="Close prompt"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prompt Code Block */}
            <div className="relative bg-gray-50 rounded-2xl p-4 pt-14 border border-gray-200/90 text-sm font-mono text-gray-800 leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">
              {activeModalPrompt.fullPrompt}

              <button
                onClick={() => handleCopyPrompt(activeModalPrompt)}
                className="absolute top-2.5 right-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                {copiedId === activeModalPrompt.id ? (
                  <>
                    <Check size={14} className="text-emerald-500" strokeWidth={3} />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleCopyPrompt(activeModalPrompt)}
                className="flex-1 py-2.5 px-4 bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                {copiedId === activeModalPrompt.id ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Full Prompt</span>
                  </>
                )}
              </button>

              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                title="Open in ChatGPT"
              >
                <ExternalLink size={14} />
                <span>ChatGPT</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#563bfa]" />
                <h3 className="font-extrabold text-sm text-gray-900">
                  Filter Prompts
                </h3>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
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

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setShowFiltersModal(false);
                  }}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="flex-1 py-2 rounded-xl bg-[#563bfa] text-white font-bold hover:bg-[#472ee0] cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
