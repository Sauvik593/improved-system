import { z } from 'zod';
import { type TFunction } from 'i18next';

export const getAddToCartParamsSchema = () =>
  z.object({
    id: z.string().min(1),
  });

export const getAddToCartSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    prime_boosts: z
      .object({
        city: z.object({ location_id: z.string() }).optional(),
        province: z.object({ location_id: z.string() }).optional(),
        region: z.object({ location_id: z.string() }).optional(),
      })
      .default({ city: undefined, province: undefined, region: undefined })
      .refine(
        ({ city, province, region }) => {
          return city !== undefined || province !== undefined || region !== undefined;
        },
        { message: t('validation.primeBoosts.addToCart.minLocationType') as string },
      ),
  });
