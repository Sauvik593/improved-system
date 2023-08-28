import cn from 'classnames';
import { Combobox } from '@headlessui/react';
import { Fragment } from 'react';
import { type RecentSearch } from '~/modules/recent-searches/helpers';
import { useRecentSearchLabel } from '~/modules/recent-searches/use-recent-search-label';
import { Trans, useTranslation } from 'react-i18next';
import { useAppContext } from '~/common/contexts/app.context';

type Props = RecentSearch;

export const RecentSearchMessage = ({ url, location, params, mainFeature }: Props) => {
  const { locale } = useAppContext();
  const { t } = useTranslation();
  const label = useRecentSearchLabel({ t, params, mainFeature, locale });
  const locationName = location.ancestors[locale].join(', ');
  return (
    <Combobox.Option
      as={Fragment}
      value={{
        name: 'recent-search',
        url: url,
      }}
    >
      {({ active }) => (
        <li
          className={cn('hover:bg-ocean-10 flex flex-col items-center gap-1 p-4 md:flex-row', {
            'bg-ocean-10': active,
          })}
          data-testid="recent-searches.item"
        >
          <div className="flex w-full flex-col gap-1 md:w-9/12">
            <p
              className="text-sierra-night-100 text-p-2 truncate"
              data-testid="recent-search.location"
            >
              {locationName}
            </p>
            <p
              className="text-sierra-night-60 text-charade text-p-3 inline-flex gap-2"
              data-testid="recent-search.label"
            >
              {label}
            </p>
          </div>
          <div className="text-ocean-100 w-full truncate md:w-3/12 md:text-right">
            <span className="text-p-3 font-semibold" data-testid="recent-searche.cta">
              <Trans i18nKey="common.recent_searches.cta.no_count" />
            </span>
          </div>
        </li>
      )}
    </Combobox.Option>
  );
};
