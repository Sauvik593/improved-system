import { makeApiCall } from '~/server/api';

import type { Me } from '../types';

export const fetchMe = async (request: Request) => makeApiCall<Me>(`/me`)(request);
