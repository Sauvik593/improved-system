module.exports = [
  {
    id: 'get-me', // id of the route
    url: '/v1/me', // url in path-to-regexp format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'success', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: {
            id: 1,
            name: 'Example Company',
            logoUrl: 'https://via.placeholder.com/50/50.png',
            email: 'example@company.com',
          },
        },
      },
      {
        id: 'unauthorized', // id of the variant
        type: 'json', // variant type
        options: {
          status: 401,
          body: {
            error: 'http://id.kyero.com',
          },
        },
      },
    ],
  },
];
