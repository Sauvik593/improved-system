import { createContext } from 'test/__mocks__/server-env.mock';
import { BaseLoader } from '../../../server/base-loader/base-loader.server';
import { CountryNeutralHomepageLoader } from './loader.server';

const request = new Request('/');
const params = {};
const context = createContext();

const loaderArgs = { request, params, context };

describe('CountryNeutralHomepageLoader', () => {
  it('should inherit from BaseLoader', () => {
    expect(new CountryNeutralHomepageLoader(loaderArgs)).toBeInstanceOf(BaseLoader);
  });
});
