import compact from 'lodash/compact';
import { apiService } from '~/server/api/service.server';
import { type UserDTO } from './types';

export const getMe = async (url: string, request: Request, locale: string) => {
  const [user] = await apiService.get<UserDTO>(url, { catchError: false, locale, request });

  return {
    ...user,
    initials: compact([user.firstname, user.lastname])
      .map((name) => name[0])
      .join(''),
  };
};
