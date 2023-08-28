import * as yup from 'yup';
import { TFunction } from 'i18next';

export const createFormSchema = (t: TFunction) =>
  yup.object().shape({
    firstName: yup.string().required(t('form.validations.first_name')),
    lastName: yup.string().required(t('form.validations.last_name')),
    email: yup
      .string()
      .required(t('form.validations.email.required'))
      .email(t('form.validations.email.format')),
    company: yup.string().required(t('form.validations.business_name')),
    companyWebsite: yup.string().optional(),
    phone: yup
      .string()
      .required(t('form.validations.phone_number.required'))
      .min(8, t('form.validations.phone_number.format')),
    vatNumber: yup.string().optional(),
    legalName: yup.string().optional(),
    addressStreet: yup.string().optional(),
    adressCity: yup.string().optional(),
    addressRegion: yup.string().optional(),
    addressPostcode: yup.string().optional(),
    addressCountry: yup.string().optional(),
  });
