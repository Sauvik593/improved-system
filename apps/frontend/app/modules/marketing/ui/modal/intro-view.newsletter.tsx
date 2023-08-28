import { forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Trans } from 'react-i18next';
import { IntroFooter } from './intro-footer';
import { assetsPathTo } from '~/common/client-router/helpers';

interface Props {
  email: string;
  onClose: () => void;
  onNext: () => void;
}

export const IntroViewNewsletter = forwardRef<HTMLButtonElement, Props>(
  ({ email, onClose, onNext }, ref) => {
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
        data-testid="personalisation-modal.intro-newsletter"
      >
        <img
          src={assetsPathTo('/images/buyers-guide/success.png')}
          srcSet={`${assetsPathTo('/images/buyers-guide/success@2x.png')} 2x`}
          alt=""
          role="presentation"
          width="192px"
          height="129px"
          className="object-fit mx-auto object-center"
        />
        <Dialog.Title
          className="text-tile-100 text-h-3-sm lg:text-h-3 gap-2 font-bold"
          data-testid="personalisation-modal.intro-newsletter.title"
        >
          <Trans i18nKey="common.personalisation_modal.intro_newsletter.title" values={{ email }} />
        </Dialog.Title>
        <div className="ext-tile-100 text-p-2">
          <p>
            <Trans i18nKey="common.personalisation_modal.intro_newsletter.subtitle" />
          </p>
        </div>
        <section className="mt-6 flex flex-col gap-4">
          <IntroFooter onClose={onClose} onNext={onNext} ref={ref} />
        </section>
      </Transition>
    );
  },
);

IntroViewNewsletter.displayName = 'IntroViewNewsletter';
