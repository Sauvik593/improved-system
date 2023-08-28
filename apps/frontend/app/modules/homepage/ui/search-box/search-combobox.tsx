import cn from 'classnames';
import { Combobox } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { Search as SearchIcon } from '@kyero/icons';

import { Results } from './results';
import { ClearButton } from './clear-button';
import { type RecentSearchSuggestion, useLocationSuggestion } from './use-location-suggestion';
import { SuggestionRenderer } from './suggestion-renderer';
import { useTranslation } from 'react-i18next';
import { type SearchType } from './use-search-box';

export interface LocationSuggestion {
  id: number;
  name: string;
  popularity: number;
  parent_name: string;
  nation_id: number;
  agent_list_path: string;
  to_rent_path: string;
  for_sale_path: string;
}

interface Props {
  selected: LocationSuggestion | RecentSearchSuggestion | null;
  onSelect: (value: LocationSuggestion | RecentSearchSuggestion | null) => void;
  activeSearch: SearchType;
}

export function SearchCombobox({ selected, onSelect, activeSearch }: Props) {
  const {
    shouldRenderClear,
    handleClear,
    handleInput,
    inputRef,
    results,
    state,
    inputQuery,
    handleSelect,
    isSubmitting,
    openSuggestionsOnFocus,
  } = useLocationSuggestion({ selected, onSelect });
  const { t } = useTranslation();

  return (
    <Combobox value={selected} onChange={handleSelect} disabled={isSubmitting}>
      {({ open }) => (
        <>
          <Float
            adaptiveWidth
            placement="bottom-start"
            offset={16}
            portal
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
            className="w-full"
            show={open}
          >
            <div className="border-1 border-sierra-night-40 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none sm:text-sm">
              <SearchIcon className="text-ocean-100 pointer-events-none absolute left-3 top-1/2 m-auto -translate-y-1/2 transform" />
              <Combobox.Input
                type="text"
                name="search"
                data-testid="searchbox-input"
                ref={inputRef}
                onChange={handleInput}
                displayValue={(suggestion: LocationSuggestion) => suggestion?.name || inputQuery}
                autoComplete="off"
                onFocus={openSuggestionsOnFocus}
                autoCorrect="off"
                disabled={isSubmitting}
                className={cn(
                  'text-sierra-night-100 rounded-md bg-white p-2',
                  'placeholder:text-sierra-night-40 w-full pl-12',
                )}
                placeholder={t('common.homepage.searchbox.placeholder') as string}
              />
              {shouldRenderClear ? <ClearButton onClear={handleClear} /> : null}
            </div>
            <div className="text-sierra-night-20 text-h-5 shadow-card hidden overflow-hidden rounded-md bg-white md:block">
              <SuggestionRenderer inputQuery={inputQuery} state={state} activeSearch={activeSearch}>
                <Results results={results as LocationSuggestion[]} type="desktop" />
              </SuggestionRenderer>
            </div>
          </Float>
        </>
      )}
    </Combobox>
  );
}

SearchCombobox.displayName = 'SearchCombobox';
