import { URL } from 'node:url';
import { SERVER_ENV } from 'env.server';
import { TwitterSocialCard } from './twitter-social-card';

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

describe('TwitterSocialCard', () => {
  it('should be defined', () => {
    const twitterSocialCard = new TwitterSocialCard(expectedCard, 'en', SERVER_ENV);

    expect(twitterSocialCard).toBeDefined();
    expect(twitterSocialCard.card.image).toEqual(
      'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/twitter_social_image.jpg',
    );
  });

  describe('#metaTags', () => {
    it('should return the correct data structure', () => {
      const twitterSocialCard = new TwitterSocialCard(expectedCard, 'en', SERVER_ENV);

      expect(twitterSocialCard.metaTags).toEqual([
        { name: 'twitter:site', content: '@kyero' },
        { name: 'twitter:domain', content: 'kyero.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: expectedCard.title },
        { name: 'twitter:description', content: expectedCard.description },
        {
          name: 'twitter:image',
          content:
            'http://new-frontend.kyero.test/new-frontend-assets/images/social_cards/twitter_social_image.jpg',
        },
        { name: 'twitter:url', content: expectedCard.url },
      ]);
    });
  });
});
