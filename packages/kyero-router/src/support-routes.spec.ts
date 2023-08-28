import { SupportRoutes } from './support-routes';

const exampleUnsupportedLocales = ['en', 'pl'];

describe('SupportRoutes', () => {
  describe('#url', () => {
    it('returns the default URL when locale is not prefixed', () => {
      expect(SupportRoutes.url()).toEqual('https://help.kyero.com');
    });
  });

  describe('#agentFAQURL', () => {
    it('returns correct translation for spanish', () => {
      expect(SupportRoutes.agentFAQURL('es')).toEqual('https://help.kyero.com/inmobiliarias');
    });

    exampleUnsupportedLocales.forEach((locale) => {
      it(`returns the default URL for unknown locale ${locale}`, () => {
        expect(SupportRoutes.agentFAQURL(locale)).toEqual('https://help.kyero.com/estate-agents');
      });
    });
  });

  describe('#buyersFAQURL', () => {
    it('returns correct translation for spanish', () => {
      expect(SupportRoutes.buyersFAQURL('es')).toEqual('https://help.kyero.com/visitantes');
    });

    exampleUnsupportedLocales.forEach((locale) => {
      it(`returns the default URL for unknown locale ${locale}`, () => {
        expect(SupportRoutes.buyersFAQURL(locale)).toEqual('https://help.kyero.com/visitors');
      });
    });
  });
});
