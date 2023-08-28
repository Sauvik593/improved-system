import { ActionFunction, json, redirect } from '@remix-run/node';
import { validationError } from 'remix-validated-form';

import { getFormSchema, getT, validateParams } from '~/server/helpers';
import { addBoostToCart } from '~/modules/properties/api/boost';
import { setErrorFlash, setSuccessFlash } from '~/modules/flash/helpers.server';

import {
  getAddToCartParamsSchema,
  getAddToCartSchema,
} from '~/modules/properties/validators/boost.validator.server';

export const action: ActionFunction = async ({ request, params }) => {
  const t = await getT(request);
  const permittedParams = await validateParams({ request, params })(getAddToCartParamsSchema);
  const formSchema = await getFormSchema(request)(getAddToCartSchema);
  const data = await formSchema.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  try {
    await addBoostToCart(request, permittedParams.id, data.submittedData);

    const { commitedCookieHeader } = await setSuccessFlash({
      message: t('primeBoosts.addToCart.successFlash.message'),
      link: { to: '/cart', message: t('primeBoosts.addToCart.successFlash.linkTo') },
    });

    return redirect('/properties', { headers: commitedCookieHeader });
  } catch (err) {
    const { commitedCookieHeader } = await setErrorFlash({
      message: t('primeBoosts.addToCart.errorFlash.message'),
    });

    return json({}, { headers: commitedCookieHeader });
  }
};
