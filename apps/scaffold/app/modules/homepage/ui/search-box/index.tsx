import { Button } from '@kyero/ui';
import { Form, useNavigation } from '@remix-run/react';
import { SearchBoxNavigation } from './navigation';
import { SearchCombobox } from './search-combobox';
import { SearchMobile } from './search-mobile';

import { useSearchBox } from './use-search-box';
import { MobileTrigger } from './mobile-trigger';

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

export interface LocationSuggestion {
  id: number;
  name: string;
  popularity: number;
  parent: string;
  nation_id: number;
  agent_list_path: string;
  to_rent_path: string;
  for_sale_path: string;
}

export const SearchBox = () => {
  const {
    formRef,
    handleActiveSearch,
    activeSearch,
    setSelected,
    selected,
    setIsOpenModal,
    isOpenModal,
    mobileLabel,
    stringifiedLocation,
  } = useSearchBox();

  const navigationState = useNavigation();

  return (
    <>
      <Form
        className="flex w-full flex-col gap-4 bg-white px-6 py-4"
        method="post"
        action="/kyero-api/home-search"
        aria-label="Search properites for rent or sale or find an agent"
        ref={formRef}
        data-testid="searchbox-desktop"
      >
        <SearchBoxNavigation
          searchData={SEARCH_DATA}
          onChange={handleActiveSearch}
          activeSearch={activeSearch}
          type="desktop"
        />
        <div className="relative hidden flex-col items-center justify-between gap-4 md:flex md:flex-row">
          <SearchCombobox onSelect={setSelected} selected={selected} />
          <Button
            buttonType="blue"
            message="Search"
            variant="full"
            type="submit"
            className="w-full md:w-auto"
            disabled={navigationState.state === 'submitting'}
          />
          <input type="hidden" name="location" value={stringifiedLocation} />
        </div>
        <MobileTrigger onModalOpen={() => setIsOpenModal(true)} label={mobileLabel} />
      </Form>
      <SearchMobile
        onSelect={setSelected}
        selected={selected}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <SearchBoxNavigation
          searchData={SEARCH_DATA}
          onChange={handleActiveSearch}
          activeSearch={activeSearch}
          type="mobile"
        />
      </SearchMobile>
    </>
  );
};

SearchBox.displayName = 'SearchBox';
