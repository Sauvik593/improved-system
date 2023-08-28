import { SearchBox } from './search-box';
import { Trans, useTranslation } from 'react-i18next';
import { HeroBgPicture } from './hero-bg-picture';

import { type ServerCountry } from '../country-specific/helpers';
import { type CountryDecoratorData } from '../country-specific/country.decorator.server';
import { useAppContext } from '~/common/contexts/app.context';

interface Props {
  country: ServerCountry;
  ui: CountryDecoratorData;
}

export const SectionHero = ({ country, ui }: Props) => {
  const { countryName } = useAppContext();
  const { t } = useTranslation();

  return (
    <>
      <section
        className="relative z-0 mb-32 h-[500px]  bg-white md:h-[450px]"
        data-testid={`homepage.${country.key}`}
      >
        <div className="curved-bottom banner-pattern-image absolute top-0 h-full w-full">
          <HeroBgPicture countryKey={country.key} />
        </div>
        <div className="shadow-home-card absolute bottom-0 left-0 right-0 mx-5 max-w-3xl translate-y-36 overflow-hidden rounded-xl md:mx-auto">
          <div className="bg-ocean-100 p-5 text-white md:p-6 md:text-center">
            <h1
              className="text-h-2 font-semibold"
              dangerouslySetInnerHTML={{ __html: t(`common.homepage.${country.key}.title`) }}
            />
            <Trans i18nKey={`common.homepage.${country.key}.subtitle`} as="p" />
          </div>
          <SearchBox browseMore={ui.browseMore} key={`${countryName}-searchbox`} />
        </div>
      </section>
      <div className="mt-36" />
    </>
  );
};
