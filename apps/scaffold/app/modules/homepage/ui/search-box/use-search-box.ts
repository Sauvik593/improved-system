import { useState, useRef } from 'react';
import { type LocationSuggestion } from '.';
const searchTypeHashes = ['#buy', '#rent', '#agents'] as const;
const searchTypes = ['buy', 'rent', 'agents'] as const;

const SEARCH_DATA = [
  {
    name: 'Buy',
    hash: '#buy' as const,
    type: 'buy' as const,
    title: 'Buy',
  },
  {
    name: 'Rent',
    hash: '#rent' as const,
    type: 'rent' as const,
    title: 'Rent',
  },
  {
    name: 'Agents',
    hash: '#agents' as const,
    type: 'agents' as const,
    title: 'Agents',
  },
];

export type SearchTypeHash = typeof searchTypeHashes[number];
export type SearchType = typeof searchTypes[number];
export type SearchData = typeof SEARCH_DATA;

export const useSearchBox = () => {
  const [activeSearch, setActiveSearch] = useState<SearchType>('buy');
  const [selected, setSelected] = useState<LocationSuggestion | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleActiveSearch = (searchType: string) => {
    setActiveSearch(searchType as SearchType);
  };

  const mobileLabel = selected ? selected.name : 'Search by country, region or city';
  const stringifiedLocation = selected ? JSON.stringify(selected) : '';

  return {
    activeSearch,
    selected,
    setSelected,
    isOpenModal,
    setIsOpenModal,
    formRef,
    handleActiveSearch,
    mobileLabel,
    stringifiedLocation,
  };
};
