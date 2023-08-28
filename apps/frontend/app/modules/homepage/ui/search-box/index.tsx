import { useEffect, useRef } from 'react';
import { Button } from '@kyero/ui';
import { useNavigate, useFetcher } from '@remix-run/react';

import { SearchBoxNavigation } from './navigation';
import { SearchCombobox } from './search-combobox';
import { SearchMobile } from './search-mobile';
import { useSearchBox } from './use-search-box';
import { MobileTrigger } from './mobile-trigger';
import { useTranslation } from 'react-i18next';
import { useHydrated } from 'remix-utils';
import { useAppContext } from '~/common/contexts/app.context';
import { JSField } from '~/common/ui/forms/js';

const searchTypeHashes = ['#buy', '#rent', '#agents'] as const;
const searchTypes = ['buy', 'rent', 'agents'] as const;

const SEARCH_DATA = [
  {
    name: 'Buy',
    hash: '#buy' as const,
    type: 'buy' as const,
    title: 'common.homepage.searchbox.route.buy',
    titleMobile: 'common.homepage.searchbox.route.buy_mobile',
  },
  {
    name: 'Rent',
    hash: '#rent' as const,
    type: 'rent' as const,
    title: 'common.homepage.searchbox.route.rent',
    titleMobile: 'common.homepage.searchbox.route.rent_mobile',
  },
  {
    name: 'Agents',
    hash: '#agents' as const,
    type: 'agents' as const,
    title: 'common.homepage.searchbox.route.agents',
    titleMobile: 'common.homepage.searchbox.route.agents_mobile',
  },
];

export type SearchTypeHash = typeof searchTypeHashes[number];
export type SearchType = typeof searchTypes[number];
export type SearchData = typeof SEARCH_DATA;

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
  browseMore: string;
}

export const SearchBox = ({ browseMore }: Props) => {
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
    nationId,
  } = useSearchBox();

  const hydrated = useHydrated();
  const navigate = useNavigate();
  const ref = useRef<HTMLParagraphElement>(null);
  const { t } = useTranslation();
  const { locale } = useAppContext();
  const fetcher = useFetcher();

  useEffect(() => {
    let reference = ref.current;

    const handleClick = (link: HTMLAnchorElement) => (e: MouseEvent) => {
      e.preventDefault();
      navigate(link.getAttribute('href')!);
    };

    if (reference && hydrated) {
      reference.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', handleClick(link));
      });
    }

    return () => {
      reference?.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', handleClick(link));
      });
    };
  }, [ref, hydrated, navigate]);

  useEffect(() => {
    const isSuccess = fetcher.data?.url && fetcher.state === 'idle';

    if (isSuccess) {
      window.location.assign(fetcher.data.url);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <>
      <fetcher.Form
        className="flex w-full flex-col gap-4 bg-white px-5 py-4"
        method="POST"
        action="/kyero-api/home-search"
        aria-label={t('common.homepage.searchbox.label') as string}
        ref={formRef}
        data-testid="searchbox-desktop"
        id="hero-form"
      >
        <SearchBoxNavigation
          searchData={SEARCH_DATA}
          onChange={handleActiveSearch}
          activeSearch={activeSearch}
          type="desktop"
        />
        <div className="relative hidden flex-col items-center justify-between gap-4 md:flex md:flex-row">
          <SearchCombobox onSelect={setSelected} selected={selected} activeSearch={activeSearch} />
          <Button
            buttonType="blue"
            message={t('common.homepage.searchbox.cta')}
            variant="full"
            type="submit"
            className="w-full md:w-auto"
          />
          <input type="hidden" name="location" value={stringifiedLocation} />
          <input type="hidden" name="nation_id" value={nationId || ''} />
          <input type="hidden" name="locale" value={locale} />
          <JSField />
        </div>
        <MobileTrigger onModalOpen={() => setIsOpenModal(true)} label={mobileLabel} />
        <p
          className="text-sierra-night-60 text-p-2"
          dangerouslySetInnerHTML={{ __html: browseMore }}
          data-testid="searchbox-desktop.browse-more"
          ref={ref}
        ></p>
      </fetcher.Form>
      <SearchMobile
        onSelect={setSelected}
        selected={selected}
        isOpen={isOpenModal}
        activeSearch={activeSearch}
        onClose={() => setIsOpenModal(false)}
        nationId={nationId}
        locale={locale}
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
