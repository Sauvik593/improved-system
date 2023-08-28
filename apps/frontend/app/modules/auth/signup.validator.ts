import { type TFunction } from 'i18next';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const getFormSchema = (t: TFunction) =>
  zfd.formData(
    z.object({
      firstname: zfd.text(z.string({ required_error: t('common.form.required') as string })),
      lastname: zfd.text(z.string().optional()),
      email: zfd.text(
        z
          .string({ required_error: t('common.form.required') as string })
          .email({ message: t('common.form.email.invalid') as string }),
      ),
      password: zfd.text(z.string({ required_error: t('common.form.required') as string })),
      receive_weekly_newsletter: zfd.checkbox({ trueValue: 'true' }).optional(),
      coi_spain: zfd.checkbox({ trueValue: 'true' }).optional(),
      coi_portugal: zfd.checkbox({ trueValue: 'true' }).optional(),
      coi_italy: zfd.checkbox({ trueValue: 'true' }).optional(),
      coi_france: zfd.checkbox({ trueValue: 'true' }).optional(),
    }),
  );

export type SignupFormSchema = ReturnType<typeof getFormSchema>;
export type SignupFormData = z.infer<SignupFormSchema>;
