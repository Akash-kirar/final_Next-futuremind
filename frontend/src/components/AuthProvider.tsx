"use client";

import type { AuthUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthResult =
  | { success: true; requiresEmailConfirmation?: boolean }
  | { success: false; message: string };

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  updateProfile: (name: string, avatarUrl: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(user: User | null): AuthUser | null {
  if (!user?.email) return null;
  return {
    id: user.id,
    name:
      user.user_metadata.full_name ??
      user.user_metadata.name ??
      user.email.split("@")[0],
    email: user.email,
    avatarUrl: user.user_metadata.avatar_url ?? user.user_metadata.picture,
  };
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(toAuthUser(data.user));
      setIsLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAuthUser(session?.user ?? null));
      setIsLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return {
          success: false,
          message:
            error.code === "invalid_credentials"
              ? "The email or password is incorrect."
              : error.message,
        };
      }
      return { success: true };
    },
    [],
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        return {
          success: false,
          message:
            error.code === "over_email_send_rate_limit"
              ? "Too many confirmation emails were requested. Please wait a few minutes and try again."
              : error.message,
        };
      }
      return { success: true, requiresEmailConfirmation: !data.session };
    },
    [],
  );

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const signInWithGoogle = useCallback(
    async (): Promise<AuthResult> => {
      if (process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED !== "true") {
        return {
          success: false,
          message:
            "Google sign-in is ready in the app, but the Google provider still needs to be enabled in Supabase.",
        };
      }
      const supabase = createClient();
      const params = new URLSearchParams(window.location.search);
      const requestedNext = params.get("next");
      const next = requestedNext?.startsWith("/") ? requestedNext : "/";
      const redirectTo = new URL("/auth/callback", window.location.origin);
      redirectTo.searchParams.set("next", next);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTo.toString() },
      });
      if (error) return { success: false, message: error.message };
      return { success: true };
    },
    [],
  );

  const updateProfile = useCallback(
    async (name: string, avatarUrl: string): Promise<AuthResult> => {
      const fullName = name.trim();
      if (!fullName) {
        return { success: false, message: "Please enter your full name." };
      }

      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl },
      });
      if (userError) return { success: false, message: userError.message };

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userData.user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });
      if (profileError) return { success: false, message: profileError.message };

      setUser(toAuthUser(userData.user));
      return { success: true };
    },
    [],
  );

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signInWithGoogle,
      updateProfile,
      signOut,
    }),
    [user, isLoading, signIn, signUp, signInWithGoogle, updateProfile, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
