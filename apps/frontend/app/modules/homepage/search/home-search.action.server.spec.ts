import { createContext } from 'test/__mocks__/server-env.mock';
import { HomeSearchAction } from './home-search.action.server';
import { type FetchMock } from 'vitest-fetch-mock/types';

const LOCATION_SUGGESTION = {
  id: 123,
  name: 'Some location',
  popularity: 2,
  parent_name: 'Other parent',
  nation_id: 55371,
  agent_list_path: '/agents/in/location',
  to_rent_path: '/rent/in/location',
  for_sale_path: '/buy/in/location',
};

const mockedSuggestionResponse = [LOCATION_SUGGESTION];

const generatePayload = (payload: Record<string, unknown> | undefined = {}) => ({
  nation_id: 55371,
  location: LOCATION_SUGGESTION,
  search: 'Alic',
  route: 'buy',
  locale: 'en',
  js: 'true',
  ...payload,
});

// @ts-ignore
const createAction = (payload: Record<string, unknown> | undefined) => {
  const formData = new FormData();

  // @ts-ignore
  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      formData.append(key, key === 'location' ? JSON.stringify(value) : (value as string));
    }
  }

  const request = new Request('https://kyero.com/kyero-api/home-search', {
    method: 'POST',
    body: formData,
  });
  const context = createContext();
  const params = {};

  const action = new HomeSearchAction({ context, request, params });

  return {
    action,
    payload,
  };
};

describe('HomeSearchAction', () => {
  // @ts-ignore
  const mockedFetch: FetchMock = global.fetch;

  afterEach(() => {
    mockedFetch.mockClear();
  });
  describe('run', () => {
    describe('when form is not valid', () => {
      it('should go to default country', async () => {
        const { action } = createAction(
          generatePayload({
            search: undefined,
            location: undefined,
          }),
        );

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/en/mocked-properties_for_sale-spain',
        });
      });
    });
    describe('when there is no location passed from form', () => {
      it('should grab fallback location when search params are valid', async () => {
        const { action } = createAction(
          generatePayload({
            location: undefined,
            search: 'Alic',
            route: 'rent',
          }),
        );

        mockedFetch.mockResponseOnce(JSON.stringify(mockedSuggestionResponse));

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/rent/in/location',
        });
      });

      it('should return default country when fallback fails', async () => {
        const { action } = createAction(
          generatePayload({
            location: undefined,
            search: 'Alic',
            route: 'rent',
          }),
        );

        mockedFetch.mockRejectOnce();

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/en/mocked-properties_to_rent-spain',
        });
      });

      it('should return country when response includes 0 suggestions', async () => {
        const { action } = createAction(
          generatePayload({
            location: undefined,
            search: 'Alic',
            route: 'rent',
          }),
        );

        mockedFetch.mockResponseOnce(JSON.stringify([]));

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/en/mocked-properties_to_rent-spain',
        });
      });

      it('should return defautlt country when search params are invalid', async () => {
        const { action } = createAction(
          generatePayload({
            location: undefined,
            search: '',
            route: 'buy',
          }),
        );

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/en/mocked-properties_for_sale-spain',
        });
      });
    });

    describe('when there is location passed from form', () => {
      it('should return location from form', async () => {
        const payload = generatePayload({
          location: LOCATION_SUGGESTION,
          route: 'agents',
        });

        const { action } = createAction(payload);

        const response = await action.run();
        expect(await response.json()).toEqual({
          url: 'https://devmodo.com/agents/in/location',
        });
      });
    });

    describe('when js is disabled enabled', () => {
      it('should redirect 301 to url', async () => {
        const payload = generatePayload({
          location: LOCATION_SUGGESTION,
          route: 'agents',
          js: undefined,
        });

        const { action } = createAction(payload);
        const response = await action.run();

        expect(response.status).toEqual(302);
        expect(response.headers.get('Location')).toEqual('https://devmodo.com/agents/in/location');
      });
    });
  });
});
