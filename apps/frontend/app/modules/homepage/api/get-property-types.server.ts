// this is the API that will be used to get the country regions

import { apiService } from '~/server/api/service.server';
import { buildGetParams } from '~/server/helpers.server';

export interface PropertyType {
  count: number;
  count_formatted: string;
  link: string;
  key: string;
}

export type PropertyTypesResponse = PropertyType[];

// now it's a mocked call, but it will be a real API call
export const getPropertyTypes = async (request: Request, locale: string, nationId: number) => {
  const params = buildGetParams({ nation_id: nationId });

  const [data] = await apiService.get<PropertyType[]>(`/properties/featured_types`, {
    locale,
    request,
    params,
  });

  return data;
};
