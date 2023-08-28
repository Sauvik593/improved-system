import { type TFunction } from 'i18next';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const getFormSchema = (t: TFunction) =>
  zfd.formData(
    z.object({
      email: zfd.text(
        z
          .string({ required_error: t('common.form.required') as string })
          .email({ message: t('common.form.email.invalid') as string }),
      ),
      password: zfd.text(z.string({ required_error: t('common.form.required') as string })),
    }),
  );

export type LoginFormSchema = ReturnType<typeof getFormSchema>;
export type LoginFormData = z.infer<LoginFormSchema>;
