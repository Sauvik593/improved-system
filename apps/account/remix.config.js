/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['.*'],
  cacheDirectory: './node_modules/.cache/remix',
  devServerPort: 8002,
  watchPaths: ['../../packages/kyero-ui/**/*'],
  future: {
    v2_routeConvention: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
  },
};
