import { useState } from 'react';
import { TellUsAboutFormProps } from '@components/TellUsAboutForm/submitForm';
import { ContactFormProps } from '@components/Contact/Form/submitForm';
import { NewsletterFormProps } from '@components/Subscribe/Form/submitForm';
import { HubspotFormResponse } from '@lib/api/hubspot/HubspotForm';

type FormState = 'form' | 'success' | 'error';

type HubspotPayload = TellUsAboutFormProps | ContactFormProps | NewsletterFormProps;

interface Props {
  formService: (payload: HubspotPayload) => Promise<HubspotFormResponse>;
}

export const useHubspotForm = ({ formService }: Props) => {
  const [formState, setFormState] = useState<FormState>('form');

  const submit = async (payload: HubspotPayload): Promise<void> => {
    try {
      await formService(payload);
      setFormState('success');
    } catch (e) {
      setFormState('error');
    }
  };

  const success = formState === 'success';
  const error = formState === 'error';

  return {
    success,
    error,
    submit,
    setFormState,
  };
};
