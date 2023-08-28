import { vitest } from 'vitest';
import { CountryHomepageMeta } from './country.meta.server';
import { type V2_MetaDescriptor } from '@remix-run/node';

import { SERVER_ENV } from 'test/__mocks__/server-env.mock';

const t = vitest.fn().mockImplementation((t: string) => t);
const locale = 'en';

const baseI18n = {
  locale,
  t,
};

describe('CountryHomepageMeta', () => {
  it('should have a schema', () => {
    const meta = new CountryHomepageMeta(baseI18n, SERVER_ENV);

    const metaTags = meta.getAll();

    // @ts-ignore
    const schemaTags = metaTags.filter((tag: V2_MetaDescriptor) => tag && tag['script:ld+json']);

    expect(schemaTags).toBeDefined();
    expect(schemaTags).toHaveLength(1);
    expect(schemaTags[0]).toMatchObject({
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: 'http://new-frontend.kyero.test',
        logo: 'http://new-frontend.kyero.test/images/logo-wide.png',
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
