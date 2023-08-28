import React from 'react';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { Dialog, Transition } from '@headlessui/react';

import { Close } from '@kyero/icons';
import { getAssetsUrl } from '@helpers/assetsUrl';

interface Props {
  email: string;
  name: string;
  active: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ active, onClose, email, name }: Props) => {
  const { t } = useTranslation('common');
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
            data-testid="success-modal"
          >
            <button className="absolute top-4 right-4 p-2" title="Close Modal" onClick={onClose}>
              <Close ariaHidden />
            </button>
            <section className="text-center">
              <figure className="mx-auto -mt-20 flex w-auto items-center justify-center">
                <NextImage
                  src={getAssetsUrl('/images/home-page/hero-banner/banner-figure.png')}
                  alt={t('tell_us_about.success.image_alt')}
                  width={312}
                  height={272}
                />
              </figure>
              <h3 className="text-h-4 md:text-h-3 mb-5 font-bold">
                {t('tell_us_about.success.title')}
              </h3>
              <p className="text-p-2 mb-4">{t('tell_us_about.success.message', { name })}</p>
              <div
                className="text-p-2 mx-auto lg:w-3/4"
                dangerouslySetInnerHTML={{
                  __html: t('tell_us_about.success.email_message', { email }),
                }}
              />
            </section>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
