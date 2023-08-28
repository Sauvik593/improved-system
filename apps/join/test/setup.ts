import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'isomorphic-fetch';

import commonEn from '../i18n/en/common.json';
import commonEs from '../i18n/es/common.json';
import commonPt from '../i18n/pt/common.json';
import commonFr from '../i18n/fr/common.json';
import commonIt from '../i18n/it/common.json';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    en: {
      common: commonEn,
    },
    es: {
      common: commonEs,
    },
    pt: {
      common: commonPt,
    },
    fr: {
      common: commonFr,
    },
    it: {
      common: commonIt,
    },
  },
  fallbackLng: 'es',
  debug: false,
});

export default i18n;
