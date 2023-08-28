import { json, type ActionArgs, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';

import { type TFunction } from 'i18next';
import { type ZodType } from 'zod';
import { type ApiServiceResponseType } from './api/service.server';

import i18next from '~/i18next.server';

import { ApiError, type ApiErrorMessage } from './api/errors.server';
import { LocaleFromPath } from '~/common/i18n/locale-from-path.server';
import { passCookieHeaderFromAPI } from './helpers.server';

export class BaseFormAction<T extends ZodType, E extends {}> {
  request: ActionArgs['request'];
  params: ActionArgs['params'];
  context: ActionArgs['context'];

  constructor(args: ActionArgs) {
    this.request = args.request;
    this.params = args.params;
    this.context = args.context;
  }

  async action() {
    const locale = (await LocaleFromPath.get(this.request)) || 'en';

    const { data, error } = await this.validate(locale);

    if (error) {
      return validationError(error);
    }

    const preparedPayload = this.preparePayload(data);

    try {
      const [apiData, resp, status] = await this.apiCall(preparedPayload, locale);

      if (status === 'error') {
        return this.handleApiErrorMessage(apiData);
      }

      // @ts-ignore
      if (resp.status === 302 && apiData?.to) {
        // @ts-ignore
        return redirect(apiData.to, {
          headers: passCookieHeaderFromAPI(resp),
        });
      }

      // @ts-ignore
      return json(this.prepareSuccessResponse(apiData, resp, preparedPayload), {
        headers: passCookieHeaderFromAPI(resp),
      });
    } catch (error) {
      if (error instanceof Error) {
        return json({
          state: 'error',
          error: error instanceof ApiError ? error.message : 'Unknown error',
        });
      }
    }
  }

  async validate(locale: string) {
    const t = await i18next.getFixedT(locale);
    const schema = this.getValidationSchema(t);
    const { data, error } = await withZod(schema).validate(await this.request.formData());

    return { data, error };
  }

  getValidationSchema = (t: TFunction): T => {
    throw new Error('Not implemented');
  };

  handleApiErrorMessage = ({ errors }: ApiErrorMessage) => {
    const { base, ...restErrors } = errors;
    if (base) {
      return json({ state: 'error', error: base[0] });
    }

    // @ts-ignore
    return validationError({
      // @ts-ignore
      fieldErrors: restErrors,
    });
  };

  preparePayload(payload: T['_output']) {
    return payload;
  }

  apiCall(payload: T['_output'], locale: string): ApiServiceResponseType<E> {
    throw new Error('Not implemented API action call');
  }

  prepareSuccessResponse(data: E, resp: Response, payload: T['_output']) {
    return data;
  }
}
