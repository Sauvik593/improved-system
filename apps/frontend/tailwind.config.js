const { tailwindConfig } = require('@kyero/config');

module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      backgroundImage: {
        carousel:
          'radial-gradient(50% 50% at 50% 50%, rgba(19, 50, 80, 0.32) 0%, rgba(19, 50, 80, 0) 100%)',
      },
      boxShadow: {
        ...tailwindConfig.theme.extend.boxShadow,
        'home-card': '0px 0px 12px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        '3xl': '1600px',
        uber: '2100px',
      },
    },
  },
  safelist: ['char-decor'],
  content: ['../../packages/kyero-ui/**/*.{ts,tsx}', './**/*.{ts,tsx}'],
};
