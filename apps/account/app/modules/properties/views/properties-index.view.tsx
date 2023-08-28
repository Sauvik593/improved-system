import { Link, useLoaderData, useLocation } from '@remix-run/react';

import { Pagination } from '@kyero/ui';
import { FiltersSection } from '~/modules/properties/components/filters-section';
import { PropertiesTable } from '~/modules/properties/components/properties-table';
import { type PropertiesLoader } from '~/modules/properties/properties-index.loader.server';

export const PropertiesIndexView = () => {
  const { properties, pagination } = useLoaderData<PropertiesLoader>();
  const { search } = useLocation();

  return (
    <>
      <FiltersSection />
      <PropertiesTable properties={properties} />
      <Pagination
        pathname="/properties"
        {...pagination}
        totalPages={pagination.pages}
        search={search}
        LinkComponent={Link}
      />
    </>
  );
};
