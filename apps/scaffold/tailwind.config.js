const { tailwindConfig } = require('@kyero/config');

module.exports = {
  ...tailwindConfig,

  content: ['../../packages/kyero-ui/**/*.{ts,tsx}', './**/*.{ts,tsx}'],
};
