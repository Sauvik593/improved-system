import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useModalsContext } from '~/common/contexts/modals.context';
import { MobileHeader } from '../modals/mobile-header';
import { LanguageSwitcherList } from './list';
import { useAppContext } from '~/common/contexts/app.context';
import { Trans } from 'react-i18next';
import { useLocation } from '@remix-run/react';

export const LanguageSwitcherModal = () => {
  const { checkOpenModal, closeModal, getModalZIndex, openModal, closeModalWithParents } =
    useModalsContext();
  const { user } = useAppContext();
  const location = useLocation();

  const [initialLocation, setInitialLocation] = useState(location.pathname);
  const closeMobileMenu = () => closeModal('language-switcher');
  const isOpen = checkOpenModal('language-switcher');
  const zIndex = getModalZIndex('language-switcher');

  const openSignup = () => {
    openModal('auth-mobile', { type: 'signup' });
    closeModal('language-switcher');
  };

  useEffect(() => {
    if (location.pathname !== initialLocation) {
      setInitialLocation(location.pathname);
      closeModalWithParents('language-switcher');
    }
  }, [location.pathname, initialLocation, closeModalWithParents]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeMobileMenu} className="relative lg:hidden" style={{ zIndex: zIndex }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <Dialog.Panel className="grid h-full w-full grid-rows-[74px_auto]">
              <MobileHeader onClose={closeMobileMenu} onSignup={openSignup} user={user} />
              <div className="overflow-auto p-4 pt-0">
                <h3 className="text-h-4-sm text-tile-100 font-bold">
                  <Trans i18nKey={'common.language_switcher.title'} />
                </h3>
                <LanguageSwitcherList />
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
