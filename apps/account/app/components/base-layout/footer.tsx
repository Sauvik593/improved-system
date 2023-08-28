import { Link, useLocation } from '@remix-run/react';
import { useLocale } from 'remix-i18next';
import { Footer as FooterComponent } from '@kyero/ui';

import { CHANGE_URL_PATH, FOOTER_LINKS, LANGUAGES } from './constants';

export const Footer = () => {
  const locale = useLocale();
  const { pathname } = useLocation();

  return (
    <FooterComponent
      linkProps={FOOTER_LINKS}
      className="mt-auto"
      languageProps={{
        languages: LANGUAGES,
        currentLocale: locale,
        currentUrl: pathname,
        changeUrlPath: CHANGE_URL_PATH,
        // eslint-disable-next-line
        LinkComponent: Link as unknown as any,
      }}
    />
  );
};
