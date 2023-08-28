// this is the API that will be used to get the country regions

import { apiService } from '~/server/api/service.server';
import { buildGetParams } from '~/server/helpers.server';

export interface LocationLeaf {
  id: number;
  name: string;
  for_sale_path: string;
  to_rent_path: string;
}

export interface NationTreeResponse {
  regions: LocationLeaf[];
  provinces: LocationLeaf[];
  costas: LocationLeaf[];
  islands: LocationLeaf[];
}

// now it's a mocked call, but it will be a real API call
export const getNationTree = async (request: Request, locale: string, nationId: number) => {
  const params = buildGetParams({ nation_id: nationId });

  const [data] = await apiService.get<NationTreeResponse>(`/locations/geo_regions`, {
    request,
    locale,
    params,
  });

  return data;
};
