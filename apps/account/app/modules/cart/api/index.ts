import { makeApiCall } from '~/server/api';
import { Pagination, PrimeBoost } from '../../properties/types';

export type CartDTO = {
  primeBoosts: PrimeBoost[];
  total: number;
  totalFormatted: string;
  pagination: Pagination;
};

export const fetchCart = async (request: Request) => {
  return await makeApiCall<CartDTO>(`/cart`)(request);
};

export const removePrimeBoostFromCart = async (request: Request, primeBoostId: string) => {
  return await makeApiCall<{ message: 'ok' }>(`/cart/${primeBoostId}`, {
    method: 'DELETE',
  })(request);
};

export const checkoutCart = async (request: Request) => {
  return await makeApiCall<{ message: 'ok' }>(`/checkout`, {
    method: 'POST',
  })(request);
};

export const clearCheckout = async (request: Request) => {
  return await makeApiCall<{ message: 'ok' }>(`/cart`, {
    method: 'DELETE',
  })(request);
};
