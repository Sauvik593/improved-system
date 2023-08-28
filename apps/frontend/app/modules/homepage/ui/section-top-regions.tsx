import { RegionMap } from './region-map';
import { TopLocations } from './region-map/top-locations';

import { type Region } from '../api/get-country-regions.server';
import { type ServerCountry } from '../country-specific/helpers';
import { useAppContext } from '~/common/contexts/app.context';

interface Props {
  regions: Region[];
  country: ServerCountry;
  countryName: string;
}

export const SectionTopRegions = ({ regions, country }: Props) => {
  const { locale, countryKey } = useAppContext();
  const topRegions = regions.filter((item) => !!item.popularity).slice(0, 4);

  return (
    <section className="bg-sierra-night-5 mt-4 md:bg-white">
      <div className="relative mx-auto max-w-[1176px] p-4 pb-12">
        <div className="right-2 top-0 bottom-0 my-auto flex items-center md:absolute lg:right-5">
          <TopLocations
            countryForSaleRoute={country.localizedForSaleRoutes[locale]}
            topRegions={topRegions}
            countryKey={countryKey}
          />
        </div>
        <div className="hidden max-w-[min(850px,70%)] overflow-hidden rounded-md shadow-md md:block">
          <RegionMap regions={regions} key={`${country.id}-region-map`} />
        </div>
      </div>
    </section>
  );
};
