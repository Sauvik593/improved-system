import { vitest } from 'vitest';

import { action, MarketingSubscriptionsAction } from './marketing-subscriptions.action.server';
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

describe('subscription  action', () => {
  // @ts-ignore
  const mockedFetch: FetchMock = global.fetch;

  afterEach(() => {
    mockedFetch.mockClear();
    // @ts-ignore
    APILogger.info.mockClear();
  });

  describe('client validations', () => {
    [
      ['required params are not present', { email: '' }, { email: 'common.form.required' }],
      ['email is not valid', { email: 'test.example.com' }, { email: 'common.form.email.invalid' }],
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
      receive_weekly_newsletter: 'true',
      send_buyers_guide: 'true',
      coi_spain: 'true',
    });

    mockedFetch.mockResponseOnce(JSON.stringify({}));

    const response = await action(params);
    const data = await response.json();

    const apiCall = mockedFetch.requests()[0];
    expect(apiCall.url).toEqual('http://frontend-api.kyero.test/v1/marketing/profile');
    expect(apiCall.method).toEqual('POST');

    expect(data).toEqual({
      state: 'success',
    });
  });

  it('returns error when api call fails', async () => {
    const params = await createActionData({
      email: 'john.doe@example.com',
      receive_weekly_newsletter: 'true',
      send_buyers_guide: 'true',
      coi_spain: 'true',
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
      receive_weekly_newsletter: 'true',
      send_buyers_guide: 'true',
      coi_spain: 'true',
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
      receive_weekly_newsletter: 'true',
      send_buyers_guide: 'true',
      coi_spain: 'true',
    });

    mockedFetch.mockResponseOnce(JSON.stringify({ errors: { email: 'something wrong' } }), {
      status: 401,
    });

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      fieldErrors: { email: 'something wrong' },
    });
  });

  describe('#preparePayload', () => {
    it('omits coi fields if receive_weekly_newsletter is falsy', async () => {
      const payload = {
        email: 'john.doe@example.com',
        coi_spain: true,
        coi_france: true,
        coi_portugal: true,
        coi_italy: true,
      };

      // @ts-ignore
      const params = await createActionData(payload);

      const action = new MarketingSubscriptionsAction(params);

      expect(action.preparePayload(payload)).toEqual({
        email: 'john.doe@example.com',
      });
    });

    it('leaves coi fields if receive_weekly_newsletter is truthy', async () => {
      const payload = {
        email: 'john.doe@example.com',
        receive_weekly_newsletter: true,
        coi_spain: true,
        coi_france: true,
        coi_portugal: true,
        coi_italy: true,
      };

      // @ts-ignore
      const params = await createActionData(payload);

      const action = new MarketingSubscriptionsAction(params);

      expect(action.preparePayload(payload)).toEqual(payload);
    });
  });
});
