import { useContext } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryImages } from '@components/common/HeaderImages';

export const CountryLinks = () => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const { countries } = useContext(CountryContext);
  return (
    <section className="text-h-4 text-sierra-night-100 font-bol px-6">
      <h3>{t('country_cards.title')}</h3>
      <ul>
        {countries.map((country) => {
          const countryTranslationKey = country.translation_key;
          const path = `/${locale}/join/${country.slug}`;
          return (
            <li key={countryTranslationKey} className="my-6">
              <NextLink href={path}>
                <a className="flex items-center">
                  <NextImage
                    src={CountryImages[countryTranslationKey]}
                    alt={t(`general.countries.${countryTranslationKey}.alt`)}
                    objectFit="cover"
                    placeholder="blur"
                    width={24}
                    height={24}
                  />
                  <p className="text-h-5 ml-4">
                    {t(`general.countries.${countryTranslationKey}.title`)}
                  </p>
                </a>
              </NextLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
