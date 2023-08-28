import { useContext } from 'react';

import cn from 'classnames';

import NextImage from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryImages } from '@components/common/HeaderImages';
import { createRelativeJoinPath } from '@helpers/links';

export const CountryList = () => {
  const { t } = useTranslation('common');
  const { country, countries } = useContext(CountryContext);
  const { locale } = useContext(LanguageContext);

  return (
    <ul
      role="listbox"
      className="lg:shadow-tooltip w-full bg-white lg:absolute lg:rounded-lg lg:p-2"
    >
      {countries.map((el, index) => {
        const countryTranslationKey = el.translation_key;
        const path = createRelativeJoinPath({
          locale,
          country: el,
        });
        return (
          <li key={index} className="w-full">
            <Link href={path}>
              <a className="text-sierra-night-60 hover:bg-sierra-night-10 focus:bg-sierra-night-10 inline-flex w-full items-center py-4 hover:rounded-md lg:px-4 lg:py-2">
                <NextImage
                  src={CountryImages[countryTranslationKey]}
                  alt={t(`general.countries.${countryTranslationKey}.alt`)}
                  width={24}
                  height={24}
                />
                <span
                  className={cn('text-p-2 ml-2', {
                    'text-sierra-night-100 font-bold':
                      countryTranslationKey === country?.translation_key,
                  })}
                >
                  {t(`menu.country_select.countries.${countryTranslationKey}`)}
                </span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
