import { LocaleFromPath } from './locale-from-path.server';

let url: string = 'https://example.com/en';
let request = {
  url,
} as any;

describe('LocaleFromPath', () => {
  it('returns a correct locale from path', async () => {
    expect(await LocaleFromPath.get(request)).toEqual('en');
  });

  describe('when url is /', () => {
    it('returns a default locale', async () => {
      url = 'https://example.com/';
      request = {
        url,
      } as any;

      expect(await LocaleFromPath.get(request)).toEqual('en');
    });
  });

  describe('wehn url is in the supported languages', () => {
    const supportedLanguages = ['en', 'es'];

    supportedLanguages.forEach((language) => {
      it(`returns a ${language} locale`, async () => {
        url = `https://example.com/${language}`;
        request = {
          url,
        } as any;

        expect(await LocaleFromPath.get(request)).toEqual(language);
      });
    });
  });

  describe('when url is not in the supported languages', () => {
    it('returns a default locale', async () => {
      url = 'https://example.com/pl';
      request = {
        url,
      } as any;

      expect(await LocaleFromPath.get(request)).toEqual('en');
    });
  });

  describe('when url is more complicated', () => {
    it('returns a default locale', async () => {
      url = 'https://example.com/es/some/path';
      request = {
        url,
      } as any;

      expect(await LocaleFromPath.get(request)).toEqual('es');
    });
  });
});
