const { RoutesHandler } = require('../../next-rewrites.config');

describe('RoutesHandler', () => {
  const mockData = {
    baseSource: 'join/:country',
    baseDestination: 'join/:country/features',
    sources: [
      ['es', 'caracteristicas'],
      ['it', 'caratteristiche'],
      ['fr', 'caracteristiques'],
      ['pt', 'funcionalidades'],
    ],
    subRoutes: [],
  };
  describe('getRewrites', () => {
    it('should build rewrites correctly', () => {
      const handler = new RoutesHandler(mockData);
      const rewrites = handler.getRewrites();

      expect(rewrites).toEqual([
        {
          source: '/es/join/:country/caracteristicas',
          destination: '/es/join/:country/features',
          locale: false,
        },
        {
          source: '/it/join/:country/caratteristiche',
          destination: '/it/join/:country/features',
          locale: false,
        },
        {
          source: '/fr/join/:country/caracteristiques',
          destination: '/fr/join/:country/features',
          locale: false,
        },
        {
          source: '/pt/join/:country/funcionalidades',
          destination: '/pt/join/:country/features',
          locale: false,
        },
      ]);
    });
  });

  describe('hasRouteFor404', () => {
    const handler = new RoutesHandler(mockData);

    it('should pass', () => {
      const result = handler.hasRouteFor404({
        locale: 'es',
        pathname: '/join/spain/caracteristicas',
        routeKey: 'caracteristicas',
      });

      expect(result).toBe(true);
    });

    it('should go to 404', () => {
      // This is a case when we should go to 404 if it url is 'es/join/italy/features'
      const result = handler.hasRouteFor404({
        locale: 'es',
        pathname: '/join/italy/caracteristicas',
        routeKey: 'features',
      });

      expect(result).toBe(false);
    });
  });

  describe('getRoute', () => {
    it('should generate routes correctly', () => {
      const handler = new RoutesHandler(mockData);

      const generatedRoute = handler.getRoute('en', 'join/:country', 'features');

      expect(generatedRoute).toBe('/en/join/:country/features');
    });
  });
});
