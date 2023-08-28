import { apiService } from '~/server/api/service.server';
import { buildGetParams } from '~/server/helpers.server';

export interface Property {
  id: number;
  name: string;
  path: string;
  images: string[];
  images_count: number;
  agent: {
    id: number;
    logo_url: string;
    name: string;
  };
  bedroom_count: number;
  bathroom_count: number;
  built_m2: number;

  price: number;
  price_formatted: string;
}

export interface TopPropertiesResponse {
  properties: Property[];
  seeAllLink: string;
}

export const getTopProperties = async (request: Request, locale: string, nationId: number) => {
  const params = buildGetParams({ nation_id: nationId });

  const [properties] = await apiService.get<Property[]>(`/properties/for_homepage`, {
    locale,
    request,
    params,
  });

  return {
    seeAllLink: `/${locale}/property-for-sale-in-spain?location_id=${nationId}`,
    properties,
  };
};
