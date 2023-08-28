import cn from 'classnames';
import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@kyero/ui';

import { PropertiesFiltersModal } from '~/modules/properties/components/filters-modal/properties-filters-modal';
import { PropertiesSortBy } from '~/modules/properties/components/properties-sort-by';

import { SectionHeader } from '~/components/base-layout/section-header';
import { useFiltersSection } from './use-filters-section';
import { useParamsCount } from '~/client/use-params-count';
import { CountFiltersButton } from './count-filters-button';

import { PROPERTIES_FIELDS_CONFIG } from '../filters-modal/constants';

const FILTERS_CLASS = 'rounded-md bg-white text-sierra-night-100';

export const FiltersSection = () => {
  const { t } = useTranslation();
  const {
    formRef,
    handleSubmit,
    searchParams,
    closeFilters,
    openFilters,
    filtersOpened,
    handleFormChange,
    currentFormData,
    handleClearFilters,
  } = useFiltersSection();
  const { count } = useParamsCount(PROPERTIES_FIELDS_CONFIG);

  return (
    <Form
      action="/properties"
      method="get"
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleFormChange}
    >
      <div>
        <SectionHeader />
        <section className="relative grid grid-cols-1 grid-rows-3 gap-6 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-[minmax(200px,_2fr)_1fr_minmax(45px,_100px)] lg:grid-rows-1">
          <div className="h-full sm:col-span-2 lg:col-auto">
            <SearchInput
              id="term"
              name="q[term]"
              placeholder={t('properties.search.placeholder')}
              defaultValue={searchParams.get('q[term]')}
              className={'h-full'}
              button={{
                message: t('ui.search'),
                type: 'submit',
                buttonType: 'blue',
                variant: 'full',
              }}
            />
          </div>
          <div className={cn(FILTERS_CLASS)}>
            <PropertiesSortBy
              onChange={handleSubmit}
              sortByValue={searchParams.get('sort_by')}
              sortDirectionValue={searchParams.get('sort_direction')}
            />
          </div>
          <div className={cn(FILTERS_CLASS, 'overflow-hidden')}>
            <CountFiltersButton onOpen={openFilters} count={count} />
          </div>
        </section>
      </div>
      <div className="overflow-hidden">
        <PropertiesFiltersModal
          onClose={closeFilters}
          opened={filtersOpened}
          currentFormData={currentFormData}
          onClearFilters={handleClearFilters}
          searchParams={searchParams}
        />
      </div>
    </Form>
  );
};

FiltersSection.displayName = 'FiltersSection';
