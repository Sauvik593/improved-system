import { vitest } from 'vitest';

import { type LoaderArgs } from '@remix-run/node';

import { loader } from './loader.server';
import { createContext } from 'test/__mocks__/server-env.mock';
import { SpainHomepageLoader } from './spain.server';
import { PortugalHomepageLoader } from './portugal.server';
import { ItalyHomepageLoader } from './italy.server';
import { FranceHomepageLoader } from './france.server';

const mockedResponse = 'mockedResponse';

const Mock = vitest.fn().mockResolvedValue(mockedResponse);

beforeAll(() => {
  SpainHomepageLoader.prototype.init = Mock;
  PortugalHomepageLoader.prototype.init = Mock;
  ItalyHomepageLoader.prototype.init = Mock;
  FranceHomepageLoader.prototype.init = Mock;
});

describe('loader', () => {
  describe('when the country is not found', () => {
    it('throws a 404 error with valid data', async () => {
      const args = {
        params: {
          countryKey: 'non-existing-country',
          locale: 'es',
        },
        request: new Request('https://www.kyero.com'),
        context: createContext(),
      };
      try {
        await expect(await loader(args as LoaderArgs));
      } catch (e) {
        expect(e).toBeInstanceOf(Response);
        expect(e.status).toBe(404);
        expect(e.statusText).toBe('Not found');
      }
    });
  });
  [
    ['portugal', 'en', PortugalHomepageLoader],
    ['italy', 'en', ItalyHomepageLoader],
    ['france', 'en', FranceHomepageLoader],
  ].forEach(([countryKey, locale]) => {
    describe(`when the country is ${countryKey}`, () => {
      it('returns the correct loader', async () => {
        const args = {
          params: {
            countryKey,
            locale,
          },
          request: new Request('https://www.kyero.com'),
          context: createContext(),
        };
        expect(await loader(args as LoaderArgs)).toEqual(mockedResponse);
      });
    });
  });

  describe('when country is spain and has locale in params', () => {
    it('throws 301 redirect to /{locale} route', async () => {
      const args = {
        params: {
          countryKey: 'españa',
          locale: 'es',
        },
        request: new Request('https://www.kyero.com'),
        context: createContext(),
      };

      try {
        await expect(await loader(args as LoaderArgs));
      } catch (e) {
        expect(e).toBeInstanceOf(Response);
        expect(e.status).toBe(301);
        expect(e.headers.get('Location')).toBe('/es');
      }
    });
  });
});
