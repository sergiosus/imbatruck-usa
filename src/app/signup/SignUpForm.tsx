"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getT } from "@/lib/translations";
import { PasswordInput } from "@/components/PasswordInput";

function SignUpFormInner({ lang, callbackUrl }: { lang: string; callbackUrl: string }) {
  const t = getT(lang);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError(t.auth.passwordsNoMatch);
      return;
    }
    if (password.length < 6) {
      setError(t.auth.passwordTooShort);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signUpError) {
        const msg = signUpError.message || t.auth.signUpFailed;
        setError(process.env.NODE_ENV === "development" ? `Signup failed: ${msg}` : msg);
        setLoading(false);
        return;
      }
      if (signUpData?.session) {
        router.push(callbackUrl);
        router.refresh();
        setLoading(false);
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) {
        setError(
          process.env.NODE_ENV === "development"
            ? `Signup succeeded but signin failed: ${signInError.message}. You may need to confirm your email.`
            : t.auth.accountCreatedSignInFailed
        );
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.auth.somethingWrong;
      setError(process.env.NODE_ENV === "development" ? `Signup failed: ${msg}` : t.auth.somethingWrong);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">{t.auth.createAccountTitle}</h1>
      <p className="mt-1 text-secondary">{t.auth.createAccountDesc}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground">{t.auth.email}</label>
          <input id="signup-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-foreground">{t.auth.password}</label>
          <PasswordInput id="signup-password" required autoComplete="new-password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <p className="mt-1 text-xs text-secondary">{t.auth.atLeast6}</p>
        </div>
        <div>
          <label htmlFor="signup-confirm" className="block text-sm font-medium text-foreground">{t.auth.confirmPassword}</label>
          <PasswordInput id="signup-confirm" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-cta py-3 font-medium text-white hover:bg-cta-hover disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
          {loading ? t.auth.creatingAccount : t.auth.createAccount}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        {t.auth.alreadyHaveAccount}{" "}
        <Link href={callbackUrl !== `/${lang}` ? `/${lang}/signin?callbackUrl=${encodeURIComponent(callbackUrl)}` : `/${lang}/signin`} className="font-medium text-primary hover:underline">
          {t.auth.signIn}
        </Link>
      </p>
    </div>
  );
}

export function SignUpForm({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? `/${lang}`;
  return <SignUpFormInner lang={lang} callbackUrl={callbackUrl} />;
}
