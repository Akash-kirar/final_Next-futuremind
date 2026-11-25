"use client";

import { Brain, Menu } from "lucide-react";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const pathname = usePathname();
  const { user } = useAuth();

  const desktopLinks = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/tools" },
    { name: "Programming", path: "/programming" },
    { name: "Prompt Library", path: "/prompts" },
    { name: "Learn", path: "/learn" },
    { name: "Productivity", path: "/productivity" },
    { name: "Resources", path: "/resources" },
    { name: "Community", path: "/community" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full shrink-0 border-b border-gray-100 bg-white/90 pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] shadow-sm backdrop-blur-md">
        <div className="mx-auto flex min-h-(--header-height) max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Brain className="text-violet-600" size={32} />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900">
                Next<span className="text-violet-600">Future</span>Mind
              </span>
              <span className="text-[9px] md:text-[10px] text-gray-500 font-medium tracking-wide">
                Education for What’s Next. 🚀
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-4 whitespace-nowrap xl:flex 2xl:gap-6">
            {desktopLinks.map((link) => {
              const isActive =
                pathname === link.path ||
                (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  aria-current={pathname === link.path ? "page" : undefined}
                  className={`py-2 text-sm font-semibold transition-colors ${isActive ? "text-violet-600 bg-violet-50 px-3 rounded-full" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3 text-gray-700">
            <Link
              href="/profile"
              className="hidden min-h-11 items-center gap-2 rounded-full border border-violet-100 bg-violet-50 py-1.5 pl-2 pr-3 transition hover:bg-violet-100 lg:flex"
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="size-8 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="grid size-8 place-items-center rounded-full bg-[#563bfa] text-xs font-black text-white">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </span>
              )}
              <span className="max-w-24 truncate text-sm font-bold text-gray-800">
                {user?.name?.split(" ")[0] ?? "Profile"}
              </span>
            </Link>
            <button
              type="button"
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-expanded={isSidebarOpen}
              onClick={() => setSidebarOpen(true)}
              className="grid size-11 cursor-pointer place-items-center rounded-xl text-gray-700 hover:bg-violet-50 xl:hidden"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {isSidebarOpen && <Sidebar onClose={closeSidebar} />}
    </>
  );
}
