"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, BookOpen, FileText, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Course", path: "/tools", icon: GraduationCap },
    { name: "Learn", path: "/learn", icon: BookOpen },
    { name: "Resources", path: "/resources", icon: FileText },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 grid h-(--bottom-nav-height) grid-cols-5 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] md:hidden">
      {navItems.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path === "/tools" && pathname.startsWith("/tools")) ||
          (item.path === "/learn" && pathname.startsWith("/learn")) ||
          (item.path === "/resources" && pathname === "/prompts") ||
          (item.path === "/profile" && pathname === "/pricing");
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.path}
            aria-current={pathname === item.path ? "page" : undefined}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? "text-[#563bfa]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon
              size={23}
              strokeWidth={isActive ? 2.6 : 2}
              className={isActive && item.name === "Profile" ? "fill-current" : ""}
            />
            <span
              className={`text-[11px] leading-tight ${
                isActive ? "font-bold text-[#563bfa]" : "font-medium text-gray-500"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
