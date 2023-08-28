import { vitest } from 'vitest';

import { CountryNeutralHomepageLinks } from './country-neutral-homepage-links';

vitest.mock('~/common/kyero-router/kyero-router', () => ({
  KyeroRouterClient: {
    getHomepageUrl: vitest.fn().mockReturnValue('homepage-url'),
  },
}));

vitest.mock('../base-loader/base-links');

Object.defineProperty(window, 'ENV', {});

describe('CountryNeutralHomepageLinks', () => {
  it('should be defined', () => {
    expect(new CountryNeutralHomepageLinks()).toBeDefined();
  });
});
