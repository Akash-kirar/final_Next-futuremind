export interface ToolData {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  category: "Productivity" | "Content" | "Design" | "Development" | "Research" | "Programming";
  tags: string[];
  badge?: {
    text: string;
    type: "popular" | "trending" | "new";
  };
  iconBg: string;
  iconType:
    | "chatgpt"
    | "gemini"
    | "claude"
    | "midjourney"
    | "notion"
    | "canva"
    | "perplexity"
    | "zapier";
  video: {
    badge: string;
    title: string;
    duration: string;
    views: string;
    handwrittenNote: string;
    thumbnail: string;
  };
  about: string;
  whatYoullLearn: {
    icon: "chat" | "file" | "chart" | "lightbulb" | "code" | "sparkles";
    title: string;
    desc: string;
  }[];
  tutorials: {
    id: string;
    title: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    completed?: boolean;
  }[];
  prompts: {
    title: string;
    category: string;
    prompt: string;
  }[];
  useCases: {
    role: string;
    scenario: string;
    benefit: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  officialUrl: string;
}

export const TOOLS_DATABASE: Record<string, ToolData> = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "Your AI assistant for everyday work",
    desc: "Chat, write, brainstorm and automate tasks.",
    category: "Productivity",
    tags: ["Chat", "Productivity", "Writing", "Programming"],
    badge: {
      text: "Most Popular",
      type: "popular",
    },
    iconBg: "bg-[#10a37f]",
    iconType: "chatgpt",
    video: {
      badge: "Getting Started",
      title: "Complete ChatGPT Guide for Beginners",
      duration: "12:45",
      views: "1.2M views",
      handwrittenNote: "Smarter\nPrompts\nBetter\nResults 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "ChatGPT is an AI assistant that helps you write, brainstorm, solve problems, learn new things, and be more productive in your work and daily life.",
    whatYoullLearn: [
      {
        icon: "chat",
        title: "How to use ChatGPT effectively",
        desc: "Learn the basics and advanced features",
      },
      {
        icon: "file",
        title: "Best prompts for productivity",
        desc: "Copy, customize, and use powerful prompts",
      },
      {
        icon: "chart",
        title: "Real-world examples",
        desc: "See how ChatGPT is used in work, study, and business",
      },
      {
        icon: "lightbulb",
        title: "Tips and tricks from experts",
        desc: "Save time and get better results",
      },
    ],
    tutorials: [
      {
        id: "c1",
        title: "Introduction to Prompt Engineering",
        duration: "08:20",
        level: "Beginner",
      },
      {
        id: "c2",
        title: "Creating Custom Instructions & Personas",
        duration: "14:15",
        level: "Intermediate",
      },
      {
        id: "c3",
        title: "Building Custom GPTs for Your Team",
        duration: "18:40",
        level: "Advanced",
      },
      {
        id: "c4",
        title: "Data Analysis and Python Code Execution",
        duration: "11:50",
        level: "Intermediate",
      },
    ],
    prompts: [
      {
        title: "Executive Summarizer",
        category: "Productivity",
        prompt:
          "Act as a C-suite chief of staff. Read the following text and distill it into 3 key takeaways, 2 critical risks, and a prioritized bulleted action item list with owners.",
      },
      {
        title: "High-Converting Email Pitch",
        category: "Writing",
        prompt:
          "Write a 120-word cold outreach email using the Problem-Agitate-Solve framework. Target persona is a Head of Marketing. Keep tone casual yet authoritative.",
      },
      {
        title: "Code Refactor & Bug Hunt",
        category: "Development",
        prompt:
          "Review this TypeScript function for subtle edge cases, performance bottlenecks, and adherence to clean code principles. Explain why each fix improves stability.",
      },
      {
        title: "Socratic Study Partner",
        category: "Learning",
        prompt:
          "Quiz me on advanced behavioral economics concepts one question at a time. After I answer, evaluate my understanding and provide constructive feedback before asking the next.",
      },
    ],
    useCases: [
      {
        role: "Content Creator",
        scenario: "Repurposing long-form podcast transcripts into tweet threads and newsletters",
        benefit: "Saves 4 hours per episode while keeping tone authentic",
      },
      {
        role: "Software Developer",
        scenario: "Writing unit test suites, regex patterns, and API schema documentation",
        benefit: "Doubles test coverage with minimal manual boilerplate",
      },
      {
        role: "Student & Researcher",
        scenario: "Clarifying difficult scientific concepts through progressive analogies",
        benefit: "Accelerates study comprehension and exam prep",
      },
    ],
    faqs: [
      {
        q: "Is ChatGPT free to use?",
        a: "Yes! ChatGPT offers a robust free tier with access to standard GPT-4o mini capabilities. ChatGPT Plus provides priority access, GPT-4o limits, image generation, and custom GPTs.",
      },
      {
        q: "Can I use ChatGPT on mobile?",
        a: "Yes, official iOS and Android apps are available with voice mode, image inputs, and history sync.",
      },
      {
        q: "How do I write better prompts?",
        a: "Specify persona (e.g. 'Act as an expert...'), provide clear context, state exact constraints (e.g. 'in 3 bullet points under 100 words'), and provide examples of good outputs.",
      },
    ],
    officialUrl: "https://chatgpt.com",
  },
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    tagline: "Your multimodal AI partner powered by Google",
    desc: "Research, analyze and create with Google AI.",
    category: "Research",
    tags: ["Research", "Productivity", "Multimodal", "Workspace"],
    badge: {
      text: "Trending",
      type: "trending",
    },
    iconBg: "bg-white border border-gray-100 shadow-xs",
    iconType: "gemini",
    video: {
      badge: "Multimodal Mastery",
      title: "Google Gemini Deep Dive & Real-time Tools",
      duration: "15:10",
      views: "890K views",
      handwrittenNote: "Deep\nInsights\nFaster\nAnswers 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Google Gemini is a next-generation multimodal model capable of seamlessly understanding, operating across, and combining different types of information including text, code, audio, image and video.",
    whatYoullLearn: [
      {
        icon: "sparkles",
        title: "Multimodal search & reasoning",
        desc: "Upload images, PDFs, and videos for instant analysis",
      },
      {
        icon: "file",
        title: "Google Workspace integration",
        desc: "Connect Gemini directly with Gmail, Docs, and Drive",
      },
      {
        icon: "chart",
        title: "Grounded Google Search answers",
        desc: "Fact-checked research with real-time web citations",
      },
      {
        icon: "lightbulb",
        title: "Long-context data digestion",
        desc: "Process whole books, codebases, and hour-long lectures",
      },
    ],
    tutorials: [
      {
        id: "g1",
        title: "Connecting Gemini with Gmail and Google Docs",
        duration: "09:40",
        level: "Beginner",
      },
      {
        id: "g2",
        title: "Analyzing 100-Page PDF Reports in Seconds",
        duration: "13:20",
        level: "Intermediate",
      },
      {
        id: "g3",
        title: "Gemini 1.5 Pro Large Context Window Workflows",
        duration: "16:05",
        level: "Advanced",
      },
    ],
    prompts: [
      {
        title: "Document Synthesis",
        category: "Research",
        prompt:
          "Read this attached research report. Highlight the 3 core findings, methodological limitations, and actionable strategic takeaways for a SaaS startup.",
      },
      {
        title: "Multilingual Market Translation",
        category: "Writing",
        prompt:
          "Translate this sales proposal into natural, idiomatically fluent business Japanese and Spanish, maintaining professional nuance and brand voice.",
      },
    ],
    useCases: [
      {
        role: "Financial Analyst",
        scenario: "Extracting table data from quarterly PDF earnings reports directly into spreadsheets",
        benefit: "Eliminates tedious manual copy-pasting",
      },
      {
        role: "Educator",
        scenario: "Generating custom lesson plans and interactive quizzes tailored to specific grade levels",
        benefit: "Cuts planning time in half while improving student engagement",
      },
    ],
    faqs: [
      {
        q: "What makes Gemini different from other AI tools?",
        a: "Gemini is built from the ground up to be multimodal and connects directly with Google services like Drive, Docs, Maps, and YouTube.",
      },
      {
        q: "Is there a free version of Gemini?",
        a: "Yes, Gemini offers generous free access with Gemini 1.5 Flash. Gemini Advanced unlocks Gemini 1.5 Pro with a massive context window.",
      },
    ],
    officialUrl: "https://gemini.google.com",
  },
  claude: {
    id: "claude",
    name: "Claude",
    tagline: "Thoughtful reasoning, code generation, and long-form writing",
    desc: "Write, analyze and solve complex problems.",
    category: "Content",
    tags: ["Writing", "Analysis", "Programming", "Coding"],
    badge: {
      text: "New",
      type: "new",
    },
    iconBg: "bg-[#faf6f0] border border-[#f0e8db] shadow-xs",
    iconType: "claude",
    video: {
      badge: "Nuanced Thinking",
      title: "Mastering Claude 3.5 Sonnet & Artifacts",
      duration: "14:30",
      views: "750K views",
      handwrittenNote: "Clear\nThinking\nFlawless\nCode 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Claude by Anthropic is renowned for its exceptional writing style, thoughtful logical reasoning, and state-of-the-art coding abilities with interactive Artifacts.",
    whatYoullLearn: [
      {
        icon: "chat",
        title: "Nuanced long-form prose and copywriting",
        desc: "Generate human-sounding writing without generic AI clichés",
      },
      {
        icon: "code",
        title: "Interactive Artifacts and apps",
        desc: "Build React prototypes, diagrams, and games right in the chat",
      },
      {
        icon: "file",
        title: "Deep document synthesis & auditing",
        desc: "Process massive contracts, technical specs, and financial docs",
      },
      {
        icon: "lightbulb",
        title: "Steerability & prompt guidelines",
        desc: "Master system prompts and precise XML tagging for deterministic results",
      },
    ],
    tutorials: [
      {
        id: "cl1",
        title: "Building Web Apps Live in Claude Artifacts",
        duration: "16:45",
        level: "Intermediate",
      },
      {
        id: "cl2",
        title: "Prompt Engineering with XML Tags for Claude",
        duration: "10:15",
        level: "Beginner",
      },
    ],
    prompts: [
      {
        title: "Full-Stack Component Architect",
        category: "Development",
        prompt:
          "Write a self-contained React TypeScript component implementing an interactive interactive Kanban board with drag-and-drop, state persistence, and Tailwind CSS.",
      },
      {
        title: "Editorial Manuscript Polish",
        category: "Writing",
        prompt:
          "Critique this chapter for narrative pacing, sensory detail, and character voice. Provide line-by-line editorial suggestions.",
      },
    ],
    useCases: [
      {
        role: "Software Architect",
        scenario: "Rapidly scaffolding frontend UI prototypes with interactive Artifacts",
        benefit: "Go from idea to working prototype in minutes",
      },
      {
        role: "Author & Journalist",
        scenario: "Drafting essays with refined voice, depth, and cadence",
        benefit: "Avoids repetitive robotic tropes common in generic models",
      },
    ],
    faqs: [
      {
        q: "What are Claude Artifacts?",
        a: "Artifacts are dedicated side windows in Claude where you can view, edit, and interact with code, HTML, SVG, and documents in real time.",
      },
      {
        q: "Which Claude model is the best?",
        a: "Claude 3.5 Sonnet offers industry-leading coding and reasoning performance at fast speeds.",
      },
    ],
    officialUrl: "https://claude.ai",
  },
  midjourney: {
    id: "midjourney",
    name: "Midjourney",
    tagline: "Turn your imagination into photorealistic visual art",
    desc: "Create stunning AI images from text.",
    category: "Design",
    tags: ["Design", "Creativity", "Art", "Visuals"],
    iconBg: "bg-white border border-gray-100 shadow-xs",
    iconType: "midjourney",
    video: {
      badge: "Creative Studio",
      title: "Midjourney V6: From Beginner to Pro Artist",
      duration: "18:20",
      views: "1.5M views",
      handwrittenNote: "Stunning\nVisuals\nInfinite\nStyles 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species through visual generative AI.",
    whatYoullLearn: [
      {
        icon: "sparkles",
        title: "Mastering Midjourney parameters",
        desc: "Use --ar, --stylize, --chaos, and --v 6 for precise control",
      },
      {
        icon: "file",
        title: "Lighting, composition & camera lens styles",
        desc: "Cinematic, editorial, 35mm film, and isometric aesthetics",
      },
      {
        icon: "chart",
        title: "Character consistency & style referencing",
        desc: "Maintain recognizable faces and motifs across an entire series",
      },
      {
        icon: "lightbulb",
        title: "Inpainting and outpainting workflows",
        desc: "Vary region, pan, and zoom to craft expansive masterworks",
      },
    ],
    tutorials: [
      {
        id: "m1",
        title: "Discord & Web Interface Setup Guide",
        duration: "07:30",
        level: "Beginner",
      },
      {
        id: "m2",
        title: "Achieving Hyper-Realistic Human Portraits",
        duration: "14:50",
        level: "Intermediate",
      },
    ],
    prompts: [
      {
        title: "Editorial Fashion Shoot",
        category: "Design",
        prompt:
          "Vogue cover photo of a modern cyberpunk model in structured lilac tailoring, rain reflections, cinematic rim lighting, 35mm portrait, Kodak Portra 400 --ar 4:5 --v 6.0",
      },
      {
        title: "Clean 3D Isometric App Icon",
        category: "Design",
        prompt:
          "Isometric 3D icon of a glowing brain floating over a clean glass desk, soft pastel violet and teal lighting, minimal clean render, Ray tracing, 8k --ar 1:1",
      },
    ],
    useCases: [
      {
        role: "Graphic Designer",
        scenario: "Generating custom textures, hero banner illustrations, and mood boards",
        benefit: "Eliminates high stock photo licensing costs",
      },
      {
        role: "Brand Strategist",
        scenario: "Visualizing packaging and merchandise concepts before production",
        benefit: "Shortens ideation cycles from weeks to hours",
      },
    ],
    faqs: [
      {
        q: "Do I need Discord to use Midjourney?",
        a: "While it originated on Discord, Midjourney now has a modern web interface for active users to generate and browse creations.",
      },
      {
        q: "Can I use Midjourney images commercially?",
        a: "Yes, paid subscribers own the rights to the assets they create for commercial projects.",
      },
    ],
    officialUrl: "https://midjourney.com",
  },
  notion: {
    id: "notion",
    name: "Notion AI",
    tagline: "Your connected workspace with built-in AI intelligence",
    desc: "Organize, plan and boost productivity.",
    category: "Productivity",
    tags: ["Productivity", "Notes", "Knowledge", "Organization"],
    iconBg: "bg-white border border-gray-100 shadow-xs",
    iconType: "notion",
    video: {
      badge: "Work Smarter",
      title: "Build a Second Brain with Notion AI",
      duration: "11:15",
      views: "940K views",
      handwrittenNote: "Clear\nWorkspaces\nOrganized\nLife 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Notion AI transforms how you write, plan, and organize by integrating generative AI seamlessly into documents, wikis, and team databases.",
    whatYoullLearn: [
      {
        icon: "chat",
        title: "Instant meeting summary to action items",
        desc: "Turn scattered bullet notes into clear deliverables with owners",
      },
      {
        icon: "file",
        title: "AI autofill in database properties",
        desc: "Automatically classify, summarize, or tag new entries",
      },
      {
        icon: "sparkles",
        title: "Q&A across your entire workspace",
        desc: "Ask questions and retrieve answers across thousands of company docs",
      },
      {
        icon: "lightbulb",
        title: "Drafting briefs and product specs",
        desc: "Generate complete project templates and release checklists",
      },
    ],
    tutorials: [
      {
        id: "n1",
        title: "Setting up Notion AI autofill database columns",
        duration: "09:10",
        level: "Beginner",
      },
      {
        id: "n2",
        title: "Building an Automated Company Wiki",
        duration: "15:40",
        level: "Intermediate",
      },
    ],
    prompts: [
      {
        title: "Meeting Action Matrix",
        category: "Productivity",
        prompt:
          "Extract all decisions, commitments, deadlines, and unanswered questions from this transcript into a structured table.",
      },
    ],
    useCases: [
      {
        role: "Project Manager",
        scenario: "Auto-updating sprint retrospectives and generating weekly progress status reports",
        benefit: "Keeps team aligned with zero manual status chase-downs",
      },
    ],
    faqs: [
      {
        q: "Is Notion AI included in Notion free plan?",
        a: "Notion gives a limited number of complimentary AI responses, with an add-on subscription for unlimited usage.",
      },
    ],
    officialUrl: "https://notion.so",
  },
  canva: {
    id: "canva",
    name: "Canva AI",
    tagline: "Design anything effortlessly with Magic Studio",
    desc: "Design beautiful content with AI.",
    category: "Design",
    tags: ["Design", "Content", "Marketing", "Visuals"],
    iconBg: "bg-gradient-to-tr from-[#00c4cc] via-[#7d2ae8] to-[#563bfa] shadow-xs",
    iconType: "canva",
    video: {
      badge: "Magic Studio",
      title: "Design Faster with Canva Magic AI Suite",
      duration: "10:50",
      views: "1.1M views",
      handwrittenNote: "Design\nFaster\nStand\nOut 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Canva Magic Studio puts the power of AI into every part of your design workflow, enabling anyone to create social graphics, presentations, and videos in seconds.",
    whatYoullLearn: [
      {
        icon: "sparkles",
        title: "Magic Switch & auto-resizing",
        desc: "Convert a presentation into an executive summary or blog post instantly",
      },
      {
        icon: "file",
        title: "Magic Grab and Magic Expand",
        desc: "Select elements in photos to reposition or expand canvas borders",
      },
      {
        icon: "chart",
        title: "AI slide presentations",
        desc: "Generate multi-slide pitch decks from a single sentence prompt",
      },
      {
        icon: "lightbulb",
        title: "Brand kit enforcement",
        desc: "Keep fonts, palettes, and brand guidelines consistent with AI",
      },
    ],
    tutorials: [
      {
        id: "cv1",
        title: "Creating 10 Social Posts in 5 Minutes",
        duration: "08:15",
        level: "Beginner",
      },
    ],
    prompts: [
      {
        title: "Pitch Deck Generator",
        category: "Marketing",
        prompt:
          "Generate a 6-slide presentation for a mobile productivity app highlighting problem, solution, user traction, and growth roadmap.",
      },
    ],
    useCases: [
      {
        role: "Social Media Manager",
        scenario: "Repurposing a single campaign asset across Instagram, LinkedIn, and TikTok sizes",
        benefit: "Multiplies content output without graphic designer bottlenecks",
      },
    ],
    faqs: [
      {
        q: "Do I need design experience?",
        a: "Not at all. Canva's intuitive drag-and-drop combined with Magic Studio allows anyone to produce professional visuals.",
      },
    ],
    officialUrl: "https://canva.com",
  },
  perplexity: {
    id: "perplexity",
    name: "Perplexity",
    tagline: "Where knowledge begins with cited live search",
    desc: "Search smarter with AI-powered answers.",
    category: "Research",
    tags: ["Research", "Knowledge", "Learning", "Search"],
    iconBg: "bg-white border border-gray-100 shadow-xs",
    iconType: "perplexity",
    video: {
      badge: "Smart Search",
      title: "Perplexity Pro: The Ultimate Research Companion",
      duration: "13:40",
      views: "680K views",
      handwrittenNote: "Reliable\nSources\nDeep\nAnswers 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Perplexity is an AI-powered conversational search engine that delivers comprehensive answers supported by direct citations from verified web sources.",
    whatYoullLearn: [
      {
        icon: "chat",
        title: "Pro Search multi-step reasoning",
        desc: "Let AI ask clarifying questions to drill down to exact facts",
      },
      {
        icon: "file",
        title: "Focus filters (Academic, YouTube, Reddit, Writing)",
        desc: "Narrow searches to peer-reviewed papers or genuine user communities",
      },
      {
        icon: "chart",
        title: "Collections & research notebooks",
        desc: "Organize sources into shareable hubs for team investigation",
      },
      {
        icon: "lightbulb",
        title: "Fact-checking & verification",
        desc: "Trace every claim directly back to the original publisher",
      },
    ],
    tutorials: [
      {
        id: "px1",
        title: "Conducting Academic Literature Reviews with Perplexity",
        duration: "12:10",
        level: "Intermediate",
      },
    ],
    prompts: [
      {
        title: "Competitive Landscape Audit",
        category: "Research",
        prompt:
          "Provide a comparative analysis of the top 3 open-source vector databases in 2026. Compare latency, cost, and community adoption with cited sources.",
      },
    ],
    useCases: [
      {
        role: "Market Researcher",
        scenario: "Verifying live market statistics and competitor product updates",
        benefit: "Delivers reliable cited data with zero hallucination risk",
      },
    ],
    faqs: [
      {
        q: "Does Perplexity cite sources?",
        a: "Yes! Every paragraph includes numbered footnotes that link directly to the source articles so you can verify accuracy.",
      },
    ],
    officialUrl: "https://perplexity.ai",
  },
  zapier: {
    id: "zapier",
    name: "Zapier",
    tagline: "Automate work across 6,000+ apps with AI logic",
    desc: "Automate your work with AI.",
    category: "Development",
    tags: ["Automation", "Productivity", "Integration", "NoCode"],
    iconBg: "bg-white border border-gray-100 shadow-xs",
    iconType: "zapier",
    video: {
      badge: "No-Code Automation",
      title: "Building Autonomous AI Agents with Zapier",
      duration: "16:00",
      views: "520K views",
      handwrittenNote: "Save\nHours\nAutomate\nEverything 💜",
      thumbnail: "/hero_woman_laptop.jpg",
    },
    about:
      "Zapier connects your apps and automates workflows using AI, letting you build custom logic, process leads, and trigger actions without writing code.",
    whatYoullLearn: [
      {
        icon: "code",
        title: "Building your first AI Zap",
        desc: "Trigger actions based on incoming emails, forms, and webhooks",
      },
      {
        icon: "file",
        title: "AI Copilot for Zap creation",
        desc: "Describe what you want in plain English and let Zapier build the workflow",
      },
      {
        icon: "sparkles",
        title: "Zapier Central AI agents",
        desc: "Deploy autonomous bots that monitor spreadsheets and execute actions",
      },
      {
        icon: "lightbulb",
        title: "Conditional path logic and error handling",
        desc: "Create bulletproof workflows that scale with your business",
      },
    ],
    tutorials: [
      {
        id: "zp1",
        title: "Automating Customer Support Triage with AI",
        duration: "14:20",
        level: "Intermediate",
      },
    ],
    prompts: [
      {
        title: "Workflow Blueprint Prompt",
        category: "Automation",
        prompt:
          "Design a 4-step Zapier workflow to ingest customer feedback from a Typeform, run sentiment analysis via OpenAI, send alerts to Slack for negative scores, and log in Airtable.",
      },
    ],
    useCases: [
      {
        role: "Operations Manager",
        scenario: "Automating lead intake, CRM updates, and client onboarding sequences",
        benefit: "Recovers 15+ hours of manual administrative overhead every week",
      },
    ],
    faqs: [
      {
        q: "Do I need coding skills to use Zapier?",
        a: "No! Zapier is built entirely for non-technical users with intuitive visual step-by-step builders.",
      },
    ],
    officialUrl: "https://zapier.com",
  },
};
