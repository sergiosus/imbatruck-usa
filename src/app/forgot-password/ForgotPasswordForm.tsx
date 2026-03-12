"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getT } from "@/lib/translations";

export function ForgotPasswordForm({ lang }: { lang: string }) {
  const t = getT(lang);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/${lang}/reset-password` : undefined,
      });
      if (resetError) {
        setError(process.env.NODE_ENV === "development" ? resetError.message : t.auth.resetLinkError);
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError(t.auth.resetLinkError);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
        <h1 className="text-2xl font-bold text-foreground">{t.auth.forgotPasswordTitle}</h1>
        <p className="mt-2 rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">{t.auth.resetLinkSent}</p>
        <p className="mt-6 text-center text-sm text-secondary">
          <Link href={`/${lang}/signin`} className="font-medium text-primary hover:underline">{t.auth.signIn}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">{t.auth.forgotPasswordTitle}</h1>
      <p className="mt-1 text-secondary">{t.auth.forgotPasswordDesc}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <div>
          <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground">{t.auth.email}</label>
          <input id="forgot-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-cta py-3 font-medium text-white hover:bg-cta-hover disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
          {loading ? t.auth.sendingResetLink : t.auth.sendResetLink}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        <Link href={`/${lang}/signin`} className="font-medium text-primary hover:underline">{t.auth.signIn}</Link>
      </p>
    </div>
  );
}
