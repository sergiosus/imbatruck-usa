"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getT } from "@/lib/translations";

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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? t.auth.signUpFailed);
        setLoading(false);
        return;
      }
      const signInRes = await signIn("credentials", { email: email.trim().toLowerCase(), password, redirect: false });
      if (signInRes?.error) {
        setError(t.auth.accountCreatedSignInFailed);
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError(t.auth.somethingWrong);
      setLoading(false);
    }
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
          <input id="signup-password" type="password" required autoComplete="new-password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <p className="mt-1 text-xs text-secondary">{t.auth.atLeast6}</p>
        </div>
        <div>
          <label htmlFor="signup-confirm" className="block text-sm font-medium text-foreground">{t.auth.confirmPassword}</label>
          <input id="signup-confirm" type="password" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
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
