import upperFirst from 'lodash/upperFirst';
import { Trans } from 'react-i18next';

import { useAppContext } from '~/common/contexts/app.context';
import { LocationRecommendationCarousel } from '~/common/ui/carousels/location-recommendations';

export const SectionRecommendedLocation = () => {
  const { countryName } = useAppContext();

  return (
    <section className="curved-hero bg-white py-8" data-testid="homepage.location-recommendations">
      <div className="mx-auto max-w-[1176px] overflow-hidden px-5">
        <h2 className="text-h-2-sm md:text-h-3 text-sierra-night-100 font-bold">
          <Trans
            i18nKey="common.homepage.recommended_locations.title"
            values={{ country: upperFirst(countryName) }}
          />
        </h2>
        <div className="mt-4 md:mt-8">
          <div className="min-h-[212px] w-[calc(100%+20px)]  md:w-full lg:min-h-[288px]">
            <LocationRecommendationCarousel key={`${countryName}-recommendations-carousel`} />
          </div>
        </div>
      </div>
    </section>
  );
};
