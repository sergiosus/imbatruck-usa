"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/locales";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
