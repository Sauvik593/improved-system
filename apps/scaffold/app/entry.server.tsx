import { StrictMode } from 'react';
import { PassThrough } from 'stream';
import { Response } from '@remix-run/node';
import { resolve } from 'path';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { renderToPipeableStream } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { renderHeadToString } from 'remix-island';
import { createInstance } from 'i18next';

import isbot from 'isbot';
import Backend from 'i18next-fs-backend';
import i18next from '~/i18next.server';
import i18n from '~/i18n';

import { Head } from '~/root';
import { STYLE_LINK } from './styles.server';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';

import type { EntryContext } from '@remix-run/server-runtime';

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const instance = createInstance();
  const lng = await LocaleFromPath.get(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <StrictMode>
          <RemixServer context={remixContext} url={request.url} />
        </StrictMode>
      </I18nextProvider>,
      {
        onAllReady() {
          const head = renderHeadToString({ request, remixContext, Head });
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          body.write(
            `<!DOCTYPE html><html lang="${lng}"><head>${head}${STYLE_LINK}</head><body><div id="root">`,
          );
          pipe(body);
          body.write(`</div></body></html>`);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const instance = createInstance();
  const lng = await LocaleFromPath.get(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <StrictMode>
          <RemixServer context={remixContext} url={request.url} />
        </StrictMode>
      </I18nextProvider>,
      {
        onShellReady() {
          const head = renderHeadToString({ request, remixContext, Head });
          const body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          body.write(
            `<!DOCTYPE html><html lang="${lng}"><head>${head}${STYLE_LINK}</head><body><div id="root">`,
          );
          pipe(body);
          body.write(`</div></body></html>`);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
