import { getSession, commitSession } from '~/server/session';

import { getCookies } from '~/server/helpers';

export interface SetFlashPayload {
  message: string;
  link?: {
    to: string;
    message: string;
  };
}

export const getFlashMessage = async (request: Request) => {
  const session = await getSession(getCookies(request));
  const flash = session.get('flash');

  const commitedSession = await commitSession(session);
  const commitedCookieHeader = { 'Set-Cookie': commitedSession };

  return {
    flash,
    commitedCookieHeader,
    commitedSession,
  };
};

export const setFlash =
  (type: 'success' | 'info') =>
  async ({ message, link }: SetFlashPayload) => {
    const session = await getSession();

    session.flash('flash', {
      id: Math.ceil(Math.random() * 1000).toString(),
      type: type,
      message,
      link,
    });

    const commitedSession = await commitSession(session);
    const commitedCookieHeader = { 'Set-Cookie': commitedSession };

    return {
      commitedCookieHeader,
      commitedSession,
    };
  };

export const setSuccessFlash = setFlash('success');
export const setErrorFlash = setFlash('info'); // weird naming thingy
