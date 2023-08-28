import { useContext, useMemo } from 'react';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import {
  renderPropertyLinks,
  renderResourcesLinks,
  renderHelpAndInfoLinks,
  renderStickyFooterLinks,
} from '@helpers/links';

import type { TFunction } from 'next-i18next';

export const useFooterLinks = (t: TFunction) => {
  const { locale } = useContext(LanguageContext);
  const { country, countries } = useContext(CountryContext);

  const stickyFooterLinks = renderStickyFooterLinks(t, locale);

  const footerLinks = useMemo(() => {
    return [
      renderPropertyLinks(t, locale, countries),
      renderResourcesLinks({ t, locale, country }),
      renderHelpAndInfoLinks({ t, locale, country }),
    ];
  }, [locale, country, countries, t]);

  return { footerLinks, stickyFooterLinks };
};
