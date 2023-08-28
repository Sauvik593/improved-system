import axios from 'axios';
import { transformToSnakeCaseParams, ObjectParam } from '@helpers/snakeCaseParams';
import { ContactFormProps } from '@components/Contact/Form/submitForm';
import { TellUsAboutFormProps } from '@components/TellUsAboutForm/submitForm';
import { NewsletterFormProps } from '@components/Subscribe/Form/submitForm';
import { FORM_IDS } from './FormIds';

const HUBSPOT_COMPANY_ID = '4510591';

export interface HubspotFormErrors {
  message: string;
  errorType: string;
}

export interface HubspotFormResponse {
  redirectUri: string | null;
  inlineMessage: string | null;
  status: number;
  errors: HubspotFormErrors[];
}

type HubspotFormPayload = ContactFormProps | TellUsAboutFormProps | NewsletterFormProps;

interface FormIdFields {
  type: string;
  country: string;
}

interface Field {
  name: string;
  value: unknown;
}

export class HubspotForm<T extends HubspotFormPayload> {
  companyId: string = HUBSPOT_COMPANY_ID;
  formId = FORM_IDS;

  getUrl({ type, country }: FormIdFields): string {
    return `https://api.hsforms.com/submissions/v3/integration/submit/${this.companyId}/${this.formId[type][country]}`;
  }

  async submit(payload: T, headers: { type: string }): Promise<boolean> {
    const url = this.getUrl({
      type: headers.type as string,
      country: payload.defaultNationContact.toLocaleLowerCase(),
    });
    try {
      const response = await axios.post(url, {
        fields: this.prepareFields(payload),
      });
      return response && response.status === 200;
    } catch (error) {
      return Promise.reject(new Error('Failed to submit form'));
    }
  }

  prepareFields(payload: T): Field[] {
    const snakeCasePayload = transformToSnakeCaseParams(payload as unknown as ObjectParam);

    return Object.entries(snakeCasePayload).map(([key, value]) => {
      return {
        name: key,
        value: value || '',
      };
    });
  }
}
