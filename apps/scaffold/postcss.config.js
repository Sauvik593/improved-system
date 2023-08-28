const { postCssConfig } = require('@kyero/config');

module.exports = {
  ...postCssConfig,
  plugins: {
    ...postCssConfig.plugins,
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    ...(process.env.NODE_ENV === 'production'
      ? { 'postcss-hash': { manifest: './public/build/manifest.json' } }
      : {}),
  },
};
