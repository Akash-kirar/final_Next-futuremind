"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  BarChart2,
  Link as LinkIcon,
  MoreHorizontal,
  Plus,
  X,
  Sparkles,
  Send,
  Check,
  Users,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  badge: {
    text: string;
    type: "top-learner" | "ai-explorer" | "helpful-member";
    icon: string;
    bg: string;
    color: string;
  };
  time: string;
  content: string;
  promptQuote?: string;
  image?: string;
  imageBadge?: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  category: "Discussions" | "Showcase" | "Study Groups";
  comments: Comment[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    author: "Sneha Verma",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    badge: {
      text: "Top Learner",
      type: "top-learner",
      icon: "👍",
      bg: "bg-[#eef2ff]",
      color: "text-[#4f46e5]",
    },
    time: "2 hours ago",
    content:
      "I used this prompt to create a study plan and it worked amazingly! 🚀",
    promptQuote:
      '"Create a 30-day study plan for learning web development. Include daily topics, resources, and practice projects."',
    likes: 120,
    commentsCount: 24,
    tags: ["ChatGPT", "Productivity", "Learning"],
    category: "Discussions",
    comments: [
      {
        id: "c1",
        author: "Alex Rivers",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        time: "1 hour ago",
        text: "Tried this prompt with Claude 3.5 Sonnet as well and the output was super structured!",
      },
      {
        id: "c2",
        author: "Priya Sharma",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
        time: "45 mins ago",
        text: "Bookmarked! Love how it breaks down practice projects per week.",
      },
    ],
  },
  {
    id: "post-2",
    author: "Rohan Mehta",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
    badge: {
      text: "AI Explorer",
      type: "ai-explorer",
      icon: "⚡",
      bg: "bg-[#ecfdf5]",
      color: "text-[#059669]",
    },
    time: "5 hours ago",
    content: "Made this AI-generated design using Midjourney. Feedback welcome!",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    imageBadge: "1/3",
    likes: 89,
    commentsCount: 16,
    tags: ["Midjourney", "AIArt", "Design", "Showcase"],
    category: "Showcase",
    comments: [
      {
        id: "c3",
        author: "David Chen",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        time: "3 hours ago",
        text: "The lighting on the snow ridge is breathtaking! What stylize parameter did you use?",
      },
      {
        id: "c4",
        author: "Rohan Mehta",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop",
        time: "2 hours ago",
        text: "Used --s 250 and --v 6.1 with raw style!",
      },
    ],
  },
  {
    id: "post-3",
    author: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&auto=format&fit=crop",
    badge: {
      text: "Helpful Member",
      type: "helpful-member",
      icon: "⭐",
      bg: "bg-[#eff6ff]",
      color: "text-[#2563eb]",
    },
    time: "1 day ago",
    content:
      "Which AI tool do you use most for productivity and why? Let's discuss! 👇",
    likes: 64,
    commentsCount: 38,
    tags: ["Productivity", "AITools", "Discussion"],
    category: "Study Groups",
    comments: [
      {
        id: "c5",
        author: "Sneha Verma",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
        time: "18 hours ago",
        text: "Claude 3.5 Sonnet for writing and analysis, ChatGPT for quick day-to-day calculations.",
      },
    ],
  },
];

const AVATAR_LIST = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=120&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
];

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState<
    "All Posts" | "Discussions" | "Showcase" | "Study Groups"
  >("All Posts");

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );
  const [commentInput, setCommentInput] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalPostType, setModalPostType] = useState<
    "Discussions" | "Showcase" | "Study Groups"
  >("Discussions");
  const [modalPromptQuote, setModalPromptQuote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs: ("All Posts" | "Discussions" | "Showcase" | "Study Groups")[] = [
    "All Posts",
    "Discussions",
    "Showcase",
    "Study Groups",
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLike = (postId: string) => {
    const isLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: "Akash Kumar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
      badge: {
        text: "New Explorer",
        type: "ai-explorer",
        icon: "⚡",
        bg: "bg-[#ecfdf5]",
        color: "text-[#059669]",
      },
      time: "Just now",
      content: newPostText,
      likes: 1,
      commentsCount: 0,
      tags: ["AI", "Learning", "Community"],
      category: "Discussions",
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    showToast("Post shared with the community!");
  };

  const handleCreateFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: "Akash Kumar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
      badge: {
        text: "Top Contributor",
        type: "top-learner",
        icon: "👍",
        bg: "bg-[#eef2ff]",
        color: "text-[#4f46e5]",
      },
      time: "Just now",
      content: newPostText,
      promptQuote: modalPromptQuote ? `"${modalPromptQuote}"` : undefined,
      likes: 1,
      commentsCount: 0,
      tags: ["AICommunity", modalPostType],
      category: modalPostType,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setModalPromptQuote("");
    setShowCreateModal(false);
    showToast("New post published successfully!");
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "Akash Kumar",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop",
      time: "Just now",
      text: commentInput,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCommentInput("");
    showToast("Comment added!");
  };

  const handleShare = (post: Post) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out this AI post from ${post.author}: "${post.content}"`
      );
      showToast("Post link copied to clipboard!");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedTab === "All Posts") return true;
    return post.category === selectedTab;
  });

  return (
    <div className="min-h-full bg-[#fcfdff] pb-20 selection:bg-violet-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        {/* Top Header Section with Right Decorative Art */}
        <div className="relative flex items-start justify-between gap-2 mb-4">
          <div className="z-10">
            <h1 className="text-[32px] sm:text-[38px] font-black text-gray-900 tracking-tight leading-[1.08] mb-1.5">
              Join Our <span className="text-[#563bfa]">Community</span>
            </h1>
            <p className="text-sm text-gray-500 font-normal">
              Learn together, share ideas, and grow with AI.
            </p>
          </div>

          {/* Top Right Decorative Illustration matching Reference */}
          <div className="relative select-none pointer-events-none flex flex-col items-end flex-shrink-0">
            {/* Subtle floating purple avatar silhouettes and speech bubble */}
            <div className="flex items-center gap-1 mb-1 opacity-90">
              <div className="w-8 h-8 rounded-full bg-[#f2ebff] flex items-center justify-center text-[#7c3aed]">
                <MessageCircle size={15} className="fill-[#7c3aed]" />
              </div>
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-[#ede6ff] border border-white flex items-center justify-center text-[#563bfa]">
                  <Users size={12} />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#e3d7ff] border border-white flex items-center justify-center text-[#563bfa]">
                  <Users size={12} />
                </div>
              </div>
            </div>

            {/* Handwritten purple script matching the design language */}
            <div className="text-right font-handwriting text-[#7c3aed] text-[13px] sm:text-[14px] leading-[1.12] rotate-1">
              <div>Better</div>
              <div>Questions</div>
              <div>Bigger</div>
              <div>Possibilities</div>
              <div className="text-xs mt-0.5">💜</div>
            </div>
          </div>
        </div>

        {/* Avatars Stack & 10K+ learners pill */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex -space-x-2">
            {AVATAR_LIST.map((src, i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-2xs relative"
              >
                <Image
                  src={src}
                  alt={`Learner ${i + 1}`}
                  fill
                  sizes="36px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <div className="bg-[#f2f4f8] px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-gray-700">
            10K+ learners
          </div>
        </div>

        {/* Filter Pills Tabs (All Posts, Discussions, Showcase, Study Groups) */}
        <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap pb-1 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`min-h-11 shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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

        {/* Create Post Input Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-4.5 border border-gray-100 shadow-2xs mb-5 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 border border-gray-100 shadow-2xs">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240&auto=format&fit=crop"
                alt="My Profile"
                fill
                sizes="40px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <input
              type="text"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreatePost();
              }}
              placeholder="Share your thoughts, questions, or learning progress..."
              className="bg-[#f8f9fb] min-w-0 flex-1 py-2.5 sm:py-3 px-4 rounded-full text-base lg:text-sm text-gray-800 placeholder:text-gray-400 outline-none border border-transparent focus:border-[#563bfa] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-2 pl-1 sm:pl-12 pr-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <ImageIcon size={15} className="text-gray-400" />
                <span>Photo</span>
              </button>
              <button
                onClick={() => {
                  setNewPostText(
                    "Quick Poll: What is your #1 AI tool for everyday work?"
                  );
                }}
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <BarChart2 size={15} className="text-gray-400" />
                <span>Poll</span>
              </button>
              <button
                onClick={() => {
                  setNewPostText(
                    (prev) => prev + (prev ? " " : "") + "https://"
                  );
                }}
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <LinkIcon size={15} className="text-gray-400" />
                <span>Link</span>
              </button>
            </div>

            <button
              onClick={() => handleCreatePost()}
              disabled={!newPostText.trim()}
              className="bg-[#563bfa] hover:bg-[#472ee0] disabled:opacity-50 disabled:cursor-not-allowed min-h-11 text-white text-xs font-bold px-4 sm:px-5 py-2 rounded-xl shadow-xs shadow-indigo-200 transition-all cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>

        {/* Post Feeds */}
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const isCommentsOpen = activeCommentPostId === post.id;

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-all flex flex-col gap-3"
              >
                {/* Post Top Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden relative flex-shrink-0 shadow-2xs border border-gray-50">
                      <Image
                        src={post.avatar}
                        alt={post.author}
                        fill
                        sizes="44px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="font-extrabold text-gray-900 text-sm sm:text-[14.5px]">
                          {post.author}
                        </h3>
                        <span
                          className={`text-[10px] sm:text-[10.5px] font-bold ${post.badge.bg} ${post.badge.color} px-2 py-0.5 rounded-md flex items-center gap-1`}
                        >
                          <span>{post.badge.icon}</span>
                          <span>{post.badge.text}</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-normal">
                        {post.time}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      showToast(`Options opened for ${post.author}`)
                    }
                    className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors cursor-pointer"
                    aria-label="More options"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Post Text Content */}
                <p className="wrap-anywhere text-sm text-gray-800 leading-relaxed">
                  {post.content}
                </p>

                {/* Prompt Quote Box (if exists, like Sneha's post) */}
                {post.promptQuote && (
                  <div className="bg-[#f4f7ff] border border-blue-100/60 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] text-[#1e293b] leading-relaxed relative flex items-start gap-2.5">
                    <span className="text-xl sm:text-2xl font-serif text-[#563bfa] select-none leading-none -mt-0.5">
                      “
                    </span>
                    <span className="min-w-0 wrap-anywhere font-medium text-gray-800 italic">
                      {post.promptQuote}
                    </span>
                  </div>
                )}

                {/* Post Attached Media Image (if exists, like Rohan's post) */}
                {post.image && (
                  <div className="rounded-2xl overflow-hidden relative h-48 sm:h-52 w-full bg-gray-100 border border-gray-100 shadow-2xs">
                    <Image
                      src={post.image}
                      alt="AI Showcase"
                      fill
                      sizes="(max-width: 640px) 100vw, 600px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {post.imageBadge && (
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {post.imageBadge}
                      </div>
                    )}
                  </div>
                )}

                {/* Actions Row (Likes, Comments, Share) */}
                <div className="flex flex-wrap items-center gap-x-5 text-gray-500 text-xs font-semibold [&>button]:min-h-11">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isLiked ? "text-rose-500 font-bold" : "hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={isLiked ? "fill-rose-500 text-rose-500" : ""}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(
                        isCommentsOpen ? null : post.id
                      )
                    }
                    className="flex items-center gap-1.5 hover:text-[#563bfa] transition-colors cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-1.5 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>

                {/* Hashtag Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        showToast(`Filtered by tag #${tag}`)
                      }
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#f3efff] text-[#563bfa] hover:bg-violet-100 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {/* Inline Comment Thread (if opened) */}
                {isCommentsOpen && (
                  <div className="mt-2 pt-3 border-t border-gray-100 flex flex-col gap-2.5 animate-in fade-in duration-150">
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                      {post.comments.length === 0 ? (
                        <p className="text-xs text-gray-400 italic py-1">
                          No comments yet. Be the first to reply!
                        </p>
                      ) : (
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-2.5 bg-gray-50/80 p-2.5 rounded-xl text-xs"
                          >
                            <div className="w-7 h-7 rounded-full overflow-hidden relative flex-shrink-0">
                              <Image
                                src={comment.avatar}
                                alt={comment.author}
                                fill
                                sizes="28px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1 wrap-anywhere">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-900">
                                  {comment.author}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-0.5 leading-relaxed">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* New Comment Input */}
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                        placeholder="Write a supportive reply..."
                        className="min-w-0 flex-1 px-3 py-2 text-base lg:text-sm rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#563bfa]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInput.trim()}
                        className="min-h-11 px-3 py-2 bg-[#563bfa] hover:bg-[#472ee0] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Send size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button (FAB +) exactly like Reference */}
      <button
        onClick={() => setShowCreateModal(true)}
        aria-label="Create new community post"
        className="fixed bottom-[calc(var(--bottom-nav-height)+1rem)] right-4 sm:right-6 w-14 h-14 bg-[#563bfa] hover:bg-[#472ee0] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-300/80 hover:shadow-xl transition-all z-40 cursor-pointer"
      >
        <Plus size={28} strokeWidth={2.6} />
      </button>

      {/* Create New Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full max-h-full overflow-y-auto overscroll-contain shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f2ebff] text-[#563bfa] flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Create Community Post
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateFromModal} className="flex flex-col gap-3.5">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Channel
                </label>
                <div className="flex gap-2">
                  {(["Discussions", "Showcase", "Study Groups"] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setModalPostType(cat)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          modalPostType === cat
                            ? "bg-[#563bfa] text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Main content textarea */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  What are you sharing?
                </label>
                <textarea
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share your breakthrough, prompt question, or AI learning tip..."
                  className="w-full px-3.5 py-2.5 text-base lg:text-sm rounded-xl border border-gray-200 outline-none focus:border-[#563bfa] focus:ring-2 focus:ring-violet-100 resize-none"
                  required
                />
              </div>

              {/* Optional Prompt Quote */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Prompt / Code snippet (Optional)
                </label>
                <input
                  type="text"
                  value={modalPromptQuote}
                  onChange={(e) => setModalPromptQuote(e.target.value)}
                  placeholder="e.g. Act as a senior prompt engineer..."
                  className="w-full px-3.5 py-2 text-base lg:text-sm rounded-xl border border-gray-200 outline-none focus:border-[#563bfa]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-[#563bfa] hover:bg-[#472ee0] disabled:opacity-50 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm shadow-indigo-200"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-[calc(var(--bottom-nav-height)+5rem)] w-max max-w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 z-50 animate-in fade-in duration-150">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
