module.exports = {
  content: ['../../packages/kyero-ui/**/*.{ts,tsx}', '../**/*.{ts,tsx}'],
  theme: {
    colors: {
      ocean: {
        5: '#F4F6FE',
        10: '#E9EDFD',
        20: '#D2DBFC',
        40: '#8FA6F7',
        60: '#7994F5',
        80: '#4C70F2',
        100: '#1F4DEF',
        120: '#0E38CA',
        150: '#0933C7',
      },
      'sierra-night': {
        5: '#F4F4F7',
        10: '#E9E9EE',
        20: '#D3D3DE',
        40: '#A7A8BD',
        60: '#65668A',
        80: '#4F517A',
        100: '#232559',
        150: '#131432',
      },
      sky: {
        100: '#1BC8FF',
        150: '#00A6ED',
      },
      orange: {
        10: '#FFE6D3',
        100: '#F56A00',
        120: '#C45500',
        150: '#BB5100',
      },
      tile: {
        100: '#121888',
      },
      clay: {
        100: '#F9F8F6',
      },
      sunshine: {
        20: '#FFEDCB',
        100: '#FFA800',
        150: '#EFA008',
      },
      terracotta: {
        10: '#FFDDDE',
        100: '#E93F46',
      },
      meadow: {
        20: '#DDEDE5',
        100: '#009F53',
        120: '#007F42',
      },
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },

    zIndex: {
      '-1': -1,
      0: 0,
      1: 1,
      10: 10,
      20: 20,
    },
    backgroundImage: {
      'card-gradient':
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 37.57%, #000000 75.45%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));',
      'location-gradient':
        'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 30.24%, rgba(0, 0, 0, 0) 70.27%)',
      'country-card-gradient':
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 44.09%, rgba(0, 0, 0, 0.468) 86.94%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 25.47%);',
    },
    fontFamily: {
      sans: [
        'Gilroy',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
    fontWeight: {
      normal: 400,
      semibold: 600,
      bold: 700,
    },
    fontSize: {
      'h-1': [
        '4.5rem',
        {
          lineHeight: '4.75rem',
          letterSpacing: '-0.1rem',
        },
      ],
      'h-1-sm': [
        '2.5rem',
        {
          lineHeight: '2.75rem',
        },
      ],
      'h-2': [
        '2.75rem',
        {
          lineHeight: '3.25rem',
        },
      ],
      'h-2-sm': [
        '2rem',
        {
          lineHeight: '2.75rem',
        },
      ],
      'h-3': [
        '2.25rem',
        {
          lineHeight: '2.5rem',
        },
      ],
      'h-3-sm': [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],
      'h-4': [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],
      'h-4-sm': [
        '1.25rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      'h-5': [
        '1.125rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      'h-5-sm': [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      'h-6': [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],

      'p-0': [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],
      'p-0-sm': [
        '1.25rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      'p-1': [
        '1.25rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      'p-1-sm': [
        '1.125rem',
        {
          lineHeight: '1.75rem',
        },
      ],

      'p-2': [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],

      'p-3': [
        '0.875rem',
        {
          lineHeight: '1.25rem',
        },
      ],

      quote: [
        '1.625rem',
        {
          lineHeight: '2rem',
        },
      ],

      base: [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
    },
    extend: {
      borderRadius: {
        none: '0',
        default: '0.25rem',
        full: '9999px',
      },

      flex: {
        full: '0 0 100%',
        '1/2': '0 0 50%',
        '3/4': '0 0 75%',
        '70%': '0 0 70%',
        '55%': '0 0 55%',
        'article-image': '0 0 104px',
      },
      margin: {
        '1/2': '50%',
      },
      boxShadow: {
        card: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        modal: '0px 2px 6px rgba(0, 0, 0, 0.25)',
        tooltip: '0px 2px 12px rgba(0, 0, 0, 0.15)',
        mobile: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      },
      borderWidth: {
        1: '1px',
        12: '12px',
      },
    },
  },
  plugins: [],
};
