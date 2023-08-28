import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalsContext } from '~/common/contexts/modals.context';
import { LanguageSwitcherModal } from '~/common/ui/language-switcher/modal';
import { useAppContext } from '~/common/contexts/app.context';

import { MobileMenuHeader } from './mobile-menu.header';
import { MobileMenuUserAccordion } from './mobile-menu.user-accordion';
import { AuthModal } from '~/modules/auth/ui/auth-modal';
import { MobileMenuFooter } from './mobile-menu.footer';
import { useNavLinks } from '~/common/hooks/use-nav-links';

export const MobileMenu = () => {
  const { user } = useAppContext();
  const { mainMenuMobileLinks } = useNavLinks();
  const { checkOpenModal, closeModal, getModalZIndex, openModal } = useModalsContext();
  const isOpen = checkOpenModal('mobile-menu');
  const closeMobileMenu = () => closeModal('mobile-menu');
  const zIndex = getModalZIndex('mobile-menu');
  const openLogin = () => openModal('auth-mobile', { type: 'login' });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeMobileMenu} className="relative md:hidden" style={{ zIndex: zIndex }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <Dialog.Panel
              className="grid h-full w-full grid-rows-[74px_auto_56px]"
              data-testid="mobile-menu"
            >
              <MobileMenuHeader onClose={closeMobileMenu} />
              <div className="overflow-auto">
                <nav className="p-4 pt-0">
                  <ul className="flex flex-col gap-4">
                    {mainMenuMobileLinks.map(([title, link]) => {
                      return (
                        <li key={link}>
                          <a
                            href={link}
                            className="bg-sierra-night-10 text-sierra-night-100 block rounded-lg p-2 px-4 font-bold"
                          >
                            {title}
                          </a>
                        </li>
                      );
                    })}
                    {user && (
                      <li>
                        <MobileMenuUserAccordion />
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
              <MobileMenuFooter onLogin={openLogin} user={user} />
              <LanguageSwitcherModal />
              <AuthModal type="mobile" />
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
