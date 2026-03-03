export default function ListingLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-6 space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <aside className="lg:w-80">
          <div className="h-40 animate-pulse rounded-lg bg-gray-200" />
        </aside>
      </div>
    </div>
  );
}
