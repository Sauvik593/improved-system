import { type ActionFunction } from '@remix-run/node';
import { BaseFormAction } from '~/server/base-form.action';

import { apiService } from '~/server/api/service.server';
import { type LoginFormSchema, getFormSchema } from './login.validator';
import { type TFunction } from 'i18next';
import { type UserDTO } from './types';

class LoginAction extends BaseFormAction<LoginFormSchema, {}> {
  // @ts-ignore
  apiCall(payload: LoginFormSchema['_output'], locale: string) {
    return apiService.post<unknown>('/users/sign_in', {
      body: payload,
      method: 'POST',
      locale: locale,
      request: this.request,
    });
  }

  getValidationSchema = (t: TFunction) => {
    return getFormSchema(t);
  };

  prepareSuccessResponse(data: UserDTO) {
    return {
      state: 'success' as const,
      data,
    };
  }
}

export const action: ActionFunction = async (args) => {
  const signupAction = new LoginAction(args);

  return signupAction.action();
};

export type LoginSuccessResponse = ReturnType<LoginAction['prepareSuccessResponse']>;
export type LoginActionResponse = { state: 'error'; error: string } | LoginSuccessResponse;
