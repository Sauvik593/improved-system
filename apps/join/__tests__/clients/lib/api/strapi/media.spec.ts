import { Media } from '@lib/api/strapi/media';
import { Env } from '@lib/env';
import { MediaImage } from '@lib/types';

jest.mock('@lib/clientEnv', () => ({
  ClientEnv: {
    imageResizerUrl: 'http://image-resizer.com',
  },
}));

jest.mock('@lib/env', () => ({
  Env: {
    isDev: jest.fn().mockReturnValue(false),
  },
}));

const mockedIsDev = Env.isDev as jest.MockedFunction<() => boolean>;

const IMAGE = { url: 'https://test-image.com' } as MediaImage;

describe('Media', () => {
  describe('getImageResizedUrl', () => {
    it('returns article size image', () => {
      const resizedUrl = Media.getImageResizedUrl({
        formatName: 'medium',
        size: 'article',
        image: IMAGE,
      });

      expect(resizedUrl).toEqual('http://image-resizer.com/crop/490x530/https://test-image.com');
    });

    it('returns featured_image size image', () => {
      const resizedUrl = Media.getImageResizedUrl({
        formatName: 'medium',
        size: 'featured_image',
        image: IMAGE,
      });

      expect(resizedUrl).toEqual('http://image-resizer.com/crop/550x330/https://test-image.com');
    });

    it('returns author size image', () => {
      const resizedUrl = Media.getImageResizedUrl({
        formatName: 'small',
        size: 'author',
        image: IMAGE,
      });

      expect(resizedUrl).toEqual('http://image-resizer.com/crop/50x50/https://test-image.com');
    });

    it('should return just the path when dev is true', () => {
      mockedIsDev.mockReturnValue(true);

      const resizedUrl = Media.getImageResizedUrl({
        formatName: 'medium',
        size: 'article',
        image: IMAGE,
      });

      expect(resizedUrl).toEqual('https://test-image.com');
    });
  });
});
