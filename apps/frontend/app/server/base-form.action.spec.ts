import { zfd } from 'zod-form-data';
import { vitest } from 'vitest';
import { z } from 'zod';

import { BaseFormAction } from './base-form.action';
import { ApiError } from './api/errors.server';
import { createActionData } from './base-form-spec.helper';

export const getFormSchema = (t: (t: string) => string) =>
  zfd.formData(
    z.object({
      first_field: zfd.text(z.string({ required_error: t('common.form.required') as string })),
      second_field: zfd.text(z.string().optional()),
    }),
  );

vitest.mock('~/i18next.server', () => ({
  default: {
    getFixedT: vitest.fn().mockResolvedValue((key: string) => key),
  },
}));

describe('BaseFormAction', () => {
  describe('#action', () => {
    it('returns validation error if form data is invalid', async () => {
      const params = await createActionData({ first_field: '' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockResolvedValue(['data', new Response(), 'ok']);

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual({
        fieldErrors: {
          first_field: 'common.form.required',
        },
      });
    });

    it("returns success when validation passes and api call doesn't fail", async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockResolvedValue([
        'data',
        new Response('/', {
          headers: {
            'set-cookie': 'test',
          },
        }),
        'ok',
      ]);

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual('data');
      expect(result?.headers.get('set-cookie')).toEqual('test');
    });

    it('returns api error when api call fails', async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockRejectedValue(new Error('test error'));

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual({
        state: 'error',
        error: 'Unknown error',
      });
    });

    it('returns redirection response when 302 in a correct format', async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockResolvedValue([
        { to: '/some/other/path' },
        new Response('/', {
          status: 302,
          headers: {
            'set-cookie': 'test',
          },
        }),
        'ok',
      ]);

      const resp = await action.action();

      expect(resp?.headers.get('set-cookie')).toEqual('test');
      expect(resp?.headers.get('location')).toEqual('/some/other/path');
    });

    it('returns api error when api call fails with ApiError', async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockRejectedValue(new ApiError('Api Error', 422));

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual({
        state: 'error',
        error: 'Api Error',
      });
    });

    it('returns base error if it comes from API response', async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockResolvedValue([
        // @ts-ignore
        { errors: { base: ['Base error'] } },
        new Response(),
        'error',
      ]);

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual({
        state: 'error',
        error: 'Base error',
      });
    });

    it('returns validation error if it comes from API response', async () => {
      const params = await createActionData({ first_field: 'test' });
      const action = new BaseFormAction(params);

      vitest
        .spyOn(action, 'getValidationSchema')
        .mockImplementation(getFormSchema as unknown as any);

      vitest.spyOn(action, 'apiCall').mockResolvedValue([
        // @ts-ignore
        { errors: { first_field: 'Error from backend validation' } },
        new Response(),
        'error',
      ]);

      const result = await action.action();
      const response = await result?.json();

      expect(response).toEqual({
        fieldErrors: {
          first_field: 'Error from backend validation',
        },
      });
    });
  });
});
