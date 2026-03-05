import Link from "next/link";
import Image from "next/image";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { getT } from "@/lib/translations";
import { HERO_IMAGE_URL } from "@/lib/images";

const FEATURED_CATEGORY_IDS = ["trucks", "trailers", "parts", "freight-services"] as const;

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getT(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-white to-cta/5 py-12 shadow-md sm:py-16 md:py-20">
        <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.home.title}
            </h1>
            <p className="mt-4 text-lg text-secondary">
              {t.home.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${lang}/listings`} className="inline-flex rounded-lg bg-cta px-6 py-3 text-base font-medium text-white shadow-md hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
                {t.home.browseListings}
              </Link>
              <Link href={`/${lang}/post`} className="inline-flex rounded-lg border-2 border-primary bg-white px-6 py-3 text-base font-medium text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                {t.home.postListing}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full max-w-lg">
            <Image src={HERO_IMAGE_URL} alt="Imbatruck Company LLC marketplace: trucks and freight in the USA" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-center text-xl font-semibold text-foreground">{t.home.featuredCategories}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURED_CATEGORY_IDS.map((id) => (
            <Link key={id} href={`/${lang}/listings?category=${id}`} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <span className="font-medium text-foreground">{(t.categories as Record<string, string>)[id] ?? id}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 px-6 text-center" aria-labelledby="empty-marketplace-heading">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h2 id="empty-marketplace-heading" className="mt-4 text-xl font-semibold text-foreground">{t.listing.emptyMarketplaceTitle}</h2>
        <p className="mt-2 max-w-md text-sm text-secondary">{t.listing.emptyMarketplaceDesc}</p>
        <Link href={`/${lang}/post`} className="mt-6 inline-flex rounded-lg bg-cta px-6 py-3 text-base font-medium text-white shadow-md hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2">
          {t.listing.emptyMarketplaceCta}
        </Link>
      </section>

      <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10" aria-labelledby="safe-marketplace-heading">
        <h2 id="safe-marketplace-heading" className="text-center text-xl font-semibold text-foreground">{t.home.safeMarketplaceTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.safeMarketplaceMeet}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.safeMarketplaceVerify}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.safeMarketplaceAvoid}</p>
          </div>
        </div>
        <p className="mt-6 text-center">
          <Link href={`/${lang}/safety`} className="font-medium text-primary hover:underline">{t.nav.safetyTips}</Link>
        </p>
      </section>

      <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="text-center text-xl font-semibold text-foreground">{t.home.whyUs}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.noPlatformPayments}</p>
            <p className="mt-1 text-sm text-secondary">{t.home.noPlatformPaymentsDesc}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.directContact}</p>
            <p className="mt-1 text-sm text-secondary">{t.home.directContactDesc}</p>
          </div>
          <div className="text-center">
            <Link href={`/${lang}/safety`} className="font-medium text-primary hover:underline">{t.home.scamTips}</Link>
            <p className="mt-1 text-sm text-secondary">{t.home.scamTipsDesc}</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">{t.home.reportListing}</p>
            <p className="mt-1 text-sm text-secondary">{t.home.reportListingDesc}</p>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-center text-xl font-semibold text-foreground">{t.home.howItWorks}</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">1</span>
            <h3 className="mt-4 font-semibold text-foreground">{t.home.step1Title}</h3>
            <p className="mt-2 text-sm text-secondary">{t.home.step1Desc}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">2</span>
            <h3 className="mt-4 font-semibold text-foreground">{t.home.step2Title}</h3>
            <p className="mt-2 text-sm text-secondary">{t.home.step2Desc}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">3</span>
            <h3 className="mt-4 font-semibold text-foreground">{t.home.step3Title}</h3>
            <p className="mt-2 text-sm text-secondary">{t.home.step3Desc}</p>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <RecentlyViewed lang={lang} />
      </div>
    </div>
  );
}
