import { json, type LoaderFunction } from '@remix-run/node';

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

const resp = {
  status: 'success',
  results: [
    {
      id: 3,
      name: 'Alicante province',
      popularity: 923,
      parent: 'Valencia region',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/alicante-province-l3',
      to_rent_path: '/en/alicante-province-property-long-let-1l3',
      for_sale_path: '/en/alicante-province-property-for-sale-0l3',
    },
    {
      id: 862,
      name: 'Alicante',
      popularity: 607,
      parent: 'Alicante province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/alicante-l862',
      to_rent_path: '/en/alicante-property-long-let-1l862',
      for_sale_path: '/en/alicante-property-for-sale-0l862',
    },
    {
      id: 55542,
      name: 'Galicia ',
      popularity: 623,
      parent: 'Spain',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/galicia-l55542',
      to_rent_path: '/en/galicia-property-long-let-1l55542',
      for_sale_path: '/en/galicia-property-for-sale-0l55542',
    },
    {
      id: 2191,
      name: 'Alicun',
      popularity: null,
      parent: 'Almeria province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/alicun-l2191',
      to_rent_path: '/en/alicun-property-long-let-1l2191',
      for_sale_path: '/en/alicun-property-for-sale-0l2191',
    },
    {
      id: 31034,
      name: 'Alicate',
      popularity: null,
      parent: 'Malaga province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/alicate-l31034',
      to_rent_path: '/en/alicate-property-long-let-1l31034',
      for_sale_path: '/en/alicate-property-for-sale-0l31034',
    },
    {
      id: 23516,
      name: 'Alicun De Ortega',
      popularity: null,
      parent: 'Granada province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/alicun-de-ortega-l23516',
      to_rent_path: '/en/alicun-de-ortega-property-long-let-1l23516',
      for_sale_path: '/en/alicun-de-ortega-property-for-sale-0l23516',
    },
    {
      id: 942,
      name: 'Los Balsares (Alicante)',
      popularity: 33,
      parent: 'Alicante province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/los-balsares-alicante-l942',
      to_rent_path: '/en/los-balsares-alicante-property-long-let-1l942',
      for_sale_path: '/en/los-balsares-alicante-property-for-sale-0l942',
    },
    {
      id: 930,
      name: 'El Arsenal (Alicante)',
      popularity: null,
      parent: 'Alicante province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/el-arsenal-alicante-l930',
      to_rent_path: '/en/el-arsenal-alicante-property-long-let-1l930',
      for_sale_path: '/en/el-arsenal-alicante-property-for-sale-0l930',
    },
    {
      id: 2576,
      name: 'Marchalico Vinicas',
      popularity: null,
      parent: 'Almeria province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/marchalico-vinicas-l2576',
      to_rent_path: '/en/marchalico-vinicas-property-long-let-1l2576',
      for_sale_path: '/en/marchalico-vinicas-property-for-sale-0l2576',
    },
    {
      id: 2294,
      name: 'Canalica',
      popularity: null,
      parent: 'Almeria province',
      nation_id: 55529,
      agent_list_path: '/en/estate-agents-spain/canalica-l2294',
      to_rent_path: '/en/canalica-property-long-let-1l2294',
      for_sale_path: '/en/canalica-property-for-sale-0l2294',
    },
  ],
};

export const loader: LoaderFunction = async () => {
  await wait(2000);

  // return json({ results: [] });
  return json(resp);
};
