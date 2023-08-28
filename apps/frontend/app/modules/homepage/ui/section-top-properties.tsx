import { ArrowForward } from '@kyero/icons';

import { PropertiesCarousel } from '~/common/ui/carousels/properties';
import { type TopPropertiesResponse } from '../api/get-top-properties.server';
import { Trans } from 'react-i18next';

interface Props {
  topProperties: TopPropertiesResponse;
  countryName: string;
}

export const SectionTopProperties = ({ topProperties, countryName }: Props) => (
  <section
    className="max-w-full overflow-hidden bg-white py-8"
    data-testid="homepage.location-recommendations"
  >
    <div className="mx-auto max-w-[1176px] px-5 pb-4">
      <h2 className="text-h-2-sm md:text-h-3 text-sierra-night-100 font-bold">
        <Trans i18nKey="common.homepage.top_properties.title" values={{ country: countryName }} />
      </h2>
      <a
        href={topProperties.seeAllLink}
        className="text-h-5 text-ocean-100 focus:text-ocean-150 hover:text-ocean-150 mt-2 inline-flex items-center justify-between gap-2 font-bold"
      >
        <Trans i18nKey="common.homepage.top_properties.cta" />
        <i>
          <ArrowForward />
        </i>
      </a>
      <div className="mt-4">
        <div className="min-h-[212px] w-[calc(100%+20px)] md:-mx-2 md:px-2  lg:min-h-[288px] lg:w-[calc(100%+30px)]">
          <PropertiesCarousel
            elements={topProperties.properties}
            key={`${countryName}-properties-carousel`}
          />
        </div>
      </div>
    </div>
  </section>
);
