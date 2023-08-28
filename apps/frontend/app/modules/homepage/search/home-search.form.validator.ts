import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { type TFunction } from 'i18next';

export const getFormSchema = (t: TFunction) =>
  zfd.formData({
    nation_id: zfd.text(z.string({ required_error: t('common.form.required') as string })),
    location: zfd
      .json(
        z
          .object({
            nation_id: z.number(),
            agent_list_path: z.string(),
            to_rent_path: z.string(),
            for_sale_path: z.string(),
          })
          .nullable()
          .optional(),
      )
      .nullable()
      .optional(),
    search: zfd.text(z.string().optional().nullable()).nullable().optional(),
    locale: zfd.text(z.string({ required_error: t('common.form.required') as string })),
    route: zfd.text(
      z.enum(['buy', 'rent', 'agents'], {
        errorMap: () => ({ message: t('common.form.invalid') as string }),
      }),
    ),
    js: zfd.checkbox({ trueValue: 'true' }).optional(),
  });

export type HomeSearchSchema = ReturnType<typeof getFormSchema>;
export type HomeSearchFormData = z.infer<HomeSearchSchema>;
