/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['.*'],
  cacheDirectory: './node_modules/.cache/remix',
  publicPath: '/new-frontend-assets/build',
  future: {
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_errorBoundary: true,
    v2_dev: {
      port: 8002,
    },
  },
};
