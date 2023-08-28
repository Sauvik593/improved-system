import { config } from '~/i18n';

export class LocaleFromPath {
  static async get(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return 'en';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, pathLocale] = url.pathname.split('/');

    if (config.supportedLngs.includes(pathLocale)) {
      return pathLocale;
    }

    return 'en';
  }
}
