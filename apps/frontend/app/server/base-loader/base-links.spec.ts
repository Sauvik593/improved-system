import { assetsPathTo } from '../../common/client-router/helpers';
import { BaseLinks } from './base-links';

describe('BaseLinks', () => {
  describe('#links', () => {
    it('should return the correct data structure', () => {
      const links = new BaseLinks();

      expect(links.links).toEqual([
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: assetsPathTo('/favicon/apple-touch-icon.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: assetsPathTo('/favicon/favicon-32x32.png'),
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: assetsPathTo('/favicon/favicon-16x16.png'),
          sizes: '16x16',
        },
        {
          rel: 'mask-icon',
          href: assetsPathTo('/favicon/safari-pinned-tab.svg'),
          color: '#1F4DEF',
        },
        { rel: 'shortcut icon', href: assetsPathTo('/favicon/favicon.ico') },
        { rel: 'manifest', href: '/manifest.json' },
        {
          rel: 'preload',
          href: assetsPathTo('/fonts/gilroy-medium-webfont.woff2'),
          as: 'font',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: assetsPathTo('/fonts/gilroy-bold-webfont.woff2'),
          as: 'font',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: assetsPathTo(`/fonts/gilroy-semibold-webfont.woff2`),
          as: 'font',
          crossOrigin: 'anonymous',
        },
      ]);
    });
  });

  describe('#getDynamicLinks', () => {
    it('should return the correct data structure', () => {
      const links = new BaseLinks('https://www.kyero.com');

      expect(links.getDynamicLinks({})).toEqual([]);
    });
  });
});
