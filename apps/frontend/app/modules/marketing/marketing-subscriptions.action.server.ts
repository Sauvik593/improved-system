import omit from 'lodash/omit';
import { type ActionFunction } from '@remix-run/node';

import { BaseFormAction } from '~/server/base-form.action';

import {
  type MarketingSubscriptionsFormSchema,
  getFormSchema,
} from './marketing-subscriptions.form.validator';
import { apiService } from '~/server/api/service.server';

import { type TFunction } from 'i18next';

export class MarketingSubscriptionsAction extends BaseFormAction<
  MarketingSubscriptionsFormSchema,
  {}
> {
  // @ts-ignore
  apiCall(payload: MarketingSubscriptionsFormSchema['_output'], locale: string) {
    // Same api endpoint like in user-profile but different validation on client side
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
  const marketingSubscriptionsAction = new MarketingSubscriptionsAction(args);

  return marketingSubscriptionsAction.action();
};
