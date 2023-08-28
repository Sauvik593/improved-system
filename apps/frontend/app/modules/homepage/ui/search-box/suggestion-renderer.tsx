import { useState, type ReactElement, type ReactNode, useEffect } from 'react';

import { Loader } from './loader';
import { MinCharsMessage } from './min-chars-message';
import { NoResults } from './no-results';
import { RecentSearchesMessage } from './recent-searches-message';

import { type SearchComboboxStates } from './search-combobox.state';
import { useAppContext } from '~/common/contexts/app.context';
import { getRecentSearches, type RecentSearch } from '~/modules/recent-searches/helpers';
import { type SearchType } from './use-search-box';
import { useHydrated } from 'remix-utils';

interface Props {
  state: SearchComboboxStates;
  children: ReactNode;
  inputQuery: string;
  activeSearch: SearchType;
}

export const SuggestionRenderer = ({
  state,
  inputQuery,
  activeSearch,
  children,
}: Props): ReactElement | null => {
  const { country } = useAppContext();
  const countryId = country?.id || null;
  const isHydrated = useHydrated();

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const lessMinChars = inputQuery.length < 3;
  const hasRecentSearches = recentSearches.length > 0;

  useEffect(() => {
    if (!isHydrated) return;

    if (countryId) {
      setRecentSearches(getRecentSearches(countryId, activeSearch));
    }
  }, [countryId, activeSearch, isHydrated]);

  switch (true) {
    case lessMinChars && hasRecentSearches:
      return <RecentSearchesMessage recentSearches={recentSearches} />;
    case lessMinChars && !hasRecentSearches:
      return <MinCharsMessage />;
    case state.matches('fetching'):
      return <Loader />;
    case state.matches('idle') && state.context.results.length === 0:
      return <NoResults search={state.context.search} />;
    case state.matches('idle') && state.context.results.length > 0:
      return <>{children}</>;
    default:
      return null;
  }
};
