import Link from "next/link";
import { getSimilarListings, getCategoryLabel, getStateName, formatPrice } from "@/lib/data";
import { getListingImageUrl } from "@/lib/images";
import type { Listing } from "@/lib/data";

export function SimilarListings({ listing, limit = 4, lang }: { listing: Listing; limit?: number; lang: string }) {
  const similar = getSimilarListings(listing, limit);
  if (similar.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">Similar listings</h3>
      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {similar.map((item) => {
          const imgUrl = item.imageUrls?.[0] ?? getListingImageUrl(item.category);
          return (
          <li key={item.id}>
            <Link
              href={`/${lang}/listing/${item.id}`}
              className="flex gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-primary hover:bg-gray-50"
            >
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded bg-gray-100">
                <img src={imgUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-primary">{getCategoryLabel(item.category)}</p>
                <p className="truncate font-medium text-foreground">{item.title}</p>
                <p className="text-sm font-semibold text-foreground">{formatPrice(item.price)}</p>
                <p className="text-xs text-secondary">{getStateName(item.state)}</p>
              </div>
            </Link>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
