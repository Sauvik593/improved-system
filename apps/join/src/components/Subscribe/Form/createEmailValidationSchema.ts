import { TFunction } from 'next-i18next';
import * as yup from 'yup';

export const createEmailValidationSchema = (t: TFunction) =>
  yup.object().shape({
    email: yup.string().email(t('newsletter.email.format')).required(t('newsletter.email.error')),
  });
