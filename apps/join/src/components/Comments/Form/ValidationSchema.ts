import { TFunction } from 'next-i18next';
import * as yup from 'yup';

export const createValidationSchema = (t: TFunction) =>
  yup.object().shape({
    content: yup.string().required(),
    terms: yup.boolean().required().is([true], t(`content.comments.errors.terms.checked`)),
    email: yup
      .string()
      .required(t(`content.comments.errors.email.required`))
      .email(t(`content.comments.errors.email.format`)),
    locale: yup.string().required(),
    name: yup.string().required(t(`content.comments.errors.name.required`)),
    parent: yup.number().notRequired(),
  });
