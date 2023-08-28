import { useContext, useMemo } from 'react';
import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { useTranslation } from 'next-i18next';
import { renderNavLinks } from '@kyero/join/src/helpers/links';

export const useNavLinks = () => {
  const { t } = useTranslation('common');
  const { country } = useContext(CountryContext);
  const { locale } = useContext(LanguageContext);

  const links = useMemo(() => {
    return renderNavLinks({ t, locale, country });
  }, [locale, country, t]);

  return links;
};
