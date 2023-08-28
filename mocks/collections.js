module.exports = [
  {
    id: 'normal-user',
    routes: ['get-me:success', 'get-properties:success'],
  },
  {
    id: 'server-error',
    routes: ['get-me:unauthorized'],
  },
];
