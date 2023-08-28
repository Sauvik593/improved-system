import { Combobox } from '@headlessui/react';
import { RecentSearchMessage } from './recent-search-item';

import { type RecentSearch } from '~/modules/recent-searches/helpers';
import { Trans } from 'react-i18next';

interface Props {
  recentSearches: RecentSearch[];
}

export const RecentSearchesMessage = ({ recentSearches }: Props) => {
  return (
    <Combobox.Options data-testid="recent-searches.message">
      <div className="w-full justify-center overflow-hidden">
        <h2 className="text-sierra-night-100 border-b-1 border-sierra-night-10 p-5 font-bold">
          <Trans i18nKey="common.recent_searches.title" />
        </h2>
        <ul>
          {recentSearches.map((search, index) => (
            <RecentSearchMessage
              {...search}
              key={`${search.createdAt}_${search.lastCountedAt}_${index}`}
            />
          ))}
        </ul>
      </div>
    </Combobox.Options>
  );
};

RecentSearchesMessage.displayName = 'RecentSearchesMessage';
