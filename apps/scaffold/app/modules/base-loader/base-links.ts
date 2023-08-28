import { type LinkDescriptor } from '@remix-run/node';

export class BaseLinks {
  public get links(): LinkDescriptor[] {
    return [...this.applicationLinks];
  }

  public getDynamicLinks(loader: unknown): LinkDescriptor[] {
    return [];
  }

  private get applicationLinks() {
    return [
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: 'favicon/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: 'favicon/favicon-16x16.png', sizes: '16x16' },
      { rel: 'mask-icon', href: 'safari-pinned-tab.svg', color: '#e93f46' },
      { rel: 'shortcut icon', href: 'favicon/favicon.ico' },
      { rel: 'manifest', href: 'manifest.json' },
    ];
  }
}
