import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { Button } from '@kyero/ui';
import { Close, Tick } from '@kyero/icons';

interface Props {
  active: boolean;
  onClose: () => void;
  email: string;
}

export const SuccessModal = ({ active, onClose, email }: Props) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Transition show={active}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={'div'}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={'div'}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="mx-4 max-w-3xl  flex-auto transform items-center overflow-hidden rounded-xl rounded-2xl bg-white bg-white p-10 p-6 text-left align-middle shadow-md shadow-xl transition-all md:mx-0"
                  data-testid="success-modal"
                >
                  <button
                    className="text-ocean-100 absolute right-5 top-5 ml-auto outline-none focus:outline-none md:right-8 md:top-8"
                    onClick={onClose}
                  >
                    <Close ariaHidden />
                  </button>
                  <i className="mb-4">
                    <Tick className="text-meadow-100 h-12 w-12 md:h-20 md:w-20" />
                  </i>
                  <Dialog.Title as="h3" className="text-h-3-sm md:text-h-3 mb-2 font-semibold">
                    {t('contact.success.title')}
                  </Dialog.Title>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: t('contact.success.message', { email }) }}
                  />

                  <div className="mt-4">
                    <Button
                      onClick={onClose}
                      className="text-h-5-sm md:text-h-5 hover:bg-ocean-150 hover:border-ocean-150 mt-3 w-32 border-2 py-3 px-4 font-bold hover:text-white md:px-5"
                      buttonType="blue"
                      variant="full"
                      fullWidth
                      message="Got it"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
