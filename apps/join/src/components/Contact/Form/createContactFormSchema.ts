import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createContactFormSchema = (t: TFunction) =>
  yup.object().shape({
    firstName: yup.string().required(t('form.validations.first_name')),
    lastName: yup.string().required(t('form.validations.last_name')),
    email: yup
      .string()
      .required(t('form.validations.email.required'))
      .email(t('form.validations.email.format')),
    company: yup.string().required(t('form.validations.business_name')),
    phone: yup
      .string()
      .required(t('form.validations.phone_number.required'))
      .min(8, t('form.validations.phone_number.format')),
    userType: yup.string().required(t('contact.form.user_type.required')),
    preferredFormOfContact: yup.string().optional(),
    timeOfDay: yup.string().optional(),
    numberOfPropertiesEnquired: yup.string().optional(),
  });
