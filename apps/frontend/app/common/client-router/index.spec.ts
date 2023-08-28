import { SPAIN_KEY } from '~/common/helpers/shared-constants';
import { ClientRouter } from './';

describe('ClientRouter', () => {
  let clientRouter: ClientRouter;

  beforeEach(() => {
    clientRouter = new ClientRouter();
  });

  describe('homepagePath', () => {
    it('should return the root path for the "en" locale', () => {
      expect(clientRouter.homepagePath('en')).toBe('/');
    });

    it('should return the path with the locale for non-English locales', () => {
      expect(clientRouter.homepagePath('fr')).toBe('/fr');
      expect(clientRouter.homepagePath('es')).toBe('/es');
    });
  });

  describe('countryHomepagePath', () => {
    it('should return the root path for the "en" locale and Spain country', () => {
      expect(clientRouter.countryHomepagePath('en', 'spain_translation', SPAIN_KEY)).toBe('/');
    });

    it('should return the path with the locale for Spain country', () => {
      expect(clientRouter.countryHomepagePath('fr', 'spagna_translation', SPAIN_KEY)).toBe('/fr');
    });

    it('should return the path with the locale and countryTranslation for non-English locales and non-Spain country', () => {
      expect(clientRouter.countryHomepagePath('fr', 'france_translation', 'France Key')).toBe(
        '/fr/france_translation',
      );
    });
  });

  describe('aboutUsPath', () => {
    it('should return the correct path for existing locales in ABOUT_US_ROUTES', () => {
      expect(clientRouter.aboutUsPath('de')).toBe('/de/uberuns');
      expect(clientRouter.aboutUsPath('es')).toBe('/es/nosotros');
      expect(clientRouter.aboutUsPath('fr')).toBe('/fr/anotrepropos');
      expect(clientRouter.aboutUsPath('nl')).toBe('/nl/overons');
    });

    it('should return the default path for unknown locales in ABOUT_US_ROUTES', () => {
      expect(clientRouter.aboutUsPath('it')).toBe('/it/aboutus');
    });

    it('should return the en version without locale in path', () => {
      expect(clientRouter.aboutUsPath('en')).toBe('/aboutus');
    });
  });

  describe('favouritesPath', () => {
    it('should return the path with the locale for favourites', () => {
      expect(clientRouter.favouritesPath('en')).toBe('/en/favorites');
      expect(clientRouter.favouritesPath('fr')).toBe('/fr/favorites');
    });
  });

  describe('savedSearchesPath', () => {
    it('should return the path with the locale for saved searches', () => {
      expect(clientRouter.savedSearchesPath('en')).toBe('/en/alerts');
      expect(clientRouter.savedSearchesPath('fr')).toBe('/fr/alerts');
    });
  });

  describe('enquiriesPath', () => {
    it('should return the path with the locale for enquiries', () => {
      expect(clientRouter.enquiriesPath('en')).toBe('/en/enquiries');
      expect(clientRouter.enquiriesPath('fr')).toBe('/fr/enquiries');
    });
  });

  describe('logoutPath', () => {
    it('should return the logout path', () => {
      expect(clientRouter.logoutPath()).toBe('/kyero-api/auth/logout');
    });
  });
});
