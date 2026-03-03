"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/locales";
import { getT } from "@/lib/translations";

export function HeaderSearch({ lang }: { lang: Locale }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const t = getT(lang);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/${lang}/listings${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} className="hidden w-full max-w-md sm:block" role="search" aria-label={t.search.label}>
      <label htmlFor="header-search" className="sr-only">
        {t.search.label}
      </label>
      <div className="flex rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
        <input
          id="header-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full rounded-l-lg border-0 px-4 py-2 text-foreground placeholder:text-secondary focus:ring-0"
          aria-describedby="header-search-desc"
        />
        <button
          type="submit"
          className="rounded-r-lg bg-primary px-4 py-2 text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={t.search.submit}
        >
          {t.search.submit}
        </button>
      </div>
      <span id="header-search-desc" className="sr-only">Search by keyword, then view results on the listings page</span>
    </form>
  );
}
