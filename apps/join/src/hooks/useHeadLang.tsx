import { useContext } from 'react';
import { LanguageContext } from '@contexts/LanguageContext';
import { LocalizationContext } from '@contexts/LocalizationsContext';
import { ContentUrlContext } from '@contexts/ContentUrlContext';
import { getAbsolutePath } from '@helpers/links';
import { CountryContext } from '@contexts/CountryContext';

interface LocalizedUrl {
  url: string;
  locale: string;
}

interface CountryNeutralLocalizations {
  [locale: string]: LocalizedUrl[];
}

const countryNeutralLocalizations: CountryNeutralLocalizations = {
  en: [
    { url: '/fr/join', locale: 'fr' },
    { url: '/pt/join', locale: 'pt' },
    { url: '/it/join', locale: 'it' },
    { url: '/es/join', locale: 'es' },
  ],
  pt: [
    { url: '/fr/join', locale: 'fr' },
    { url: '/en/join', locale: 'en' },
    { url: '/it/join', locale: 'it' },
    { url: '/es/join', locale: 'es' },
  ],
  fr: [
    { url: '/en/join', locale: 'en' },
    { url: '/pt/join', locale: 'pt' },
    { url: '/it/join', locale: 'it' },
    { url: '/es/join', locale: 'es' },
  ],
  es: [
    { url: '/fr/join', locale: 'fr' },
    { url: '/pt/join', locale: 'pt' },
    { url: '/it/join', locale: 'it' },
    { url: '/en/join', locale: 'en' },
  ],
  it: [
    { url: '/fr/join', locale: 'fr' },
    { url: '/pt/join', locale: 'pt' },
    { url: '/en/join', locale: 'en' },
    { url: '/es/join', locale: 'es' },
  ],
};

export const useHeadLang = () => {
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const { localizations } = useContext(LocalizationContext);
  const { url, suffixPath } = useContext(ContentUrlContext);
  const suffix = typeof suffixPath === 'function' ? suffixPath(locale) : suffixPath;
  const canonical = getAbsolutePath(url, suffix);
  const checkedLocalizations = country
    ? localizations.filter((localization) => !!localization.publishedAt)
    : countryNeutralLocalizations[locale];
  const alternatives = checkedLocalizations.map((localization) => {
    return {
      href: getAbsolutePath(localization.url, suffix),
      locale: localization.locale,
    };
  });

  const xDefault =
    locale === 'en' ? canonical : alternatives.find((el) => el.locale === 'en')?.href;

  return { canonical, alternatives, xDefault };
};
