"use client";

import { CATEGORIES, US_STATES, CONDITIONS } from "@/lib/data";
import { getT } from "@/lib/translations";

export interface FilterState {
  q: string;
  category: string;
  state: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMin: string;
  mileageMax: string;
  condition: string;
  manufacturer: string;
  engine: string;
  transmission: string;
  trailerLength: string;
  fuelType: string;
}

interface FilterSidebarProps {
  lang: string;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onApply: () => void;
  onSaveSearch?: () => void;
  resultCount?: number;
}

export const defaultFilters: FilterState = {
  q: "",
  category: "",
  state: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  mileageMin: "",
  mileageMax: "",
  condition: "",
  manufacturer: "",
  engine: "",
  transmission: "",
  trailerLength: "",
  fuelType: "",
};

export function FilterSidebar({
  lang,
  filters,
  onFilterChange,
  onApply,
  onSaveSearch,
  resultCount,
}: FilterSidebarProps) {
  const t = getT(lang);
  const categoryLabels = t.categories as Record<string, string>;
  const conditionLabels = t.conditions as Record<string, string>;

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="sticky top-24 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:top-4">
        <h3 className="font-semibold text-foreground">{t.filters.title}</h3>
        <input
          type="search"
          placeholder={t.filters.searchPlaceholder}
          value={filters.q}
          onChange={(e) => onFilterChange("q", e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div>
          <label className="block text-xs font-medium text-secondary">{t.filters.category}</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">{t.filters.all}</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{categoryLabels[c.id] ?? c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">{t.filters.state}</label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange("state", e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">{t.filters.allStates}</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.priceMin}</label>
            <input
              type="number"
              min={0}
              value={filters.priceMin}
              onChange={(e) => onFilterChange("priceMin", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.priceMax}</label>
            <input
              type="number"
              min={0}
              value={filters.priceMax}
              onChange={(e) => onFilterChange("priceMax", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.yearFrom}</label>
            <input
              type="number"
              min={1900}
              max={2030}
              value={filters.yearMin}
              onChange={(e) => onFilterChange("yearMin", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.yearTo}</label>
            <input
              type="number"
              min={1900}
              max={2030}
              value={filters.yearMax}
              onChange={(e) => onFilterChange("yearMax", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.mileageMin}</label>
            <input
              type="number"
              min={0}
              value={filters.mileageMin}
              onChange={(e) => onFilterChange("mileageMin", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-secondary">{t.filters.mileageMax}</label>
            <input
              type="number"
              min={0}
              value={filters.mileageMax}
              onChange={(e) => onFilterChange("mileageMax", e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">{t.filters.condition}</label>
          <select
            value={filters.condition}
            onChange={(e) => onFilterChange("condition", e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">{t.filters.any}</option>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>{conditionLabels[c] ?? c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">Manufacturer</label>
          <input type="text" value={filters.manufacturer} onChange={(e) => onFilterChange("manufacturer", e.target.value)} placeholder="e.g. Kenworth" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">Engine</label>
          <input type="text" value={filters.engine} onChange={(e) => onFilterChange("engine", e.target.value)} placeholder="e.g. PACCAR MX-13" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">Transmission</label>
          <input type="text" value={filters.transmission} onChange={(e) => onFilterChange("transmission", e.target.value)} placeholder="e.g. Auto" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">Trailer length</label>
          <input type="text" value={filters.trailerLength} onChange={(e) => onFilterChange("trailerLength", e.target.value)} placeholder="e.g. 53 ft" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-secondary">Fuel type</label>
          <select value={filters.fuelType} onChange={(e) => onFilterChange("fuelType", e.target.value)} className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm">
            <option value="">Any</option>
            <option value="diesel">Diesel</option>
            <option value="gasoline">Gasoline</option>
            <option value="electric">Electric</option>
            <option value="cng">CNG</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded bg-cta py-2 text-sm font-medium text-white hover:bg-cta-hover"
          >
            {t.filters.apply}
          </button>
          {onSaveSearch && (
            <button
              type="button"
              onClick={onSaveSearch}
              className="w-full rounded border border-gray-300 py-2 text-sm font-medium text-foreground hover:bg-gray-50"
            >
              {t.filters.saveSearch}
            </button>
          )}
        </div>
        {resultCount !== undefined && (
          <p className="text-xs text-secondary">{t.filters.listingsCount(resultCount)}</p>
        )}
      </div>
    </aside>
  );
}
