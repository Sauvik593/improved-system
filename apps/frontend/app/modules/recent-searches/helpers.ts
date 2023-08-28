import { differenceInCalendarDays } from 'date-fns';
import { type OldAppLocation } from '../types';
import { type SearchType } from '../homepage/ui/search-box';

export interface RecentSearch {
  mainFeature: string | null;
  location: OldAppLocation;
  nationId: number;
  params: {
    paymentSchema: number | null;
    minPrice?: number;
    maxPrice?: number;
    propertyGroup?: string[];
  };
  url: string;
  createdAt: number;
  count?: number;
  lastCountedAt?: number;
}

export interface RecentSearchStorage {
  [key: number]: RecentSearch[];
}

const KEY = 'ky.recentSearches';

const ACTIVE_SEARCH_MAP = {
  buy: 0,
  rent: 1,
  agents: 'unknown',
};

const getRecentSearchStorage = (): RecentSearchStorage => {
  if (typeof localStorage === 'undefined') return {};

  const storageSearches = localStorage.getItem(KEY);

  return storageSearches ? JSON.parse(storageSearches) : {};
};

export const getRecentSearches = (nationId: number, activeSearch: SearchType) => {
  try {
    const allSearches = getRecentSearchStorage();
    const nationSearches = allSearches[nationId] || [];

    // Return only searches that match the active search type
    // Sort by createdAt
    return nationSearches
      .filter((search) => search.params?.paymentSchema == ACTIVE_SEARCH_MAP[activeSearch])
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (e) {
    console.warn(e);

    return [];
  }
};

export const addRecentSearch = (payload: RecentSearch) => {
  try {
    const allSearches = getRecentSearchStorage();
    const nationSearches = allSearches[payload.nationId] || [];
    const newNationSearches = [payload, ...nationSearches].slice(0, 3);

    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...allSearches,
        [payload.nationId]: newNationSearches,
      }),
    );
  } catch (e) {
    console.warn(e);
  }
};

export const updateRecentSearch = (
  createdAt: number,
  nationId: number,
  payload: Partial<RecentSearch>,
) => {
  try {
    const allSearches = getRecentSearchStorage();
    const nationSearches = allSearches[nationId] || [];
    const updatedNationSearches = nationSearches.map(mapUpdatedRecentSearch(createdAt, payload));

    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...allSearches,
        [nationId]: updatedNationSearches,
      }),
    );
  } catch (e) {
    console.warn(e);
  }
};

const mapUpdatedRecentSearch =
  (createdAt: number, payload: Partial<RecentSearch>) => (search: RecentSearch) => {
    if (search.createdAt !== createdAt) {
      return search;
    }

    return {
      ...search,
      ...payload,
    };
  };

export const getDaysSinceFromCreatedAt = (createdAt: number) =>
  differenceInCalendarDays(Date.now(), createdAt);
