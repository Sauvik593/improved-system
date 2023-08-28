import axios from 'axios';

import { HubspotFormResponse } from '@lib/api/hubspot/HubspotForm';
import { getApiUrl } from '@helpers/assetsUrl';

export interface NewsletterFormProps {
  email: string;
  hsLanguage: string;
  defaultNationContact: string;
  receiveMarketAnalysis: string;
}

export async function submitForm(payload: NewsletterFormProps): Promise<HubspotFormResponse> {
  const result = await axios.post(
    getApiUrl('/hubspot'),
    { ...payload },
    { headers: { type: 'newsletter' } },
  );
  return result && result.status === 200 && result.data.result;
}
