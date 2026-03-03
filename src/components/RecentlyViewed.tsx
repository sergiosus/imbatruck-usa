"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getListingById, getStateName, formatPrice } from "@/lib/data";
import { getT } from "@/lib/translations";

const RECENT_KEY = "imbatruck-recent";
const MAX_RECENT = 6;

function getRecentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(id: string) {
  try {
    const ids = getRecentIds();
    const next = [id, ...ids.filter((x) => x !== id)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
}

export function RecentlyViewed({ lang }: { lang: string }) {
  const t = getT(lang);
  const categoryLabels = t.categories as Record<string, string>;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getRecentIds());
    const handler = () => setIds(getRecentIds());
    window.addEventListener("imbatruck-saved-update", handler);
    return () => window.removeEventListener("imbatruck-saved-update", handler);
  }, []);

  const listings = ids.map(getListingById).filter(Boolean) as NonNullable<ReturnType<typeof getListingById>>[];
  if (listings.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">{t.home.recentlyViewed}</h3>
      <ul className="mt-3 space-y-2">
        {listings.map((listing) => {
          const priceText = listing.price === 0 ? t.listing.contactForPrice : formatPrice(listing.price);
          const catLabel = categoryLabels[listing.category] ?? listing.category;
          return (
            <li key={listing.id}>
              <Link
                href={`/${lang}/listing/${listing.id}`}
                className="block truncate text-sm text-primary hover:underline"
              >
                {listing.title}
              </Link>
              <p className="text-xs text-secondary">
                {priceText} · {catLabel} · {getStateName(listing.state)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
