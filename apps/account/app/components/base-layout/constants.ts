import { Cart, Dashboard, Properties } from '@kyero/icons';

export const CHANGE_URL_PATH = '/change-language';
export const MOBILE_BREAKPOINT = 1023;

export const FOOTER_LINKS = [
  { href: '/', title: 'Cookies', target: 'blank' },
  { href: '/', title: 'Terms' },
  { href: '/', title: 'Sitemap' },
];

export const LANGUAGES = [
  {
    locale: 'en',
    title: 'English',
  },
  {
    locale: 'es',
    title: 'Español',
  },
];

export const NAV_LINKS = [
  {
    title: 'navigation.dashboard',
    Icon: Dashboard,
    to: '/',
    id: 'routes/index',
  },
  {
    title: 'navigation.properties',
    Icon: Properties,
    to: '/properties',
    id: 'routes/properties',
  },
  {
    title: 'navigation.cart',
    Icon: Cart,
    to: '/cart',
    id: 'routes/cart',
  },
];
