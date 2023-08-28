import { ID_BASE_URL } from './constants';
import { getURLWithPath } from './helpers';

export const IDRoutes = {
  loginURL: (locale: string) => getURLWithPath(`/${locale}/account/login`, ID_BASE_URL),
  logoutURL: (locale: string) => getURLWithPath(`/${locale}/account/logout`, ID_BASE_URL),
  signupURL: (locale: string) => getURLWithPath(`/${locale}/account/signup`, ID_BASE_URL),
  passwordResetURL: (locale: string) => getURLWithPath(`/${locale}/account/password`, ID_BASE_URL),
  settingsURL: (locale: string) => getURLWithPath(`/${locale}/my_account/settings`, ID_BASE_URL),
  idFacebookSignupURL: (locale: string) =>
    getURLWithPath(`/${locale}/auth/facebook/localized_omniauth`, ID_BASE_URL),
};
