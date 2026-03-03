export function ListingCardSkeleton({ variant = "grid" }: { variant?: "grid" | "list" }) {
  if (variant === "list") {
    return (
      <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="h-24 w-32 shrink-0 animate-pulse rounded bg-gray-200" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/5 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
