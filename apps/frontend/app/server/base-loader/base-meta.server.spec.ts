import get from 'lodash/get';
import { type MockedClass, vitest } from 'vitest';
import { BaseMeta } from './base-meta.server';
import { FacebookSocialCard } from './social-card/facebook-social-card';
import { TwitterSocialCard } from './social-card/twitter-social-card';

import { SERVER_ENV } from '~/../test/__mocks__/server-env.mock';
import { assetsPathTo } from '~/common/client-router/helpers';

vitest.mock('./social-card/facebook-social-card');
vitest.mock('./social-card/twitter-social-card');

const MockedFacebookSocialCard = FacebookSocialCard as MockedClass<typeof FacebookSocialCard>;
const MockedTwitterSocialCard = TwitterSocialCard as MockedClass<typeof TwitterSocialCard>;

vitest
  .spyOn(MockedFacebookSocialCard.prototype, 'metaTags', 'get')
  .mockImplementation(() => [{ property: 'test-facebook', content: 'test' }]);

vitest
  .spyOn(MockedTwitterSocialCard.prototype, 'metaTags', 'get')
  .mockImplementation(() => [{ name: 'test-twitter', content: 'test' }]);

const t = vitest.fn().mockImplementation((t: string) => t);
const locale = 'en';

const baseI18n = {
  locale,
  t,
};

describe('BaseMeta', () => {
  describe('#getAll', () => {
    it('should return the correct data structure', () => {
      const meta = new BaseMeta(baseI18n, SERVER_ENV);

      const expectedCard = {
        title: 'common.homepage.spain.meta.title',
        description: 'common.homepage.spain.meta.description',
        url: SERVER_ENV.BASE_URL,
        type: 'article',
        image: undefined,
      };

      expect(expectedCard.url).toEqual(SERVER_ENV.BASE_URL);

      expect(meta.getAll()).toEqual([
        { title: 'common.homepage.spain.meta.title | Kyero' },
        { name: 'description', content: 'common.homepage.spain.meta.description' },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'owner', content: 'Kyero.com' },
        { name: 'copyright', content: 'common.meta.copyright' },
        { name: 'google', content: 'notranslate' },
        { property: 'test-facebook', content: 'test' },
        { name: 'test-twitter', content: 'test' },
        { name: 'apple-mobile-web-app-title', content: 'Kyero' },
        { name: 'application-name', content: 'Kyero' },
        { name: 'msapplication-config', content: assetsPathTo('/favicon/browserconfig.xml') },
        { name: 'theme-color', content: '#1F4DEF' },
      ]);

      expect(MockedFacebookSocialCard).toHaveBeenCalledWith(
        expectedCard,
        baseI18n.locale,
        SERVER_ENV,
      );
      expect(MockedFacebookSocialCard).toHaveBeenCalledTimes(1);

      expect(MockedTwitterSocialCard).toHaveBeenCalledWith(
        expectedCard,
        baseI18n.locale,
        SERVER_ENV,
      );
      expect(MockedTwitterSocialCard).toHaveBeenCalledTimes(1);
    });

    describe('when KYERO_ENV is production', () => {
      afterAll(() => {
        SERVER_ENV.KYERO_ENV = 'development';
      });

      it('should render index, follow meta', () => {
        SERVER_ENV.KYERO_ENV = 'production' as const;
        const meta = new BaseMeta(baseI18n, SERVER_ENV);
        const metaTags = meta.getAll();
        const robotsMeta = metaTags.find((metaTag) => get(metaTag, 'name') === 'robots');

        expect(robotsMeta).toBeDefined();
        expect(get(robotsMeta, 'content')).toEqual('index, follow');
      });
    });
  });
});
