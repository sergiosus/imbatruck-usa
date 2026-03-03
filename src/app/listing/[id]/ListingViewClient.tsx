"use client";

import { useEffect } from "react";
import { addRecentlyViewed } from "@/components/RecentlyViewed";

export function ListingViewClient({ listingId }: { listingId: string }) {
  useEffect(() => {
    addRecentlyViewed(listingId);
  }, [listingId]);
  return null;
}
