/**
 * Placeholder images when listing has no uploaded image. Stored in /public/placeholders/.
 * Listings show only uploaded images or these placeholders — no external stock photos.
 */
const PLACEHOLDERS: Record<string, string> = {
  trucks: "/placeholders/placeholder-truck.svg",
  trailers: "/placeholders/placeholder-trailer.svg",
  parts: "/placeholders/placeholder-parts.svg",
  equipment: "/placeholders/placeholder-equipment.svg",
  "freight-services": "/placeholders/placeholder-truck.svg",
  drivers: "/placeholders/placeholder-default.svg",
};

export const HERO_IMAGE_URL = "/placeholders/hero-placeholder.svg";

/** Fallback when no image URL is provided (e.g. in ImageGallery). */
export const DEFAULT_IMAGE_URL = PLACEHOLDERS.trucks;

export function getListingImageUrl(category: string, _index = 0): string {
  return PLACEHOLDERS[category] ?? PLACEHOLDERS.trucks;
}
