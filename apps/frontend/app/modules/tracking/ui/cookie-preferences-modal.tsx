import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Close } from '@kyero/icons';
import { Button, Switch } from '@kyero/ui';
import { useFetcher } from '@remix-run/react';

interface Props {
  active: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CookiePreferencesModal = ({ active, onClose, onSuccess }: Props) => {
  const fetcher = useFetcher();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data != null) {
      onSuccess();
    }
  });

  const title = checked ? 'Active' : 'Inactive';

  return (
    <Transition show={active}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={'div'}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100 delay-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-10 flex transform-gpu items-center justify-center overflow-y-auto"
        >
          <Dialog.Backdrop
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
            onClick={onClose}
          />
        </Transition.Child>
        <Transition.Child
          as={'div'}
          enter="ease-out duration-100 delay-100"
          enterFrom="opacity-0 translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-100"
          leaveFrom="opacity-50 translate-y-0"
          leaveTo="opacity-0 translate-y-12"
          className="fixed inset-0 z-10 flex transform-gpu items-center justify-center overflow-y-auto"
        >
          <Dialog.Panel
            className="relative z-0 h-auto w-full rounded-xl bg-white p-6 md:mt-0 md:max-w-2xl"
            data-testid="searchbox.modal"
          >
            <Dialog.Title className="text-tile-100 text-h-3-sm gap-2 text-center font-bold">
              Cookie preferences
              <button className="absolute top-4 right-4 p-2" title="Close Modal" onClick={onClose}>
                <Close ariaHidden />
              </button>
            </Dialog.Title>
            <section className="mt-6">
              <fetcher.Form
                data-testid="cookies-form"
                action="/kyero-api/non-essential-cookies"
                method="POST"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-h-5 font-bold">Non-essential cookies</p>
                  <div className="inline-flex items-center gap-4">
                    <p
                      className={cn('font-semibold', {
                        'text-meadow-100': checked,
                        'text-sierra-night-40': !checked,
                      })}
                    >
                      {title}
                    </p>
                    <Switch
                      name="non_essential_cookies"
                      value="true"
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}
                      label="Something"
                      variant="regular"
                    />
                  </div>
                </div>
                <p className="pb-2 sm:w-3/4">
                  These non-essential cookies help us to analyse how you found us and how you use
                  Kyero.com. This helps us to continuously improve.
                </p>

                <div className="mt-4 mb-2 flex items-center">
                  <p className="text-h-5 font-bold">Essential cookies</p>
                  <p className="text-meadow-100 ml-auto font-semibold">Always active</p>
                </div>
                <p className="pb-2 sm:w-3/4">
                  These are our own cookies that are required for the operation of Kyero.com.
                  Without them we can’t operate properly, for example, a cookie enables you to log
                  in or to remember your searches.
                </p>

                <div className="mt-4 flex w-full justify-center sm:mx-auto sm:max-w-sm">
                  <Button
                    type="submit"
                    buttonType="blue"
                    variant="full"
                    fullWidth
                    message="Save preferences"
                  />
                </div>

                <footer className="mt-4 text-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        '<span>Read more in the <a href="#" class="text-ocean-100 underline">cookie policy</a></span>' as string,
                    }}
                  />
                </footer>
              </fetcher.Form>
            </section>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
