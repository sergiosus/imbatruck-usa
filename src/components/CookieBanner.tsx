"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locales";
import { getT } from "@/lib/translations";

const COOKIE_CONSENT_KEY = "imbatruck-cookie-consent";

export function CookieBanner({ lang }: { lang: Locale }) {
  const t = getT(lang);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === null) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {}
    setVisible(false);
  }

  function reject() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground">
          {t.cookie.message}{" "}
          <Link href={`/${lang}/legal/cookies`} className="font-medium text-primary underline hover:no-underline">
            {t.cookie.cookiePolicy}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {t.cookie.reject}
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-cta px-4 py-2 text-sm font-medium text-white hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2"
          >
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
