import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppContext } from '~/common/contexts/app.context';
import { type LocationSuggestion } from '.';
import { type RecentSearchSuggestion } from './use-location-suggestion';

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
  const { t } = useTranslation();
  const [activeSearch, setActiveSearch] = useState<SearchType>('buy');
  const [selected, setSelected] = useState<LocationSuggestion | RecentSearchSuggestion | null>(
    null,
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { country } = useAppContext();

  const formRef = useRef<HTMLFormElement>(null);

  const handleActiveSearch = (searchType: string) => {
    setActiveSearch(searchType as SearchType);
  };

  const mobileLabel = selected
    ? selected.name
    : (t('common.homepage.searchbox.placeholder') as string);
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
    nationId: country?.id,
  };
};
