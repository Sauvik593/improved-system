import { jest } from '@jest/globals';
import { IDRoutes } from './id-routes';

const ID_BASE_URL = process.env.ID_BASE_URL || 'https://id.kyero.com';

describe('IDRoutes', () => {
  const env = process.env;

  beforeAll(() => {
    jest.resetModules();
    process.env = { ...env, ID_BASE_URL: 'https://id.kyero.com' };
  });

  const testUrlGeneration = (method: keyof typeof IDRoutes, urlPath: string) => {
    it(`returns the ${method} URL`, () => {
      expect(IDRoutes[method]('en')).toEqual(`${ID_BASE_URL}/en/${urlPath}`);
    });

    it(`returns the ${method} URL for a different locale`, () => {
      expect(IDRoutes[method]('es')).toEqual(`${ID_BASE_URL}/es/${urlPath}`);
    });
  };

  describe('loginURL', () => {
    testUrlGeneration('loginURL', 'account/login');
  });

  describe('logoutURL', () => {
    testUrlGeneration('logoutURL', 'account/logout');
  });

  describe('signupURL', () => {
    testUrlGeneration('signupURL', 'account/signup');
  });

  describe('passwordResetURL', () => {
    testUrlGeneration('passwordResetURL', 'account/password');
  });

  describe('settingsURL', () => {
    testUrlGeneration('settingsURL', 'my_account/settings');
  });

  describe('idFacebookSignupURL', () => {
    testUrlGeneration('idFacebookSignupURL', 'auth/facebook/localized_omniauth');
  });
});
