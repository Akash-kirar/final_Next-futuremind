"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  ArrowRight,
  Code2,
  Database,
  Monitor,
  Cpu,
  CheckCircle2,
  Clock,
  BookOpen,
  PlayCircle,
  X,
  ChevronRight,
  Award,
  Check,
} from "lucide-react";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge?: "Bestseller" | "Most Popular" | null;
  rating: number;
  reviews: string;
  learners: string;
  price: number;
  originalPrice: number;
  headerBg: string;
  iconType:
    | "mysql"
    | "java"
    | "javascript"
    | "react"
    | "nodejs"
    | "python"
    | "htmlcss"
    | "datascience"
    | "git"
    | "cpp"
    | "dsa"
    | "nextjs";
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "All Levels";
  highlights: string[];
  syllabus: { title: string; duration: string }[];
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: "mysql",
    title: "MySQL Complete Course",
    description: "From basics to advanced with practical projects.",
    category: "Databases",
    badge: "Bestseller",
    rating: 4.8,
    reviews: "12.3K",
    learners: "50,000+ learners",
    price: 499,
    originalPrice: 1499,
    headerBg: "bg-[#eef5fa]",
    iconType: "mysql",
    duration: "18 hours",
    lessons: 48,
    level: "All Levels",
    highlights: [
      "SQL Querying & Complex Joins",
      "Database Design & Index Optimization",
      "Stored Procedures & Triggers",
      "3 Real-world Database Projects",
    ],
    syllabus: [
      { title: "Introduction to Relational Databases & SQL", duration: "2h 15m" },
      { title: "CRUD Operations & Advanced Filtering", duration: "3h 40m" },
      { title: "Table Joins (Inner, Left, Right, Full)", duration: "4h 10m" },
      { title: "Aggregations, Grouping & Window Functions", duration: "3h 20m" },
      { title: "Database Architecture, Indexing & Performance", duration: "4h 35m" },
    ],
  },
  {
    id: "java",
    title: "Java Complete Course",
    description: "Learn core Java, OOPs, DS & build real-world projects.",
    category: "Programming",
    badge: "Most Popular",
    rating: 4.7,
    reviews: "10.1K",
    learners: "42,000+ learners",
    price: 599,
    originalPrice: 1999,
    headerBg: "bg-[#fff1ed]",
    iconType: "java",
    duration: "26 hours",
    lessons: 72,
    level: "Beginner",
    highlights: [
      "Object-Oriented Programming (OOP)",
      "Java Collections Framework & Generics",
      "Multithreading & Exception Handling",
      "Industry Capstone Project",
    ],
    syllabus: [
      { title: "Java Syntax, Variables & Operators", duration: "3h 10m" },
      { title: "Classes, Objects, Inheritance & Polymorphism", duration: "6h 00m" },
      { title: "Data Structures & Collections (List, Map, Set)", duration: "5h 45m" },
      { title: "File I/O, Streams & Exception Handling", duration: "4h 30m" },
      { title: "Building a Banking System Project", duration: "6h 35m" },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript for Beginners",
    description: "Learn modern JavaScript with projects and hands-on practice.",
    category: "Web Dev",
    badge: null,
    rating: 4.8,
    reviews: "9.8K",
    learners: "38,000+ learners",
    price: 499,
    originalPrice: 1499,
    headerBg: "bg-[#fef9e7]",
    iconType: "javascript",
    duration: "22 hours",
    lessons: 60,
    level: "All Levels",
    highlights: [
      "Modern ES6+ Features & Async/Await",
      "DOM Manipulation & Event Listeners",
      "Promises, Fetch API & Closures",
      "5 Interactive Web Apps",
    ],
    syllabus: [
      { title: "Fundamentals, Scope & Execution Context", duration: "4h 00m" },
      { title: "DOM Manipulation & Event-Driven Architecture", duration: "4h 30m" },
      { title: "Asynchronous JS, Promises & Async/Await", duration: "5h 15m" },
      { title: "Object Oriented JS, Prototypes & Classes", duration: "3h 45m" },
      { title: "Building an Interactive Kanban Board", duration: "4h 30m" },
    ],
  },
  {
    id: "react",
    title: "React.js Complete Course",
    description: "Build modern web apps with React, hooks, and real projects.",
    category: "Web Development",
    badge: null,
    rating: 4.7,
    reviews: "8.6K",
    learners: "35,000+ learners",
    price: 699,
    originalPrice: 1999,
    headerBg: "bg-[#eef8fd]",
    iconType: "react",
    duration: "24 hours",
    lessons: 65,
    level: "Intermediate",
    highlights: [
      "Components, JSX & Props System",
      "Custom Hooks & Context API",
      "Tailwind CSS & State Management",
      "Full eCommerce Web Application",
    ],
    syllabus: [
      { title: "React Fundamentals & Component Architecture", duration: "4h 15m" },
      { title: "State Management & React Hooks (useState, useEffect)", duration: "5h 30m" },
      { title: "Custom Hooks & Context API", duration: "4h 00m" },
      { title: "Routing with React Router 6", duration: "3h 45m" },
      { title: "Production eCommerce Store with Cart & Stripe", duration: "6h 30m" },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js Complete Course",
    description: "Build scalable backend apps with Node.js, Express and more.",
    category: "Web Development",
    badge: null,
    rating: 4.6,
    reviews: "7.4K",
    learners: "30,000+ learners",
    price: 699,
    originalPrice: 1999,
    headerBg: "bg-[#edf9f1]",
    iconType: "nodejs",
    duration: "20 hours",
    lessons: 52,
    level: "Intermediate",
    highlights: [
      "RESTful API Development with Express",
      "MongoDB & Mongoose Database Modeling",
      "JWT Authentication & Middleware",
      "Deployment to Production Servers",
    ],
    syllabus: [
      { title: "Node.js Architecture & Event Loop", duration: "3h 10m" },
      { title: "Express Server, Routing & Middleware", duration: "4h 45m" },
      { title: "Database Integration & Data Validation", duration: "4h 15m" },
      { title: "Authentication, Authorization & Security", duration: "3h 50m" },
      { title: "Building a Full REST API Backend", duration: "4h 00m" },
    ],
  },
  {
    id: "python",
    title: "Python for Beginners",
    description: "Learn Python with real-world examples and projects.",
    category: "Programming",
    badge: null,
    rating: 4.8,
    reviews: "11.2K",
    learners: "46,000+ learners",
    price: 499,
    originalPrice: 1499,
    headerBg: "bg-[#eef5fc]",
    iconType: "python",
    duration: "21 hours",
    lessons: 58,
    level: "Beginner",
    highlights: [
      "Core Python, Loops & Functions",
      "File Handling, Modules & Packages",
      "Automation Scripts & Web Scraping",
      "10 Mini Projects for Beginners",
    ],
    syllabus: [
      { title: "Variables, Conditionals & Loops", duration: "3h 30m" },
      { title: "Functions, Lambda & Scope", duration: "3h 45m" },
      { title: "Data Structures (Lists, Tuples, Dictionaries)", duration: "4h 15m" },
      { title: "Web Scraping with BeautifulSoup", duration: "4h 00m" },
      { title: "Automation Scripts & Final Project", duration: "5h 30m" },
    ],
  },
  {
    id: "htmlcss",
    title: "HTML & CSS Complete Course",
    description: "Build beautiful and responsive websites from scratch.",
    category: "Web Development",
    badge: null,
    rating: 4.7,
    reviews: "9.1K",
    learners: "40,000+ learners",
    price: 399,
    originalPrice: 999,
    headerBg: "bg-[#fef3ee]",
    iconType: "htmlcss",
    duration: "16 hours",
    lessons: 44,
    level: "Beginner",
    highlights: [
      "Semantic HTML5 & Modern Standards",
      "Flexbox & CSS Grid Mastery",
      "Responsive Web Design (Mobile First)",
      "4 Responsive Landing Pages",
    ],
    syllabus: [
      { title: "Semantic HTML5 Tags & Accessibility", duration: "2h 45m" },
      { title: "CSS Box Model, Colors & Typography", duration: "3h 30m" },
      { title: "Mastering CSS Flexbox Layouts", duration: "3h 15m" },
      { title: "Mastering CSS Grid Systems", duration: "3h 15m" },
      { title: "Building a Responsive Agency Portfolio", duration: "3h 15m" },
    ],
  },
  {
    id: "datascience",
    title: "Data Science with Python",
    description: "Learn data analysis, visualization and machine learning basics.",
    category: "Data Science",
    badge: null,
    rating: 4.6,
    reviews: "6.8K",
    learners: "25,000+ learners",
    price: 799,
    originalPrice: 2499,
    headerBg: "bg-[#f4f0ff]",
    iconType: "datascience",
    duration: "28 hours",
    lessons: 75,
    level: "Intermediate",
    highlights: [
      "NumPy, Pandas & Data Wrangling",
      "Data Visualization with Matplotlib & Seaborn",
      "Exploratory Data Analysis (EDA)",
      "Machine Learning with Scikit-Learn",
    ],
    syllabus: [
      { title: "Python for Data Analysis & NumPy Arrays", duration: "4h 30m" },
      { title: "Data Wrangling with Pandas", duration: "6h 15m" },
      { title: "Data Visualization & Dashboards", duration: "5h 00m" },
      { title: "Statistical Thinking & Hypothesis Testing", duration: "4h 15m" },
      { title: "Supervised Learning Models (Regression, Classification)", duration: "8h 00m" },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub for Developers",
    description: "Master version control and collaborate like a pro.",
    category: "Development Tools",
    badge: null,
    rating: 4.8,
    reviews: "8.9K",
    learners: "32,000+ learners",
    price: 399,
    originalPrice: 999,
    headerBg: "bg-[#f3f3f8]",
    iconType: "git",
    duration: "10 hours",
    lessons: 28,
    level: "All Levels",
    highlights: [
      "Branching, Merging & Merge Conflicts",
      "Git Rebase, Stash & Cherry-pick",
      "Pull Requests, Code Reviews & CI/CD",
      "Open Source Contribution Guide",
    ],
    syllabus: [
      { title: "Git Basics, Repositories & Commits", duration: "2h 00m" },
      { title: "Branching Strategies & Conflict Resolution", duration: "2h 30m" },
      { title: "Advanced Git: Rebase, Reflog & Bisect", duration: "2h 15m" },
      { title: "GitHub Workflows & Pull Request Best Practices", duration: "1h 45m" },
      { title: "Contributing to Real Open Source Projects", duration: "1h 30m" },
    ],
  },
  {
    id: "cpp",
    title: "C++ for Beginners",
    description: "Learn C++ from basics to advanced with practice.",
    category: "Programming",
    badge: null,
    rating: 4.6,
    reviews: "5.1K",
    learners: "18,000+ learners",
    price: 499,
    originalPrice: 1499,
    headerBg: "bg-[#eef4ff]",
    iconType: "cpp",
    duration: "20 hours",
    lessons: 54,
    level: "Beginner",
    highlights: [
      "Pointers, References & Memory Management",
      "Object-Oriented Programming in C++",
      "Templates & Standard Template Library (STL)",
      "Solving 50+ Coding Questions",
    ],
    syllabus: [
      { title: "C++ Syntax, Control Flow & Functions", duration: "3h 30m" },
      { title: "Pointers, Dynamic Memory & References", duration: "4h 45m" },
      { title: "OOP: Classes, Virtual Functions & Polymorphism", duration: "4h 15m" },
      { title: "C++ STL (Vector, Set, Map, Algorithms)", duration: "4h 30m" },
      { title: "Building a Console-based Management Game", duration: "3h 00m" },
    ],
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master DSA with clear explanations and problem solving.",
    category: "Programming",
    badge: null,
    rating: 4.8,
    reviews: "10.4K",
    learners: "45,000+ learners",
    price: 699,
    originalPrice: 1999,
    headerBg: "bg-[#fff0f2]",
    iconType: "dsa",
    duration: "35 hours",
    lessons: 95,
    level: "Intermediate",
    highlights: [
      "Arrays, Linked Lists, Stacks & Queues",
      "Trees, Binary Search Trees & Graphs",
      "Dynamic Programming & Recursion",
      "150+ Top LeetCode Interview Questions",
    ],
    syllabus: [
      { title: "Time & Space Complexity (Big-O Analysis)", duration: "2h 30m" },
      { title: "Linear Data Structures (Arrays, Lists, Stacks)", duration: "7h 00m" },
      { title: "Non-linear Structures (Trees, Heaps, Graphs)", duration: "9h 30m" },
      { title: "Sorting, Searching & Recursion Patterns", duration: "6h 00m" },
      { title: "Dynamic Programming & Greedy Algorithms", duration: "10h 00m" },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js Complete Course",
    description: "Build production-ready web apps with Next.js.",
    category: "Web Development",
    badge: null,
    rating: 4.7,
    reviews: "6.2K",
    learners: "22,000+ learners",
    price: 799,
    originalPrice: 2499,
    headerBg: "bg-[#f4f5f7]",
    iconType: "nextjs",
    duration: "18 hours",
    lessons: 46,
    level: "Intermediate",
    highlights: [
      "App Router, Server & Client Components",
      "Server Actions & Data Mutation",
      "SEO Optimization & Metadata",
      "Full Stack SaaS Application with Auth",
    ],
    syllabus: [
      { title: "Next.js 15 App Router & Layouts", duration: "3h 15m" },
      { title: "Server Components vs Client Components", duration: "3h 30m" },
      { title: "Server Actions, Mutations & Route Handlers", duration: "4h 00m" },
      { title: "Authentication, Database Integration & Caching", duration: "4h 15m" },
      { title: "Building & Deploying a Production SaaS", duration: "3h 00m" },
    ],
  },
];

const CATEGORIES = [
  { name: "All", icon: null },
  { name: "Programming", icon: Code2 },
  { name: "Databases", icon: Database },
  { name: "Web Dev", icon: Monitor },
  { name: "AI & ML", icon: Cpu },
];

export default function ProgrammingCoursesView({
  onSwitchCategory,
}: {
  onSwitchCategory?: (cat: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [showLearningPathsModal, setShowLearningPathsModal] = useState(false);
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);

  // Filter courses based on active category and search query
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory =
        activeCategory === "All" ||
        course.category === activeCategory ||
        (activeCategory === "Web Dev" &&
          (course.category === "Web Dev" ||
            course.category === "Web Development")) ||
        (activeCategory === "AI & ML" &&
          (course.category === "AI & ML" ||
            course.category === "Data Science"));

      const matchesSearch =
        searchQuery.trim() === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleEnroll = (course: CourseItem) => {
    if (!enrolledCourses.includes(course.id)) {
      setEnrolledCourses((prev) => [...prev, course.id]);
    }
    setEnrollSuccessMsg(course.title);
    setTimeout(() => {
      setEnrollSuccessMsg(null);
    }, 3500);
  };

  const scrollToCourses = () => {
    const el = document.getElementById("popular-courses-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 pb-6 md:pb-12">
      {/* Toast Notification for Enrollment */}
      {enrollSuccessMsg && (
        <div className="fixed bottom-[calc(var(--bottom-nav-height)+1rem)] inset-x-4 sm:left-auto sm:max-w-md z-50 bg-[#00ba66] text-white px-4 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 size={20} className="flex-shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Enrolled Successfully
            </div>
            <div className="text-sm font-semibold">{enrollSuccessMsg}</div>
          </div>
          <button
            onClick={() => setEnrollSuccessMsg(null)}
            className="ml-2 hover:opacity-80 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        {/* ================= HERO SECTION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center mb-8 sm:mb-12">
          {/* Left Column */}
          <div className="min-w-0 md:col-span-7 flex flex-col justify-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f3f4f6] border border-gray-200/80 text-xs font-semibold text-gray-800 w-fit mb-4">
              <span>Learn. Build. Grow.</span>
            </div>

            {/* Main Headline */}
            <h1 className="max-w-[16ch] text-4xl sm:text-5xl lg:text-[50px] font-black tracking-tight text-gray-950 leading-[1.08] mb-3.5">
              Skills for a <br className="md:block hidden" />
              <span className="text-[#00ba66]">Brighter</span> <br className="md:block hidden" />
              <span className="text-[#00ba66]">Tomorrow.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-md mb-6 font-normal">
              Practical, project-based courses to help you build in-demand
              skills, get certified, and achieve your goals.
            </p>

            {/* CTA Buttons */}
            <div className="grid gap-2.5 min-[26rem]:flex min-[26rem]:flex-wrap mb-5 sm:mb-8">
              <button
                onClick={scrollToCourses}
                className="min-h-11 bg-[#00ba66] hover:bg-[#00a85a] text-white font-bold text-sm px-5 py-2.5 rounded-full flex justify-center items-center gap-2 shadow-sm transition-all cursor-pointer group"
              >
                <span>Explore Courses</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              <button
                onClick={() => setShowLearningPathsModal(true)}
                className="min-h-11 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm px-5 py-2.5 rounded-full border border-gray-300 transition-all cursor-pointer shadow-2xs"
              >
                View Learning Paths
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between gap-2 sm:justify-start sm:gap-6 pt-2 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                  50K+
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  Learners
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                  200+
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  Courses
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                  4.8/5
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  Avg. Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Book Stack with Plant Illustration */}
          <div className="min-w-0 md:col-span-5 flex justify-center items-center relative">
            <BookStackIllustration />
          </div>
        </section>

        {/* ================= BROWSE BY CATEGORY SECTION ================= */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
              Browse by Category
            </h2>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-[#00ba66] text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Category Pills Row */}
          <div className="flex items-center gap-2.5 overflow-x-auto sm:flex-wrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    if (onSwitchCategory && cat.name === "All") {
                      // Keep state synced
                    }
                  }}
                  className={`flex min-h-11 shrink-0 items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#00ba66] text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={15}
                      className={
                        isSelected
                          ? "text-white"
                          : cat.name === "Databases"
                          ? "text-emerald-600"
                          : "text-blue-500"
                      }
                    />
                  )}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= POPULAR COURSES SECTION ================= */}
        <section id="popular-courses-section" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
              Popular Courses
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
              Start learning the most in-demand skills, chosen by learners like you.
            </p>
          </div>

          {/* Course Grid: 2 columns matching reference */}
          {filteredCourses.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
              <BookOpen size={36} className="mx-auto text-gray-300 mb-3" />
              <div className="text-base font-bold text-gray-800">
                No courses found
              </div>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                No courses matched your search or category filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="bg-[#00ba66] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#00a85a]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledCourses.includes(course.id);

                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white rounded-2xl border border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Card Thumbnail / Header Area */}
                      <div
                        className={`h-36 sm:h-40 w-full ${course.headerBg} relative flex items-center justify-center p-4 overflow-hidden border-b border-gray-100/60`}
                      >
                        {/* Badge (Bestseller / Most Popular) */}
                        {course.badge && (
                          <div
                            className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-2xs ${
                              course.badge === "Bestseller"
                                ? "bg-[#fed7aa] text-[#9a3412]"
                                : "bg-[#d1fae5] text-[#065f46]"
                            }`}
                          >
                            {course.badge}
                          </div>
                        )}

                        {/* Technology Logo Rendering */}
                        <div className="transform group-hover:scale-105 transition-transform duration-200">
                          <CourseLogoIcon type={course.iconType} />
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-4 sm:p-5">
                        <h3 className="font-extrabold text-gray-950 text-base sm:text-[17px] leading-snug group-hover:text-[#00ba66] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                          {course.description}
                        </p>

                        {/* Rating Row with learners on same line */}
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-700 font-semibold mt-3">
                          <div className="flex items-center gap-1">
                            <Star
                              size={14}
                              className="text-[#f59e0b] fill-[#f59e0b]"
                            />
                            <span>{course.rating}</span>
                            <span className="text-gray-400 font-normal">
                              ({course.reviews})
                            </span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-500 font-normal">
                            {course.learners}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action Row */}
                    <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black text-gray-950">
                          ₹{course.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ₹{course.originalPrice}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(course);
                        }}
                        className={`size-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                          isEnrolled
                            ? "bg-[#00ba66] text-white"
                            : "bg-[#bbf7d0] text-[#15803d] hover:bg-[#86efac]"
                        }`}
                        title={isEnrolled ? "Enrolled" : "Enroll Now"}
                      >
                        {isEnrolled ? (
                          <CheckCircle2 size={18} strokeWidth={2.5} />
                        ) : (
                          <ArrowRight size={18} strokeWidth={2.5} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* ================= COURSE DETAILS MODAL ================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 p-2 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header Visual Banner */}
            <div
              className={`w-full h-44 sm:h-52 ${selectedCourse.headerBg} flex items-center justify-center p-6 relative`}
            >
              <div className="scale-125">
                <CourseLogoIcon type={selectedCourse.iconType} />
              </div>
              {selectedCourse.badge && (
                <div
                  className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                    selectedCourse.badge === "Bestseller"
                      ? "bg-[#fef3c7] text-[#b45309]"
                      : "bg-[#dcfce7] text-[#15803d]"
                  }`}
                >
                  {selectedCourse.badge}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00ba66] mb-1">
                <span>{selectedCourse.category}</span>
                <span>•</span>
                <span>{selectedCourse.level}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-2">
                {selectedCourse.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {selectedCourse.description}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 py-3 border-y border-gray-100 mb-6">
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <Star size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
                  <span>{selectedCourse.rating}</span>
                  <span className="text-gray-400 font-normal">
                    ({selectedCourse.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" />
                  <span>{selectedCourse.duration} of content</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} className="text-gray-400" />
                  <span>{selectedCourse.lessons} comprehensive lectures</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={14} className="text-gray-400" />
                  <span>Certificate included</span>
                </div>
              </div>

              {/* What You'll Learn Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3">
                  What you&apos;ll master:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCourse.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[#00ba66] flex-shrink-0 mt-0.5"
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-3">
                  Course Modules & Curriculum:
                </h4>
                <div className="space-y-2">
                  {selectedCourse.syllabus.map((module, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50/70 text-xs text-gray-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <PlayCircle size={15} className="text-gray-400 shrink-0" />
                        <span className="font-semibold">
                          Module {idx + 1}: {module.title}
                        </span>
                      </div>
                      <span className="shrink-0 text-gray-400 font-medium">
                        {module.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-400 font-medium">
                    Special Limited Offer
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">
                      ₹{selectedCourse.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{selectedCourse.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      SAVE{" "}
                      {Math.round(
                        (1 -
                          selectedCourse.price / selectedCourse.originalPrice) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="min-h-11 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleEnroll(selectedCourse);
                      setSelectedCourse(null);
                    }}
                    className={`min-h-11 flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      enrolledCourses.includes(selectedCourse.id)
                        ? "bg-gray-900 text-white"
                        : "bg-[#00ba66] hover:bg-[#00a85a] text-white"
                    }`}
                  >
                    {enrolledCourses.includes(selectedCourse.id) ? (
                      <>
                        <Check size={14} />
                        <span>Already Enrolled</span>
                      </>
                    ) : (
                      <>
                        <span>Enroll Now</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEARNING PATHS MODAL ================= */}
      {showLearningPathsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-full overflow-y-auto overscroll-contain p-4 sm:p-8 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowLearningPathsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"
            >
              <X size={18} />
            </button>

            <div className="text-xs font-bold uppercase tracking-wider text-[#00ba66] mb-1">
              Curated Roadmaps
            </div>
            <h3 className="pr-8 text-2xl font-black text-gray-900 mb-2">
              Career Learning Paths
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Step-by-step tracks structured to take you from beginner to job-ready.
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  title: "Full-Stack Web Developer",
                  duration: "6 Months • 4 Courses",
                  desc: "HTML, CSS, Modern JavaScript, React.js, Node.js & Next.js",
                  badge: "Highest Demand",
                },
                {
                  title: "Backend Java & Cloud Engineer",
                  duration: "5 Months • 3 Courses",
                  desc: "Core Java, OOPs, Spring Boot, MySQL & System Architecture",
                  badge: "Enterprise Ready",
                },
                {
                  title: "Data Science & AI Specialist",
                  duration: "7 Months • 3 Courses",
                  desc: "Python for Beginners, Data Science, Machine Learning & SQL",
                  badge: "Emerging Tech",
                },
              ].map((path, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setShowLearningPathsModal(false);
                    scrollToCourses();
                  }}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-bold text-sm text-gray-900">
                        {path.title}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {path.badge}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {path.desc}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium mt-1">
                      {path.duration}
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-gray-400" />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowLearningPathsModal(false);
                scrollToCourses();
              }}
              className="w-full bg-[#00ba66] hover:bg-[#00a85a] text-white font-bold text-sm py-3 rounded-xl transition-all"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= BOOK STACK WITH SPROUT ILLUSTRATION =================
function BookStackIllustration() {
  return (
    <div className="relative w-full max-w-[17rem] sm:max-w-[22rem] lg:max-w-[380px] aspect-[19/16] flex items-center justify-center select-none">
      {/* Soft circular radial glow behind */}
      <div className="absolute w-3/4 aspect-square rounded-full bg-[#dcfce7]/80 blur-2xl -z-10" />

      {/* Handwritten text at top right */}
      <div className="absolute top-2 right-4 text-right leading-tight select-none pointer-events-none rotate-6 z-20">
        <div className="text-gray-900 font-extrabold tracking-tight text-lg sm:text-xl leading-none">
          Same
        </div>
        <div className="text-gray-900 font-extrabold tracking-tight text-lg sm:text-xl leading-none">
          Students
        </div>
        <div className="text-gray-900 font-extrabold tracking-tight text-lg sm:text-xl leading-none">
          Bigger
        </div>
        <div className="text-gray-900 font-extrabold tracking-tight text-lg sm:text-xl leading-none">
          Futures
        </div>
      </div>

      <svg
        viewBox="0 0 340 300"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="topBookGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="leafGradLeft" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="leafGradRight" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Soft ground shadow under book stack */}
        <ellipse cx="165" cy="264" rx="96" ry="14" fill="#0f172a" fillOpacity="0.09" />

        {/* ================= BOTTOM BOOK: "Better Career" ================= */}
        {/* Bottom Book Top surface */}
        <path
          d="M72 216 L202 186 L262 202 L132 232 Z"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {/* Bottom Book Spine (Front/Left) */}
        <path
          d="M72 216 L132 232 L132 258 L72 242 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        {/* Bottom Book Pages (Right) */}
        <path
          d="M132 232 L262 202 L262 228 L132 258 Z"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {/* Page lines */}
        <line x1="138" y1="239" x2="256" y2="209" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="138" y1="245" x2="256" y2="215" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="138" y1="251" x2="256" y2="221" stroke="#e2e8f0" strokeWidth="0.8" />
        {/* Text on Spine: Better Career */}
        <text
          x="79"
          y="238"
          fill="#1e293b"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.02em"
          transform="rotate(15 79 238)"
        >
          Better Career
        </text>

        {/* ================= MIDDLE BOOK: "Projects" ================= */}
        {/* Middle Book Top surface */}
        <path
          d="M82 178 L200 150 L254 165 L136 193 Z"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {/* Middle Book Spine */}
        <path
          d="M82 178 L136 193 L136 219 L82 204 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        {/* Middle Book Pages */}
        <path
          d="M136 193 L254 165 L254 191 L136 219 Z"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <line x1="142" y1="200" x2="248" y2="172" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="142" y1="206" x2="248" y2="178" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="142" y1="212" x2="248" y2="184" stroke="#e2e8f0" strokeWidth="0.8" />
        {/* Text on Spine: Projects */}
        <text
          x="90"
          y="201"
          fill="#1e293b"
          fontSize="10"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.02em"
          transform="rotate(15 90 201)"
        >
          Projects
        </text>

        {/* ================= TOP BOOK: "Skills" (Green) ================= */}
        {/* Top Book Top surface (Rich green) */}
        <path
          d="M94 140 L202 114 L248 127 L140 153 Z"
          fill="#15803d"
          stroke="#166534"
          strokeWidth="1"
        />
        {/* Top Book Spine (Green) */}
        <path
          d="M94 140 L140 153 L140 179 L94 166 Z"
          fill="#16a34a"
          stroke="#15803d"
          strokeWidth="1"
        />
        {/* Top Book Pages */}
        <path
          d="M140 153 L248 127 L248 153 L140 179 Z"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <line x1="145" y1="160" x2="242" y2="134" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="145" y1="166" x2="242" y2="140" stroke="#e2e8f0" strokeWidth="0.8" />
        <line x1="145" y1="172" x2="242" y2="146" stroke="#e2e8f0" strokeWidth="0.8" />
        {/* Text on Spine: Skills */}
        <text
          x="98"
          y="163"
          fill="#ffffff"
          fontSize="10.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.04em"
          transform="rotate(15 98 163)"
        >
          Skills
        </text>

        {/* ================= GREEN SPROUT GROWING FROM TOP BOOK ================= */}
        {/* Stem */}
        <path
          d="M172 132 C172 96, 166 66, 170 42"
          stroke="#15803d"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Left Leaf */}
        <path
          d="M169 82 C142 78, 122 56, 132 38 C148 40, 163 60, 169 82 Z"
          fill="url(#leafGradLeft)"
          stroke="#15803d"
          strokeWidth="1.5"
        />
        {/* Left Leaf Vein */}
        <path
          d="M136 41 C146 51, 157 65, 167 79"
          stroke="#166534"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right Leaf */}
        <path
          d="M171 68 C194 63, 212 44, 205 27 C190 30, 176 49, 171 68 Z"
          fill="url(#leafGradRight)"
          stroke="#15803d"
          strokeWidth="1.5"
        />
        {/* Right Leaf Vein */}
        <path
          d="M201 30 C192 40, 181 53, 172 66"
          stroke="#14532d"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Little Top Bud Leaf */}
        <path
          d="M170 42 C163 32, 172 23, 177 25 C179 32, 175 39, 170 42 Z"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ================= TECH LOGO ICONS =================
function CourseLogoIcon({
  type,
}: {
  type: CourseItem["iconType"];
}) {
  switch (type) {
    case "mysql":
      return (
        <div className="flex flex-col items-center">
          {/* Authentic Dolphin Shape + MySQL text */}
          <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 100 70" fill="none">
            {/* Dolphin Back/Fin */}
            <path
              d="M15 50 C25 25, 60 10, 85 20 C70 12, 50 16, 40 28 C45 22, 58 18, 70 24 C55 30, 42 42, 38 52 Z"
              fill="#00758f"
            />
            {/* Dolphin Snout & Tail */}
            <path
              d="M85 20 C92 24, 94 28, 90 30 C82 32, 70 28, 65 32 C75 36, 85 45, 92 48 C85 46, 75 42, 68 40 C52 48, 30 54, 15 50 C8 48, 4 44, 2 40 C12 40, 25 45, 35 44 C25 42, 12 36, 6 30 C18 32, 30 38, 42 36 Z"
              fill="#005e73"
            />
            {/* Orange eye/accent */}
            <circle cx="86" cy="25" r="2.5" fill="#f29111" />
          </svg>
          <span className="text-[#00758f] font-black tracking-tight text-lg mt-0.5">
            MySQL<span className="text-[#f29111]">.</span>
          </span>
        </div>
      );

    case "java":
      return (
        <div className="flex flex-col items-center">
          {/* Steaming Coffee Cup */}
          <svg className="w-16 h-16 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
            {/* Steam curves */}
            <path
              d="M26 12 C24 8, 28 4, 30 2"
              stroke="#e76f51"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M34 14 C32 10, 36 6, 38 4"
              stroke="#e76f51"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M30 20 C28 16, 32 14, 34 11"
              stroke="#2a9d8f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Cup Body */}
            <path
              d="M18 24 L46 24 C46 38, 40 44, 32 44 C24 44, 18 38, 18 24 Z"
              fill="#5382a1"
            />
            {/* Cup Handle */}
            <path
              d="M45 27 C51 27, 51 37, 44 38"
              stroke="#5382a1"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Saucer */}
            <path
              d="M14 48 C24 51, 40 51, 50 48"
              stroke="#e76f51"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[#5382a1] font-black text-sm uppercase tracking-wider mt-0.5">
            Java
          </span>
        </div>
      );

    case "javascript":
      return (
        <div className="w-16 h-16 rounded-xl bg-[#f7df1e] text-black font-black flex items-end justify-end p-2 shadow-md">
          <span className="text-3xl font-extrabold tracking-tighter leading-none">
            JS
          </span>
        </div>
      );

    case "react":
      return (
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 animate-spin-slow" viewBox="0 0 64 64" fill="none">
            {/* Nucleus */}
            <circle cx="32" cy="32" r="5" fill="#00d8ff" />
            {/* Orbit 1 */}
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="9"
              stroke="#00d8ff"
              strokeWidth="2"
            />
            {/* Orbit 2 */}
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="9"
              stroke="#00d8ff"
              strokeWidth="2"
              transform="rotate(60 32 32)"
            />
            {/* Orbit 3 */}
            <ellipse
              cx="32"
              cy="32"
              rx="24"
              ry="9"
              stroke="#00d8ff"
              strokeWidth="2"
              transform="rotate(120 32 32)"
            />
          </svg>
        </div>
      );

    case "nodejs":
      return (
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            {/* Hexagon */}
            <polygon
              points="32,8 54,20 54,44 32,56 10,44 10,20"
              fill="#339933"
            />
            {/* Subtle 3D shading */}
            <polygon points="32,8 54,20 32,32 10,20" fill="#43a047" />
            <polygon points="32,32 54,20 54,44 32,56" fill="#2e7d32" />
          </svg>
          <span className="text-[#339933] font-black text-sm lowercase tracking-tight mt-0.5">
            node
          </span>
        </div>
      );

    case "python":
      return (
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            {/* Top Blue Snake */}
            <path
              d="M31 8 C22 8, 20 12, 20 16 L20 22 L32 22 L32 24 L16 24 C10 24, 8 28, 8 36 C8 42, 12 44, 18 44 L22 44 L22 38 C22 32, 26 28, 32 28 L40 28 C44 28, 46 26, 46 22 L46 16 C46 10, 42 8, 31 8 Z"
              fill="#3776ab"
            />
            <circle cx="26" cy="14" r="2" fill="white" />
            {/* Bottom Yellow Snake */}
            <path
              d="M33 56 C42 56, 44 52, 44 48 L44 42 L32 42 L32 40 L48 40 C54 40, 56 36, 56 28 C56 22, 52 20, 46 20 L42 20 L42 26 C42 32, 38 36, 32 36 L24 36 C20 36, 18 38, 18 42 L18 48 C18 54, 22 56, 33 56 Z"
              fill="#ffd43b"
            />
            <circle cx="38" cy="50" r="2" fill="#202020" />
          </svg>
        </div>
      );

    case "htmlcss":
      return (
        <div className="flex items-center gap-2">
          {/* HTML5 Shield */}
          <div className="flex flex-col items-center">
            <svg className="w-10 h-12" viewBox="0 0 40 48" fill="none">
              <polygon points="4,4 36,4 33,40 20,44 7,40" fill="#e44d26" />
              <polygon points="20,7 33,7 30,37 20,40" fill="#f16529" />
              {/* White "5" */}
              <path
                d="M13 14 L27 14 L26 18 L17 18 L18 23 L26 23 L25 33 L20 35 L15 33 L14 28 L18 28 L19 30 L22 30 L22 26 L13 26 Z"
                fill="white"
              />
            </svg>
          </div>
          {/* CSS3 Shield */}
          <div className="flex flex-col items-center">
            <svg className="w-10 h-12" viewBox="0 0 40 48" fill="none">
              <polygon points="4,4 36,4 33,40 20,44 7,40" fill="#264de4" />
              <polygon points="20,7 33,7 30,37 20,40" fill="#2965f1" />
              {/* White "3" */}
              <path
                d="M13 14 L27 14 L26 20 L20 20 L20 23 L26 23 L25 33 L20 35 L15 33 L14 28 L18 28 L19 30 L22 30 L23 26 L13 26 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      );

    case "datascience":
      return (
        <div className="flex flex-col items-center">
          {/* 3D Purple Bar Chart */}
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            {/* Bar 1 */}
            <rect x="14" y="36" width="10" height="20" rx="3" fill="#818cf8" />
            {/* Bar 2 */}
            <rect x="28" y="22" width="10" height="34" rx="3" fill="#6366f1" />
            {/* Bar 3 */}
            <rect x="42" y="12" width="10" height="44" rx="3" fill="#4f46e5" />
            {/* Trending Line Accent */}
            <path
              d="M16 34 L32 18 L46 8"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      );

    case "git":
      return (
        <div className="flex flex-col items-center">
          {/* GitHub Cat Silhouette */}
          <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 8 C18.7 8 8 18.7 8 32 C8 42.6 14.9 51.6 24.5 54.8 C25.7 55 26.1 54.3 26.1 53.6 C26.1 53 26.1 51.2 26.1 48.9 C19.4 50.4 18 45.7 18 45.7 C16.9 42.9 15.3 42.2 15.3 42.2 C13.1 40.7 15.5 40.7 15.5 40.7 C17.9 40.9 19.2 43.2 19.2 43.2 C21.4 46.9 24.9 45.8 26.3 45.2 C26.5 43.6 27.1 42.5 27.8 41.9 C22.5 41.3 16.9 39.2 16.9 30 C16.9 27.4 17.8 25.3 19.3 23.6 C19.1 23 18.2 20.5 19.5 17.2 C19.5 17.2 21.5 16.6 26.1 19.7 C28 19.2 30 18.9 32 18.9 C34 18.9 36 19.2 37.9 19.7 C42.5 16.6 44.5 17.2 44.5 17.2 C45.8 20.5 44.9 23 44.7 23.6 C46.2 25.3 47.1 27.4 47.1 30 C47.1 39.3 41.5 41.3 36.1 41.9 C37 42.7 37.8 44.2 37.8 46.5 C37.8 49.8 37.8 52.5 37.8 53.6 C37.8 54.3 38.2 55.1 39.5 54.8 C49.1 51.6 56 42.6 56 32 C56 18.7 45.3 8 32 8 Z"
              fill="#24292e"
            />
          </svg>
        </div>
      );

    case "cpp":
      return (
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            <polygon
              points="32,8 54,20 54,44 32,56 10,44 10,20"
              fill="#00599c"
            />
            {/* C++ text */}
            <text
              x="32"
              y="38"
              textAnchor="middle"
              fill="white"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="16"
            >
              C++
            </text>
          </svg>
        </div>
      );

    case "dsa":
      return (
        <div className="flex flex-col items-center">
          {/* Coral Network Graph / Tree nodes */}
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            {/* Connecting lines */}
            <line x1="32" y1="18" x2="20" y2="42" stroke="#e11d48" strokeWidth="3" />
            <line x1="32" y1="18" x2="44" y2="42" stroke="#e11d48" strokeWidth="3" />
            <line x1="20" y1="42" x2="44" y2="42" stroke="#e11d48" strokeWidth="3" />
            {/* Nodes */}
            <circle cx="32" cy="18" r="6" fill="#e11d48" stroke="white" strokeWidth="2" />
            <circle cx="20" cy="42" r="6" fill="#fb7185" stroke="white" strokeWidth="2" />
            <circle cx="44" cy="42" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      );

    case "nextjs":
      return (
        <div className="flex flex-col items-center">
          {/* Black circle with white N */}
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white shadow-md">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 19 L19 5 M5 19 L19 19 M5 5 L5 19 L17 19"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      );

    default:
      return <Code2 size={36} className="text-[#00ba66]" />;
  }
}
