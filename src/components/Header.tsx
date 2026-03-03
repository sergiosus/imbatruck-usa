"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { HeaderSearch } from "./HeaderSearch";
import { LOCALES, LOCALE_LABELS } from "@/lib/locales";
import { getT } from "@/lib/translations";
import type { Locale } from "@/lib/locales";

export function Header({ lang }: { lang: Locale }) {
  const { data: session, status } = useSession();
  const t = getT(lang);
  const prefix = `/${lang}`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href={prefix} className="shrink-0 text-xl font-semibold text-primary" aria-label="Imbatruck Company LLC home">
          Imbatruck Company LLC
        </Link>
        <HeaderSearch lang={lang} />
        <nav className="flex flex-wrap items-center gap-3 sm:gap-4" aria-label="Main navigation">
          <Link href={`${prefix}/listings`} className="text-secondary hover:text-primary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            {t.nav.browse}
          </Link>
          <Link href={`${prefix}/post`} className="rounded-lg bg-cta px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
            {t.nav.post}
          </Link>
          <span className="hidden text-gray-300 sm:inline" aria-hidden>|</span>
          <div className="flex items-center gap-1.5 text-sm" role="group" aria-label="Language">
            {LOCALES.map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-gray-300" aria-hidden>|</span>}
                {l === lang ? (
                  <span className="font-medium text-foreground">{LOCALE_LABELS[l]}</span>
                ) : (
                  <Link href={`/${l}`} className="text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                    {LOCALE_LABELS[l]}
                  </Link>
                )}
              </span>
            ))}
          </div>
          {status === "loading" ? (
            <span className="text-sm text-secondary">...</span>
          ) : session ? (
            <Link href={`${prefix}/account`} className="text-secondary hover:text-primary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {t.nav.myAccount}
            </Link>
          ) : (
            <Link href={`${prefix}/signin`} className="text-secondary hover:text-primary rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {t.nav.signIn}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
