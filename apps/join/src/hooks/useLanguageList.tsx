import { useContext, useMemo } from 'react';
import { map } from 'ramda';

import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import { LocalizationContext } from '@contexts/LocalizationsContext';
import { ContentUrlContext } from '@contexts/ContentUrlContext';
import { getBaseUrlFromLocale, getAbsolutePath } from '@helpers/links';

import { type Localization, type Country } from '@lib/types';

type CountryPathParams = {
  currentLocale: string;
  locale: string;
  country: Country | null;
};

const getCountryPath = ({ locale, country }: CountryPathParams) => {
  const basePath = getBaseUrlFromLocale(locale);

  if (!country) {
    return basePath;
  }

  if (country.locale === locale) {
    return new URL(country.slug, basePath).toString();
  }

  const countryLocalized = country.localizations.find(
    (c) => c.locale === locale && !!c.publishedAt,
  );

  if (!countryLocalized || !countryLocalized?.slug) {
    return basePath;
  }

  return new URL(countryLocalized.slug, getBaseUrlFromLocale(countryLocalized.locale)).toString();
};

const mapWithLocalization =
  ({
    localizations,
    country,
    currentLocale,
    contentUrl,
    suffixPath,
  }: {
    localizations: Localization[];
    currentLocale: string;
    country: Country | null;
    contentUrl: string;
    suffixPath?: string | ((locale: string) => string) | null;
  }) =>
  (locale: string) => {
    const localizationsMatch =
      country && localizations.find((l) => l.locale === locale && !!l.publishedAt);
    const suffix = typeof suffixPath === 'function' ? suffixPath(locale) : suffixPath;

    switch (true) {
      case locale === currentLocale:
        return { locale, url: getAbsolutePath(contentUrl, suffix) };
      case !!localizationsMatch && !!localizationsMatch.url:
        // eslint-disable-next-line
        // @ts-ignore
        return { locale, url: getAbsolutePath(localizationsMatch.url, suffix) };
      default:
        return { locale, url: getCountryPath({ country, currentLocale, locale }) };
    }
  };

export const useLanguageList = () => {
  const { locale, locales } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const { localizations } = useContext(LocalizationContext);
  const { url, suffixPath } = useContext(ContentUrlContext);
  const data = useMemo(() => {
    return map(
      mapWithLocalization({
        localizations,
        country,
        currentLocale: locale,
        contentUrl: url,
        suffixPath,
      }),
      locales,
    );
    // eslint-disable-next-line
  }, [locale, locales, url]);

  return data;
};
