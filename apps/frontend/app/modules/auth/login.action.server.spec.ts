import { vitest } from 'vitest';

import { action } from './login.action.server';
import { type FetchMock } from 'vitest-fetch-mock/types';

import { APILogger } from '~/server/loggers.server';
import { createActionData } from '~/server/base-form-spec.helper';

vitest.mock('~/i18next.server', () => ({
  default: {
    getFixedT: vitest.fn().mockResolvedValue((key: string) => key),
  },
}));

vitest.mock('~/server/loggers.server', () => ({
  APILogger: {
    info: vitest.fn(),
  },
}));

describe('login action', () => {
  // @ts-ignore
  const mockedFetch: FetchMock = global.fetch;

  afterEach(() => {
    mockedFetch.mockClear();
    // @ts-ignore
    APILogger.info.mockClear();
  });

  describe('client validations', () => {
    [
      [
        'required params are not present',
        { email: '', password: '' },
        { email: 'common.form.required', password: 'common.form.required' },
      ],
      [
        'email is not valid',
        { email: 'test.example.com', password: '123123' },
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
    const params = await createActionData({
      email: 'john.doe@example.com',
      password: '123123',
    });

    mockedFetch.mockResponseOnce(JSON.stringify({}));

    const response = await action(params);
    const data = await response.json();

    const apiCall = mockedFetch.requests()[0];
    expect(apiCall.url).toEqual('http://frontend-api.kyero.test/v1/users/sign_in');
    expect(apiCall.method).toEqual('POST');

    expect(data).toEqual({
      state: 'success',
      data: {},
    });
  });

  it('returns error when api call fails', async () => {
    const params = await createActionData({
      email: 'john.doe@example.com',
      password: '123123',
    });

    mockedFetch.mockRejectOnce(new Error('test error'));

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Unknown error',
      state: 'error',
    });
  });

  it('returns validation base error if error comes from API', async () => {
    const params = await createActionData({
      email: 'john.doe@example.com',
      password: '123123',
    });

    mockedFetch.mockResponseOnce(JSON.stringify({ errors: { base: ['Base error API'] } }), {
      status: 401,
    });

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Base error API',
      state: 'error',
    });
  });

  it('returns validation base error if error comes from API', async () => {
    const params = await createActionData({
      email: 'john.doe@example.com',
      password: '123123',
    });

    mockedFetch.mockResponseOnce(JSON.stringify({ errors: { email: 'taken' } }), {
      status: 401,
    });

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      fieldErrors: { email: 'taken' },
    });
  });
});
