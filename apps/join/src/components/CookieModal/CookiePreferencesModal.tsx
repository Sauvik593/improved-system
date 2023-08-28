import { useContext, useState } from 'react';
import cn from 'classnames';

import { useTranslation } from 'next-i18next';

import { Dialog, Transition } from '@headlessui/react';
import { Close } from '@kyero/icons';
import { Button, Switch } from '@kyero/ui';

import { LanguageContext } from '@contexts/LanguageContext';

interface Props {
  active: boolean;
  onClose: () => void;
  onClick: (value: boolean) => void;
}

export const CookiePreferencesModal = ({ active, onClick, onClose }: Props) => {
  const { locale } = useContext(LanguageContext);
  const { t } = useTranslation('common');
  const [checked, setChecked] = useState(true);

  const title = checked ? t('ui.cookie.modal.switch.active') : t('ui.cookie.modal.switch.inactive');

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
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
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
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
        >
          <Dialog.Panel
            className="relative z-0 h-auto w-full rounded-xl bg-white p-6 md:mt-0 md:max-w-2xl"
            data-testid="searchbox.modal"
          >
            <Dialog.Title className="text-tile-100 text-h-3-sm gap-2 text-center font-bold">
              {t('ui.cookie.bar.cta.preferences') as string}
              <button className="absolute top-4 right-4 p-2" title="Close Modal" onClick={onClose}>
                <Close ariaHidden />
              </button>
            </Dialog.Title>
            <section className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-h-5 font-bold">{t('ui.cookie.modal.non_essential.title')}</p>
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
                    label={t('ui.cookie.modal.switch.label')}
                    variant="regular"
                  />
                </div>
              </div>
              <p className="pb-2 sm:w-3/4">{t('ui.cookie.modal.non_essential.message')}</p>
              <div className="mt-4 mb-2 flex items-center">
                <p className="text-h-5 font-bold">{t('ui.cookie.modal.essential_cookies.title')}</p>
                <p className="text-meadow-100 ml-auto font-semibold">
                  {t('ui.cookie.modal.always_active')}
                </p>
              </div>
              <p className="pb-2 sm:w-3/4">{t('ui.cookie.modal.essential_cookies.message')}</p>

              <div className="mt-4 flex w-full justify-center sm:mx-auto sm:max-w-sm">
                <Button
                  buttonType="blue"
                  variant="full"
                  onClick={() => {
                    onClick(checked);
                  }}
                  fullWidth
                  message={t('ui.cookie.modal.cta.save_preferences')}
                />
              </div>

              <footer className="mt-4 text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('ui.cookie.cookie_policy', {
                      interpolation: { escapeValue: false },
                      locale,
                    }),
                  }}
                />
              </footer>
            </section>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
