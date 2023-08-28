import { vitest, type MockedClass } from 'vitest';
import { BaseLoader } from './base-loader.server';
import { BaseMeta } from './base-meta.server';

import { createContext } from 'test/__mocks__/server-env.mock';

vitest.mock('./base-meta.server');

const MockedBaseMeta = BaseMeta as MockedClass<typeof BaseMeta>;

const request = new Request('/');
const params = {};
const context = createContext();
const loaderArgs = { request, params, context };

describe('BaseLoader', () => {
  describe('#init', () => {
    let loader: BaseLoader<unknown>;
    let init: Awaited<ReturnType<typeof BaseLoader.prototype.init>>;
    const spy = vitest.spyOn(BaseLoader.prototype, 'getRoutes');

    beforeEach(async () => {
      // @ts-ignore
      spy.mockReturnValue('mocked routes');
      MockedBaseMeta.prototype.getAll.mockReturnValueOnce([{ name: 'test', content: 'test' }]);
    });

    it('should return the correct data structure', async () => {
      loader = new BaseLoader(loaderArgs);
      init = await loader.init();
      const data = await init.json();

      expect(MockedBaseMeta.prototype.getAll).toBeCalledTimes(1);
      expect(data).toEqual(
        expect.objectContaining({
          meta: [{ name: 'test', content: 'test' }],
          locale: 'en',
          localizedRoutes: expect.any(Array),
          data: [],
          routeLinks: 'mocked routes',
        }),
      );
    });

    describe('when locale is different', () => {
      it('should return the correct data structure', async () => {
        loader = new BaseLoader({ ...loaderArgs, request: new Request('/es') });
        init = await loader.init();
        const data = await init.json();

        expect(data).toEqual(
          expect.objectContaining({
            meta: [{ name: 'test', content: 'test' }],
            locale: 'es',
            localizedRoutes: expect.any(Array),
            data: [],
            routeLinks: 'mocked routes',
          }),
        );
      });
    });
  });

  describe('#getCacheKey', () => {
    it('returns null', () => {
      const loader = new BaseLoader({ ...loaderArgs, request: new Request('/en') });

      expect(loader.getCacheKey('en')).toBeUndefined();
    });
  });

  describe('#getCacheExpireAt', () => {
    it('returns undefined', () => {
      const loader = new BaseLoader({ ...loaderArgs, request: new Request('/en') });

      expect(loader.getCacheExpireAt()).toBeUndefined();
    });
  });
});
