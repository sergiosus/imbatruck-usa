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
  createdAt: string;
  specs?: TruckSpecs | TrailerSpecs | EquipmentSpecs | PartsSpecs | FreightServiceSpecs | DriverSpecs;
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    category: "trucks",
    title: "2019 Kenworth T680 Sleeper",
    description: "Well-maintained Kenworth T680 with 450k miles. New tires, recent service. Ready for work.",
    price: 85000,
    state: "TX",
    city: "Dallas",
    email: "seller1@example.com",
    phone: "(214) 555-0123",
    featured: true,
    createdAt: "2024-01-15T10:00:00Z",
    specs: {
      year: 2019,
      make: "Kenworth",
      model: "T680",
      engine: "PACCAR MX-13",
      horsepower: 455,
      transmission: "Auto",
      mileage: 450000,
      sleeper: true,
      axles: "6x4",
      condition: "Good",
      cleanTitle: true,
    },
  },
  {
    id: "2",
    category: "trailers",
    title: "53ft Dry Van Trailer",
    description: "2018 Wabash 53ft dry van. Good condition, no holes. Annual inspection passed.",
    price: 32000,
    state: "CA",
    city: "Los Angeles",
    email: "seller2@example.com",
    createdAt: "2024-01-14T14:30:00Z",
    specs: {
      type: "Dry Van",
      length: "53 ft",
      axles: "3",
      suspension: "Air",
      condition: "Good",
    },
  },
  {
    id: "3",
    category: "equipment",
    title: "Forklift - Electric 5000 lb",
    description: "Crown pallet jack, 5000 lb capacity. Battery holds charge. Used in warehouse.",
    price: 2400,
    state: "IL",
    city: "Chicago",
    email: "seller3@example.com",
    phone: "(312) 555-0456",
    createdAt: "2024-01-13T09:00:00Z",
    specs: {
      brand: "Crown",
      model: "PE 5000",
      year: 2018,
      hours: 3200,
      condition: "Good",
    },
  },
  {
    id: "4",
    category: "freight-services",
    title: "LTL Freight — Midwest to West Coast",
    description: "Regular LTL runs Chicago to LA. Competitive rates. Contact for quote.",
    price: 0,
    state: "IL",
    city: "Chicago",
    email: "freight@example.com",
    phone: "(312) 555-0789",
    createdAt: "2024-01-12T11:00:00Z",
    specs: {
      serviceArea: "Midwest, West Coast",
      equipmentType: "Dry van, Flatbed",
      insurance: "Yes",
      mcDotNumber: "MC-123456",
      availability: "Weekly",
    },
  },
  {
    id: "5",
    category: "trucks",
    title: "2020 Peterbilt 579",
    description: "Peterbilt 579 with PACCAR MX-13. 400k miles. Clean title.",
    price: 92000,
    state: "OH",
    city: "Columbus",
    email: "truck@example.com",
    featured: true,
    createdAt: "2024-01-11T08:00:00Z",
    specs: {
      year: 2020,
      make: "Peterbilt",
      model: "579",
      engine: "PACCAR MX-13",
      horsepower: 455,
      transmission: "Auto",
      mileage: 400000,
      sleeper: true,
      axles: "6x4",
      condition: "Excellent",
      cleanTitle: true,
    },
  },
  {
    id: "6",
    category: "trailers",
    title: "Flatbed 48ft",
    description: "2017 Great Dane flatbed. Winch, straps included. Texas only.",
    price: 28000,
    state: "TX",
    city: "Houston",
    email: "flatbed@example.com",
    phone: "(713) 555-0321",
    createdAt: "2024-01-10T16:00:00Z",
    specs: {
      type: "Flatbed",
      length: "48 ft",
      axles: "3",
      suspension: "Spring",
      condition: "Good",
    },
  },
  {
    id: "7",
    category: "parts",
    title: "PACCAR MX-13 Turbo Assembly",
    description: "OEM turbo for MX-13. Low miles, excellent condition.",
    price: 1800,
    state: "TX",
    city: "Dallas",
    email: "parts@example.com",
    createdAt: "2024-01-09T12:00:00Z",
    specs: {
      category: "Engine",
      compatibleModels: "Kenworth T680, Peterbilt 579",
      condition: "Excellent",
    },
  },
  {
    id: "8",
    category: "drivers",
    title: "CDL Class A Driver Available",
    description: "10+ years OTR experience. Clean MVR. Available immediately.",
    price: 0,
    state: "FL",
    city: "Jacksonville",
    email: "driver@example.com",
    phone: "(904) 555-0111",
    createdAt: "2024-01-08T09:00:00Z",
    specs: {
      licenseType: "Class A",
      experience: "10+ years OTR",
      availability: "Immediate",
    },
  },
];

export function getListingById(id: string): Listing | undefined {
  return MOCK_LISTINGS.find((l) => l.id === id);
}

export function getSimilarListings(listing: Listing, limit = 4): Listing[] {
  return MOCK_LISTINGS.filter(
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
