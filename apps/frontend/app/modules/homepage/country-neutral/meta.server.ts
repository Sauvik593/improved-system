import { type V2_HtmlMetaDescriptor } from '@remix-run/node';

import { urlOf } from '~/common/client-router/helpers';
import { BaseMeta } from '~/server/base-loader/base-meta.server';

export class CountryNeutralHomepageMeta extends BaseMeta {
  protected get schema(): V2_HtmlMetaDescriptor[] {
    return [this.organisationSchema];
  }

  private get organisationSchema() {
    return {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Kyero',
        url: urlOf('/'),
        logo: urlOf('/images/logo-wide.png'),
        sameAs: [
          'https://twitter.com/kyero',
          'https://www.facebook.com/kyero.co.uk',
          'https://plus.google.com/+kyero',
        ],
      },
    };
  }
}
