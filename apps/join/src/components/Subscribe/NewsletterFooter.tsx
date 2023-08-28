import { useContext } from 'react';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

import { createDocsPath } from '@helpers/links';
import { LanguageContext } from '@contexts/LanguageContext';

export const NewsletterFooter = () => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  return (
    <footer>
      <div className="text-center font-medium">
        {t('newsletter.footer.text')}
        <NextLink href={createDocsPath(locale, ['privacy'])}>
          <a className="mx-1 underline">{t('newsletter.footer.privacy_policy')}</a>
        </NextLink>
        <span>&</span>
        <NextLink href={createDocsPath(locale, ['terms'])}>
          <a className="ml-1 underline">{t('newsletter.footer.terms')}</a>
        </NextLink>
      </div>
    </footer>
  );
};
