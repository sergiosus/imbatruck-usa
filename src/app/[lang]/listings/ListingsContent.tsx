"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useCallback, Suspense } from "react";
import { LISTINGS, type Listing } from "@/lib/data";
import { FilterSidebar, defaultFilters, type FilterState } from "@/components/FilterSidebar";
import { ListingCard } from "@/components/ListingCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/EmptyState";
import { getT } from "@/lib/translations";

const PER_PAGE = 12;
type SortOption = "newest" | "price-asc" | "price-desc";

function parseFilters(searchParams: URLSearchParams): FilterState {
  return {
    q: searchParams.get("q") ?? defaultFilters.q,
    category: searchParams.get("category") ?? defaultFilters.category,
    state: searchParams.get("state") ?? defaultFilters.state,
    priceMin: searchParams.get("priceMin") ?? defaultFilters.priceMin,
    priceMax: searchParams.get("priceMax") ?? defaultFilters.priceMax,
    yearMin: searchParams.get("yearMin") ?? defaultFilters.yearMin,
    yearMax: searchParams.get("yearMax") ?? defaultFilters.yearMax,
    mileageMin: searchParams.get("mileageMin") ?? defaultFilters.mileageMin,
    mileageMax: searchParams.get("mileageMax") ?? defaultFilters.mileageMax,
    condition: searchParams.get("condition") ?? defaultFilters.condition,
  };
}

function getSpecYear(listing: Listing): number | undefined {
  const s = listing.specs;
  if (!s) return undefined;
  if ("year" in s && typeof (s as { year?: number }).year === "number") return (s as { year: number }).year;
  return undefined;
}
function getSpecMileage(listing: Listing): number | undefined {
  const s = listing.specs;
  if (!s) return undefined;
  if ("mileage" in s && typeof (s as { mileage?: number }).mileage === "number") return (s as { mileage: number }).mileage;
  return undefined;
}
function getSpecCondition(listing: Listing): string | undefined {
  const s = listing.specs;
  if (!s || !("condition" in s)) return undefined;
  return (s as { condition?: string }).condition;
}

export function ListingsContent({ lang }: { lang: string }) {
  const t = getT(lang);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const sort = (searchParams.get("sort") as SortOption) || "newest";
  const view = searchParams.get("view") === "list" ? "list" : "grid";
  const [filterState, setFilterState] = useState<FilterState>(() => parseFilters(searchParams));

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(filterState).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    if (sort !== "newest") params.set("sort", sort);
    if (view === "list") params.set("view", "list");
    router.push(`/${lang}/listings?${params.toString()}`);
  }, [filterState, sort, view, router, lang]);

  const filtered = useMemo(() => {
    let list = LISTINGS.filter((l) => !l.sold);
    if (filterState.q) {
      const q = filterState.q.toLowerCase();
      list = list.filter((l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    if (filterState.category) list = list.filter((l) => l.category === filterState.category);
    if (filterState.state) list = list.filter((l) => l.state === filterState.state);
    const pMin = filterState.priceMin ? Number(filterState.priceMin) : null;
    const pMax = filterState.priceMax ? Number(filterState.priceMax) : null;
    if (pMin != null) list = list.filter((l) => l.price >= pMin);
    if (pMax != null) list = list.filter((l) => l.price <= pMax);
    const yMin = filterState.yearMin ? Number(filterState.yearMin) : null;
    const yMax = filterState.yearMax ? Number(filterState.yearMax) : null;
    if (yMin != null) list = list.filter((l) => (getSpecYear(l) ?? 0) >= yMin);
    if (yMax != null) list = list.filter((l) => (getSpecYear(l) ?? 9999) <= yMax);
    const mMin = filterState.mileageMin ? Number(filterState.mileageMin) : null;
    const mMax = filterState.mileageMax ? Number(filterState.mileageMax) : null;
    if (mMin != null) list = list.filter((l) => (getSpecMileage(l) ?? 0) >= mMin);
    if (mMax != null) list = list.filter((l) => (getSpecMileage(l) ?? Infinity) <= mMax);
    if (filterState.condition) list = list.filter((l) => getSpecCondition(l) === filterState.condition);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [filterState, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = useMemo(() => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [filtered, page]);
  const setFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setSort = (s: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", s);
    params.set("page", "1");
    router.push(`/${lang}/listings?${params.toString()}`);
  };
  const setView = (v: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    if (v === "list") params.set("view", "list");
    else params.delete("view");
    params.set("page", "1");
    router.push(`/${lang}/listings?${params.toString()}`);
  };
  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/${lang}/listings?${params.toString()}`);
  };

  const saveSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filterState).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    if (sort !== "newest") params.set("sort", sort);
    try {
      const saved = JSON.parse(localStorage.getItem("imbatruck-saved-searches") ?? "[]");
      saved.push({ name: "Saved search", params: params.toString(), at: Date.now() });
      localStorage.setItem("imbatruck-saved-searches", JSON.stringify(saved.slice(-10)));
      alert("Search saved.");
    } catch {
      alert("Could not save search.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumb items={[{ label: t.listing.home, href: `/${lang}` }, { label: t.listing.listings }]} />
      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <FilterSidebar lang={lang} filters={filterState} onFilterChange={setFilter} onApply={applyFilters} onSaveSearch={saveSearch} resultCount={filtered.length} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">{t.listing.listings}</h1>
            <div className="flex items-center gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm">
                <option value="newest">{t.listing.newest}</option>
                <option value="price-asc">{t.listing.priceLowToHigh}</option>
                <option value="price-desc">{t.listing.priceHighToLow}</option>
              </select>
              <div className="flex overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                <button type="button" onClick={() => setView("grid")} className={`px-3 py-2 text-sm ${view === "grid" ? "bg-primary text-white" : "bg-white text-secondary"}`} aria-label={t.listing.grid}>{t.listing.grid}</button>
                <button type="button" onClick={() => setView("list")} className={`px-3 py-2 text-sm ${view === "list" ? "bg-primary text-white" : "bg-white text-secondary"}`} aria-label={t.listing.list}>{t.listing.list}</button>
              </div>
            </div>
          </div>
          {paginated.length === 0 ? (
            <div className="mt-8 space-y-10">
              <EmptyState
                title={t.listing.emptyMarketplaceTitle}
                description={t.listing.emptyMarketplaceDesc}
                actionLabel={t.listing.emptyMarketplaceCta}
                actionHref={`/${lang}/post`}
                secondaryLabel={filtered.length === 0 && !filterState.q && !filterState.category && !filterState.state ? undefined : t.listing.clearFilters}
                secondaryHref={filtered.length === 0 && !filterState.q && !filterState.category && !filterState.state ? undefined : `/${lang}/listings`}
              />
              <section className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8" aria-labelledby="listings-how-heading">
                <h2 id="listings-how-heading" className="text-center text-lg font-semibold text-foreground">{t.home.howItWorks}</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="text-center">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">1</span>
                    <h3 className="mt-3 font-medium text-foreground">{t.home.step1Title}</h3>
                    <p className="mt-1 text-sm text-secondary">{t.home.step1Desc}</p>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">2</span>
                    <h3 className="mt-3 font-medium text-foreground">{t.home.step2Title}</h3>
                    <p className="mt-1 text-sm text-secondary">{t.home.step2Desc}</p>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">3</span>
                    <h3 className="mt-3 font-medium text-foreground">{t.home.step3Title}</h3>
                    <p className="mt-1 text-sm text-secondary">{t.home.step3Desc}</p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <>
              <div className={view === "list" ? "mt-6 space-y-3" : "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
                {paginated.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} variant={view} lang={lang} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <button type="button" onClick={() => setPage(page - 1)} disabled={page <= 1} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50">{t.listing.previous}</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1).map((p, i, arr) => (
                    <span key={p}>
                      {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1">…</span>}
                      <button type="button" onClick={() => setPage(p)} className={`rounded-lg px-3 py-1.5 text-sm ${p === page ? "bg-primary text-white" : "border border-gray-300 bg-white hover:bg-gray-50"}`}>{p}</button>
                    </span>
                  ))}
                  <button type="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50">{t.listing.next}</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
