import {
  getKyeroLink,
  createAdvicePath,
  createDocsPath,
  createHelpPath,
  createAgentsPath,
  createRelativeJoinPath,
  getAbsolutePath,
  renderAboutUsLink,
} from '@helpers/links';
import { ClientEnv } from '@lib/clientEnv';
import { adviceCountries, AdviceCountry } from '@helpers/adviceCountriesSeed';
import { mockedCountries, countryPortugal } from '../countriesMock';

const aboutUsPaths = [
  { locale: 'en', pathKey: 'aboutus', expectedPath: '/aboutus' },
  { locale: 'es', pathKey: 'sobrenosotros', expectedPath: '/es/sobrenosotros' },
  { locale: 'pt', pathKey: 'aboutus', expectedPath: '/pt/aboutus' },
  { locale: 'fr', pathKey: 'anotrepropos', expectedPath: '/fr/anotrepropos' },
  { locale: 'it', pathKey: 'aboutus', expectedPath: '/it/aboutus' },
];

const mockedBaseUrl = 'https://www.kyero.com';
jest.spyOn(ClientEnv, 'baseUrl', 'get').mockReturnValue(mockedBaseUrl);

describe('getKyeroLink', () => {
  it('should return URL with provided path and provided locale', () => {
    const path = '/some/test//path';
    const locale = '/es';
    const expectedUrl = new URL('es/some/test/path', mockedBaseUrl);
    const result = getKyeroLink(path, locale);

    expect(result).toEqual(expectedUrl.href);
  });

  it('should return correct URL with provided path and no locale', () => {
    const path = '/some//other/path/';
    const expectedUrl = new URL('en/some/other/path', mockedBaseUrl);
    const result = getKyeroLink(path);

    expect(result).toEqual(expectedUrl.href);
  });
});

describe('createAdvicePath', () => {
  it('should return correct Path when country is provided', () => {
    mockedCountries.forEach((country) => {
      ['en', 'es', 'pt', 'fr', 'it'].forEach((locale) => {
        const expectedPath = `${mockedBaseUrl}/${
          adviceCountries[country.translation_key][locale as keyof AdviceCountry]
        }`;
        const result = createAdvicePath({ country, locale });
        expect(result.href).toEqual(expectedPath);
      });
    });
  });
  it('should return correct Path when country is not provided', () => {
    ['en', 'es', 'pt', 'fr', 'it'].forEach((locale) => {
      const expectedPath = `${mockedBaseUrl}/${
        adviceCountries['default'][locale as keyof AdviceCountry]
      }`;
      const result = createAdvicePath({ country: null, locale });
      expect(result.href).toEqual(expectedPath);
    });
  });
});

describe('createHelpPath', () => {
  it('should return correct help Path for any locale', () => {
    const locale = 'es';
    const expectedPath = 'https://help.kyero.com/es';
    const result = createHelpPath(locale);

    expect(result.href).toEqual(expectedPath);
  });

  it('should return correct help Path for any locale even with slash', () => {
    const locale = '/en';
    const expectedPath = 'https://help.kyero.com/en';
    const result = createHelpPath(locale);

    expect(result.href).toEqual(expectedPath);
  });

  it('should return correct help path for pt path', () => {
    const locale = '/pt';
    const expectedPath = 'https://help.kyero.com/pt-pt';
    const result = createHelpPath(locale);

    expect(result.href).toEqual(expectedPath);
  });
});

describe('createDocsPath', () => {
  it('should return docs Path', () => {
    const locale = 'es';
    const paths = ['/test', 'path'];
    const expectedPath = 'https://docs.kyero.com/es/test/path';
    const result = createDocsPath(locale, paths);

    expect(result.href).toEqual(expectedPath);
  });

  it('should return docs Path without extra slashes', () => {
    const locale = '/pt';
    const paths = ['/test', '/path'];
    const expectedPath = 'https://docs.kyero.com/pt/test/path';
    const result = createDocsPath(locale, paths);

    expect(result.href).toEqual(expectedPath);
  });
});

describe('createAgentsPath', () => {
  it('should return correct agents translation when country is provided', () => {
    const t = (key: string) => key;
    const result = createAgentsPath(t, countryPortugal);
    const expectedPath = 'footer.links.resources.estate_agent_directory.portugal.title';

    expect(result).toEqual(expectedPath);
  });
  it('should return correct agents translation when there is no country', () => {
    const t = (key: string) => key;
    const result = createAgentsPath(t, null);
    const expectedPath = 'footer.links.resources.estate_agent_directory.spain.title';

    expect(result).toEqual(expectedPath);
  });
});

describe('createRelativeJoinPath', () => {
  it('should return correct relative join path', () => {
    const locale = 'es';
    const expectedPath = '/es/join';
    const result = createRelativeJoinPath({ locale });

    expect(result).toEqual(expectedPath);
  });

  it('should return correct relative join path with country', () => {
    const locale = '/pt';
    const expectedPath = '/pt/join/portugal';
    const result = createRelativeJoinPath({ locale, country: countryPortugal });

    expect(result).toEqual(expectedPath);
  });

  it('should return correct relative join path with paths', () => {
    const locale = '/pt';
    const paths = ['/test', '/path'];
    const expectedPath = '/pt/join/portugal/test/path';
    const result = createRelativeJoinPath({ locale, country: countryPortugal, paths });

    expect(result).toEqual(expectedPath);
  });
});

describe('getAbsolutePath', () => {
  it('should return the absolute URL when suffixPath is provided', () => {
    const path = '/features';
    const suffixPath = '/integrations';

    const result = getAbsolutePath(path, suffixPath);

    expect(result).toBe(`${mockedBaseUrl}/features/integrations`);
  });

  it('should return the absolute URL when suffixPath is not provided', () => {
    const path = '/features';

    const result = getAbsolutePath(path);

    expect(result).toBe(`${mockedBaseUrl}/features`);
  });
});

describe('renderAboutUsLink', () => {
  it('should return correct link in all locales', () => {
    aboutUsPaths.forEach(({ locale, pathKey, expectedPath }) => {
      const result = renderAboutUsLink(pathKey, locale);
      const expectedUrl = new URL(expectedPath, mockedBaseUrl);

      expect(result).toEqual(expectedUrl.href);
    });
  });
});
