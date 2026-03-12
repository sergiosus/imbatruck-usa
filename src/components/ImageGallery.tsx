"use client";

import { useState } from "react";
import { getListingImageUrl } from "@/lib/images";
import { DEFAULT_IMAGE_URL } from "@/lib/images";

interface ImageGalleryProps {
  imageUrls: string[] | undefined;
  title: string;
  category?: string;
}

export function ImageGallery({ imageUrls, title, category = "trucks" }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const images = imageUrls?.length ? imageUrls : [DEFAULT_IMAGE_URL];
  const getEffectiveUrl = (url: string, index: number) =>
    failed.has(index) ? (category ? getListingImageUrl(category) : DEFAULT_IMAGE_URL) : url;
  const current = getEffectiveUrl(images[activeIndex], activeIndex);

  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={current}
          alt={`${title} - image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
          onError={() => setFailed((prev) => new Set(prev).add(activeIndex))}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded border-2 ${
                i === activeIndex ? "border-primary" : "border-gray-200"
              }`}
            >
              <img
                src={getEffectiveUrl(url, i)}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setFailed((prev) => new Set(prev).add(i))}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
