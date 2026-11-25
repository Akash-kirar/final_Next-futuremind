"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Play,
  Clock,
  Star,
  BarChart2,
  Check,
  ShieldCheck,
  PlayCircle,
  Award,
  ArrowRight,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquare,
  Edit3,
  Search,
  Layers,
  Briefcase,
  Code,
  TrendingUp,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Wand2,
  Megaphone,
  FileText,
  BookOpen,
  Bot,
  Link2,
  Cpu,
  Copy,
} from "lucide-react";
import { TOOLS_DATABASE, ToolData } from "@/data/toolsData";

// Capability definition for each course type
interface Capability {
  id: string;
  name: string;
  iconName: string;
  bg: string;
  text: string;
  border: string;
  activeBg: string;
  activeText: string;
  spotlight: string;
}

// Course-specific branding & capabilities
interface CourseTypeConfig {
  name: string;
  tagline: string;
  iconBg: string;
  logoType: string;
  capabilities: Capability[];
}

const COURSE_CONFIGS: Record<string, CourseTypeConfig> = {
  chatgpt: {
    name: "ChatGPT",
    tagline: "Your AI assistant for everyday work",
    iconBg: "bg-[#10a37f]",
    logoType: "chatgpt",
    capabilities: [
      {
        id: "chat",
        name: "Chat",
        iconName: "chat",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Conversational dialogue, iterative reasoning, multi-turn brainstorming, and custom persona execution.",
      },
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Automate weekly email roundups, extract action items from meeting notes, and structure projects.",
      },
      {
        id: "writing",
        name: "Writing",
        iconName: "writing",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Craft high-converting ad copy, clear articles, polished client proposals, and persuasive emails.",
      },
      {
        id: "research",
        name: "Research",
        iconName: "research",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Socratic subject breakdown, counter-argument discovery, and rapid synthesis of dense topics.",
      },
    ],
  },
  gemini: {
    name: "Google Gemini",
    tagline: "Your multimodal AI partner powered by Google",
    iconBg: "bg-white border border-gray-100 shadow-xs",
    logoType: "gemini",
    capabilities: [
      {
        id: "research",
        name: "Research",
        iconName: "research",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Real-time Google search grounding with live cited sources, fact-checking, and up-to-date web intelligence.",
      },
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Connect Gemini directly with Gmail, Google Docs, Drive, and Google Sheets for 10x office efficiency.",
      },
      {
        id: "multimodal",
        name: "Multimodal",
        iconName: "multimodal",
        bg: "bg-[#eff6ff]",
        text: "text-[#2563eb]",
        border: "border-[#dbeafe]",
        activeBg: "bg-[#2563eb]",
        activeText: "text-white",
        spotlight:
          "Process high-resolution screenshots, charts, PDFs, and video timestamps in a single prompt.",
      },
      {
        id: "workspace",
        name: "Workspace",
        iconName: "workspace",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Draft Google Slides outlines, calculate Sheets formulas, and clean up team document archives.",
      },
    ],
  },
  claude: {
    name: "Claude",
    tagline: "Nuanced writing, deep research & code artifacts",
    iconBg: "bg-[#cc785c]",
    logoType: "claude",
    capabilities: [
      {
        id: "writing",
        name: "Writing",
        iconName: "writing",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Exceptional prose with natural cadence, zero AI clichés, and unmatched tone sensitivity.",
      },
      {
        id: "research",
        name: "Research",
        iconName: "research",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Ingest 200,000+ token context windows to analyze books, quarterly reports, and legal agreements.",
      },
      {
        id: "coding",
        name: "Coding",
        iconName: "coding",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Interactive Claude Artifacts: preview live React components, SVG diagrams, and web apps side-by-side.",
      },
      {
        id: "analysis",
        name: "Analysis",
        iconName: "analysis",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Deep logic auditing, financial data synthesis, and technical architecture reviews.",
      },
    ],
  },
  midjourney: {
    name: "Midjourney",
    tagline: "Photorealistic AI art generation & visual design",
    iconBg: "bg-[#0f172a]",
    logoType: "midjourney",
    capabilities: [
      {
        id: "design",
        name: "Design",
        iconName: "design",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Generate professional UI/UX concepts, product packaging mockups, and corporate brand boards.",
      },
      {
        id: "creativity",
        name: "Creativity",
        iconName: "creativity",
        bg: "bg-[#fff1f2]",
        text: "text-[#e11d48]",
        border: "border-[#ffe4e6]",
        activeBg: "bg-[#e11d48]",
        activeText: "text-white",
        spotlight:
          "Explore surreal digital art, editorial fashion photography, and sci-fi architectural renders.",
      },
      {
        id: "art",
        name: "Art",
        iconName: "art",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Emulate realistic cinematic camera lenses (35mm, 85mm f/1.4, Kodak Portra) and lighting dynamics.",
      },
      {
        id: "prompts",
        name: "Prompts",
        iconName: "prompts",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Master parameters: `--ar 16:9`, `--v 6.1`, `--stylize`, `--chaos`, and `--cref` character consistency.",
      },
    ],
  },
  canva: {
    name: "Canva AI",
    tagline: "Effortless visual design, presentations & branding",
    iconBg: "bg-gradient-to-br from-[#7d2ae8] to-[#00c4cc]",
    logoType: "canva",
    capabilities: [
      {
        id: "design",
        name: "Design",
        iconName: "design",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Magic Design: Turn a text prompt or uploaded photo into dozens of branded marketing graphics.",
      },
      {
        id: "marketing",
        name: "Marketing",
        iconName: "marketing",
        bg: "bg-[#fff1f2]",
        text: "text-[#e11d48]",
        border: "border-[#ffe4e6]",
        activeBg: "bg-[#e11d48]",
        activeText: "text-white",
        spotlight:
          "High-converting Instagram carousel slides, YouTube video thumbnails, and Facebook ad creatives.",
      },
      {
        id: "content",
        name: "Content",
        iconName: "content",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Magic Write drafts full pitch decks, promotional flyers, and corporate newsletters in seconds.",
      },
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Magic Switch auto-resizes single assets into multi-platform formats (Story, Post, Banner) instantly.",
      },
    ],
  },
  notion: {
    name: "Notion AI",
    tagline: "Connected workspace, smart docs & team knowledge base",
    iconBg: "bg-white border-2 border-gray-200",
    logoType: "notion",
    capabilities: [
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Auto-populate project database properties, generate sprint summaries, and assign action items.",
      },
      {
        id: "notes",
        name: "Notes",
        iconName: "notes",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Convert unformatted meeting notes and transcripts into clean executive summaries with deliverables.",
      },
      {
        id: "knowledge",
        name: "Knowledge",
        iconName: "knowledge",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Instant Q&A across your entire workspace wiki — find any company policy or document in seconds.",
      },
      {
        id: "writing",
        name: "Writing",
        iconName: "writing",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Draft product requirements, employee onboarding guides, and standard operating procedures.",
      },
    ],
  },
  perplexity: {
    name: "Perplexity AI",
    tagline: "Where knowledge begins — AI search with cited sources",
    iconBg: "bg-[#20808D]",
    logoType: "perplexity",
    capabilities: [
      {
        id: "search",
        name: "Search",
        iconName: "search",
        bg: "bg-[#ecfeff]",
        text: "text-[#0891b2]",
        border: "border-[#cffafe]",
        activeBg: "bg-[#0891b2]",
        activeText: "text-white",
        spotlight:
          "Conversational search engine answering complex queries with direct footnote citations.",
      },
      {
        id: "research",
        name: "Research",
        iconName: "research",
        bg: "bg-[#fffbeb]",
        text: "text-[#d97706]",
        border: "border-[#fef3c7]",
        activeBg: "bg-[#d97706]",
        activeText: "text-white",
        spotlight:
          "Pro Search multi-step reasoning: asks clarifying follow-ups and reads dozens of academic papers.",
      },
      {
        id: "analysis",
        name: "Analysis",
        iconName: "analysis",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Synthesize conflicting market data, compare competitors, and extract verified statistics.",
      },
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Perplexity Pages: turn research threads into shareable, beautifully formatted web guides.",
      },
    ],
  },
  zapier: {
    name: "Zapier AI",
    tagline: "No-code workflow automation powered by AI copilots",
    iconBg: "bg-[#ff4a00]",
    logoType: "zapier",
    capabilities: [
      {
        id: "automation",
        name: "Automation",
        iconName: "automation",
        bg: "bg-[#fff7ed]",
        text: "text-[#ea580c]",
        border: "border-[#ffedd5]",
        activeBg: "bg-[#ea580c]",
        activeText: "text-white",
        spotlight:
          "AI Copilot: describe any multi-app automation in plain English and Zapier builds the Zap.",
      },
      {
        id: "productivity",
        name: "Productivity",
        iconName: "productivity",
        bg: "bg-[#eff2ff]",
        text: "text-[#4f46e5]",
        border: "border-[#e0e7ff]",
        activeBg: "bg-[#4f46e5]",
        activeText: "text-white",
        spotlight:
          "Automate repetitive data sync between CRM, email newsletters, spreadsheets, and Slack.",
      },
      {
        id: "integrations",
        name: "Integrations",
        iconName: "integrations",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ede9fe]",
        activeBg: "bg-[#7c3aed]",
        activeText: "text-white",
        spotlight:
          "Connect OpenAI, Claude, Google Workspace, Airtable, and 6,000+ business tools seamlessly.",
      },
      {
        id: "workflow",
        name: "Workflow",
        iconName: "workflow",
        bg: "bg-[#ecfdf5]",
        text: "text-[#059669]",
        border: "border-[#d1fae5]",
        activeBg: "bg-[#059669]",
        activeText: "text-white",
        spotlight:
          "Intelligent data formatting, conditional branch routing, and automatic error alerts.",
      },
    ],
  },
};

// Render icons for capability pills
function renderCapabilityIcon(iconName: string, size = 14) {
  switch (iconName) {
    case "chat":
      return <MessageSquare size={size} />;
    case "productivity":
      return <BarChart2 size={size} />;
    case "writing":
      return <Edit3 size={size} />;
    case "research":
      return <Search size={size} />;
    case "multimodal":
      return <Layers size={size} />;
    case "workspace":
      return <Briefcase size={size} />;
    case "coding":
      return <Code size={size} />;
    case "analysis":
      return <TrendingUp size={size} />;
    case "design":
      return <Palette size={size} />;
    case "creativity":
      return <Sparkles size={size} />;
    case "art":
      return <ImageIcon size={size} />;
    case "prompts":
      return <Wand2 size={size} />;
    case "marketing":
      return <Megaphone size={size} />;
    case "content":
      return <FileText size={size} />;
    case "notes":
      return <BookOpen size={size} />;
    case "knowledge":
      return <Brain size={size} />;
    case "search":
      return <Search size={size} />;
    case "automation":
      return <Bot size={size} />;
    case "integrations":
      return <Link2 size={size} />;
    case "workflow":
      return <Cpu size={size} />;
    default:
      return <Sparkles size={size} />;
  }
}

// Large authentic app logo matching Image 3
function LargeAppLogo({ logoType }: { logoType: string }) {
  switch (logoType) {
    case "chatgpt":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.67 5.999a4.4755 4.4755 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.6562 9.5378V7.2054a.0804.0804 0 0 1 .0332-.0615L14.53 4.0538a4.4992 4.4992 0 0 1 6.14 1.9452zm-8.835-2.0003a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V7.493a4.504 4.504 0 0 1 4.4945-4.4943zm.8893 7.8488 2.6105 1.5065-2.6105 1.5065-2.6105-1.5065z" />
        </svg>
      );
    case "gemini":
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 24 24">
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
          className="w-14 h-14 sm:w-16 sm:h-16 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
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
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 text-white"
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
            fillOpacity="0.2"
          />
          <path d="M12 3v13" />
          <path
            d="M12 4c3 3 5 7 5 11h-5V4z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <path d="M11 7c-2 2-4 5-4 8h4V7z" />
        </svg>
      );
    case "canva":
      return (
        <span className="text-4xl sm:text-5xl font-black text-white italic font-serif select-none">
          C
        </span>
      );
    case "notion":
      return (
        <span className="font-black text-4xl sm:text-5xl text-gray-900 tracking-tighter font-serif select-none">
          N
        </span>
      );
    case "perplexity":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2a1 1 0 0 1 1 1v4.06l3.54-3.54a1 1 0 1 1 1.41 1.41L14.41 8.5H19a1 1 0 1 1 0 2h-4.59l3.54 3.54a1 1 0 0 1-1.41 1.41L13 11.91V16a1 1 0 1 1-2 0v-4.09l-3.54 3.54a1 1 0 0 1-1.41-1.41L9.59 10.5H5a1 1 0 1 1 0-2h4.59L6.05 4.96a1 1 0 1 1 1.41-1.41L11 7.09V3a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "zapier":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-3 0V4a1.5 1.5 0 0 1 1.5-1.5zM12 16a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-3 0v-4A1.5 1.5 0 0 1 12 16zM3.77 7.27a1.5 1.5 0 0 1 2.12 0l2.83 2.83a1.5 1.5 0 0 1-2.12 2.12L3.77 9.39a1.5 1.5 0 0 1 0-2.12zm11.56 7.78a1.5 1.5 0 0 1 2.12 0l2.83 2.83a1.5 1.5 0 0 1-2.12 2.12l-2.83-2.83a1.5 1.5 0 0 1 0-2.12zM2.5 12a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 12zm13.5 0a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 0 3h-4A1.5 1.5 0 0 1 16 12z" />
        </svg>
      );
    default:
      return <Sparkles className="w-12 h-12 text-violet-600" />;
  }
}

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? rawSlug.toLowerCase() : "chatgpt";

  const tool: ToolData = TOOLS_DATABASE[slug] || TOOLS_DATABASE["chatgpt"];
  const courseConfig: CourseTypeConfig =
    COURSE_CONFIGS[slug] || {
      name: tool.name,
      tagline: tool.tagline,
      iconBg: tool.iconBg || "bg-[#10a37f]",
      logoType: tool.iconType || "chatgpt",
      capabilities: [
        {
          id: "productivity",
          name: "Productivity",
          iconName: "productivity",
          bg: "bg-[#f5f3ff]",
          text: "text-[#7c3aed]",
          border: "border-[#ede9fe]",
          activeBg: "bg-[#7c3aed]",
          activeText: "text-white",
          spotlight: "Master automated tasks and workplace productivity workflows.",
        },
        {
          id: "writing",
          name: "Writing",
          iconName: "writing",
          bg: "bg-[#ecfdf5]",
          text: "text-[#059669]",
          border: "border-[#d1fae5]",
          activeBg: "bg-[#059669]",
          activeText: "text-white",
          spotlight: "Draft polished articles, documentation, and client messages.",
        },
        {
          id: "research",
          name: "Research",
          iconName: "research",
          bg: "bg-[#fffbeb]",
          text: "text-[#d97706]",
          border: "border-[#fef3c7]",
          activeBg: "bg-[#d97706]",
          activeText: "text-white",
          spotlight: "Conduct in-depth research and extract verified key insights.",
        },
      ],
    };

  // State
  const [activeTab, setActiveTab] = useState<
    "Overview" | "Tutorials" | "Prompts" | "Use Cases" | "FAQs"
  >("Overview");
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem("nfm_saved_courses");
      if (saved) {
        const list = JSON.parse(saved);
        return Array.isArray(list) && list.includes(slug);
      }
    } catch {
      return false;
    }
    return false;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Tabs matching Image 3
  const tabs: ("Overview" | "Tutorials" | "Prompts" | "Use Cases" | "FAQs")[] = [
    "Overview",
    "Tutorials",
    "Prompts",
    "Use Cases",
    "FAQs",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = () => {
    try {
      const saved = localStorage.getItem("nfm_saved_courses") || localStorage.getItem("nfm_saved_tools");
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(list)) list = [];

      if (isFavorite) {
        list = list.filter((s) => s !== slug);
        setIsFavorite(false);
        showToast("Course removed from saved");
      } else {
        if (!list.includes(slug)) list.push(slug);
        setIsFavorite(true);
        showToast("Course saved to your library! 🔖");
      }
      localStorage.setItem("nfm_saved_courses", JSON.stringify(list));
      localStorage.setItem("nfm_saved_tools", JSON.stringify(list));
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `${courseConfig.name} Course — NextFutureMind`,
          text: `Learn how to use ${courseConfig.name} effectively. Real-world examples, hands-on projects, and lifetime access.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Course link copied to clipboard!");
    }
  };

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    showToast("Prompt copied to clipboard!");
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleToggleCapability = (capId: string) => {
    if (activeCapability === capId) {
      setActiveCapability(null);
    } else {
      setActiveCapability(capId);
    }
  };

  const activeCapabilityData = courseConfig.capabilities.find(
    (c) => c.id === activeCapability
  );

  // Filtered prompts
  const filteredPrompts = activeCapability
    ? tool.prompts.filter(
        (p) =>
          p.category.toLowerCase().includes(activeCapability.toLowerCase()) ||
          p.title.toLowerCase().includes(activeCapability.toLowerCase()) ||
          p.prompt.toLowerCase().includes(activeCapability.toLowerCase())
      )
    : tool.prompts;

  // Filtered tutorials
  const filteredTutorials = activeCapability
    ? tool.tutorials.filter(
        (t) =>
          t.title.toLowerCase().includes(activeCapability.toLowerCase()) ||
          t.level.toLowerCase().includes(activeCapability.toLowerCase())
      )
    : tool.tutorials;

  const whatYoullLearnItems = [
    `Use ${courseConfig.name} like a pro`,
    "Create high-quality prompts",
    "Real-world use cases (study, work, business)",
    "Hands-on projects and templates",
  ];

  // Thumbnail image: using course hero or fallback
  const heroImageSrc =
    slug === "chatgpt"
      ? "/chatgpt_course_hero.jpg"
      : tool.video.thumbnail || "/chatgpt_course_hero.jpg";

  return (
    <div className="min-h-screen bg-[#fcfdff] pb-6 md:pb-16 selection:bg-violet-100 selection:text-violet-900 pt-2">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP IDENTITY HERO SECTION (App Icon, Title, Subtitle, Capability Pills) */}
      <section className="bg-white border-b border-gray-100 pt-3 pb-3 px-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-1 px-1">
          <button
            id="course-back-btn"
            onClick={() => router.back()}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-gray-100 active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
            <span>Back</span>
          </button>

          <button
            id="course-share-btn"
            onClick={handleShare}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-gray-100 active:scale-95"
            aria-label="Share Course"
            title="Share Course"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Authentic App Logo (Green squircle for ChatGPT, Google for Gemini, etc.) */}
          <div
            className={`size-20 sm:size-24 ${courseConfig.iconBg} rounded-[28px] sm:rounded-[32px] shadow-[0_12px_28px_rgba(0,0,0,0.08)] flex items-center justify-center mb-3.5 transition-transform hover:scale-105 select-none`}
          >
            <LargeAppLogo logoType={courseConfig.logoType} />
          </div>

          {/* Tool / Course Title */}
          <h1 className="text-2xl sm:text-[30px] font-black text-gray-900 tracking-tight leading-tight">
            {courseConfig.name}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm text-gray-500 font-normal mt-1 max-w-sm">
            {courseConfig.tagline}
          </p>

          {/* Capability Pills according to Course Type (Chat, Productivity, Writing, Research, etc.) */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap max-w-md">
            {courseConfig.capabilities.map((cap) => {
              const isSelected = activeCapability === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleToggleCapability(cap.id)}
                  className={`flex min-h-11 items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? `${cap.activeBg} ${cap.activeText} ring-2 ring-violet-400 ring-offset-1 shadow-xs scale-105`
                      : `${cap.bg} ${cap.text} ${cap.border} hover:opacity-90`
                  }`}
                >
                  {renderCapabilityIcon(cap.iconName, 13)}
                  <span>{cap.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Capability Spotlight (if a pill is activated) */}
          {activeCapabilityData && (
            <div className="mt-3.5 w-full bg-violet-50/80 border border-violet-100/90 rounded-2xl p-3 flex items-start gap-2.5 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="w-6 h-6 rounded-lg bg-[#563bfa] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                {renderCapabilityIcon(activeCapabilityData.iconName, 13)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-950">
                    {courseConfig.name} for {activeCapabilityData.name}
                  </span>
                  <button
                    onClick={() => setActiveCapability(null)}
                    className="text-[10px] text-violet-600 hover:text-violet-900 font-bold cursor-pointer"
                  >
                    Clear filter
                  </button>
                </div>
                <p className="text-[11px] text-violet-700/90 leading-tight mt-0.5">
                  {activeCapabilityData.spotlight}
                </p>
              </div>
            </div>
          )}

          {/* 3. TABS ROW (Matching Image 3: Overview | Tutorials | Prompts | Use Cases | FAQs) */}
          <div className="flex w-full items-center justify-between overflow-x-auto border-b border-gray-100 mt-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-11 shrink-0 flex-1 whitespace-nowrap px-1.5 sm:px-3 text-center text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
                    isActive
                      ? "text-[#563bfa]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#563bfa] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT AREA ACCORDING TO ACTIVE TAB */}
      <section className={`mx-auto px-4 sm:px-6 pt-4 ${activeTab === "Overview" ? "max-w-6xl" : "max-w-3xl"}`}>
        {/* TAB 1: OVERVIEW (Features Image 1 & 2 Video Preview & Course Details) */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-6 animate-in fade-in duration-200">
            <div className="grid min-w-0 gap-4">
              {/* Top Video Preview Player Hero (From Image 1 & 2) */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-gray-900 rounded-3xl overflow-hidden select-none shadow-md border border-gray-200">
                {/* Hero Thumbnail Image */}
                <Image
                  src={heroImageSrc}
                  alt={`${courseConfig.name} Course Hero`}
                  sizes="(min-width: 1152px) 650px, (min-width: 1024px) 58vw, 100vw"
                  fill
                  priority
                  className="object-cover object-top"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

                {/* Left Handwritten Script: "Learn Practice Apply Grow" */}
                <div className="absolute top-4 left-4 text-left font-handwriting text-white text-[15px] sm:text-[17px] font-bold leading-[1.15] -rotate-3 select-none pointer-events-none drop-shadow-md z-10">
                  <div>Learn</div>
                  <div>Practice</div>
                  <div>Apply</div>
                  <div className="relative inline-block">
                    Grow
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#8b5cf6] rounded-full opacity-85" />
                  </div>
                </div>

                {/* Right Handwritten Script: "A Smarter You Tomorrow 🤍" */}
                <div className="absolute top-4 right-4 text-right font-handwriting text-white text-[15px] sm:text-[17px] font-bold leading-[1.15] rotate-2 select-none pointer-events-none drop-shadow-md z-10">
                  <div>A</div>
                  <div>Smarter</div>
                  <div>You</div>
                  <div>Tomorrow</div>
                  <div className="text-xs mt-0.5 text-right">🤍</div>
                </div>

                {/* Center Circular Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-gray-900 hover:scale-108 active:scale-95 transition-all cursor-pointer group"
                    aria-label="Play Course Video Preview"
                  >
                    <Play size={22} className="fill-gray-900 ml-1 text-gray-900" />
                  </button>
                </div>

                {/* Bottom Left: Preview Pill Button */}
                <div className="absolute bottom-4 left-4 z-20">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="bg-white/90 hover:bg-white backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <Play size={11} className="fill-gray-900" />
                    <span>Preview</span>
                  </button>
                </div>

                {/* Bottom Right: Duration Badge */}
                <div className="absolute bottom-4 right-4 z-20">
                  <span className="bg-black/75 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    02:38
                  </span>
                </div>
              </div>

              {/* Course Card Summary */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-[20px] sm:text-[23px] font-black text-gray-900 tracking-tight leading-tight">
                      {courseConfig.name} Complete Course{" "}
                      <span className="text-[#563bfa] block sm:inline">
                        (Beginner to Advanced)
                      </span>
                    </h2>

                    <p className="text-[12px] sm:text-[13px] text-gray-500 font-normal leading-relaxed mt-2">
                      Learn how to use {courseConfig.name} effectively for work,
                      study, and creativity. Real-world examples, hands-on projects,
                      and lifetime access.
                    </p>
                  </div>

                  {/* Right-Side Small Save Course Button / Icon */}
                  <button
                    id="course-save-icon-btn"
                    onClick={handleToggleFavorite}
                    className={`hidden shrink-0 sm:flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-2xl border transition-all cursor-pointer active:scale-95 ${
                      isFavorite
                        ? "bg-violet-50 border-violet-200 text-violet-700 shadow-xs"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200/80 text-gray-600 hover:text-gray-900"
                    }`}
                    title={isFavorite ? "Course Saved in Library" : "Save Course"}
                    aria-label={isFavorite ? "Course Saved in Library" : "Save Course"}
                  >
                    <Bookmark
                      size={18}
                      strokeWidth={2.2}
                      className={
                        isFavorite
                          ? "fill-violet-600 text-violet-600 scale-105"
                          : "text-gray-600"
                      }
                    />
                    <span className="text-xs font-bold hidden sm:inline ml-1.5">
                      {isFavorite ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                {/* Meta & Stats Row (Rating, Beginner badge, 12 hours, Save pill) */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span className="font-black text-[13.5px] text-gray-900">4.9</span>
                      <span className="text-[11.5px] text-gray-400 font-medium">
                        (12,432 learners)
                      </span>
                    </div>

                    {/* Beginner pill */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                      <BarChart2 size={12} strokeWidth={2.5} />
                      <span>Beginner</span>
                    </span>

                    {/* 12 hours pill */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11.5px] font-bold bg-[#eef2ff] text-[#4f46e5]">
                      <Clock size={12} strokeWidth={2.5} />
                      <span>12 hours</span>
                    </span>
                  </div>

                  {/* Right side save status pill for mobile / compact layout */}
                  <button
                    id="course-save-pill-btn"
                    onClick={handleToggleFavorite}
                    className={`inline-flex min-h-11 items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-bold transition-all cursor-pointer active:scale-95 border sm:hidden ${
                      isFavorite
                        ? "bg-violet-100/80 border-violet-300 text-violet-700"
                        : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700"
                    }`}
                    aria-label="Save Course"
                  >
                    <Bookmark
                      size={12}
                      className={isFavorite ? "fill-violet-600 text-violet-600" : "text-gray-600"}
                    />
                    <span>{isFavorite ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid min-w-0 gap-4">
              {/* What You'll Learn Checklist (From Image 1 & 2) */}
              <div className="bg-[#f8f9fc] rounded-3xl p-4 sm:p-5 border border-gray-100">
                <h3 className="text-[16px] sm:text-[17px] font-black text-gray-900 mb-3.5 tracking-tight">
                  What You&apos;ll Learn
                </h3>

                <div className="flex flex-col gap-3">
                  {whatYoullLearnItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#563bfa] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <Check size={12} strokeWidth={3.2} />
                      </div>
                      <span className="text-[13px] sm:text-[13.5px] font-medium text-gray-800 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Enrollment Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-3.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[28px] sm:text-[32px] font-black text-gray-900 leading-none tracking-tight">
                    ₹499
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-400 line-through">
                    ₹1,499
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ef4444] text-white text-[11px] font-black tracking-wide uppercase shadow-2xs">
                    67% OFF
                  </span>
                </div>

                <button
                  id="course-enroll-now-btn"
                  onClick={() => setEnrollModalOpen(true)}
                  className="w-full bg-[#563bfa] hover:bg-[#472ee0] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-indigo-200 cursor-pointer active:scale-99 transition-all"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </button>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-[11px] sm:text-[11.5px] pt-1 px-0.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#563bfa]" strokeWidth={2.2} />
                    <span className="font-medium text-gray-700">Lifetime access</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <PlayCircle size={14} className="text-[#563bfa]" strokeWidth={2.2} />
                    <span className="font-medium text-gray-700">Learn at your pace</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-[#563bfa]" strokeWidth={2.2} />
                    <span className="font-medium text-gray-700">Certificate included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TUTORIALS / CURRICULUM */}
        {activeTab === "Tutorials" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-bold text-gray-700">
                {filteredTutorials.length} Lessons Available
                {activeCapabilityData && ` • Filtered by ${activeCapabilityData.name}`}
              </span>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="text-xs font-bold text-[#563bfa] hover:underline cursor-pointer"
              >
                Play Trailer
              </button>
            </div>

            {filteredTutorials.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => setVideoModalOpen(true)}
                className="bg-white hover:bg-violet-50/40 p-3.5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between gap-3 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-violet-50 text-[#563bfa] flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-[#563bfa] group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13.5px] font-bold text-gray-900 leading-snug group-hover:text-[#563bfa] transition-colors">
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      <span className="font-medium text-emerald-600">{lesson.level}</span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-[#563bfa] group-hover:text-white transition-colors flex-shrink-0">
                  <Play size={13} className="fill-current ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROMPTS */}
        {activeTab === "Prompts" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-bold text-gray-700">
                Ready-to-use {courseConfig.name} Prompts ({filteredPrompts.length})
              </span>
              {activeCapability && (
                <button
                  onClick={() => setActiveCapability(null)}
                  className="text-xs font-bold text-[#563bfa] hover:underline cursor-pointer"
                >
                  Show All Prompts
                </button>
              )}
            </div>

            {filteredPrompts.map((p, idx) => {
              const isCopied = copiedPromptId === `p-${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Wand2 size={13} className="text-[#563bfa]" />
                      {p.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-[#563bfa]">
                      {p.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-mono bg-gray-50/80 p-3 rounded-xl border border-gray-100/80 leading-relaxed select-all">
                    {p.prompt}
                  </p>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleCopyPrompt(p.prompt, `p-${idx}`)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-gray-100 hover:bg-violet-50 hover:text-[#563bfa] text-gray-700"
                      }`}
                    >
                      {isCopied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} />}
                      <span>{isCopied ? "Copied!" : "Copy Prompt"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: USE CASES */}
        {activeTab === "Use Cases" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            {tool.useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 text-[#563bfa] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900">
                    {uc.role}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-8">
                  {uc.scenario}
                </p>
                <div className="pl-8 pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 size={13} />
                  <span>Benefit: {uc.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === "FAQs" && (
          <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
            {tool.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span className="text-xs sm:text-[13px] font-bold text-gray-900">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={15} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-2 bg-gray-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Video Interactive Preview Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-gray-950 text-white rounded-3xl max-w-lg w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl relative animate-in zoom-in-95 duration-200 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white/90">
                  {courseConfig.name} Course Trailer
                </span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close preview"
                className="flex size-11 items-center justify-center text-white/60 hover:text-white rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <Image
                src={heroImageSrc}
                alt={`${courseConfig.name} Preview`}
                sizes="(min-width: 544px) 512px, 100vw"
                fill
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#563bfa] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/50 hover:scale-105 transition-transform cursor-pointer">
                  <Play size={24} className="fill-white ml-1" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  Preview: Getting Started with {courseConfig.name}
                </h4>
                <p className="text-xs text-white/70">
                  Duration: 02:38 • High-Definition Stream
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Full course has 12 hours of lessons</span>
              </div>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  setEnrollModalOpen(true);
                }}
                className="bg-[#563bfa] hover:bg-[#472ee0] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all"
              >
                Enroll Now (₹499)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Checkout / Confirmation Modal */}
      {enrollModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setEnrollModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#563bfa]/10 flex items-center justify-center text-[#563bfa]">
                <Award size={26} strokeWidth={2.2} />
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                aria-label="Close enrollment"
                className="size-11 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Enroll in {courseConfig.name} Course
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Unlock lifetime access, interactive templates, and certification.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/90 flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Standard Tuition</span>
                <span className="line-through">₹1,499</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Special Promotion Discount</span>
                <span>-₹1,000 (67% OFF)</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-sm text-gray-900">
                <span>Total Amount</span>
                <span className="text-[#563bfa]">₹499</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                <span>Instant access to all video modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                <span>Downloadable prompt libraries & templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                <span>Verified completion certificate included</span>
              </div>
            </div>

            <button
              onClick={() => {
                setEnrollModalOpen(false);
                setActiveTab("Tutorials");
              }}
              className="w-full py-3.5 bg-[#563bfa] hover:bg-[#472ee0] text-white font-bold rounded-2xl shadow-md shadow-indigo-200 text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Confirm Enrollment & Start</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
