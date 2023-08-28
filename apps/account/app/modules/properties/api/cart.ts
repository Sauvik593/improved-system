import { makeApiCall } from '~/server/api';
import { Pagination, PrimeBoost } from '../types';

type CartDTO = {
  primeBoosts: PrimeBoost[];
  total: number;
  totalFormatted: string;
  pagination: Pagination;
};

export const fetchCart = async (request: Request) => {
  return await makeApiCall<CartDTO>(`/cart`)(request);
};
