import omit from 'lodash/omit';
import { type ActionFunction } from '@remix-run/node';
import { BaseFormAction } from '~/server/base-form.action';

import {
  type MarketingProfileFormSchema,
  getFormSchema,
} from './marketing-user-profile.form.validator';
import { apiService } from '~/server/api/service.server';

import { type TFunction } from 'i18next';

export class MarketingProfileAction extends BaseFormAction<MarketingProfileFormSchema, {}> {
  // @ts-ignore
  apiCall(payload: MarketingProfileFormSchema['_output'], locale: string) {
    return apiService.post<unknown>('/marketing/profile', {
      body: payload,
      method: 'POST',
      locale: locale,
      request: this.request,
    });
  }

  getValidationSchema = (t: TFunction) => {
    return getFormSchema(t);
  };

  prepareSuccessResponse() {
    return { state: 'success' };
  }

  // @ts-ignore
  preparePayload(payload: MarketingProfileFormSchema['_output']) {
    if (!payload.receive_weekly_newsletter) {
      return omit(payload, ['coi_france', 'coi_portugal', 'coi_spain', 'coi_italy']);
    }

    return payload;
  }
}

export const action: ActionFunction = async (args) => {
  const marketingProfileAction = new MarketingProfileAction(args);

  return marketingProfileAction.action();
};
