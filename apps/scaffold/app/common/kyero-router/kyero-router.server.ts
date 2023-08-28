import ENV from '~/common/env';

export const KyeroRouterServer = {
  urlOf(path: string): string {
    return new URL(path, ENV.BASE_URL).toString();
  },
};
