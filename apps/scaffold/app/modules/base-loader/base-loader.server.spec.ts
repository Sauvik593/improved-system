import { vitest, type MockedClass } from 'vitest';
import { BaseLoader } from './base-loader.server';
import { BaseMeta } from './base-meta.server';

vitest.mock('./base-meta.server');

const MockedBaseMeta = BaseMeta as MockedClass<typeof BaseMeta>;

const request = new Request('/');
const params = {};
const context = {};

const loaderArgs = { request, params, context };

describe('BaseLoader', () => {
  it('should be defined', () => {
    expect(new BaseLoader(loaderArgs)).toBeDefined();
  });

  describe('#init', () => {
    let loader: BaseLoader;
    let init: Awaited<ReturnType<typeof BaseLoader.prototype.init>>;

    beforeEach(async () => {
      MockedBaseMeta.prototype.getAll.mockReturnValueOnce([{ name: 'test', content: 'test' }]);
    });

    it('should return the correct data structure', async () => {
      loader = new BaseLoader(loaderArgs);
      init = await loader.init();

      expect(MockedBaseMeta.prototype.getAll).toBeCalledTimes(1);
      expect(init).toEqual({
        meta: [{ name: 'test', content: 'test' }],
        locale: 'en',
        data: [],
      });
    });

    describe('when locale is different', () => {
      it('should return the correct data structure', async () => {
        loader = new BaseLoader({ ...loaderArgs, request: new Request('/es') });
        init = await loader.init();

        expect(init).toEqual({
          meta: [{ name: 'test', content: 'test' }],
          locale: 'es',
          data: [],
        });
      });
    });
  });
});
