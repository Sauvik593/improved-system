import { z } from 'zod';
import { ActionFunction, json, Response as RemixResponse } from '@remix-run/node';

import { getFormSchema, getT } from '~/server/helpers';
import { jsonResponseWithErrorFlash, jsonResponseWithSuccessFlash } from '~/server/responses';
import { checkoutCart, clearCheckout, removePrimeBoostFromCart } from '~/modules/cart/api';
import { getRemoveFromCartFromSchema } from '~/modules/cart/validators/remove-boost.validator.server';

const baseActionSchema = () =>
  z.object({
    action: z.enum(['remove', 'checkout', 'clear'], {
      invalid_type_error: 'Invalid action',
      required_error: 'Type is required',
    }),
  });

export const action: ActionFunction = async ({ request }) => {
  const formSchema = await getFormSchema(request)(baseActionSchema);
  const formData = await request.formData();
  const { data, error } = await formSchema.validate(formData);

  if (error) {
    return await jsonResponseWithErrorFlash({ message: Object.values(error.fieldErrors)[0] });
  }

  switch (data.action) {
    case 'remove':
      return handleRemoveBoostFromCart(request, formData);
    case 'checkout':
      return handleCheckout(request);
    case 'clear':
      return handleClearCheckout(request);
    default:
      return json({});
  }
};

const handleRemoveBoostFromCart = async (request: Request, formData: FormData) => {
  const t = await getT(request);
  const formSchema = await getFormSchema(request)(getRemoveFromCartFromSchema);
  const { data, error } = await formSchema.validate(formData);

  if (error) {
    return await jsonResponseWithErrorFlash({ message: Object.values(error.fieldErrors)[0] });
  }

  try {
    await removePrimeBoostFromCart(request, data.id);
    return await jsonResponseWithSuccessFlash({ message: t('ui.cart.removeAction.success') });
  } catch (error: RemixResponse | unknown) {
    if (error instanceof RemixResponse) {
      if (error.status === 404) {
        return await jsonResponseWithErrorFlash(
          { message: t('ui.cart.checkoutAction.notFound') },
          404,
        );
      }

      return await jsonResponseWithErrorFlash(
        { message: t('ui.cart.removeAction.error') },
        error.status,
      );
    }

    return await jsonResponseWithErrorFlash({ message: t('ui.cart.removeAction.error') }, 500);
  }
};

const handleCheckout = async (request: Request) => {
  const t = await getT(request);

  try {
    await checkoutCart(request);
    return await jsonResponseWithSuccessFlash({ message: t('ui.cart.checkoutAction.success') });
  } catch (error: RemixResponse | unknown) {
    if (error instanceof RemixResponse) {
      if (error.status === 404) {
        return await jsonResponseWithErrorFlash(
          {
            message: t('ui.cart.checkoutAction.notFound'),
          },
          404,
        );
      }
    }

    return await jsonResponseWithErrorFlash({ message: t('ui.cart.checkoutAction.error') });
  }
};

const handleClearCheckout = async (request: Request) => {
  const t = await getT(request);

  try {
    await clearCheckout(request);
    return await jsonResponseWithSuccessFlash({ message: t('ui.cart.clearAction.success') });
  } catch (error: RemixResponse | unknown) {
    return await jsonResponseWithErrorFlash({ message: t('ui.cart.clearAction.error') });
  }
};
