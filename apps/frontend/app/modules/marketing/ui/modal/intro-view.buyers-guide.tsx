import { forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { Trans, useTranslation } from 'react-i18next';
import { IntroFooter } from './intro-footer';
import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  email: string;
  onClose: () => void;
  onNext: () => void;
}

export const IntroViewBuyersGuide = forwardRef<HTMLButtonElement, Props>(
  ({ email, onClose, onNext }, ref) => {
    const { t } = useTranslation();
    const { pdfGuide } = useNavLinks();
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
        data-testid="personalisation-modal.intro-buyers-guide"
      >
        <img
          src={assetsPathTo('/images/buyers-guide/success.png')}
          alt=""
          role="presentation"
          width="192px"
          height="129px"
          className="object-fit mx-auto object-center"
        />
        <Dialog.Title className="text-tile-100 text-h-3-sm lg:text-h-3 gap-2 font-bold">
          <Trans i18nKey="common.personalisation_modal.intro_guide.title" />
        </Dialog.Title>
        <div
          className="text-tile-100 text-p-2"
          data-testid="personalisation-modal.intro-buyers-guide.message"
        >
          <p
            dangerouslySetInnerHTML={{
              __html: t('common.personalisation_modal.intro_guide.subtitle', {
                email,
                guidesURL: pdfGuide,
              }),
            }}
          ></p>
        </div>
        <section className="mt-6 flex flex-col gap-4">
          <IntroFooter onClose={onClose} onNext={onNext} ref={ref} />
        </section>
      </Transition>
    );
  },
);

IntroViewBuyersGuide.displayName = 'IntroViewBuyersGuide';
