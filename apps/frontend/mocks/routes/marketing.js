module.exports = [
  {
    id: 'post-user-profile', // id of the route
    url: '/v1/marketing/profile', // url in path-to-regexp format
    method: 'POST', // HTTP method
    variants: [
      {
        id: 'success', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: {},
        },
      },
      {
        id: 'unknown_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 500,
          body: {},
        },
      },
      {
        id: 'validation_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 422,
          body: {
            errors: {
              name: 'mocked validation error name',
              email: 'mocked validation error email',
            },
          },
        },
      },
    ],
  },
];
