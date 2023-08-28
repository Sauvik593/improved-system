import axios from 'axios';

import { HubspotFormResponse } from '@lib/api/hubspot/HubspotForm';
import { getApiUrl } from '@helpers/assetsUrl';

export interface TellUsAboutFormProps {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  defaultNationContact: string;
  hsLanguage: string;
  primePackageSelected: string;
  taxNumberContact?: string;
  legalName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export async function submitForm(payload: TellUsAboutFormProps): Promise<HubspotFormResponse> {
  const result = await axios.post(
    getApiUrl('/hubspot'),
    { ...payload },
    { headers: { type: 'tell_us_about' } },
  );
  return result && result.status === 200 && result.data.result;
}
