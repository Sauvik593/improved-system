export type PrimeBoostStatus = 'pending' | 'boosted' | 'in_cart';

export type PrimeBoost = {
  id: string;
  price: string;
  status: PrimeBoostStatus;
  property: Property;
  createdAtFormatted: string;
  createdAt: string;
  priceFormatted: string;
  location: PrimeBoostSlotLocation;
};

export type PopularityScore = 'high' | 'mid' | 'low';

export type PrimeBoostSlotLocation = {
  id: string;
  type: string;
  name: string;
  popularity: PopularityScore;
};

export interface PrimeBoostSlot {
  location: PrimeBoostSlotLocation;
  primeBoost: PrimeBoost | null;
  boostable: boolean;
  price: number;
  priceFormatted: string;
}

type PropertyStatus = 'live' | 'hidden' | 'incomplete';

export type PropertyBoostSlots = {
  city: PrimeBoostSlot;
  province: PrimeBoostSlot;
  region: PrimeBoostSlot;
};

type PropertyStats = {
  enquiriesCount: number;
  viewsCount: number;
};

export interface Property {
  id: string;
  status: PropertyStatus;
  coverImageUrl: string;
  name: string;
  price: string;
  priceFormatted: string;
  selectedAsPrime: boolean;
  prime: boolean;
  refNumber: string;
  primeBoostSlots: PropertyBoostSlots;
  stats: PropertyStats;
  createdAtFormatted: string;
  url: string;
}

export interface Pagination {
  count: number;
  pages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}
