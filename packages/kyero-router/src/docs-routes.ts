import { DOCS_URL } from './constants';
import { getURLWithPath } from './helpers';

export const DocsRoutes = {
  termsURL: (locale: string) => getURLWithPath(`/${locale}/terms`, DOCS_URL),
  privacyURL: (locale: string) => getURLWithPath(`/${locale}/privacy`, DOCS_URL),
  cookiesURL: (locale: string) => getURLWithPath(`/${locale}/cookies`, DOCS_URL),
};
