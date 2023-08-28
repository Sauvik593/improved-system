import cn from 'classnames';
import { ArrowForward } from '@kyero/icons';

import { type Region } from '../../api/get-country-regions.server';
import { Trans } from 'react-i18next';

interface Props {
  countryForSaleRoute: string;
  countryKey: string;
  topRegions: Region[];
}

export const TopLocations = ({ countryForSaleRoute, topRegions, countryKey }: Props) => (
  <article className="md:shadow-home-card my-auto w-full overflow-hidden rounded-md md:w-[350px] md:bg-white lg:w-[420px]">
    <header className="border-b-sierra-night-10 py-5 md:border-b md:p-5">
      <h2 className="text-h-4 text-tile-100 font-bold">
        <Trans i18nKey={`common.homepage.${countryKey}.top_locations.title`} />
      </h2>
      <a
        href={countryForSaleRoute}
        className="text-h-5 text-ocean-100 focus:text-ocean-150 hover:text-ocean-150 mt-2 inline-flex items-center justify-between gap-2 font-bold md:hidden"
      >
        <Trans i18nKey="common.homepage.top_locations.cta" as="span" />
        <i>
          <ArrowForward />
        </i>
      </a>
    </header>
    <div>
      <ul className="flex flex-col gap-4 md:gap-0">
        {topRegions.map((item: Region, index) => (
          <li key={item.name}>
            <a
              href={item.for_sale_path}
              className={cn(
                'hover:bg-ocean-5 focus:bg-ocean-5 relative block w-full rounded-md bg-white px-5 py-4 md:rounded-none',
                {
                  'py-2': index !== 0,
                },
              )}
            >
              <p className="text-h-5 text-sierra-night-100 font-bold">{item.name}</p>
              <Trans
                i18nKey={`common.homepage.top_locations.view_properties`}
                values={{ count: item.property_count_formatted }}
                className="text-h-6 text-ocean-100 font-bold"
                as="span"
              />
              <i className="absolute bottom-0 right-4 top-0 flex items-center">
                <ArrowForward />
              </i>
            </a>
          </li>
        ))}
      </ul>
    </div>
    <footer className="mt-4 hidden md:mt-0 md:block">
      <a
        href={countryForSaleRoute}
        className="bg-ocean-100 text-h-5 focus:bg-ocean-150 hover:bg-ocean-150 flex items-center justify-between p-5 font-bold text-white"
      >
        <Trans i18nKey="common.homepage.top_locations.cta" as="span" />

        <i>
          <ArrowForward className="text-white" />
        </i>
      </a>
    </footer>
  </article>
);
