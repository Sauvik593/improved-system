import { TFunction } from 'next-i18next';

import { ClientEnv } from '@lib/clientEnv';

import type { Country } from '@lib/types';
import { LINKS_SEED } from '@components/Header/NavlinksSeed';
import { AdviceCountry, adviceCountries } from './adviceCountriesSeed';

interface LinksProps {
  t: TFunction;
  locale: string;
  country: Country | null;
}

interface AdvicePathProps {
  country: Country | null;
  locale: string;
}

interface JoinPathProps {
  locale: string;
  country?: Country | null;
  paths?: string[];
}

export const kyeroUrl = 'https://www.kyero.com';

export const docsKyeroUrl = 'https://docs.kyero.com';

export const helpKyeroUrl = 'https://help.kyero.com';

export const getAbsolutePath = (path: string, suffixPath?: string | null) => {
  const relativePath = suffixPath
    ? [path, suffixPath].join('/').replace(/\/\//g, '/')
    : path.replace(/\/\//g, '/');

  return new URL(relativePath, ClientEnv.baseUrl).toString();
};

export const getBaseUrlFromLocale = (locale: string, suffixPath?: string | null): string =>
  getAbsolutePath(`${locale}/join/`, suffixPath);

export const createRelativeJoinPath = ({ locale, country, paths = [] }: JoinPathProps) => {
  const strippedLocale = locale.replace(/^\//, '');
  const relativePath = ['/', strippedLocale, 'join', country?.slug, ...paths]
    .join('/')
    .replace(/\/\//g, '/');
  return relativePath.replace(/\/+$/, '');
};

export const getKyeroLink = (path: string | TFunction, locale?: string) => {
  const linkLocale = locale || 'en';
  const linkPath = [linkLocale, path].join('/').replace(/\/\//g, '/');
  const Url = new URL(linkPath, kyeroUrl);
  return Url.href.replace(/\/+$/, '');
};

export const createAdvicePath = ({ country, locale }: AdvicePathProps) => {
  const fallbackCountry = country ? country?.translation_key : 'default';
  const linkPath = [adviceCountries[fallbackCountry][locale as keyof AdviceCountry]]
    .join('/')
    .replace(/\/\//g, '/');
  return new URL(linkPath, kyeroUrl);
};

export const createAgentsPath = (t: TFunction, country: Country | null) => {
  if (country) {
    return t(`footer.links.resources.estate_agent_directory.${country.translation_key}.title`);
  }
  return t('footer.links.resources.estate_agent_directory.spain.title');
};

export const createDocsPath = (locale: string, paths: string[]) => {
  const suffixPath = [locale, ...paths].join('/').replace(/\/\//g, '/');
  return new URL(suffixPath, docsKyeroUrl);
};

export const createHelpPath = (locale: string) => {
  // This page has two locales under pt, one is pt-pt and the other is pt-br
  const checkedLocale = locale.match('pt') ? 'pt-pt' : locale;
  return new URL(checkedLocale, helpKyeroUrl);
};

export const renderPropertyLinks = (t: TFunction, locale: string, countries: Country[]) => ({
  columnTitle: t('footer.links.find_property.title'),
  links: countries.map((country) => ({
    path: getKyeroLink(t(`footer.links.find_property.${country.translation_key}.link`), locale),
    key: t(`footer.links.find_property.${country.translation_key}.title`),
  })),
});

export const renderAboutUsLink = (path: string | TFunction, locale: string) => {
  // in english locale there's no 'en' in link
  const removeEnglishLocale = locale === 'en' ? '' : locale;
  const linkPath = [removeEnglishLocale, path].join('/').replace(/\/\//g, '/');
  const Url = new URL(linkPath, kyeroUrl);
  return Url.href.replace(/\/+$/, '');
};

export const renderResourcesLinks = ({ t, locale, country }: LinksProps) => ({
  columnTitle: t('footer.links.resources.title'),
  links: [
    country?.translation_key === 'spain' && {
      path: getKyeroLink(t('footer.links.resources.market_data.link'), locale),
      key: t('footer.links.resources.market_data.title'),
    },
    country?.translation_key === 'spain' && {
      path: getKyeroLink('advice/spain/podcasts'),
      key: t('footer.links.resources.property_podcasts.title'),
    },
    {
      path: createAdvicePath({ country, locale }),
      key: t('footer.links.resources.buyer_advice.title'),
    },
    {
      path: getKyeroLink(createAgentsPath(t, country), locale),
      key: t('footer.links.resources.estate_agent_directory.title'),
    },
  ].filter(Boolean) as { path: string | URL; key: string }[],
});

export const renderHelpAndInfoLinks = ({ t, locale, country }: LinksProps) => ({
  columnTitle: t('footer.links.help_and_info.title'),
  links: [
    {
      path: createHelpPath(locale),
      key: t('footer.links.help_and_info.faq.title'),
    },
    country && {
      path: createRelativeJoinPath({ locale, country, paths: ['contact'] }),
      key: t('footer.links.help_and_info.contact_us.title'),
    },
    {
      path: 'https://jobs.kyero.com',
      key: t('footer.links.help_and_info.work_with_us.title'),
    },
    {
      path: renderAboutUsLink(t('footer.links.help_and_info.about_us.link'), locale),
      key: t('footer.links.help_and_info.about_us.title'),
    },
  ].filter(Boolean) as { path: string | URL; key: string }[],
});

export const renderStickyFooterLinks = (t: TFunction, locale: string) => [
  {
    path: createDocsPath(locale, ['terms']),
    key: t('footer.site_links.terms'),
  },
  {
    path: createDocsPath(locale, ['privacy']),
    key: t('footer.site_links.privacy'),
  },
  {
    path: createDocsPath(locale, ['cookies']),
    key: t('footer.site_links.cookies'),
  },
  {
    path: new URL(getKyeroLink('cookie-preferences', locale), kyeroUrl),
    key: t('footer.site_links.cookie_preferences'),
  },
  {
    path: new URL(getKyeroLink('sitemap', locale), kyeroUrl),
    key: t('footer.site_links.sitemap'),
  },
];

export const renderNavLinks = ({ t, locale, country }: LinksProps) =>
  [
    {
      path: createRelativeJoinPath({ locale, country }),
      key: t('header.menu.home'),
    },
    {
      path: createRelativeJoinPath({
        locale,
        country,
        paths: [LINKS_SEED['features'][locale as keyof typeof LINKS_SEED['features']]],
      }),
      key: t('header.menu.features'),
    },
    {
      path: createRelativeJoinPath({
        locale,
        country,
        paths: [LINKS_SEED['pricing'][locale as keyof typeof LINKS_SEED['pricing']]],
      }),
      key: t('header.menu.pricing'),
    },
    country?.translation_key === 'spain' &&
      locale === 'en' && {
        path: createRelativeJoinPath({ locale, country, paths: ['market-insight'] }),
        key: t('header.menu.market_insights'),
      },
  ].filter(Boolean) as { path: string | URL; key: string }[];
