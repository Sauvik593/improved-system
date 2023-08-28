import { startTransition, StrictMode } from 'react';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { getInitialNamespaces } from 'remix-i18next';

import i18n from './i18n';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n,
    ns: getInitialNamespaces(),
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      // Here only enable htmlTag detection, we'll detect the language only
      // server-side with remix-i18next, by using the `<html lang>` attribute
      // we can communicate to the client the language detected server-side
      order: ['htmlTag'],
      // Because we only use htmlTag, there's no reason to cache the language
      // on the browser, so we disable it
      caches: [],
    },
  })
  .then(() => {
    function hydrate() {
      startTransition(() => {
        hydrateRoot(
          document.getElementById('root') as HTMLElement,
          <StrictMode>
            <I18nextProvider i18n={i18next}>
              <RemixBrowser />
            </I18nextProvider>
          </StrictMode>,
        );
      });
    }

    if (window.requestIdleCallback) {
      window.requestIdleCallback(hydrate);
    } else {
      // Safari doesn't support requestIdleCallback
      // https://caniuse.com/requestidlecallback
      window.setTimeout(hydrate, 1);
    }
  });
