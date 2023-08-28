import { Transition } from '@headlessui/react';
import { Button } from '@kyero/ui';
import { useFetcher } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';

import { useNonEssentialCookies } from '../hooks/use-non-essential-cookies';
import { CookiePreferencesModal } from './cookie-preferences-modal';

import { cookieBarMachine } from './cookie-bar.state';

export const CookieBar = () => {
  const { nonEssentialCookies } = useNonEssentialCookies();
  const fetcher = useFetcher();
  const [state, sendEvent] = useMachine(cookieBarMachine);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data != null) {
      sendEvent('SUCCESS');
    }
  }, [fetcher, sendEvent]);

  useEffect(() => {
    sendEvent('LOAD', { nonEssentialCookies });
    // eslint-disable-next-line
  }, []);

  const showModal = state.matches('loaded.open');

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
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <CookiePreferencesModal
            active={showModal}
            onClose={closeModal}
            onSuccess={() => sendEvent('SUCCESS')}
          />
          <div className="shadow-card rounded bg-white md:m-4" data-testid="cookie-bar">
            <article className="content-center items-center justify-center px-4 py-3 sm:flex sm:p-4">
              <h2 className="sm:text-h-5 my-4 text-center font-bold leading-tight sm:my-0 sm:text-start">
                Kyero uses cookies to give you a better experience
              </h2>
              <div className="mt-2 flex content-center items-center sm:ml-3 sm:mt-0 sm:flex-row">
                <div className="flex w-1/2 sm:w-32 md:w-48">
                  <Button
                    buttonType="blue"
                    variant="outline"
                    className="truncate"
                    fullWidth
                    onClick={() => {
                      sendEvent('OPEN');
                    }}
                    message="Cookie preferences"
                  />
                </div>
                <fetcher.Form
                  method="post"
                  action="/kyero-api/non-essential-cookies"
                  className="mx-2 w-1/2 sm:w-32 md:w-48"
                >
                  <input
                    className="ml-auto hidden h-6 w-5"
                    id="non_essential_cookies"
                    type="hidden"
                    name="non_essential_cookies"
                    value="true"
                  />

                  <Button
                    buttonType="blue"
                    variant="full"
                    type="submit"
                    message="Accept"
                    className="truncate"
                    fullWidth
                    data-testid="accept-cookies-button"
                  />
                </fetcher.Form>
              </div>
            </article>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};
