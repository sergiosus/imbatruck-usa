export const LOCALES = ["en", "es", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
};

export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}
