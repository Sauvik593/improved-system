import { forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@kyero/ui';

import ErrorViewIcon from './error-view-icon.svg';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  onClose?: () => void;
  onRetry?: () => void;
};
export const ErrorView = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { t } = useTranslation();
  return (
    <Transition
      appear
      as={'div'}
      enter="ease-out duration-100 delay-100"
      enterFrom="opacity-0 translate-y-12"
      enterTo="opacity-100 translate-y-0"
      leave="ease-in duration-100"
      leaveFrom="opacity-50 translate-y-0"
      leaveTo="opacity-0 translate-y-12"
      className="flex h-full flex-col justify-center gap-4 pt-8 text-center"
      data-testid="error-view"
    >
      <img
        src={ErrorViewIcon}
        alt=""
        role="presentation"
        width="192px"
        height="118px"
        className="object-fit mx-auto object-center"
      />
      <Dialog.Title className="text-tile-100 text-h-3-sm lg:text-h-3 gap-2 font-bold md:mx-2">
        <Trans i18nKey={'common.ui.modals.error.title'} />
      </Dialog.Title>
      <div className="text-tile-100 text-p-2">
        <p>
          <Trans i18nKey={'common.ui.modals.error.subtitle'} />
        </p>
      </div>
      <section className="mt-6 flex flex-col gap-4">
        {props.onRetry && (
          <Button
            type="button"
            buttonType="blue"
            variant="full"
            fullWidth
            message={t('common.ui.retry') as string}
            onClick={props.onRetry}
          />
        )}

        {props.onClose && (
          <Button
            type="button"
            buttonType="blue"
            variant="full"
            fullWidth
            message={t('common.ui.close') as string}
            onClick={props.onClose}
          />
        )}
      </section>
    </Transition>
  );
});

ErrorView.displayName = 'ErrorView';
