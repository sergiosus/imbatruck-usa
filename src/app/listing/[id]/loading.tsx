export default function ListingLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="aspect-[16/9] w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 h-32 w-full animate-pulse rounded bg-gray-200" />
        </div>
        <div className="hidden w-80 shrink-0 lg:block">
          <div className="h-48 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
