import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getListingById,
  getCategoryLabel,
  getStateName,
  formatPrice,
  getSimilarListings,
} from "@/lib/data";
import { getListingImageUrl } from "@/lib/images";
import { ImageGallery } from "@/components/ImageGallery";
import { SpecsTable } from "@/components/SpecsTable";
import { SimilarListings } from "@/components/SimilarListings";
import { SafetyTips } from "@/components/SafetyTips";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ListingViewClient } from "@/app/listing/[id]/ListingViewClient";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { ReportButton } from "@/components/ReportButton";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: "Listing not found" };
  const category = getCategoryLabel(listing.category);
  return {
    title: `${listing.title} | ${category} | Imbatruck Company LLC`,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description.slice(0, 160),
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { lang, id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const condition = listing.specs && "condition" in listing.specs ? listing.specs.condition : undefined;
  const imageUrls = listing.imageUrls?.length ? listing.imageUrls : [getListingImageUrl(listing.category)];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    ...(listing.price > 0 && { offers: { "@type": "Offer", price: listing.price, priceCurrency: "USD" } }),
    ...(condition && { itemCondition: `https://schema.org/${condition.replace(/\s/g, "")}Condition` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingViewClient listingId={id} />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: `/${lang}` },
            { label: "Listings", href: `/${lang}/listings` },
            { label: getCategoryLabel(listing.category), href: `/${lang}/listings?category=${listing.category}` },
            { label: listing.title },
          ]}
        />
        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
              <ImageGallery imageUrls={imageUrls} title={listing.title} />
              <div className="p-6">
                <p className="text-sm font-medium uppercase text-primary">
                  {getCategoryLabel(listing.category)}
                </p>
                <h1 className="mt-1 text-2xl font-bold text-foreground">{listing.title}</h1>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {formatPrice(listing.price)}
                </p>
                <p className="mt-1 text-secondary">
                  {getStateName(listing.state)}, {listing.city}
                </p>
                {listing.specs && (
                  <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-sm">
                    {"year" in listing.specs && listing.specs.year && (
                      <span><strong>Year:</strong> {listing.specs.year}</span>
                    )}
                    {"make" in listing.specs && listing.specs.make && (
                      <span><strong>Make:</strong> {listing.specs.make}</span>
                    )}
                    {"model" in listing.specs && listing.specs.model && (
                      <span><strong>Model:</strong> {listing.specs.model}</span>
                    )}
                    {"mileage" in listing.specs && listing.specs.mileage != null && (
                      <span><strong>Mileage:</strong> {(listing.specs.mileage / 1000).toFixed(0)}k mi</span>
                    )}
                    {"condition" in listing.specs && listing.specs.condition && (
                      <span><strong>Condition:</strong> {listing.specs.condition}</span>
                    )}
                  </div>
                )}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-foreground">Overview</h2>
                  <p className="mt-2 whitespace-pre-wrap text-secondary">{listing.description}</p>
                </div>
                <SpecsTable listing={listing} />
                {condition && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground">Condition</h3>
                    <p className="mt-1 text-secondary">{condition}</p>
                  </div>
                )}
                <div className="mt-8">
                  <SimilarListings listing={listing} limit={4} lang={lang} />
                </div>
                <div className="mt-8">
                  <SafetyTips />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <ReportButton />
                </div>
              </div>
            </div>
          </div>
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-4 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-foreground">Seller</h3>
                <p className="mt-2">
                  <a href={`mailto:${listing.email}`} className="text-primary hover:underline">
                    {listing.email}
                  </a>
                </p>
                {listing.phone && <p className="mt-1 text-foreground">{listing.phone}</p>}
                <a
                  href={`mailto:${listing.email}`}
                  className="mt-4 block w-full rounded bg-cta py-3 text-center font-medium text-white hover:bg-cta-hover"
                >
                  Contact seller
                </a>
              </div>
              <RecentlyViewed lang={lang} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
