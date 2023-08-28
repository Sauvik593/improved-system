import { vitest, beforeAll, type MockedFunction } from 'vitest';

import { type CountryDecorator } from './country.decorator.server';
import {
  CountryHomepageLoader,
  type CountryLoaderResponse,
  type CountryLoaderData,
} from './country.loader.server';
import { CountryHomepageMeta } from './country.meta.server';

import { type ServerCountry } from './helpers';
import { createContext, SERVER_ENV } from 'test/__mocks__/server-env.mock';
import { type LoaderResponse } from '~/server/base-loader/base-loader.server';
import { getCountryRegions } from '~/modules/homepage/api/get-country-regions.server';

vitest.mock('~/modules/homepage/api/get-country-regions.server', () => ({
  getCountryRegions: vitest.fn().mockResolvedValue([]),
}));

const mockedGetCountryRegions = getCountryRegions as MockedFunction<typeof getCountryRegions>;

export const runCountryLoaderSpec = (
  name: string,
  Loader: typeof CountryHomepageLoader,
  Decorator: typeof CountryDecorator,
  country: ServerCountry,
) => {
  const request = new Request('/');
  const params = {};
  const context = createContext();

  const loaderArgs = { request, params, context };

  // @ts-ignore
  const mockedFetch: FetchMock = global.fetch;

  describe(name, () => {
    beforeAll(() => {
      mockedGetCountryRegions.mockResolvedValue([]);
      mockedFetch.mockResponse(JSON.stringify({}));
    });

    afterAll(() => {
      mockedGetCountryRegions.mockReset();
      mockedFetch.mockReset();
    });

    it('should inherit from BaseLoader', () => {
      expect(new Loader(loaderArgs)).toBeInstanceOf(CountryHomepageLoader);
    });

    describe('#init', async () => {
      let data: LoaderResponse<CountryLoaderData>['data'];

      beforeAll(async () => {
        const loader = await new Loader(loaderArgs).init();
        const resp = await loader.json();

        data = resp.data;
      });

      it('should have a correct country returned from loader', async () => {
        expect(data.country).toEqual(country);
        expect(data.country).toMatchObject<ServerCountry>;
      });

      it('should have a correct CountryDecorator', async () => {
        expect(data.ui).toMatchObject<typeof Decorator>;
      });
    });

    describe('#getCacheKey', () => {
      it('should return correct cache key', () => {
        const loader = new Loader(loaderArgs);
        const cacheKey = loader.getCacheKey('en');

        expect(cacheKey).toEqual(`FRONTEND.development.en.${country.id}.homepage.v.0.8`);
      });
    });

    describe('#getCacheExpireAt', () => {
      beforeEach(() => {
        vitest.useFakeTimers();
      });

      afterEach(() => {
        vitest.useRealTimers();
      });

      it('should return correct cache expire time next day at midnight', () => {
        // Set fake timer for the date
        const date = new Date(2022, 1, 1, 10);
        vitest.setSystemTime(date);

        const loader = new Loader(loaderArgs);
        const expireAt = loader.getCacheExpireAt();

        // Timestamp of 2022-02-01 00:00:00
        expect(expireAt).toEqual(1643760000000);
      });
    });
  });
};

const t = vitest.fn().mockImplementation((t: string) => t);
const locale = 'en';

const baseI18n = {
  locale,
  t,
};

export const runCountryMetaTest = (
  name: string,
  countryKey: string,
  CountryMeta: typeof CountryHomepageMeta,
) => {
  describe(name, () => {
    beforeAll(() => {
      mockedGetCountryRegions.mockResolvedValue([]);
    });

    afterEach(() => {
      mockedGetCountryRegions.mockReset();
    });

    it('should inherit from BaseLoader', () => {
      expect(new CountryMeta(baseI18n, SERVER_ENV)).toBeInstanceOf(CountryHomepageMeta);
    });

    it('should have correct title and description', () => {
      const meta = new CountryMeta(baseI18n, SERVER_ENV);
      const metaTags = meta.getAll();

      expect(metaTags[0]).toEqual({
        title: `common.homepage.${countryKey}.meta.title | Kyero`,
      });
      expect(metaTags[1]).toEqual({
        name: 'description',
        content: `common.homepage.${countryKey}.meta.description`,
      });
    });
  });
};

// @ts-ignore
export const createLoader = async (countryLoader: any) => {
  const request = new Request('/');
  const params = {};
  const context = createContext();

  const loaderArgs = { request, params, context };

  const loader = new countryLoader(loaderArgs);
  // @ts-ignore
  const loaderData = await loader.init();
  const data = (await loaderData.json()) as CountryLoaderResponse;

  return data;
};
