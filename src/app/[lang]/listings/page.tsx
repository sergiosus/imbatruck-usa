import { Suspense } from "react";
import { ListingsContent } from "./ListingsContent";
import { ListingCardSkeleton } from "@/components/ListingCardSkeleton";

export default async function ListingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            <div className="h-96 w-64 shrink-0 animate-pulse rounded-lg bg-gray-200" />
            <div className="grid flex-1 grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ListingsContent lang={lang} />
    </Suspense>
  );
}
