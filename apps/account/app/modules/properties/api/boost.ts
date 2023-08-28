import { makeApiCall } from '@server/api';

import type { Property } from '@properties/types';

export type PropertyBoostDTO = Property;

export const fetchBoostPropertyData = async (request: Request, propertyId: string) => {
  return await makeApiCall<PropertyBoostDTO>(`/property/${propertyId}/prime_boosts`)(request);
};

export const addBoostToCart = async (
  request: Request,
  propertyId: string,
  payload: Record<string, unknown>,
) => {
  return await makeApiCall<PropertyBoostDTO>(`/property/${propertyId}/prime_boosts`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })(request);
};
