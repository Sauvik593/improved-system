import { useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Close } from '@kyero/icons';
import { FormView } from './form-view';

import { SuccessView } from './success-view';
import { IntroViewNewsletter } from './intro-view.newsletter';
import { IntroViewBuyersGuide } from './intro-view.buyers-guide';
import { useTranslation } from 'react-i18next';
import { ErrorView } from '~/common/ui/modals/error-view';

interface Props {
  activeState: ViewState | null;
  open: boolean;
  onSetView: (viewState: ViewState) => void;
  onClose: () => void;
  initialData: { newsletter: boolean; email: string; buyersGuide: boolean };
  type: 'buyers-guide' | 'newsletter';
}

export type ViewState = 'form' | 'success' | 'error' | 'intro' | 'intro-error' | null;

export const PersonalisationModal = ({
  activeState,
  open,
  onClose,
  initialData,
  type,
  onSetView,
}: Props) => {
  const { t } = useTranslation();
  let initRef = useRef(null);
  const IntroComponent = type === 'buyers-guide' ? IntroViewBuyersGuide : IntroViewNewsletter;

  const handleSuccess = () => {
    onSetView('success');
  };
  const handleError = () => {
    onSetView('error');
  };

  const renderView = () => {
    switch (activeState) {
      case 'intro':
        return (
          <IntroComponent
            onNext={() => onSetView('form')}
            onClose={onClose}
            email={initialData.email as string}
            ref={initRef}
          />
        );
      case 'success':
        return <SuccessView onClose={onClose} />;

      case 'error':
        return (
          <ErrorView
            onRetry={() => {
              onSetView('form');
            }}
            onClose={onClose}
          />
        );

      case 'intro-error':
        return <ErrorView onClose={onClose} />;
      case 'form':
      default:
        return (
          <FormView
            initialData={initialData}
            onSuccess={handleSuccess}
            onError={handleError}
            ref={initRef}
          />
        );
    }
  };
  return (
    <Transition show={!!open} appear>
      <Dialog onClose={onClose} initialFocus={initRef} data-testid="personalisation-modal">
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
            className="relative z-0 h-full w-full bg-white p-6 md:mt-0 md:h-auto md:max-w-3xl md:rounded-xl"
            data-testid="searchbox.modal"
          >
            <button
              className="bg-ocean-100 top- z-1 absolute right-4 flex h-8 w-8 items-center justify-center rounded-full p-2 md:-top-4 md:-right-4"
              title={t('common.ui.close') as string}
              onClick={onClose}
              date-testid="personalisation-modal.close"
            >
              <Close ariaHidden className="text-white" />
            </button>
            {renderView()}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

PersonalisationModal.displayName = 'PersonalisationModal';
