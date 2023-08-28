import { ClientEnv } from '@lib/clientEnv';
import { Env } from '@lib/env';
import { MediaFormatName, MediaImage, MediaFormat, ImageSize } from '@lib/types';

interface ResizedUrlProps {
  formatName: MediaFormatName;
  size: ImageSize;
  image: MediaImage;
}

const RESIZE_MAP = {
  large: {
    next: 'medium',
  },
  medium: {
    next: 'small',
  },
  small: {
    next: 'thumbnail',
  },
  thumbnail: {
    next: 'placeholder',
  },
  placeholder: {
    next: undefined,
  },
  base64: {
    next: undefined,
  },
};

const RESIZE_VALUES = {
  article: '490x530',
  featured_image: '550x330',
  author: '50x50',
};

const RESIZER_URL = ClientEnv.imageResizerUrl;

// This function is used to get the next valid format if the requested format is not available
export function getFormatWithFallback(
  allFormats: MediaImage['formats'],
  format: MediaFormatName,
): MediaFormat | undefined {
  const requestedFormat = allFormats[format];

  if (requestedFormat) {
    return requestedFormat;
  }

  const nextFormatName = RESIZE_MAP[format]?.next as MediaFormatName;

  if (!nextFormatName) {
    return undefined;
  }

  return getFormatWithFallback(allFormats, nextFormatName);
}

export class Media {
  static getStrapiUrl(path = ''): string {
    const strapiPath = [ClientEnv.strapiMediaUrl, path].join('/').replace(/\/+/g, '/');
    return path.includes('http') ? path : strapiPath;
  }

  // This function can be used to resize images that are using NextImage tag
  static getImageResizedUrl({ formatName, size, image }: ResizedUrlProps): string {
    const formatUrl = this.getUrlForFormat(formatName, image);
    const formatPath = [this.resizedImageSize(size), this.getStrapiUrl(formatUrl)].join('/');

    if (Env.isDev()) {
      return this.getStrapiUrl(image.url);
    }

    return formatPath;
  }

  static getUrlForFormat(formatName: MediaFormatName, img?: MediaImage): string | undefined {
    if (!img) {
      return undefined;
    }

    if (!img.formats) {
      return img.url;
    }

    const format = getFormatWithFallback(img.formats, formatName);

    if (format) {
      return format.url;
    }

    return img.url;
  }

  static getTwitterSizeUrl = (url: string): string =>
    Media.getResizedUrl(
      {
        method: 'fit',
        width: 1200,
        height: 658,
      },
      Media.getStrapiUrl(url),
    );

  private static getResizedUrl(
    config: { width: number; height: number; method: 'fit' | 'crop' },
    path: string,
  ): string {
    return `${RESIZER_URL}/${config.method}/${config.width}/${config.height}/${path}`;
  }

  private static resizedImageSize(size: ImageSize) {
    const sizeValue = RESIZE_VALUES[size as ImageSize];

    return [RESIZER_URL, `crop/${sizeValue}`].join('/');
  }

  static getImagePlaceholder(image?: MediaImage) {
    return image?.formats ? image.formats.base64.url : image?.url;
  }
}
