import Backend from 'i18next-fs-backend';
import { RemixI18Next } from 'remix-i18next';
import { resolve } from 'path';

import i18n from '~/i18n'; // your i18n configuration file
import { lngCookie } from '~/server/cookies';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLang,
    cookie: lngCookie,
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  // Type missmatch - just ignoring for now
  // eslint-disable-next-line
  // @ts-ignore
  backend: Backend,
});

export default i18next;
