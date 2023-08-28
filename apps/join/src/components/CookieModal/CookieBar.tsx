import { useContext, useEffect } from 'react';
import { useMachine } from '@xstate/react';

import { useTranslation } from 'next-i18next';

import { Transition } from '@headlessui/react';

import { Button } from '@kyero/ui';

import { cookieBarMachine } from './stateMachine';
import { CookiePreferencesModal } from './CookiePreferencesModal';
import { CookieContext } from '@contexts/CookieContext';

export const CookieBar = () => {
  const { t } = useTranslation('common');
  const { nonEssentialCookies, setCookieValue } = useContext(CookieContext);
  const [state, sendEvent] = useMachine(cookieBarMachine, {
    actions: {
      setCookieValue: (_, event) => {
        const cookieValue = event.nonEssentialCookies;
        setCookieValue(Boolean(cookieValue));
      },
    },
  });

  useEffect(() => {
    sendEvent('LOAD', { nonEssentialCookies });
    // eslint-disable-next-line
  }, []);

  const showModal = state.matches('loaded.open');

  const setCookie = (value: boolean) => sendEvent('POLICY_CHANGE', { nonEssentialCookies: value });

  const openModal = () => sendEvent('OPEN');

  const closeModal = () => sendEvent('CLOSE');
  return (
    <Transition show={state.matches('loaded')}>
      <div>
        <Transition.Child
          enter="ease-in-out duration-100"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="ease-out duration-100 delay-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-12"
          className="z-99 fixed bottom-0 left-0 right-0"
        >
          <CookiePreferencesModal active={showModal} onClose={closeModal} onClick={setCookie} />
          <div className="shadow-card rounded bg-white md:m-4" data-testid="cookie-bar">
            <article className="content-center items-center justify-center px-4 py-3 sm:flex sm:p-4">
              <h2 className="sm:text-h-5 my-4 text-center font-bold leading-tight sm:my-0 sm:text-start">
                {t('ui.cookie.bar.title')}
              </h2>
              <div className="mt-2 flex content-center items-center sm:ml-3 sm:mt-0 sm:flex-row">
                <div className="flex w-1/2 sm:w-32 md:w-48">
                  <Button
                    buttonType="blue"
                    variant="outline"
                    className="truncate"
                    fullWidth
                    message={t('ui.cookie.bar.cta.preferences')}
                    onClick={openModal}
                  />
                </div>
                <div className='md:w-48" mx-2 w-1/2 sm:w-32'>
                  <Button
                    buttonType="blue"
                    variant="full"
                    onClick={() => {
                      setCookie(true);
                    }}
                    message={t('ui.cookie.bar.cta.accept')}
                    className="truncate"
                    fullWidth
                    data-testid="accept-cookies-button"
                  />
                </div>
              </div>
            </article>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};
