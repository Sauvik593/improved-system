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
            email: 'john.doe@example.com',
            firstname: 'John',
            lastname: 'Doe',
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
  {
    id: 'login', // id of the route
    url: '/v1/users/sign_in', // url in path-to-regexp format
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
        id: 'base_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 401,
          body: {
            errors: {
              base: ['Invalid email or password.'],
            },
          },
        },
      },
      {
        id: 'validation_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 401,
          body: {
            errors: {
              lastname: 'mocked validation error firstname',
              email: 'mocked validation error email',
              password: 'mocked validation error password',
            },
          },
        },
      },
    ],
  },
  {
    id: 'signup', // id of the route
    url: '/v1/users/sign_up', // url in path-to-regexp format
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
        id: 'base_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 401,
          body: {
            errors: {
              base: ['This email is already taken'],
            },
          },
        },
      },
      {
        id: 'validation_error', // id of the variant
        type: 'json', // variant type
        options: {
          status: 401,
          body: {
            errors: {
              firstname: 'mocked validation error firstname',
              lastname: 'mocked validation error lastname',
              email: 'mocked validation error email',
              password: 'mocked validation error password',
            },
          },
        },
      },
    ],
  },
];
