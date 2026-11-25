"use client";

import { useAuth } from "@/components/AuthProvider";
import {
  ArrowRight,
  Brain,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";

type AuthMode = "login" | "signup";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    queueMicrotask(() => {
      setError(params.get("error") ?? "");
      setNotice(params.get("message") ?? "");
    });
  }, []);

  const enterApp = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    router.replace(next?.startsWith("/") ? next : "/");
  }, [router]);

  const continueAsGuest = () => {
    const params = new URLSearchParams(window.location.search);
    const requestedNext = params.get("next");
    const next = requestedNext?.startsWith("/") ? requestedNext : "/";
    document.cookie = "nfm_guest=1; Path=/; Max-Age=2592000; SameSite=Lax";
    window.location.assign(next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (isSignup && name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = isSignup
      ? await signUp(name, email, password)
      : await signIn(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.requiresEmailConfirmation) {
      setNotice("Account created. Check your email to confirm it, then sign in.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    enterApp();
  };

  return (
    <main className="relative min-h-dvh bg-[#f8f7ff] p-3 sm:p-5 lg:p-7">
      <button
        type="button"
        onClick={continueAsGuest}
        className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-30 min-h-10 cursor-pointer rounded-full border border-violet-200 bg-white/95 px-4 py-2 text-xs font-extrabold text-[#563bfa] shadow-lg shadow-violet-100 backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 sm:right-7 sm:top-7 sm:text-sm"
      >
        Skip for now <span aria-hidden="true">→</span>
      </button>
      <div className="mx-auto grid min-h-[calc(100dvh-1.5rem)] max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_28px_90px_rgba(79,61,190,0.16)] sm:min-h-[calc(100dvh-2.5rem)] lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden overflow-hidden bg-[#19152f] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,255,0.42),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.22),transparent_38%)]" />
          <div className="absolute -right-20 top-24 size-72 rounded-full border border-white/10" />
          <div className="absolute -right-6 top-38 size-44 rounded-full border border-white/10" />

          <Link href="/login" className="relative z-10 flex w-fit items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-white/12 ring-1 ring-white/20">
              <Brain size={27} className="text-violet-200" />
            </span>
            <span className="text-2xl font-black tracking-tight">
              Next<span className="text-violet-300">Future</span>Mind
            </span>
          </Link>

          <div className="relative z-10 max-w-xl py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-violet-100 ring-1 ring-white/15">
              <Sparkles size={16} /> Learn today. Lead tomorrow.
            </div>
            <h1 className="max-w-lg text-5xl font-black leading-[1.05] tracking-[-0.04em] xl:text-6xl">
              Your next big skill starts here.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Practical AI courses, useful prompts, and guided learning paths in one focused space.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3">
            {["Practical lessons", "Track progress", "Learn anywhere"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/8 p-4 text-sm font-semibold text-white/85 ring-1 ring-white/10">
                <Check size={17} className="mb-3 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-w-0 items-center justify-center px-5 py-7 sm:px-10 sm:py-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/login" className="flex items-center gap-2 text-gray-950">
                <Brain size={28} className="text-[#563bfa]" />
                <span className="text-xl font-black tracking-tight">
                  Next<span className="text-[#563bfa]">Future</span>Mind
                </span>
              </Link>
            </div>

            <div className="mb-7">
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-[#563bfa]">
                <LockKeyhole size={22} />
              </span>
              <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                {isSignup ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
                {isSignup
                  ? "Start learning smarter with your free account."
                  : "Sign in to continue your learning journey."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-gray-700">Full name</span>
                  <span className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/70">
                    <UserRound size={18} className="shrink-0 text-gray-400" />
                    <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required placeholder="Your name" className="min-w-0 flex-1 bg-transparent py-3 text-base text-gray-900 outline-none placeholder:text-gray-400" />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-gray-700">Email address</span>
                <span className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/70">
                  <Mail size={18} className="shrink-0 text-gray-400" />
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent py-3 text-base text-gray-900 outline-none placeholder:text-gray-400" />
                </span>
              </label>

              <div className="block">
                <label htmlFor="auth-password" className="mb-1.5 block text-sm font-bold text-gray-700">Password</label>
                <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/70">
                  <LockKeyhole size={18} className="shrink-0 text-gray-400" />
                  <input id="auth-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} required placeholder="At least 8 characters" className="min-w-0 flex-1 bg-transparent py-3 text-base text-gray-900 outline-none placeholder:text-gray-400" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl text-gray-400 hover:bg-white hover:text-gray-700">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-gray-700">Confirm password</span>
                  <span className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/70">
                    <LockKeyhole size={18} className="shrink-0 text-gray-400" />
                    <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required placeholder="Repeat your password" className="min-w-0 flex-1 bg-transparent py-3 text-base text-gray-900 outline-none placeholder:text-gray-400" />
                  </span>
                </label>
              )}

              {error && (
                <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {notice && (
                <div role="status" className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {notice}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#563bfa] px-5 py-3.5 text-base font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#472ee0] hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
                {isSubmitting ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>

              <div className="flex items-center gap-3 py-1" aria-hidden="true">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  or continue with
                </span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <GoogleSignInButton onError={setError} />
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              {isSignup ? "Already have an account?" : "New to NextFutureMind?"}{" "}
              <Link href={isSignup ? "/login" : "/signup"} className="font-extrabold text-[#563bfa] hover:underline">
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
