import { URL } from 'node:url';
import { FacebookSocialCard } from './facebook-social-card';

import { SERVER_ENV } from 'test/__mocks__/server-env.mock';

const expectedCard = {
  title: 'Home | Kyero',
  description: 'Description of the homepage',
  url: 'http://new-frontend-kyero.test',
  type: 'article' as const,
  image: 'image-to-be-overwritten.jpg',
};

beforeAll(() => {
  // @ts-ignore
  global.URL = URL;
});

describe('FacebookSocialCard', () => {
  it('should be defined with correct default', () => {
    const facebookSocialCard = new FacebookSocialCard(expectedCard, 'en', SERVER_ENV);
    expect(facebookSocialCard).toBeDefined();
    expect(facebookSocialCard.card.image).toEqual(
      'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/facebook_social_image.jpg',
    );
  });

  describe('#metaTags', () => {
    it('should return the correct data structure', () => {
      const facebookSocialCard = new FacebookSocialCard(expectedCard, 'en', SERVER_ENV);

      expect(SERVER_ENV.FACEBOOK_APP_ID).toEqual('test_facebook_app_id');

      expect(facebookSocialCard.metaTags).toEqual([
        { property: 'og:site_name', content: 'Kyero.com' },
        { property: 'og:locale', content: 'en_GB' },
        { property: 'article:author', content: 'https://www.facebook.com/kyero.co.uk' },
        { property: 'article:publisher', content: 'https://www.facebook.com/kyero.co.uk' },
        { property: 'fb:app_id', content: 'test_facebook_app_id' },
        { property: 'og:title', content: 'Home | Kyero' },
        { property: 'og:description', content: 'Description of the homepage' },
        {
          property: 'og:image',
          content:
            'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/facebook_social_image.jpg',
        },
        {
          property: 'og:image:url',
          content:
            'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/facebook_social_image.jpg',
        },
        {
          property: 'og:image:secure_url',
          content:
            'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/facebook_social_image.jpg',
        },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: 1200 },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: expectedCard.url },
      ]);
    });
  });
});
