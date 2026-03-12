export const CATEGORIES = [
  { id: "trucks", label: "Trucks" },
  { id: "trailers", label: "Trailers" },
  { id: "equipment", label: "Heavy Equipment" },
  { id: "freight-services", label: "Freight Services" },
  { id: "drivers", label: "Drivers" },
  { id: "parts", label: "Parts" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const CONDITIONS = [
  "Excellent",
  "Good",
  "Fair",
  "For parts",
] as const;

export type Condition = (typeof CONDITIONS)[number];

export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
] as const;

export interface TruckSpecs {
  year?: number;
  make?: string;
  model?: string;
  engine?: string;
  horsepower?: number;
  transmission?: string;
  mileage?: number;
  sleeper?: boolean;
  axles?: string;
  condition?: Condition;
  vin?: string;
  cleanTitle?: boolean;
}

export interface TrailerSpecs {
  type?: string;
  length?: string;
  axles?: string;
  suspension?: string;
  condition?: Condition;
}

export interface EquipmentSpecs {
  brand?: string;
  model?: string;
  year?: number;
  hours?: number;
  condition?: Condition;
}

export interface PartsSpecs {
  category?: string;
  compatibleModels?: string;
  condition?: Condition;
}

export interface FreightServiceSpecs {
  serviceArea?: string;
  equipmentType?: string;
  insurance?: string;
  mcDotNumber?: string;
  availability?: string;
}

/** Freight load listing (load board style): origin, destination, trailer type, weight, rate, pickup. */
export interface FreightLoadSpecs {
  originCity?: string;
  originState?: string;
  destinationCity?: string;
  destinationState?: string;
  trailerType?: string;
  weightLbs?: number;
  pickupDate?: string;
}

export const TRAILER_TYPES = [
  "Dry Van",
  "Flatbed",
  "Reefer",
  "Step Deck",
  "Power Only",
] as const;

export type TrailerType = (typeof TRAILER_TYPES)[number];

export interface DriverSpecs {
  licenseType?: string;
  experience?: string;
  availability?: string;
}

export type ListingSpecs =
  | TruckSpecs
  | TrailerSpecs
  | EquipmentSpecs
  | PartsSpecs
  | FreightServiceSpecs
  | FreightLoadSpecs
  | DriverSpecs;

export interface Listing {
  id: string;
  category: CategoryId;
  title: string;
  description: string;
  price: number;
  state: string;
  city: string;
  email: string;
  phone?: string;
  imageUrls?: string[];
  featured?: boolean;
  sold?: boolean;
  /** True for platform demonstration sample listings. */
  isSample?: boolean;
  createdAt: string;
  specs?: TruckSpecs | TrailerSpecs | EquipmentSpecs | PartsSpecs | FreightServiceSpecs | FreightLoadSpecs | DriverSpecs;
}

/** All listings: sample demo data (freight loads + trucks) for platform demonstration. */
import { getAllSampleListings } from "@/data/sampleListings";

export const LISTINGS: Listing[] = getAllSampleListings();

export function getListingById(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export function getSimilarListings(listing: Listing, limit = 4): Listing[] {
  return LISTINGS.filter(
    (l) => l.id !== listing.id && l.category === listing.category && !l.sold
  ).slice(0, limit);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getStateName(code: string): string {
  return US_STATES.find((s) => s.code === code)?.name ?? code;
}

export function formatPrice(price: number): string {
  if (price === 0) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
