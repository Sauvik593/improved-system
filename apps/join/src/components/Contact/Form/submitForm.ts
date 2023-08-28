import axios from 'axios';

import { HubspotFormResponse } from '@lib/api/hubspot/HubspotForm';
import { getApiUrl } from '@helpers/assetsUrl';

export interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  userType: string;
  timeOfDay?: string;
  preferredFormOfContact?: string;
  numberOfPropertiesEnquire: string;
  defaultNationContact: string;
  hsLanguage: string;
  receiveMarketAnalysis: string;
  agentMainProvinceContact: string;
}

export async function submitForm(payload: ContactFormProps): Promise<HubspotFormResponse> {
  const result = await axios.post(
    getApiUrl('/hubspot'),
    { ...payload },
    { headers: { type: 'contact' } },
  );
  return result && result.status === 200 && result.data.result;
}
