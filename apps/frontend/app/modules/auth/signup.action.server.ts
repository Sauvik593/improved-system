import { type ActionFunction } from '@remix-run/node';
import { BaseFormAction } from '~/server/base-form.action';

import { apiService } from '~/server/api/service.server';
import { type SignupFormSchema, getFormSchema, type SignupFormData } from './signup.validator';
import { type TFunction } from 'i18next';

class SignupAction extends BaseFormAction<SignupFormSchema, {}> {
  preparePayload(payload: SignupFormSchema['_output']) {
    return {
      ...payload,
      password_confirmation: payload.password,
    };
  }

  // @ts-ignore
  apiCall(payload: SignupFormSchema['_output'], locale: string) {
    return apiService.post<unknown>('/users/sign_up', {
      body: payload,
      method: 'POST',
      locale: locale,
      request: this.request,
    });
  }

  getValidationSchema = (t: TFunction) => {
    return getFormSchema(t);
  };

  // @ts-ignore
  prepareSuccessResponse(_data, _response, data: SignupFormData) {
    return {
      state: 'success' as const,
      data: {
        email: data.email,
        firstname: data.firstname,
        receive_weekly_newsletter: data.receive_weekly_newsletter,
      },
    };
  }
}

export const action: ActionFunction = async (args) => {
  const signupAction = new SignupAction(args);

  return signupAction.action();
};

export type SignupSuccessResponse = ReturnType<SignupAction['prepareSuccessResponse']>;
export type SignupActionResponse = { state: 'error'; error: string } | SignupSuccessResponse;
