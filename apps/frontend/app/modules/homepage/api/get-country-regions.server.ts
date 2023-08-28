import { apiService } from '~/server/api/service.server';
import { buildGetParams } from '~/server/helpers.server';

export const SPAIN_REGION_IDS = [
  55596, 55540, 55531, 55534, 55535, 55539, 64673, 55542, 55532, 55533, 55538, 55543, 55537, 55541,
  55536, 55546, 55547, 55545, 55544,
];

export const PORTUGAL_REGION_IDS = [
  57088, 57358, 55745, 57096, 57091, 57161, 57093, 57110, 57446, 57113, 57115, 57120, 57143, 57157,
  57390, 57089, 57100, 57370,
];

export const ITALY_REGION_IDS = [
  57680, 55733, 57706, 57587, 57544, 57751, 57689, 57605, 57685, 57789, 57688, 57691, 57807, 57570,
  57690, 57642, 57675, 57899, 57865, 58098,
];

export const FRANCE_REGION_IDS = [
  58193, 58192, 55703, 60750, 56448, 58191, 63133, 56447, 60719, 60432, 60356, 60736, 60722, 62551,
  60824, 60355, 63611, 62553, 66407, 66478, 66432, 66445, 62955,
];

export const REGIONS_MAP = {
  55529: SPAIN_REGION_IDS,
  55731: PORTUGAL_REGION_IDS,
  55702: FRANCE_REGION_IDS,
  55732: ITALY_REGION_IDS,
};

export interface Region {
  id: number;
  name: string;
  property_count: number;
  property_count_formatted: string;
  for_sale_path: string;
  popularity: number | null;
}

// this is the API that will be used to get the country regions
// now it's a mocked call, but it will be a real API call
export const getCountryRegions = async (request: Request, locale: string, nationId: number) => {
  const regionIds = REGIONS_MAP[nationId as keyof typeof REGIONS_MAP];

  if (!regionIds) {
    throw new Error(`Nation ${nationId} not found in REGIONS_MAP`);
  }

  const params = buildGetParams({ 'ids[]': regionIds });
  const [data, , status] = await apiService.get<Region[]>(`/locations/map_locations_details`, {
    request,
    params,
    locale,
  });

  if (status === 'error') {
    throw data;
  }

  return data.sort((a, b) => {
    return b.property_count - a.property_count;
  });
};
