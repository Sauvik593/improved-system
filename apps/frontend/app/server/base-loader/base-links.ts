import { type LinkDescriptor } from '@remix-run/node';
import { assetsPathTo } from '~/common/client-router/helpers';

export class BaseLinks {
  public get links(): LinkDescriptor[] {
    return [...this.applicationLinks];
  }

  public getDynamicLinks(loader: unknown): LinkDescriptor[] {
    return [];
  }

  private get applicationLinks() {
    return [
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
      { rel: 'mask-icon', href: assetsPathTo('/favicon/safari-pinned-tab.svg'), color: '#1F4DEF' },
      { rel: 'shortcut icon', href: assetsPathTo('/favicon/favicon.ico') },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'preload',
        href: assetsPathTo('/fonts/gilroy-medium-webfont.woff2'),
        as: 'font',
        crossOrigin: 'anonymous',
      } as LinkDescriptor,
      {
        rel: 'preload',
        href: assetsPathTo('/fonts/gilroy-bold-webfont.woff2'),
        as: 'font',
        crossOrigin: 'anonymous',
      } as LinkDescriptor,
      {
        rel: 'preload',
        href: assetsPathTo('/fonts/gilroy-semibold-webfont.woff2'),
        as: 'font',
        crossOrigin: 'anonymous',
      } as LinkDescriptor,
    ];
  }
}
