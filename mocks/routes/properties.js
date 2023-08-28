module.exports = [
  {
    id: 'get-properties',
    url: '/v1/agents/1/properties',
    method: 'GET',
    variants: [
      {
        id: 'success',
        type: 'json',
        options: {
          status: 200,
          body: {
            properties: [],
            pagination: {
              count: 20,
              pages: 10,
              page: 1,
              next: 2,
              prev: null,
            },
          },
        },
      },
      {
        id: 'empty',
        type: 'json',
        options: {
          status: 200,
          body: {
            properties: [],
            pagination: {
              count: 20,
              pages: 10,
              page: 1,
              next: 2,
              prev: null,
            },
          },
        },
      },
    ],
  },
];
