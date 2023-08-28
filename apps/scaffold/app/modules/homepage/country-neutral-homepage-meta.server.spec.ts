import { vitest } from 'vitest';
import { CountryNeutralHomepageMeta } from './country-neutral-homepage-meta.server';
import { type V2_MetaDescriptor } from '@remix-run/node';

import { KyeroRouterServer } from '~/common/kyero-router/kyero-router.server';
vitest.mock('~/common/kyero-router/kyero-router.server', () => ({
  KyeroRouterServer: {
    urlOf: vitest.fn((url: string) => 'https://www.test-url.com' + url),
  },
}));

const t = vitest.fn().mockImplementation((t: string) => t);
const locale = 'en';

const baseI18n = {
  locale,
  t,
};

describe('CountryNeutralHomepageMeta', () => {
  it('should be defined', () => {
    expect(new CountryNeutralHomepageMeta(baseI18n)).toBeDefined();
  });

  it('should have a schema', () => {
    const meta = new CountryNeutralHomepageMeta(baseI18n);
    const metaTags = meta.getAll();

    // @ts-ignore
    const schemaTags = metaTags.filter((tag: V2_MetaDescriptor) => tag && tag['script:ld+json']);

    expect(schemaTags).toBeDefined();
    expect(schemaTags).toHaveLength(1);
    expect(KyeroRouterServer.urlOf).toHaveBeenCalled();
    expect(schemaTags[0]).toMatchObject({
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'https://www.test-url.com/',
        logo: 'https://www.test-url.com/images/logo-wide.png',
        name: 'Kyero',
        sameAs: [
          'https://twitter.com/kyero',
          'https://www.facebook.com/kyero.co.uk',
          'https://plus.google.com/+kyero',
        ],
      },
    });
  });
});
