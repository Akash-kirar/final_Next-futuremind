"use client";

import { Brain } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import BottomNav from "./BottomNav";
import Header from "./Header";

const AUTH_ROUTES = new Set(["/login", "/signup"]);

function LoadingScreen() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[#f8f7ff] px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="grid size-14 animate-pulse place-items-center rounded-2xl bg-white text-[#563bfa] shadow-lg shadow-violet-200/60">
          <Brain size={30} />
        </div>
        <p className="text-sm font-semibold text-gray-500">Preparing your learning space…</p>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [guestState, setGuestState] = useState<"checking" | "guest" | "none">("checking");
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  useEffect(() => {
    const isGuest = document.cookie
      .split("; ")
      .some((cookie) => cookie === "nfm_guest=1");
    queueMicrotask(() => setGuestState(isGuest ? "guest" : "none"));
  }, [pathname]);

  useEffect(() => {
    if (isLoading || guestState === "checking") return;
    if (!user && guestState !== "guest" && !isAuthRoute) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (user && isAuthRoute) {
      router.replace("/");
    }
  }, [guestState, isAuthRoute, isLoading, pathname, router, user]);

  if (
    isLoading ||
    guestState === "checking" ||
    (!user && guestState !== "guest" && !isAuthRoute) ||
    (user && isAuthRoute)
  ) {
    return <LoadingScreen />;
  }

  if (isAuthRoute) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="w-full min-w-0 flex-1 pb-(--bottom-nav-height) pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
