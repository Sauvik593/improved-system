const { i18n } = require('./next-i18next.config');
const {
  featuresRoutesHandler,
  integrationsRoutesHandler,
  pricingRoutesHandler,
  tellUsAboutRoutesHandler,
  contactRoutesHandler,
} = require('./next-rewrites.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  assetPrefix: '/new-join-assets',
  swcMinify: true,
  images: {
    imageSizes: [32, 64, 150, 280, 350],
    deviceSizes: [150, 280, 350, 640, 786, 1024, 1280, 1536],
    domains: [
      'image.kyero.com',
      'd2hhh2ewuz3i8z.cloudfront.net',
      'strapi.kyero.test',
      'strapi:1337',
      'strapi',
      'dev-kyero-cms.s3.eu-west-1.amazonaws.com',
      'staging-kyero-cms.s3.eu-west-1.amazonaws.com',
      'production-kyero-cms.s3.eu-west-1.amazonaws.com',
    ],
  },
};

module.exports = {
  ...nextConfig,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/join',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        { source: '/new-join/api/:path*', destination: '/api/:path*' },
        ...featuresRoutesHandler.getRewrites(),
        ...integrationsRoutesHandler.getRewrites(),
        ...pricingRoutesHandler.getRewrites(),
        ...tellUsAboutRoutesHandler.getRewrites(),
        ...contactRoutesHandler.getRewrites(),
      ],
    };
  },
};
