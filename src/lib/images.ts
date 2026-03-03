/**
 * High-quality royalty-free images from Unsplash. 4:3 ratio (w=800&h=600&fit=crop).
 * No brand logos. Used when listing has no imageUrls.
 */
export const CATEGORY_IMAGES: Record<string, string> = {
  trucks: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
  trailers: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",
  parts: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  equipment: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
  "freight-services": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
  drivers: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop",
};

export const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=675&fit=crop";

/** Fallback when no image URL is provided (e.g. in ImageGallery). */
export const DEFAULT_IMAGE_URL = CATEGORY_IMAGES.trucks;

export function getListingImageUrl(category: string, index = 0): string {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.trucks;
}
