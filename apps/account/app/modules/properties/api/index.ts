import { getParamsWithoutEmptyValues } from '@server/helpers';
import { makeApiCall } from '@server/api';

import type { Pagination, Property } from '@properties/types';

export type PropertiesIndexDTO = {
  properties: Property[];
  pagination: Pagination;
};

export const fetchProperties = async (request: Request) => {
  const stringifiedParams = getParamsWithoutEmptyValues(request);

  return await makeApiCall<PropertiesIndexDTO>(`properties?${stringifiedParams.toString()}`)(
    request,
  );
};
