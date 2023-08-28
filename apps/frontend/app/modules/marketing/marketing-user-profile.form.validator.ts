import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { type TFunction } from 'i18next';

export const getFormSchema = (t: TFunction) =>
  zfd.formData({
    email: zfd.text(
      z
        .string({ required_error: t('common.form.required') as string })
        .email({ message: t('common.form.email.invalid') as string }),
    ),
    name: zfd.text(
      z.string({
        required_error: t('common.form.required') as string,
        invalid_type_error: t('common.form.invalid') as string,
      }),
    ),
    receive_weekly_newsletter: zfd.checkbox({ trueValue: 'true' }).optional(),
    send_buyers_guide: zfd.checkbox({ trueValue: 'true' }).optional(),
    coi_spain: zfd.checkbox({ trueValue: 'true' }).optional(),
    coi_portugal: zfd.checkbox({ trueValue: 'true' }).optional(),
    coi_italy: zfd.checkbox({ trueValue: 'true' }).optional(),
    coi_france: zfd.checkbox({ trueValue: 'true' }).optional(),
    source: zfd.text(z.string()).optional(),
    why_buy: zfd.text(
      z.enum(['0', '1', '2', '3', '4'], {
        errorMap: () => ({ message: t('common.form.invalid') as string }),
      }),
    ),
    wants_to_buy_in: zfd.text(
      z.enum(['0', '1', '2', '3', '4'], {
        errorMap: () => ({ message: t('common.form.invalid') as string }),
      }),
    ),
  });

export type MarketingProfileFormSchema = ReturnType<typeof getFormSchema>;
