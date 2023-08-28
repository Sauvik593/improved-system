import { vitest } from 'vitest';

import { BaseLinks } from '~/server/base-loader/base-links';
import { CountryLinks } from './country.links';

import { PortugalHomepageLoader } from './portugal.server';
import { SpainHomepageLoader } from './spain.server';
import { ItalyHomepageLoader } from './italy.server';
import { FranceHomepageLoader } from './france.server';

import { createLoader } from './country-specific-spec-helpers';

vitest.mock('~/modules/homepage/api/get-country-regions.server', () => ({
  getCountryRegions: vitest.fn().mockResolvedValue([]),
}));

describe('CountryLinks', () => {
  // @ts-ignore
  const mockedFetch: FetchMock = global.fetch;

  beforeAll(() => {
    mockedFetch.mockResponse(JSON.stringify({}));
  });

  afterAll(() => {
    mockedFetch.mockReset();
  });

  it('descends from BaseLinks', () => {
    expect(CountryLinks.prototype).toBeInstanceOf(BaseLinks);
  });

  describe('#getDynamicLinks', () => {
    [
      [PortugalHomepageLoader, 'portugal'],
      [SpainHomepageLoader, 'spain'],
      [ItalyHomepageLoader, 'italy'],
      [FranceHomepageLoader, 'france'],
    ].forEach(([countryLoader, name]) => {
      it(`generates correct locale for ${name}`, async () => {
        const loader = await createLoader(countryLoader);
        const countryLinks = new CountryLinks();
        const dynamicLinks = countryLinks.getDynamicLinks(loader);

        expect(dynamicLinks).toMatchSnapshot();
      });
    });
  });
});
