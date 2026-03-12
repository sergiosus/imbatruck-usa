"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getT } from "@/lib/translations";
import { PasswordInput } from "@/components/PasswordInput";

export function ResetPasswordForm({ lang }: { lang: string }) {
  const t = getT(lang);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace(`/${lang}/signin`);
        return;
      }
      setReady(true);
    });
  }, [lang, router]);

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
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(process.env.NODE_ENV === "development" ? updateError.message : t.auth.resetLinkError);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(`/${lang}/signin`);
        router.refresh();
      }, 2000);
    } catch {
      setError(t.auth.resetLinkError);
    }
    setLoading(false);
  }

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 text-center text-secondary">
        Loading…
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
        <h1 className="text-2xl font-bold text-foreground">{t.auth.resetPasswordTitle}</h1>
        <p className="mt-2 rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">{t.auth.passwordUpdated}</p>
        <p className="mt-6 text-center text-sm text-secondary">
          <Link href={`/${lang}/signin`} className="font-medium text-primary hover:underline">{t.auth.signIn}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">{t.auth.resetPasswordTitle}</h1>
      <p className="mt-1 text-secondary">{t.auth.resetPasswordDesc}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <div>
          <label htmlFor="reset-password" className="block text-sm font-medium text-foreground">{t.auth.newPassword}</label>
          <PasswordInput id="reset-password" required autoComplete="new-password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          <p className="mt-1 text-xs text-secondary">{t.auth.atLeast6}</p>
        </div>
        <div>
          <label htmlFor="reset-confirm" className="block text-sm font-medium text-foreground">{t.auth.confirmNewPassword}</label>
          <PasswordInput id="reset-confirm" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-cta py-3 font-medium text-white hover:bg-cta-hover disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
          {loading ? t.auth.updatingPassword : t.auth.updatePassword}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-secondary">
        <Link href={`/${lang}/signin`} className="font-medium text-primary hover:underline">{t.auth.signIn}</Link>
      </p>
    </div>
  );
}
