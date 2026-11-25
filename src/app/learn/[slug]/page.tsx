"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  Pencil,
  Image as ImageIcon,
  Briefcase,
  Play,
  Clock,
  Trophy,
  CheckCircle2,
  X,
  Sparkles,
  Share2,
  Download,
  Award,
  Check,
} from "lucide-react";

// Step structure for learning roadmap
interface LearningStep {
  id: number;
  stepNumber: number;
  title: string;
  subtitle: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessonsCount: number;
  duration: string;
  iconType: "sprout" | "brand" | "pencil" | "image" | "briefcase";
  circleBg: string;
  circleText: string;
  iconBg: string;
  iconColor: string;
  summary: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    description: string;
  }[];
}

interface CourseConfig {
  slug: string;
  name: string;
  tagline: string;
  brandColor: string;
  brandBg: string;
  steps: LearningStep[];
}

// Data customized for different courses
const COURSE_PATHS: Record<string, CourseConfig> = {
  chatgpt: {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Structured learning paths to help you go from beginner to pro.",
    brandColor: "#0d9488",
    brandBg: "bg-[#e6fbf9]",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "AI Fundamentals",
        subtitle: "Start your AI journey",
        level: "Beginner",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "sprout",
        circleBg: "bg-[#dcfce7]",
        circleText: "text-[#16a34a]",
        iconBg: "bg-[#e8fbf0]",
        iconColor: "text-[#16a34a]",
        summary: "Understand how large language models work, core terminology, and mental models for collaborating with AI.",
        lessons: [
          { id: "1-1", title: "What is Generative AI & How LLMs Work", duration: "10 min", description: "Foundational concepts behind transformer models, training data, and token prediction." },
          { id: "1-2", title: "The Anatomy of a Great Prompt", duration: "12 min", description: "Context, task definition, constraints, and format guidance." },
          { id: "1-3", title: "Zero-Shot vs. Few-Shot Prompting", duration: "8 min", description: "Giving real examples to produce tailored outputs reliably." },
          { id: "1-4", title: "Avoiding Hallucinations & Verifying Facts", duration: "10 min", description: "Techniques to anchor AI responses in factual reality." },
          { id: "1-5", title: "Temperature, System Roles & Parameters", duration: "10 min", description: "Configuring how conservative or creative model outputs should be." },
          { id: "1-6", title: "AI Ethics, Privacy & Responsible Usage", duration: "10 min", description: "Safeguarding company data and personal privacy when using public models." },
        ],
      },
      {
        id: 2,
        stepNumber: 2,
        title: "ChatGPT for Productivity",
        subtitle: "Work smarter with AI",
        level: "Beginner",
        lessonsCount: 8,
        duration: "1.5 hours",
        iconType: "brand",
        circleBg: "bg-[#dbeafe]",
        circleText: "text-[#2563eb]",
        iconBg: "bg-[#e6fbf9]",
        iconColor: "text-[#0d9488]",
        summary: "Transform daily workflow bottlenecks—email drafts, executive summaries, meeting notes, and research.",
        lessons: [
          { id: "2-1", title: "Mastering Custom Instructions & Memory", duration: "11 min", description: "Teach ChatGPT who you are and how you prefer your outputs formatted permanently." },
          { id: "2-2", title: "Inbox Zero: Drafting Flawless Client Emails", duration: "12 min", description: "Turn bullet points into professional, courteous responses instantly." },
          { id: "2-3", title: "Rapid Document & Report Summarization", duration: "14 min", description: "Extract action items, risks, and executive synopses from 50+ page PDFs." },
          { id: "2-4", title: "Data Analysis & Chart Generation with Code Interpreter", duration: "15 min", description: "Upload raw spreadsheets to find trends, outliers, and generate interactive graphs." },
          { id: "2-5", title: "Meeting Transcript Transformation", duration: "10 min", description: "Convert messy Zoom transcripts into clean meeting minutes and task assignees." },
          { id: "2-6", title: "Brainstorming & Strategic Decision Frameworks", duration: "12 min", description: "Simulate stakeholder objections, SWOT matrices, and product roadmaps." },
          { id: "2-7", title: "Voice Mode: Hands-Free AI Brainstorming", duration: "8 min", description: "Use conversational audio on mobile for rapid ideation on the go." },
          { id: "2-8", title: "Creating Custom GPTs for Recurring Tasks", duration: "18 min", description: "Build your own specialized assistant loaded with your custom knowledge base." },
        ],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "AI Tools for Content Creation",
        subtitle: "Create amazing content",
        level: "Intermediate",
        lessonsCount: 7,
        duration: "1.5 hours",
        iconType: "pencil",
        circleBg: "bg-[#ffedd5]",
        circleText: "text-[#ea580c]",
        iconBg: "bg-[#fff7ed]",
        iconColor: "text-[#ea580c]",
        summary: "Craft compelling marketing copy, high-converting social threads, blog posts, and multimedia scripts.",
        lessons: [
          { id: "3-1", title: "Finding Your Unique Brand Tone & Voice", duration: "12 min", description: "Calibrate AI to match your exact writing cadence, vocabulary, and rhythm." },
          { id: "3-2", title: "High-Retention Hook & Headline Writing", duration: "14 min", description: "Generate 50 scroll-stopping variations in 60 seconds." },
          { id: "3-3", title: "SEO Long-Form Article Architecture", duration: "18 min", description: "Structuring outlines, search intent coverage, and organic keyword integration." },
          { id: "3-4", title: "Multi-Platform Content Repurposing", duration: "15 min", description: "Convert 1 podcast or video into 5 tweets, 2 LinkedIn posts, and a newsletter." },
          { id: "3-5", title: "Storytelling Frameworks (Hero's Journey, PAS, AIDA)", duration: "12 min", description: "Apply time-tested narrative formulas for marketing campaigns." },
          { id: "3-6", title: "YouTube & Podcast Scriptwriting", duration: "11 min", description: "Draft natural conversational scripts with visual cue markers." },
          { id: "3-7", title: "Editing & Humanizing AI-Generated Drafts", duration: "10 min", description: "Eliminate repetitive AI cliches to achieve authentic personal polish." },
        ],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "AI for Design & Creativity",
        subtitle: "Images, videos and more",
        level: "Intermediate",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "image",
        circleBg: "bg-[#ede9fe]",
        circleText: "text-[#7c3aed]",
        iconBg: "bg-[#f5f3ff]",
        iconColor: "text-[#7c3aed]",
        summary: "Leverage DALL-E 3, visual reasoning, diagram generation, and multi-modal creative generation.",
        lessons: [
          { id: "4-1", title: "Visual Prompt Engineering with DALL-E 3", duration: "12 min", description: "Lighting, artistic styles, aspect ratios, and photographic framing." },
          { id: "4-2", title: "Creating Consistent Characters & Brand Assets", duration: "14 min", description: "Maintain visual cohesion across a complete marketing deck or storybook." },
          { id: "4-3", title: "Visual Reasoning: Critiquing UI/UX Mockups", duration: "10 min", description: "Upload screenshots to receive instant accessibility and layout critiques." },
          { id: "4-4", title: "Generating Vector Infographics & Diagrams", duration: "11 min", description: "Combine prompt logic with SVG code generation for crisp vector graphics." },
          { id: "4-5", title: "Moodboards, Color Palettes & Packaging Concepts", duration: "8 min", description: "Rapid product ideation and packaging prototyping." },
          { id: "4-6", title: "Creative Block Busting: The Lateral Thinking Engine", duration: "10 min", description: "Unconventional brainstorming prompts when stuck on a creative brief." },
        ],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Real-World Projects",
        subtitle: "Build and apply your skills",
        level: "Advanced",
        lessonsCount: 8,
        duration: "2 hours",
        iconType: "briefcase",
        circleBg: "bg-[#fce7f3]",
        circleText: "text-[#db2777]",
        iconBg: "bg-[#fdf2f8]",
        iconColor: "text-[#db2777]",
        summary: "Put everything together by building functional client deliverables, automated systems, and portfolio showcases.",
        lessons: [
          { id: "5-1", title: "Project 1: The Automated Daily Briefing Assistant", duration: "18 min", description: "Set up a recurring workflow summarizing your industry news every morning." },
          { id: "5-2", title: "Project 2: End-to-End Product Launch Campaign", duration: "20 min", description: "Produce a landing page copy, email sequence, and social teaser assets." },
          { id: "5-3", title: "Project 3: Interactive Customer Support Knowledge Bot", duration: "22 min", description: "Configure a Custom GPT with your FAQ documents and refund policies." },
          { id: "5-4", title: "Project 4: Competitive Intelligence Deep Dive", duration: "15 min", description: "Benchmark competitor pricing and feature matrices from public materials." },
          { id: "5-5", title: "Project 5: Automated Financial Model & Forecast", duration: "16 min", description: "Use Python Code Interpreter to run sensitivity tables on sample revenue streams." },
          { id: "5-6", title: "Project 6: Code Refactoring & Micro-App Prototyping", duration: "18 min", description: "Build a functioning web utility prototype from natural language specifications." },
          { id: "5-7", title: "Project 7: Executive Slide Deck Generator", duration: "14 min", description: "From raw data to structured 10-slide keynote narrative." },
          { id: "5-8", title: "Final Assessment & Capstone Submission", duration: "15 min", description: "Submit your final capstone project to unlock your verified certificate." },
        ],
      },
    ],
  },
  gemini: {
    slug: "gemini",
    name: "Google Gemini",
    tagline: "Structured learning paths to help you go from beginner to pro.",
    brandColor: "#4285F4",
    brandBg: "bg-[#eef2ff]",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "AI Fundamentals",
        subtitle: "Start your AI journey",
        level: "Beginner",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "sprout",
        circleBg: "bg-[#dcfce7]",
        circleText: "text-[#16a34a]",
        iconBg: "bg-[#e8fbf0]",
        iconColor: "text-[#16a34a]",
        summary: "Understanding the Gemini ecosystem, multimodal architectures, and Google's AI foundational concepts.",
        lessons: [
          { id: "g1-1", title: "Introduction to Google Gemini 1.5 & 2.0", duration: "10 min", description: "Architecture differences between Flash, Pro, and Ultra." },
          { id: "g1-2", title: "The 2-Million Token Context Window", duration: "12 min", description: "Why massive context windows revolutionize document analysis." },
          { id: "g1-3", title: "Multimodal Inputs: Text, Audio, Video & Code", duration: "10 min", description: "Interacting natively with multiple media formats." },
          { id: "g1-4", title: "Grounding with Google Search", duration: "8 min", description: "Using real-time web verification for up-to-date data." },
          { id: "g1-5", title: "System Instructions & Safety Settings", duration: "10 min", description: "Configuring model persona and guardrails." },
          { id: "g1-6", title: "Google AI Studio vs. Gemini Web App", duration: "10 min", description: "Selecting the optimal environment for your work." },
        ],
      },
      {
        id: 2,
        stepNumber: 2,
        title: "Gemini for Productivity",
        subtitle: "Work smarter with AI",
        level: "Beginner",
        lessonsCount: 8,
        duration: "1.5 hours",
        iconType: "brand",
        circleBg: "bg-[#dbeafe]",
        circleText: "text-[#2563eb]",
        iconBg: "bg-[#eef2ff]",
        iconColor: "text-[#4285F4]",
        summary: "Integrate Gemini into Google Workspace (Gmail, Docs, Sheets, Drive) for seamless workplace productivity.",
        lessons: [
          { id: "g2-1", title: "Gmail Integration: Drafting & Triage", duration: "11 min", description: "Inbox management using Workspace extensions." },
          { id: "g2-2", title: "Google Docs Co-Writing & Polishing", duration: "12 min", description: "Expanding outlines, rewriting paragraphs, and citations." },
          { id: "g2-3", title: "Google Sheets: Formula Wizardry", duration: "14 min", description: "Generating complex formulas and table summaries effortlessly." },
          { id: "g2-4", title: "Google Drive File Synthesis", duration: "15 min", description: "Query multiple files directly from your personal Drive." },
          { id: "g2-5", title: "Audio & Meeting Recording Analysis", duration: "12 min", description: "Upload a 1-hour audio file for instant timestamped summaries." },
          { id: "g2-6", title: "YouTube Video Understanding", duration: "10 min", description: "Ask questions and extract key moments from any YouTube URL." },
          { id: "g2-7", title: "Context Caching for Recurring Datasets", duration: "12 min", description: "Save costs and latency on repetitive long queries." },
          { id: "g2-8", title: "Workspace Automation Recipes", duration: "14 min", description: "Automating routine office reporting cycles." },
        ],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "AI Tools for Content Creation",
        subtitle: "Create amazing content",
        level: "Intermediate",
        lessonsCount: 7,
        duration: "1.5 hours",
        iconType: "pencil",
        circleBg: "bg-[#ffedd5]",
        circleText: "text-[#ea580c]",
        iconBg: "bg-[#fff7ed]",
        iconColor: "text-[#ea580c]",
        summary: "Harness Gemini's deep research capabilities to produce authoritative, fact-grounded writing.",
        lessons: [
          { id: "g3-1", title: "Fact-Checked Research Dossiers", duration: "14 min", description: "Leverage Google Grounding for verified sources and links." },
          { id: "g3-2", title: "Technical Whitepaper & Case Study Writing", duration: "16 min", description: "Synthesize dense engineering concepts into digestible case studies." },
          { id: "g3-3", title: "Multilingual Content Generation & Nuance", duration: "12 min", description: "Translate and localize copy across 40+ languages natively." },
          { id: "g3-4", title: "Creating Dynamic Presentations in Slides", duration: "14 min", description: "From topic outline to formatted slide bullet points." },
          { id: "g3-5", title: "Brand Voice Alignment with System Prompts", duration: "10 min", description: "Keep corporate tone consistent across all marketing assets." },
          { id: "g3-6", title: "Interactive Scriptwriting for Webinars", duration: "12 min", description: "Engage live audiences with structured Q&A prompt flows." },
          { id: "g3-7", title: "Ethical Content Attribution & Verification", duration: "10 min", description: "Cross-checking citations against original source files." },
        ],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "AI for Design & Creativity",
        subtitle: "Images, videos and more",
        level: "Intermediate",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "image",
        circleBg: "bg-[#ede9fe]",
        circleText: "text-[#7c3aed]",
        iconBg: "bg-[#f5f3ff]",
        iconColor: "text-[#7c3aed]",
        summary: "Combine Imagen 3 image generation with multimodal video analysis for creative direction.",
        lessons: [
          { id: "g4-1", title: "Imagen 3: Photorealistic Image Synthesis", duration: "12 min", description: "Prompting Imagen 3 for sharp details and text rendering." },
          { id: "g4-2", title: "Visual Comparison & Design Critiques", duration: "11 min", description: "Upload competing ad creatives for algorithmic feedback." },
          { id: "g4-3", title: "Video Scene Breakdown & B-Roll Planning", duration: "13 min", description: "Analyze raw footage timestamps and auto-generate shot lists." },
          { id: "g4-4", title: "Infographic Scripting & Visual Layouts", duration: "10 min", description: "Organize complex statistical data into visually balanced assets." },
          { id: "g4-5", title: "Creative Storyboarding for Video Production", duration: "12 min", description: "From script to shot-by-shot visual descriptions." },
          { id: "g4-6", title: "Interactive Creative Brainstorming", duration: "8 min", description: "Rapid concept generation with multi-modal references." },
        ],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Real-World Projects",
        subtitle: "Build and apply your skills",
        level: "Advanced",
        lessonsCount: 8,
        duration: "2 hours",
        iconType: "briefcase",
        circleBg: "bg-[#fce7f3]",
        circleText: "text-[#db2777]",
        iconBg: "bg-[#fdf2f8]",
        iconColor: "text-[#db2777]",
        summary: "Build production workflows using Google AI Studio, structured JSON output, and Workspace tools.",
        lessons: [
          { id: "g5-1", title: "Project 1: Entire Book & PDF Analyzer", duration: "18 min", description: "Upload a 300-page book and extract customized knowledge graphs." },
          { id: "g5-2", title: "Project 2: Customer Sentiment Dashboard", duration: "16 min", description: "Analyze customer reviews in Google Sheets with structured outputs." },
          { id: "g5-3", title: "Project 3: Video Lecture Note Generator", duration: "15 min", description: "Turn a 2-hour university lecture video into a study guide." },
          { id: "g5-4", title: "Project 4: Automated RFP & Proposal Responder", duration: "20 min", description: "Match client tender requirements against company capability docs." },
          { id: "g5-5", title: "Project 5: Structured JSON API Pipeline", duration: "18 min", description: "Extract reliable schemas for frontend web applications." },
          { id: "g5-6", title: "Project 6: Google AI Studio Prototyping", duration: "16 min", description: "Deploy a custom system prompt with function calling." },
          { id: "g5-7", title: "Project 7: Multi-Source Market Research Dossier", duration: "15 min", description: "Synthesize 10 analyst reports into an executive presentation." },
          { id: "g5-8", title: "Final Capstone & Verified Certification", duration: "14 min", description: "Submit your final capstone and claim your verified credential." },
        ],
      },
    ],
  },
};

// Fallback generator for other tool slugs (e.g. claude, midjourney, etc.)
function getCourseConfig(slug: string): CourseConfig {
  if (COURSE_PATHS[slug]) {
    return COURSE_PATHS[slug];
  }

  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    slug,
    name: capitalized,
    tagline: "Structured learning paths to help you go from beginner to pro.",
    brandColor: "#563bfa",
    brandBg: "bg-[#f5f3ff]",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "AI Fundamentals",
        subtitle: "Start your AI journey",
        level: "Beginner",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "sprout",
        circleBg: "bg-[#dcfce7]",
        circleText: "text-[#16a34a]",
        iconBg: "bg-[#e8fbf0]",
        iconColor: "text-[#16a34a]",
        summary: `Understand foundational AI mechanics, key concepts, and how to work with ${capitalized}.`,
        lessons: [
          { id: "f-1", title: "Core Architecture & How Models Work", duration: "10 min", description: "Understanding foundational mechanics and training principles." },
          { id: "f-2", title: "The 4-Part Prompt Formula", duration: "12 min", description: "Role, context, task instructions, and output constraints." },
          { id: "f-3", title: "System Instructions & Customization", duration: "10 min", description: "Tailoring behavior and persistent preferences." },
          { id: "f-4", title: "Handling Edge Cases & Hallucinations", duration: "10 min", description: "Verification techniques and output checking." },
          { id: "f-5", title: "Workflow Automation Foundations", duration: "10 min", description: "Connecting tools to daily work routines." },
          { id: "f-6", title: "Best Practices & Security", duration: "8 min", description: "Responsible AI usage in business environments." },
        ],
      },
      {
        id: 2,
        stepNumber: 2,
        title: `${capitalized} for Productivity`,
        subtitle: "Work smarter with AI",
        level: "Beginner",
        lessonsCount: 8,
        duration: "1.5 hours",
        iconType: "brand",
        circleBg: "bg-[#dbeafe]",
        circleText: "text-[#2563eb]",
        iconBg: "bg-[#e6fbf9]",
        iconColor: "text-[#0d9488]",
        summary: `Maximize everyday efficiency and eliminate repetitive tasks with ${capitalized}.`,
        lessons: [
          { id: "p-1", title: "Drafting High-Impact Communications", duration: "12 min", description: "Polished emails, announcements, and memos." },
          { id: "p-2", title: "Rapid Document Synthesis & Action Items", duration: "14 min", description: "Digest long reports into clean action plans." },
          { id: "p-3", title: "Meeting Notes into Execution Lists", duration: "10 min", description: "Instant task tracking and follow-up templates." },
          { id: "p-4", title: "Data Organization & Structuring", duration: "15 min", description: "Converting messy notes into clean tables and lists." },
          { id: "p-5", title: "Accelerated Brainstorming", duration: "11 min", description: "Overcome creative blocks with 20 quick angles." },
          { id: "p-6", title: "Decision Framework Analysis", duration: "12 min", description: "Weigh pros, cons, risks, and alternatives." },
          { id: "p-7", title: "Custom Workflows & Shortcuts", duration: "10 min", description: "Building daily routines and templates." },
          { id: "p-8", title: "Practical Review & Milestone Check", duration: "10 min", description: "Hands-on productivity assessment." },
        ],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "AI Tools for Content Creation",
        subtitle: "Create amazing content",
        level: "Intermediate",
        lessonsCount: 7,
        duration: "1.5 hours",
        iconType: "pencil",
        circleBg: "bg-[#ffedd5]",
        circleText: "text-[#ea580c]",
        iconBg: "bg-[#fff7ed]",
        iconColor: "text-[#ea580c]",
        summary: "Write articles, scripts, social copy, and marketing collateral at scale.",
        lessons: [
          { id: "c-1", title: "Brand Voice Alignment", duration: "12 min", description: "Calibrating tone, style, and vocabulary." },
          { id: "c-2", title: "Scroll-Stopping Hooks", duration: "14 min", description: "Crafting captivating headlines and intros." },
          { id: "c-3", title: "Long-Form Articles & Guides", duration: "16 min", description: "Structuring thorough, valuable content." },
          { id: "c-4", title: "Multi-Platform Repurposing", duration: "15 min", description: "One core idea adapted for multiple channels." },
          { id: "c-5", title: "Storytelling & Narrative Arcs", duration: "12 min", description: "Engaging readers with classic story structures." },
          { id: "c-6", title: "Video & Podcast Scripts", duration: "12 min", description: "Writing conversational spoken scripts." },
          { id: "c-7", title: "Humanizing & Quality Control", duration: "10 min", description: "Polishing drafts to read naturally." },
        ],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "AI for Design & Creativity",
        subtitle: "Images, videos and more",
        level: "Intermediate",
        lessonsCount: 6,
        duration: "1 hour",
        iconType: "image",
        circleBg: "bg-[#ede9fe]",
        circleText: "text-[#7c3aed]",
        iconBg: "bg-[#f5f3ff]",
        iconColor: "text-[#7c3aed]",
        summary: "Generate visual concepts, diagrams, and multimedia design assets.",
        lessons: [
          { id: "d-1", title: "Visual Prompt Engineering", duration: "12 min", description: "Art direction, lighting, and composition." },
          { id: "d-2", title: "Consistent Brand Assets", duration: "14 min", description: "Keeping colors, characters, and aesthetics unified." },
          { id: "d-3", title: "Diagrams & Infographics", duration: "11 min", description: "Translating data into visual summaries." },
          { id: "d-4", title: "Moodboards & Concept Art", duration: "10 min", description: "Exploring fresh visual directions rapidly." },
          { id: "d-5", title: "Design Critiques with Vision AI", duration: "10 min", description: "Getting automated usability and design feedback." },
          { id: "d-6", title: "Creative Ideation Loops", duration: "8 min", description: "Pushing beyond standard creative boundaries." },
        ],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Real-World Projects",
        subtitle: "Build and apply your skills",
        level: "Advanced",
        lessonsCount: 8,
        duration: "2 hours",
        iconType: "briefcase",
        circleBg: "bg-[#fce7f3]",
        circleText: "text-[#db2777]",
        iconBg: "bg-[#fdf2f8]",
        iconColor: "text-[#db2777]",
        summary: "Complete hands-on end-to-end projects and submit your capstone portfolio.",
        lessons: [
          { id: "rp-1", title: "Project 1: Automated Workflow System", duration: "18 min", description: "Build a streamlined task pipeline." },
          { id: "rp-2", title: "Project 2: Comprehensive Marketing Launch", duration: "18 min", description: "All copy, assets, and messaging coordinated." },
          { id: "rp-3", title: "Project 3: Custom Domain Assistant", duration: "20 min", description: "Build a specialized AI helper with domain rules." },
          { id: "rp-4", title: "Project 4: Competitive Intelligence Brief", duration: "15 min", description: "Analyze industry competitors and trends." },
          { id: "rp-5", title: "Project 5: Data Synthesis & Reporting", duration: "16 min", description: "Turn raw spreadsheets into executive presentations." },
          { id: "rp-6", title: "Project 6: Code & Web Prototyping", duration: "18 min", description: "Build a working prototype from prompts." },
          { id: "rp-7", title: "Project 7: Executive Presentation", duration: "15 min", description: "Pitch your ideas with structured clarity." },
          { id: "rp-8", title: "Capstone Submission & Certification", duration: "15 min", description: "Verify your work and unlock your certificate." },
        ],
      },
    ],
  };
}

// Brand SVG for Step 2
function StepBrandLogo({ slug }: { slug: string }) {
  if (slug === "chatgpt") {
    return (
      <svg className="w-6 h-6 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zM20.67 5.999a4.4755 4.4755 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.6562 9.5378V7.2054a.0804.0804 0 0 1 .0332-.0615L14.53 4.0538a4.4992 4.4992 0 0 1 6.14 1.9452zm-8.835-2.0003a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V7.493a4.504 4.504 0 0 1 4.4945-4.4943zm.8893 7.8488 2.6105 1.5065-2.6105 1.5065-2.6105-1.5065z" />
      </svg>
    );
  }
  if (slug === "gemini") {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.4 7.33 24 12 24z" />
        <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.24C.45 8.14 0 9.9 0 12s.45 3.86 1.24 5.43l4.04-3.14z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.57l4.04 3.14c.95-2.83 3.6-4.96 6.72-4.96z" />
      </svg>
    );
  }
  return <Sparkles className="w-6 h-6 text-[#563bfa]" />;
}

export default function CourseLearningPathPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "chatgpt";

  const course = getCourseConfig(slug);

  const [selectedTab, setSelectedTab] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const [activeStepModal, setActiveStepModal] = useState<LearningStep | null>(
    null
  );
  const [showCertModal, setShowCertModal] = useState(false);
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window === "undefined") return "Akash Kirar";
    try {
      return localStorage.getItem("nfm_student_name") || "Akash Kirar";
    } catch {
      return "Akash Kirar";
    }
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    if (typeof window === "undefined") return [1];
    try {
      const saved = localStorage.getItem(`nfm_path_steps_${slug}`);
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["1-1", "1-2"];
    try {
      const saved = localStorage.getItem(`nfm_path_lessons_${slug}`);
      return saved ? JSON.parse(saved) : ["1-1", "1-2"];
    } catch {
      return ["1-1", "1-2"];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleStepCompletion = (stepId: number) => {
    let next: number[];
    if (completedSteps.includes(stepId)) {
      next = completedSteps.filter((id) => id !== stepId);
      showToast(`Step ${stepId} marked as in progress`);
    } else {
      next = [...completedSteps, stepId];
      showToast(`Step ${stepId} marked as completed! 🎉`);
    }
    setCompletedSteps(next);
    try {
      localStorage.setItem(`nfm_path_steps_${slug}`, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    let next: string[];
    if (completedLessons.includes(lessonId)) {
      next = completedLessons.filter((id) => id !== lessonId);
    } else {
      next = [...completedLessons, lessonId];
      showToast("Lesson completed! 🚀");
    }
    setCompletedLessons(next);
    try {
      localStorage.setItem(`nfm_path_lessons_${slug}`, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const tabs: ("All" | "Beginner" | "Intermediate" | "Advanced")[] = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const filteredSteps = course.steps.filter((step) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Beginner") return step.level === "Beginner";
    if (selectedTab === "Intermediate") return step.level === "Intermediate";
    if (selectedTab === "Advanced") return step.level === "Advanced";
    return true;
  });

  const completionPercentage = Math.round(
    (completedSteps.length / course.steps.length) * 100
  );

  return (
    <div className="bg-[#fafbfc] pb-6 md:pb-12 selection:bg-violet-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 w-max max-w-[calc(100%-2rem)] transform -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        {/* Back navigation */}
        <div className="mb-3">
          <button
            onClick={() => router.back()}
            id="back-to-learn-btn"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-gray-100 active:scale-95"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
            <span>Back</span>
          </button>
        </div>

        {/* 1. TOP HEADER (Exact match to Image 2) */}
        <div className="mb-5">
          <h1 className="text-[32px] sm:text-[38px] font-black text-gray-900 tracking-tight leading-[1.08] mb-1.5">
            Learn Step <span className="text-[#563bfa]">by Step</span>
          </h1>
          <p className="text-xs sm:text-[13.5px] text-gray-500 font-normal">
            Structured learning paths to help you go from beginner to pro.
          </p>
        </div>

        {/* 2. FILTER PILLS (Exact match to Image 2) */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                id={`filter-tab-${tab.toLowerCase()}`}
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

        {/* 3. STEP-BY-STEP LEARNING TIMELINE (Exact match to Image 2) */}
        <div className="relative mb-6">
          {/* Vertical Connecting Line */}
          <div
            className="absolute left-[22px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-slate-200 z-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-3.5 sm:gap-4 relative z-10">
            {filteredSteps.map((step) => {
              const isStepDone = completedSteps.includes(step.id);

              return (
                <div
                  key={step.id}
                    className="flex items-center gap-2 sm:gap-3.5 group"
                >
                  {/* Left Numbered Circle Badge (Connected to vertical line) */}
                  <div
                    onClick={() => toggleStepCompletion(step.id)}
                    title={isStepDone ? "Completed! Click to unmark" : "Click to mark completed"}
                    className={`w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full ${step.circleBg} ${step.circleText} flex items-center justify-center font-black text-[17px] flex-shrink-0 shadow-xs border-2 border-white cursor-pointer transition-transform hover:scale-110 active:scale-95 select-none relative`}
                  >
                    {isStepDone ? (
                      <span className="flex items-center justify-center">
                        <Check size={18} strokeWidth={3} />
                      </span>
                    ) : (
                      step.stepNumber
                    )}
                  </div>

                  {/* Step Card */}
                  <div
                    onClick={() => setActiveStepModal(step)}
                    id={`step-card-${step.stepNumber}`}
                      className="min-w-0 bg-white rounded-3xl p-3 sm:p-4 border border-gray-100/90 shadow-2xs hover:shadow-md transition-all flex items-center gap-2.5 sm:gap-3.5 flex-1 cursor-pointer group active:scale-[0.99]"
                  >
                    {/* Icon Squircle Box */}
                    <div
                        className={`size-10 sm:size-13 rounded-2xl ${step.iconBg} ${step.iconColor} hidden min-[25rem]:flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      {step.iconType === "sprout" && (
                        <Sprout size={24} strokeWidth={2.2} />
                      )}
                      {step.iconType === "brand" && (
                        <StepBrandLogo slug={course.slug} />
                      )}
                      {step.iconType === "pencil" && (
                        <Pencil size={21} strokeWidth={2.2} />
                      )}
                      {step.iconType === "image" && (
                        <ImageIcon size={22} strokeWidth={2.2} />
                      )}
                      {step.iconType === "briefcase" && (
                        <Briefcase size={22} strokeWidth={2.2} />
                      )}
                    </div>

                    {/* Step Title, Subtitle & Meta */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-[15px] sm:text-base text-gray-900 leading-snug group-hover:text-[#563bfa] transition-colors">
                        {step.title}
                      </h3>
                        <p className="text-[13px] text-gray-500 font-normal mt-0.5 leading-snug">
                        {step.subtitle}
                      </p>

                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-gray-500 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <Play
                            size={10}
                            className="fill-gray-400 text-gray-400"
                          />
                          <span>{step.lessonsCount} lessons</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-gray-400" />
                          <span>{step.duration}</span>
                        </span>
                        {isStepDone && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                              <CheckCircle2 size={11} />
                              <span>Done</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Arrow */}
                    <div className="text-gray-400 group-hover:text-[#563bfa] group-hover:translate-x-1 transition-all flex-shrink-0 pr-1">
                      <ChevronRight size={20} strokeWidth={2.4} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. "GET CERTIFIED" BANNER CARD (Exact match to Image 2) */}
        <div
          onClick={() => setShowCertModal(true)}
          id="get-certified-banner"
          className="bg-gradient-to-r from-[#f5efff] via-[#f1e8ff] to-[#ebe0ff] border border-violet-200/70 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer group mt-4"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Golden Trophy Icon Badge */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Trophy
                size={26}
                strokeWidth={2.2}
                className="text-amber-500 fill-amber-400/20"
              />
            </div>

            {/* Certificate text */}
            <div>
              <h4 className="font-extrabold text-[15px] sm:text-[16px] text-[#563bfa] leading-tight">
                Get Certified
              </h4>
              <p className="text-[11.5px] sm:text-[12.5px] text-gray-500 font-normal mt-0.5 leading-snug">
                Complete courses and earn certificates to showcase your skills.
              </p>
            </div>
          </div>

          <div className="text-gray-400 group-hover:text-[#563bfa] group-hover:translate-x-1 transition-all pl-2 flex-shrink-0">
            <ChevronRight size={22} strokeWidth={2.4} />
          </div>
        </div>

        {/* Progress summary pill */}
        <div className="mt-4 flex items-center justify-between px-2 text-xs text-gray-400 font-medium">
          <span>
            {completedSteps.length} of {course.steps.length} milestones finished
          </span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#563bfa] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="font-bold text-gray-700">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE STEP DETAIL MODAL / SYLLABUS VIEWER */}
      {/* ========================================================= */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[94dvh] min-h-0 flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl ${activeStepModal.circleBg} ${activeStepModal.circleText} flex items-center justify-center font-black text-base`}
                >
                  {activeStepModal.stepNumber}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                    {activeStepModal.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    {activeStepModal.subtitle} • {activeStepModal.duration}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveStepModal(null)}
                className="size-11 shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body with Lessons */}
            <div className="min-h-0 p-4 sm:p-5 overflow-y-auto overscroll-contain space-y-4">
              <div className="bg-violet-50/70 border border-violet-100 rounded-2xl p-3.5 text-xs text-violet-900 leading-relaxed">
                <p className="font-semibold mb-1 text-[#563bfa]">Milestone Overview</p>
                <p className="text-gray-600">{activeStepModal.summary}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                    Included Lessons ({activeStepModal.lessons.length})
                  </h4>
                  <button
                    onClick={() => toggleStepCompletion(activeStepModal.id)}
                    className="text-xs font-bold text-[#563bfa] hover:underline cursor-pointer"
                  >
                    {completedSteps.includes(activeStepModal.id)
                      ? "Unmark Step"
                      : "Mark Step Complete"}
                  </button>
                </div>

                <div className="space-y-2">
                  {activeStepModal.lessons.map((lesson, idx) => {
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => toggleLessonCompletion(lesson.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isDone
                            ? "bg-emerald-50/50 border-emerald-200/80"
                            : "bg-gray-50/70 hover:bg-gray-100 border-gray-100"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isDone
                              ? "bg-emerald-500 text-white"
                              : "border border-gray-300 text-gray-400 bg-white"
                          }`}
                        >
                          {isDone ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h5
                              className={`text-xs font-bold leading-tight ${
                                isDone ? "text-emerald-950 line-through opacity-80" : "text-gray-900"
                              }`}
                            >
                              {lesson.title}
                            </h5>
                            <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">
                              {lesson.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-normal mt-1 leading-snug">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-gray-100 bg-gray-50/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast("Course step opened in player! 🎬");
                  setActiveStepModal(null);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#563bfa] hover:bg-[#472fe0] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200/60 cursor-pointer transition-all"
              >
                <Play size={14} className="fill-white" />
                <span>Start Next Lesson</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. GET CERTIFIED MODAL PREVIEW */}
      {/* ========================================================= */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[94dvh] min-h-0 flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                    Certificate of Achievement
                  </h3>
                  <p className="text-xs text-gray-500 font-normal">
                    NextFutureMind Verified AI Credential
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCertModal(false)}
                className="size-11 shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Certificate Preview Card */}
            <div className="min-h-0 p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
              {/* Authentic Certificate Rendering */}
              <div className="bg-gradient-to-br from-[#ffffff] via-[#faf8ff] to-[#f4edff] border-4 border-double border-violet-200 rounded-2xl p-5 sm:p-6 text-center shadow-md relative overflow-hidden">
                {/* Certificate Watermark Stamp */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-4 border-violet-100/80 flex items-center justify-center pointer-events-none opacity-40">
                  <Trophy size={60} className="text-violet-300" />
                </div>

                <div className="text-[10px] uppercase tracking-widest text-[#563bfa] font-black mb-1">
                  NextFutureMind Academy
                </div>

                <h4 className="text-xl sm:text-2xl font-serif font-black text-gray-900 tracking-tight mb-2">
                  Certificate of Completion
                </h4>

                <p className="text-[11px] text-gray-400 font-medium italic mb-2">
                  This certifies that
                </p>

                <div className="border-b-2 border-[#563bfa]/30 max-w-[260px] mx-auto pb-1 mb-2">
                  <span className="text-lg sm:text-xl font-extrabold text-gray-900 [overflow-wrap:anywhere]">
                    {studentName}
                  </span>
                </div>

                <p className="text-[11.5px] text-gray-600 font-normal max-w-xs mx-auto mb-3">
                  has successfully completed all 5 milestones of the official{" "}
                  <strong className="text-gray-900 font-bold">{course.name} Master Path</strong>, demonstrating hands-on proficiency in prompts, tools, and real-world AI applications.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between pt-3 border-t border-violet-100 text-[10px] text-gray-400 font-medium">
                  <div>
                    <span className="block text-gray-500 font-bold">Issue Date</span>
                    <span>September 2026</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 size={11} />
                    <span>Verified Credential</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 font-bold">ID Code</span>
                    <span className="font-mono">NFM-{slug.toUpperCase()}-8921</span>
                  </div>
                </div>
              </div>

              {/* Student Name Edit */}
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100">
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Name on Certificate:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    try {
                      localStorage.setItem("nfm_student_name", e.target.value);
                    } catch {
                      // ignore
                    }
                  }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-base md:text-sm font-bold text-gray-900 focus:outline-none focus:border-[#563bfa]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-gray-100 bg-gray-50 flex items-center gap-2.5">
              <button
                onClick={() => {
                  showToast("Certificate downloaded successfully! 🏆");
                  setShowCertModal(false);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#563bfa] hover:bg-[#472fe0] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200/60 cursor-pointer transition-all"
              >
                <Download size={14} />
                <span>Download PDF Certificate</span>
              </button>

              <button
                onClick={() => {
                  showToast("Certificate link copied to clipboard! 🔗");
                }}
                className="py-3 px-4 rounded-2xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                title="Share"
              >
                <Share2 size={14} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
