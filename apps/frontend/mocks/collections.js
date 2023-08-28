const BASE_HOME_ROUTES = [
  'get-links:success',
  'login:success',
  'signup:success',
  'get-me:unauthorized',
  'get-properties-for-homepage:success',
  'get-property-types:success',
  'get-nation-tree:success',
  'post-user-profile:success',
];

module.exports = [
  {
    id: 'homepage-spain',
    routes: ['get-map-locations-details:spain', ...BASE_HOME_ROUTES],
  },
  {
    id: 'homepage-portugal',
    routes: ['get-map-locations-details:portugal', ...BASE_HOME_ROUTES],
  },
  {
    id: 'homepage-france',
    routes: ['get-map-locations-details:france', ...BASE_HOME_ROUTES],
  },
  {
    id: 'homepage-italy',
    routes: ['get-map-locations-details:italy', ...BASE_HOME_ROUTES],
  },
];
