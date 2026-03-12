import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { getT } from "@/lib/translations";

export function Footer({ lang }: { lang: Locale }) {
  const t = getT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0f1419] text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-white">{t.nav.company}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href={`/${lang}`} className="transition-colors hover:text-white">{t.nav.home}</Link></li>
              <li><Link href={`/${lang}/contact`} className="transition-colors hover:text-white">{t.nav.contact}</Link></li>
              <li><Link href={`/${lang}/legal/disclaimer`} className="transition-colors hover:text-white">{t.nav.disclaimer}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">{t.nav.marketplace}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href={`/${lang}/listings`} className="transition-colors hover:text-white">{t.nav.browse}</Link></li>
              <li><Link href={`/${lang}/post`} className="transition-colors hover:text-white">{t.nav.post}</Link></li>
              <li><Link href={`/${lang}/safety`} className="transition-colors hover:text-white">{t.nav.safetyTips}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">{t.nav.legal}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href={`/${lang}/legal/privacy`} className="transition-colors hover:text-white">{t.nav.privacyPolicy}</Link></li>
              <li><Link href={`/${lang}/legal/terms`} className="transition-colors hover:text-white">{t.nav.termsOfUse}</Link></li>
              <li><Link href={`/${lang}/legal/cookies`} className="transition-colors hover:text-white">{t.nav.cookiePolicy}</Link></li>
              <li><Link href={`/${lang}/legal/dmca`} className="transition-colors hover:text-white">{t.nav.dmca}</Link></li>
              <li><Link href={`/${lang}/legal/disclaimer`} className="transition-colors hover:text-white">{t.nav.disclaimer}</Link></li>
            </ul>
          </div>
          <div />
        </div>
        <div className="mt-10 border-t border-gray-700/80 pt-6">
          <p className="text-sm text-gray-400">
            © {year} Imbatruck Company LLC. {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
