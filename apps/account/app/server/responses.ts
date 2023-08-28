import { json } from '@remix-run/node';
import { setErrorFlash, SetFlashPayload, setSuccessFlash } from '~/modules/flash/helpers.server';

export const jsonResponseWithErrorFlash = async (payload: SetFlashPayload, status = 422) => {
  const { commitedCookieHeader } = await setErrorFlash(payload);

  return json({}, { headers: commitedCookieHeader, status });
};

export const jsonResponseWithSuccessFlash = async (payload: SetFlashPayload) => {
  const { commitedCookieHeader } = await setSuccessFlash(payload);

  return json({}, { headers: commitedCookieHeader });
};
