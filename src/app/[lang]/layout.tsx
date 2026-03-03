import { redirect } from "next/navigation";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/locales";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "zh" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!isValidLocale(lang)) redirect(`/${DEFAULT_LOCALE}`);

  return (
    <LocaleProvider lang={locale}>
      <Header lang={locale} />
      <main className="flex-1">{children}</main>
      <Footer lang={locale} />
      <CookieBanner lang={locale} />
    </LocaleProvider>
  );
}
