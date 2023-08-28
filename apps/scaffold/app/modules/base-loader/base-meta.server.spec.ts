import { get } from 'lodash';
import ENV from '~/common/env';
import { type MockedClass, vitest } from 'vitest';
import { BaseMeta } from './base-meta.server';
import { FacebookSocialCard } from './social-card/facebook-social-card';
import { TwitterSocialCard } from './social-card/twitter-social-card';

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
  it('should be defined', () => {
    expect(new BaseMeta(baseI18n)).toBeDefined();
  });

  describe('#getAll', () => {
    it('should return the correct data structure', () => {
      const meta = new BaseMeta(baseI18n);

      const expectedCard = {
        title: 'common.homepage.meta.title.neutral',
        description: 'common.homepage.spain.meta.description',
        url: ENV.BASE_URL,
        type: 'article',
        image: undefined,
      };

      expect(expectedCard.url).toEqual('http://new-frontend.kyero.test');

      expect(meta.getAll()).toEqual([
        { title: 'Kyero.com | common.homepage.meta.title.neutral' },
        { name: 'description', content: 'common.homepage.spain.meta.description' },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'owner', content: 'Kyero.com' },
        { name: 'copyright', content: 'common.meta.copyright' },
        { name: 'google', content: 'notranslate' },
        { property: 'test-facebook', content: 'test' },
        { name: 'test-twitter', content: 'test' },
        { name: 'apple-mobile-web-app-title', content: 'Kyero' },
        { name: 'application-name', content: 'Kyero' },
        { name: 'msapplication-config', content: 'favicon/browserconfig.xml' },
        { name: 'theme-color', content: '#1F4DEF' },
      ]);

      expect(MockedFacebookSocialCard).toHaveBeenCalledWith(expectedCard, baseI18n.locale);
      expect(MockedFacebookSocialCard).toHaveBeenCalledTimes(1);

      expect(MockedTwitterSocialCard).toHaveBeenCalledWith(expectedCard, baseI18n.locale);
      expect(MockedTwitterSocialCard).toHaveBeenCalledTimes(1);
    });

    describe('when KYERO_ENV is production', () => {
      afterAll(() => {
        ENV.KYERO_ENV = 'development';
      });

      it('should render index, follow meta', () => {
        ENV.KYERO_ENV = 'production';
        const meta = new BaseMeta(baseI18n);
        const metaTags = meta.getAll();
        const robotsMeta = metaTags.find((metaTag) => get(metaTag, 'name') === 'robots');

        expect(robotsMeta).toBeDefined();
        expect(get(robotsMeta, 'content')).toEqual('index, follow');
      });
    });
  });
});
