import { forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@kyero/ui';

import CircleSuccess from './circle-success.svg';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
}

export const SuccessView = forwardRef<HTMLInputElement, Props>(({ onClose }, ref) => {
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
      data-testid="personalisation-modal.success"
    >
      <img
        src={CircleSuccess}
        alt=""
        role="presentation"
        width="72px"
        height="72px"
        className="object-fit mx-auto object-center"
      />
      <Dialog.Title className="text-tile-100 text-h-3-sm lg:text-h-3 gap-2 font-bold md:mx-2">
        <Trans i18nKey={'common.personalisation_modal.success.title'} />
      </Dialog.Title>
      <div className="text-tile-100 text-p-2">
        <p>
          <Trans i18nKey={'common.personalisation_modal.success.subtitle'} />
        </p>
      </div>
      <section className="mt-6 flex flex-col gap-4">
        <Button
          type="submit"
          buttonType="blue"
          variant="full"
          fullWidth
          message={t('common.personalisation_modal.success.cta') as string}
          onClick={onClose}
          data-testid="personalisation-modal.success.cta"
        />
      </section>
    </Transition>
  );
});

SuccessView.displayName = 'SuccessView';
