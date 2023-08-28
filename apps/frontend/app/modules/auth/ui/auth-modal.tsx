import cn from 'classnames';
import { Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalsContext } from '~/common/contexts/modals.context';
import { Close } from '@kyero/icons';
import { AuthModalLoginView } from './auth-modal-login.view';
import { AuthModalSignupView } from './auth-modal-signup.view';
import { AuthModalHeader } from './auth-modal-header';
import { AuthJoinMessage } from './auth-join.message';
import { useTranslation } from 'react-i18next';

interface Props {
  type: 'desktop' | 'mobile';
}

export const AuthModal = ({ type }: Props) => {
  const { t } = useTranslation();
  const modalType = type === 'desktop' ? 'auth-desktop' : 'auth-mobile';

  const { getModalState, closeModal, getModalZIndex, openModal } = useModalsContext();
  const { isOpen, payload } = getModalState(modalType);
  const closeAuthModal = () => closeModal(modalType);
  const zIndex = getModalZIndex(modalType);
  const ref = useRef<HTMLDivElement>(null);

  const openSignup = () => {
    openModal(modalType, { type: 'signup' });
  };

  useEffect(() => {
    if (modalType === 'auth-mobile') {
      ref.current?.scrollTo(0, 0);
    }
  }, [modalType]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={closeAuthModal}
        className="relative"
        style={{ zIndex: zIndex }}
        data-testid="auth-modal"
      >
        <Transition.Child
          as={'div'}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200 delay-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
        >
          <Dialog.Backdrop
            className="inset-0 hidden bg-black/40 md:fixed md:block"
            aria-hidden="true"
            onClick={closeAuthModal}
          />
        </Transition.Child>
        <Transition.Child
          as={'div'}
          enter="ease-out duration-200"
          enterFrom="translate-y-full md:opacity-0 md:translate-y-12"
          enterTo="translate-y-0 opacity-100 delay-100"
          leave="ease-in duration-200"
          leaveFrom="md:translate-y-0 opacity-100"
          leaveTo="translate-y-full md:opacity-0 md:translate-y-12"
          className="fixed inset-0 z-10 flex items-center justify-center md:grid md:grid-cols-1 md:grid-rows-1 md:overflow-auto md:p-5"
        >
          <Dialog.Panel
            className={cn(
              'relative grid h-full w-full grid-rows-[14rem_auto] overflow-auto bg-white ',
              'md:m-auto md:grid md:h-auto md:min-h-[550px] md:max-w-3xl md:grid-cols-[55%_45%] md:grid-rows-1 md:overflow-visible md:rounded-xl md:bg-transparent',
              'lg:max-w-4xl',
            )}
            ref={ref}
          >
            <div className="z-1 absolute top-4 right-4 md:-right-3 md:-top-3">
              <button
                className="bg-ocean-100 ml-auto flex items-center justify-center rounded-full p-1 md:p-2"
                aria-label={t('common.ui.close') as string}
                onClick={closeAuthModal}
                data-testid="auth-modal.close"
              >
                <Close className="text-white" width={16} />
              </button>
            </div>
            <AuthModalHeader
              messageComponent={
                <Transition
                  show={payload?.type === 'login'}
                  as={'div'}
                  enter="ease-out duration-300 delay-200"
                  enterTo="md:translate-y-0 md:opacity-100"
                  enterFrom="md:-translate-y-12 md:opacity-0"
                  className="absolute inset-0 m-auto hidden items-center justify-center md:flex"
                >
                  <AuthJoinMessage
                    onOpenSignup={openSignup}
                    className={'ml-11 mr-8 hidden rounded-xl bg-white/90 p-4 md:block '}
                  />
                </Transition>
              }
            />
            <div className="relative -mt-4 rounded-xl bg-white p-8  md:mt-0 md:overflow-hidden md:p-8">
              <Transition
                show={payload?.type === 'login'}
                as={'div'}
                enter="md:ease-out md:duration-500"
                enterFrom="hidden md:block md:-translate-x-full md:opacity-0"
                enterTo="block md:translate-x-0 md:opacity-100"
                leave="md:ease-out duration-500"
                leaveFrom="block md:translate-x-0 md:absolute md:top-8 inset-0 md:opacity-100"
                leaveTo="hidden md:block md:-translate-x-full md:absolute md:top-8 inset-0 md:opacity-0"
              >
                <AuthModalLoginView modalType={modalType} />
              </Transition>
              <Transition
                show={payload?.type === 'signup'}
                as={'div'}
                enter="md:ease-out md:duration-500"
                enterFrom="hidden md:block  md:translate-x-full md:opacity-0"
                enterTo="block md:translate-x-0 md:opacity-100"
                leave="md:ease-out duration-500"
                leaveFrom="block md:translate-x-0  md:absolute md:top-8 inset-0 md:opacity-100"
                leaveTo="hidden md:block md:translate-x-full  md:absolute md:top-8 inset-0 md:opacity-0"
              >
                <AuthModalSignupView modalType={modalType} />
              </Transition>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
