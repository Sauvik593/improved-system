import { z } from 'zod';
import { TFunction } from 'i18next';

export const getRemoveFromCartFromSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    id: z.string().min(1, { message: t('validation.primeBoosts.removeFromCart.id') as string }),
  });
