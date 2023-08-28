const { faker } = require('@faker-js/faker');

const generateLeafLocation = () => ({
  id: faker.string.numeric(5),
  name: faker.location.city(),
  for_sale_path: 'https://www.kyero.com/en/spain-property-for-sale-0l55529',
  to_rent_path: 'https://www.kyero.com/en/spain-property-to-rent-1l55529',
});

const generateLocationDetails = (id, index) => ({
  id: id,
  name: 'Location ' + id,
  property_count: 100 + id,
  property_count_formatted: `100 + ${id}`,
  for_sale_path: `https://www.kyero.com/en/spain-property-for-sale-0l${id}`,
  popularity: index,
});

module.exports = [
  {
    id: 'get-map-locations-details', // id of the route
    url: '/v1/locations/map_locations_details', // url in path-to-regexp format
    method: 'GET', // HTTP method
    variants: [
      {
        id: 'spain', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: [55596, 55540, 55531, 55534].map(generateLocationDetails),
        },
      },
      {
        id: 'portugal', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: [57099, 57369, 57160, 57109].map(generateLocationDetails),
        },
      },
      {
        id: 'italy', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: [57680, 55733, 57706, 57587].map(generateLocationDetails),
        },
      },
      {
        id: 'france', // id of the variant
        type: 'json', // variant type
        options: {
          status: 200,
          body: [58193, 58192, 55703, 60750].map(generateLocationDetails),
        },
      },
    ],
  },
  {
    id: 'get-properties-for-homepage',
    url: '/v1/properties/for_homepage',
    method: 'GET',
    variants: [
      {
        id: 'success',
        type: 'json',
        options: {
          status: 200,
          body: Array.from({ length: 8 }, (_, index) => ({
            id: index,
            path: faker.internet.url(),
            name: 'Property no. ' + index,
            images: Array.from({ length: 5 }, () => faker.image.url()),
            images_count: faker.number.int({ min: 1, max: 30 }),
            agent: {
              id: faker.string.numeric(5),
              name: faker.company.name(),
              logo_url: faker.internet.avatar(),
            },
            price: faker.commerce.price(),
            price_formatted: faker.commerce.price(),
            bedroom_count: faker.number.int({ min: 1, max: 5 }),
            bathroom_count: faker.number.int({ min: 1, max: 5 }),
            built_m2: faker.number.int({ min: 50, max: 200 }),
          })),
        },
      },
    ],
  },
  {
    id: 'get-property-types',
    url: '/v1/properties/featured_types',
    method: 'GET',
    variants: [
      {
        id: 'success',
        type: 'json',
        options: {
          status: 200,
          body: ['with_pool', 'under_100k', 'villas', 'town_houses'].map((name) => ({
            count: faker.number.int(),
            count_formatted: faker.number.int(),
            link: faker.internet.url(),
            key: name,
          })),
        },
      },
    ],
  },
  {
    id: 'get-nation-tree',
    url: '/v1/locations/geo_regions',
    method: 'GET',
    variants: [
      {
        id: 'success',
        type: 'json',
        options: {
          status: 200,
          body: {
            regions: Array.from({ length: 5 }, (_, index) => generateLeafLocation()),
            provinces: Array.from({ length: 5 }, (_, index) => generateLeafLocation()),
            costas: Array.from({ length: 5 }, (_, index) => generateLeafLocation()),
            islands: Array.from({ length: 5 }, (_, index) => generateLeafLocation()),
          },
        },
      },
    ],
  },
];
