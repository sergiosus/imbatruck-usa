"use client";

import { useState } from "react";
import { DEFAULT_IMAGE_URL } from "@/lib/images";

interface ImageGalleryProps {
  imageUrls: string[] | undefined;
  title: string;
}

export function ImageGallery({ imageUrls, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = imageUrls?.length ? imageUrls : [DEFAULT_IMAGE_URL];
  const current = images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={current}
          alt={`${title} - image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
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
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
