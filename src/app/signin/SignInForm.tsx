"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getT } from "@/lib/translations";
import { PasswordInput } from "@/components/PasswordInput";

function SignInFormInner({ lang, callbackUrl }: { lang: string; callbackUrl: string }) {
  const t = getT(lang);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        setError(t.auth.somethingWrong);
        setLoading(false);
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) {
        const msg = signInError.message || t.auth.invalidCredentials;
        setError(process.env.NODE_ENV === "development" ? `Signin failed: ${msg}` : t.auth.invalidCredentials);
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.auth.somethingWrong;
      setError(process.env.NODE_ENV === "development" ? `Signin failed: ${msg}` : t.auth.somethingWrong);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">{t.auth.signIn}</h1>
      <p className="mt-1 text-secondary">{t.auth.signInDesc}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <div>
          <label htmlFor="signin-email" className="block text-sm font-medium text-foreground">{t.auth.email}</label>
          <input id="signin-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label htmlFor="signin-password" className="block text-sm font-medium text-foreground">{t.auth.password}</label>
          <PasswordInput id="signin-password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <p className="mt-1.5 text-sm">
            <Link href={`/${lang}/forgot-password`} className="text-primary hover:underline">{t.auth.forgotPassword}</Link>
          </p>
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-cta py-3 font-medium text-white hover:bg-cta-hover disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
          {loading ? t.auth.signingIn : t.auth.signIn}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        {t.auth.noAccount}{" "}
        <Link href={callbackUrl !== `/${lang}` ? `/${lang}/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : `/${lang}/signup`} className="font-medium text-primary hover:underline">
          {t.auth.createAccount}
        </Link>
      </p>
    </div>
  );
}

export function SignInForm({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? `/${lang}`;
  return <SignInFormInner lang={lang} callbackUrl={callbackUrl} />;
}
