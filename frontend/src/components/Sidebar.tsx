"use client";

import {
  Home,
  GraduationCap,
  BookOpen,
  Book,
  FileText,
  Users,
  Crown,
  Info,
  Mail,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Brain,
  ArrowRight,
  CheckCircle2,
  Code2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function Sidebar({
  onClose,
}: {
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 80rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) onClose();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const mainLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Course", href: "/tools", icon: GraduationCap },
    { name: "Programming", href: "/programming", icon: Code2 },
    { name: "Prompt Library", href: "/prompts", icon: BookOpen },
    { name: "Learn", href: "/learn", icon: Book },
    { name: "Resources", href: "/resources", icon: FileText },
    { name: "Community", href: "/community", icon: Users },
    { name: "Pricing", href: "/pricing", icon: Crown },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const secondaryLinks = [
    { name: "Profile", href: "/profile", icon: User },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      desc: "Manage your account",
    },
    {
      name: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      desc: "Get assistance",
    },
  ];

  const handleConfirmLogout = () => {
    setLogoutSuccess(true);
    setTimeout(() => {
      signOut();
      setLogoutSuccess(false);
      setShowLogoutModal(false);
      onClose();
      router.replace("/login");
    }, 1200);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Navigation menu"
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-gray-900 backdrop:bg-black/45 backdrop:backdrop-blur-[1px]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        if (showLogoutModal) setShowLogoutModal(false);
        else onClose();
      }}
    >
      <aside
        aria-label="Navigation Sidebar"
        inert={showLogoutModal}
        className="flex h-full w-[min(22.5rem,calc(100%-2rem))] flex-col border-r border-gray-100 bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] shadow-2xl"
      >
        {/* Top Header Block */}
        <div className="flex shrink-0 items-center justify-between gap-1 border-b border-gray-100/60 px-4 py-2 sm:px-5 sm:py-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#f4efff] flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Brain className="text-[#563bfa]" size={26} strokeWidth={2.4} />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-black text-gray-900 leading-tight tracking-tight">
                Next<span className="text-[#563bfa]">Future</span>Mind
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                Education for What’s Next. 🚀
              </span>
            </div>
          </Link>

          {/* Close button (X) */}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 py-2">
          {/* Main Navigation Links */}
          <nav className="flex flex-col gap-0.5">
            {mainLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`flex min-h-11 items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#f3efff] text-[#563bfa] font-bold shadow-2xs"
                      : "text-gray-800 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "text-[#563bfa]" : "text-gray-700"}
                  />
                  <span className="text-[14.5px] tracking-tight">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Subtle Divider */}
          <div className="h-px bg-gray-100 my-2 mx-2" />

          {/* Settings & Help */}
          <div className="flex flex-col gap-1 mb-3">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex min-h-11 items-center gap-3.5 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                    isActive ? "bg-[#f3efff]" : "hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.9}
                    className={isActive ? "text-[#563bfa]" : "text-gray-700"}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-[14px] leading-snug font-semibold ${
                        isActive ? "text-[#563bfa]" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.desc && <span className="text-[11px] text-gray-400 font-normal">
                      {item.desc}
                    </span>}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* "Work Smarter with AI" Promo Banner Card */}
          <div className="mt-auto pt-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f8f4ff] via-[#f2ebff] to-[#e8ddff] p-4 border border-purple-100/80 shadow-2xs">
              {/* Golden Crown on top right */}
              <div className="absolute top-2.5 right-20 z-20 select-none pointer-events-none text-base sm:text-lg">
                👑
              </div>

              {/* Handwritten Purple Accent Text */}
              <div className="absolute top-2 right-2.5 z-20 text-right select-none pointer-events-none font-handwriting text-[#7c3aed] text-[12.5px] sm:text-[13.5px] leading-[1.1] rotate-2">
                <div>Better</div>
                <div>Skills</div>
                <div>Brighter</div>
                <div>Tomorrow</div>
                <div className="text-xs mt-0.5">💜</div>
              </div>

              {/* Cheerful Student Background Image & Laptop Mockup */}
              <div className="absolute -bottom-1 -right-2 w-36 h-32 select-none pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=320&auto=format&fit=crop"
                  alt="AI Student"
                  className="w-22 h-22 rounded-full object-cover ml-auto border-2 border-white/90 shadow-xs"
                />
                {/* Laptop Lid with NextFutureMind Branding */}
                <div className="absolute bottom-0 right-1 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400/80 rounded-t-lg px-2 py-1 shadow-md w-28 text-center">
                  <span className="text-[7.5px] font-black text-gray-800 tracking-tight block">
                    NextFutureMind
                  </span>
                </div>
              </div>

              {/* Banner Left Content */}
              <div className="relative z-10 w-[60%] flex flex-col">
                <h3 className="text-[18px] sm:text-[19px] font-black text-gray-900 leading-[1.15] mb-1 tracking-tight">
                  Work Smarter
                  <br />
                  with AI
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-600 leading-[1.3] mb-3 font-normal">
                  Learn. Create. Grow.
                  <br />
                  Your better tomorrow
                  <br />
                  starts today.
                </p>
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 bg-[#563bfa] hover:bg-[#472ee0] text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md shadow-indigo-200 transition-all w-fit cursor-pointer"
                >
                  <span>Start Learning Today</span>
                  <ArrowRight size={12} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Logout & Version */}
        <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-white px-5 py-1">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex min-h-11 items-center gap-2 text-[#ff3b30] hover:text-red-700 transition-colors font-bold text-[14px] cursor-pointer"
          >
            <LogOut size={18} strokeWidth={2.4} className="text-[#ff3b30]" />
            <span>Logout</span>
          </button>
          <span className="text-[11.5px] text-gray-400 font-medium select-none">
            v1.0.0
          </span>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div role="dialog" aria-label="Confirm logout" className="max-h-full w-full max-w-sm overflow-y-auto rounded-3xl border border-gray-100 bg-white p-5 text-center shadow-2xl sm:p-6">
            {logoutSuccess ? (
              <div className="py-4 flex flex-col items-center gap-2">
                <CheckCircle2 size={42} className="text-emerald-500" />
                <h4 className="text-lg font-bold text-gray-900">
                  Signed Out Successfully
                </h4>
                <p className="text-xs text-gray-500">See you again soon!</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                  <LogOut size={24} strokeWidth={2.3} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  Are you sure you want to logout?
                </h4>
                <p className="text-xs text-gray-500 mb-5">
                  You can always log back in anytime to continue your AI
                  learning journey.
                </p>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
