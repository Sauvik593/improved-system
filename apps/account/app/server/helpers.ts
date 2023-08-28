import { pipe } from 'ramda';
import { userData } from '~/server/cookies';
import { makeApiCall } from '~/server/api/base-api';

import i18next from '~/i18next.server';

import { withZod } from '@remix-validated-form/with-zod';

import { type TFunction } from 'i18next';
import { type Schema } from 'zod';
import { type DataFunctionArgs } from '@remix-run/node';
import { type Me } from '~/modules/me/types';

export const getLocale = (request: Request) => i18next.getLocale(request);
export const getT = (request: Request) => i18next.getFixedT(request);
export const getCookies = (request: Request) => request.headers.get('Cookie');
export const getUrlFromRequest = (request: Request) => new URL(request.url);
export const getSearchParams = (url: URL) => url.searchParams;

export const getFormSchema = (request: Request) => async (schemaGetter: (t: TFunction) => Schema) =>
  withZod(await getSchema(request)(schemaGetter));

export const getSchema = (request: Request) => async (schemaGetter: (t: TFunction) => Schema) =>
  schemaGetter(await getT(request));

export const getPageTitle = (request: Request) => async (pageTitleKey: string) => {
  const t = await getT(request);

  return t(pageTitleKey);
};

export const getOrFetchCurrentUser = async (request: Request) => {
  let user = await pipe(getCookies, userData.parse)(request);

  if (!user) {
    user = await makeApiCall<Me>('/me')(request);
  }

  return user as Me;
};

export const getParamsWithoutEmptyValues = (request: Request) => {
  const originalSearchParams = pipe(getUrlFromRequest, getSearchParams)(request);

  return Array.from(originalSearchParams.entries()).reduce((acc, [key, value]) => {
    if (value !== '') {
      acc.append(key, value);
    }

    return acc;
  }, new URLSearchParams());
};

export const validateParams =
  ({ request, params }: Omit<DataFunctionArgs, 'context'>) =>
  async (schemaGetter: (t: TFunction) => Schema) => {
    const schema = await getSchema(request)(schemaGetter);
    const result = await schema.safeParse(params);

    if (result.success) {
      return result.data;
    }

    throw new Response(result.error.message, { status: 400 });
  };
