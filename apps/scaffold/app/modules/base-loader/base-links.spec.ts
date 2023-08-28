import { BaseLinks } from './base-links';

describe('BaseLinks', () => {
  describe('#links', () => {
    it('should return the correct data structure', () => {
      const links = new BaseLinks();

      expect(links.links).toEqual([
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', href: 'favicon/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: 'favicon/favicon-16x16.png', sizes: '16x16' },
        { rel: 'mask-icon', href: 'safari-pinned-tab.svg', color: '#e93f46' },
        { rel: 'shortcut icon', href: 'favicon/favicon.ico' },
        { rel: 'manifest', href: 'manifest.json' },
      ]);
    });
  });

  describe('#getDynamicLinks', () => {
    it('should return the correct data structure', () => {
      const links = new BaseLinks();

      expect(links.getDynamicLinks({})).toEqual([]);
    });
  });
});
