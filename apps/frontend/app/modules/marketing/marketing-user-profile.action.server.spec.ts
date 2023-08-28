import { vitest } from 'vitest';

import { action, MarketingProfileAction } from './marketing-user-profile.action.server';
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

describe('user profile action', () => {
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
        { email: '', name: '', why_buy: '', wants_to_buy_in: '' },
        {
          email: 'common.form.required',
          name: 'common.form.required',
          why_buy: 'common.form.invalid',
          wants_to_buy_in: 'common.form.invalid',
        },
      ],
      [
        'Invalid params',
        { email: 'test.example.com', name: 'John', why_buy: '10', wants_to_buy_in: 'wrong' },
        {
          email: 'common.form.email.invalid',
          why_buy: 'common.form.invalid',
          wants_to_buy_in: 'common.form.invalid',
        },
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
    const params = await createActionData(createValidPayload());

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
    const params = await createActionData(createValidPayload());

    mockedFetch.mockRejectOnce(new Error('test error'));

    const response = await action(params);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Unknown error',
      state: 'error',
    });
  });

  it('returns validation base error if error comes from API', async () => {
    const params = await createActionData(createValidPayload());

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
    const params = await createActionData(createValidPayload());

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
        name: 'John',
        why_buy: '1' as const,
        wants_to_buy_in: '1' as const,
        coi_spain: true,
        coi_france: true,
        coi_portugal: true,
        coi_italy: true,
      };

      // @ts-ignore
      const params = await createActionData(payload);

      const action = new MarketingProfileAction(params);

      expect(action.preparePayload(payload)).toEqual({
        email: 'john.doe@example.com',
        name: 'John',
        why_buy: '1',
        wants_to_buy_in: '1',
      });
    });

    it('leaves coi fields if receive_weekly_newsletter is truthy', async () => {
      const payload = {
        receive_weekly_newsletter: true,
        email: 'john.doe@example.com',
        name: 'John',
        why_buy: '1' as const,
        wants_to_buy_in: '1' as const,
        coi_spain: true,
        coi_france: true,
        coi_portugal: true,
        coi_italy: true,
      };

      // @ts-ignore
      const params = await createActionData(payload);
      const action = new MarketingProfileAction(params);

      expect(action.preparePayload(payload)).toEqual(payload);
    });
  });
});

const createValidPayload = () => ({
  email: 'john.doe@example.com',
  name: 'John',
  wants_to_buy_in: '0',
  why_buy: '1',
  receive_weekly_newsletter: 'true',
  send_buyers_guide: 'true',
  coi_spain: 'true',
});
