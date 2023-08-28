import ENV from '~/common/env';

export const KyeroRouterClient = {
  getHomepageUrl: (locale: string): string => {
    const path = KyeroRouterClient.getHomepagePath(locale);

    return new URL(path, ENV.BASE_URL).toString();
  },

  getHomepagePath(locale: string) {
    if (locale === 'en') {
      return '/';
    }

    return `/${locale}`;
  },
};
