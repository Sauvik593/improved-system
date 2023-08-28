import { useContext } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

import { ArrowLink, Button } from '@kyero/ui';

import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { CardPicture } from './CardPicture';
import { CountryImages } from '@components/common/HeaderImages';

export const CountryCards = () => {
  const { t } = useTranslation('common');
  const { countries } = useContext(CountryContext);
  const { locale } = useContext(LanguageContext);
  return (
    <section className="container relative mx-auto -mt-32 text-white md:-mt-48">
      <h3 className="text-h-3-sm lg:text-h-3 mb-6 font-bold">{t('country_cards.title')}</h3>
      <ul className=" grid grid-cols-2 gap-4 sm:grid-cols-4">
        {countries.map((country) => {
          const countryTranslationKey = country.translation_key;
          const path = `/${locale}/join/${country.slug}`;
          return (
            <li
              className="min-h-[162px] min-w-[137px] md:min-h-[188px] md:min-w-[152px] lg:min-h-[262px] lg:min-w-[234px] xl:h-[284px] xl:w-[268px]"
              key={country.title}
            >
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg">
                <NextLink href={path}>
                  <a>
                    <figure>
                      <CardPicture countryKey={countryTranslationKey} />
                      <div className="bg-country-card-gradient absolute top-0 left-0 h-full w-full" />
                    </figure>
                  </a>
                </NextLink>
                <div
                  className="absolute my-4 flex w-full items-center justify-between px-4"
                  tabIndex={-1}
                >
                  <span className="text-h-4-sm md:text-h-4 font-bold">
                    {t(`general.countries.${countryTranslationKey}.title`)}
                  </span>
                  <figure className="h-6 w-6 lg:h-8 lg:w-8">
                    <NextImage
                      src={CountryImages[countryTranslationKey]}
                      alt={t(`general.countries.${countryTranslationKey}.alt`)}
                      layout="responsive"
                    />
                  </figure>
                </div>
                <div
                  className="absolute bottom-0 mx-auto my-4 hidden w-full px-4 md:block"
                  tabIndex={-1}
                >
                  <NextLink href={path}>
                    <Button
                      buttonType="blue"
                      variant="full"
                      fullWidth
                      message={t('ui.buttons.get_started')}
                      linkProps={{ to: path }}
                    />
                  </NextLink>
                </div>
                <div className="absolute bottom-0 mx-auto my-4 w-full px-4 md:hidden">
                  <NextLink href={path}>
                    <ArrowLink message={t('ui.buttons.get_started')} linkProps={{ to: path }} />
                  </NextLink>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
