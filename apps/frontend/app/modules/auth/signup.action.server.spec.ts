import { vitest } from 'vitest';

import { action } from './signup.action.server';
import { APILogger } from '~/server/loggers.server';
import { apiService } from '~/server/api/service.server';
import { createActionData } from '~/server/base-form-spec.helper';

vitest.mock('~/server/loggers.server', () => ({
  APILogger: {
    info: vitest.fn(),
  },
}));

vitest.mock('~/i18next.server', () => ({
  default: {
    getFixedT: vitest.fn().mockResolvedValue((key: string) => key),
  },
}));

vitest.mock('~/server/api/service.server', () => ({
  apiService: {
    post: vitest.fn(),
  },
}));

describe('signup action', () => {
  const mockedApiService = apiService as jest.Mocked<typeof apiService>;

  afterEach(() => {
    mockedApiService.post.mockClear();
    // @ts-ignore
    APILogger.info.mockClear();
  });

  describe('client validations', () => {
    [
      [
        'required params are not present',
        createUserPayload({ email: '', password: '', firstname: '' }),
        {
          email: 'common.form.required',
          password: 'common.form.required',
          firstname: 'common.form.required',
        },
      ],
      [
        'email is not valid',
        createUserPayload({ email: 'test.example.com' }),

        { email: 'common.form.email.invalid' },
      ],
    ].forEach(([caseName, payload, errorMessages]) => {
      it(`returns validation error for ${caseName}}`, async () => {
        const params = await createActionData(payload as Record<string, string>);
        const response = await action(params);
        const data = await response.json();

        expect(data).toEqual({
          fieldErrors: errorMessages,
        });
      });
    });
  });

  it("returns success when validation passes and api call doesn't fail", async () => {
    const payload = createUserPayload();
    const { request, context, params } = await createActionData(
      // @ts-ignore
      payload as Record<string, string>,
    );

    mockedApiService.post.mockResolvedValueOnce([{}, new Response('response'), 'ok']);

    const response = await action({ request, context, params });
    const data = await response.json();

    expect(mockedApiService.post).toHaveBeenCalledWith('/users/sign_up', {
      body: { ...payload, password_confirmation: payload.password },
      method: 'POST',
      locale: 'en',
      request: request,
    });

    expect(data).toEqual({
      state: 'success',
      data: {
        email: 'john.doe@example.com',
        firstname: 'John',
        receive_weekly_newsletter: true,
      },
    });
  });

  it('returns error when api call fails', async () => {
    // @ts-ignore
    const params = await createActionData(createUserPayload());
    mockedApiService.post.mockRejectedValue(new Error('test error'));

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Unknown error',
      state: 'error',
    });
  });

  it('returns validation base error if error comes from API', async () => {
    // @ts-ignore
    const params = await createActionData(createUserPayload());

    const errorResponse = { errors: { base: ['Base error API'] } };
    mockedApiService.post.mockResolvedValueOnce([errorResponse, new Response('response'), 'error']);

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Base error API',
      state: 'error',
    });
  });

  it('returns validation base error if error comes from API', async () => {
    // @ts-ignore
    const params = await createActionData(createUserPayload());

    const errorResponse = { errors: { email: 'taken' } };
    mockedApiService.post.mockResolvedValueOnce([errorResponse, new Response('response'), 'error']);
    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      fieldErrors: { email: 'taken' },
    });
  });
});

const createUserPayload = (payload: Record<string, string | number | boolean> | null = {}) => {
  return {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    password: '123123123',
    receive_weekly_newsletter: true,
    coi_spain: true,
    ...payload,
  };
};
