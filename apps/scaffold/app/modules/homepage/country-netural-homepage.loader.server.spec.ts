import { BaseLoader } from '../base-loader/base-loader.server';
import { CountryNeutralHomepageLoader } from './country-netural-homepage.loader.server';

const request = new Request('/');
const params = {};
const context = {};

const loaderArgs = { request, params, context };

describe('CountryNeutralHomepageLoader', () => {
  it('should be defined', () => {
    expect(new CountryNeutralHomepageLoader(loaderArgs)).toBeDefined();
  });

  it('should inherit from BaseLoader', () => {
    expect(new CountryNeutralHomepageLoader(loaderArgs)).toBeInstanceOf(BaseLoader);
  });
});
