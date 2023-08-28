const { tailwindConfig } = require('@kyero/config');

module.exports = {
  ...tailwindConfig,
  content: ['../../packages/kyero-ui/**/*.{ts,tsx}', './**/*.{tsx,ts,css}'],
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',

          '@screen md': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
          '@screen lg': {
            maxWidth: '1208px',
          },
        },
      });
    },
  ],
};
