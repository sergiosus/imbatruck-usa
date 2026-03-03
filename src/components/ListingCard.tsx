"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getCategoryLabel, getStateName, formatPrice } from "@/lib/data";
import { getListingImageUrl } from "@/lib/images";
import { getT } from "@/lib/translations";
import type { Listing } from "@/lib/data";

const SAVED_KEY = "imbatruck-saved";

function getSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function toggleSaved(id: string): string[] {
  const ids = getSavedIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

interface ListingCardProps {
  listing: Listing;
  variant?: "grid" | "list";
  lang?: string;
}

export function ListingCard({ listing, variant = "grid", lang = "en" }: ListingCardProps) {
  const t = getT(lang);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setIsSaved(getSavedIds().includes(listing.id));
    const handler = () => setIsSaved(getSavedIds().includes(listing.id));
    window.addEventListener("imbatruck-saved-update", handler);
    return () => window.removeEventListener("imbatruck-saved-update", handler);
  }, [listing.id]);

  const handleHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSaved(listing.id);
      window.dispatchEvent(new Event("imbatruck-saved-update"));
    },
    [listing.id]
  );

  const imageUrl = listing.imageUrls?.[0] ?? getListingImageUrl(listing.category);
  const categoryLabel = (getT(lang).categories as Record<string, string>)[listing.category] ?? getCategoryLabel(listing.category);
  const priceText = listing.price === 0 ? t.listing.contactForPrice : formatPrice(listing.price);

  const imageBlock = (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      {listing.featured && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-cta px-2.5 py-1 text-xs font-semibold text-white shadow">
          {t.listing.featured}
        </span>
      )}
      <button
        type="button"
        onClick={handleHeartClick}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
        aria-label={isSaved ? t.listing.unsaveListing : t.listing.saveListing}
      >
        <svg
          className={`h-5 w-5 ${isSaved ? "fill-cta text-cta" : "text-gray-500"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );

  const textBlock = (
    <div className={variant === "list" ? "min-w-0 flex-1 p-4" : "space-y-1 p-4"}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {categoryLabel}
      </p>
      <h3 className="mt-1 font-semibold text-foreground line-clamp-2">
        {listing.title}
      </h3>
      <p className="mt-2 text-2xl font-bold text-foreground">{priceText}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary">
        <svg className="h-4 w-4 shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {getStateName(listing.state)}
      </p>
    </div>
  );

  if (variant === "list") {
    return (
      <Link
        href={`/${lang}/listing/${listing.id}`}
        className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          {listing.featured && (
            <span className="absolute left-2 top-2 z-10 rounded bg-cta px-2 py-0.5 text-xs font-semibold text-white">
              {t.listing.featured}
            </span>
          )}
        </div>
        {textBlock}
      </Link>
    );
  }

  return (
    <Link
      href={`/${lang}/listing/${listing.id}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {imageBlock}
      {textBlock}
    </Link>
  );
}
