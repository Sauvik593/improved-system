import { Button } from '@kyero/ui';
import { forwardRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
  onNext: () => void;
}

export const IntroFooter = forwardRef<HTMLButtonElement, Props>(({ onClose, onNext }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        type="submit"
        buttonType="blue"
        variant="full"
        fullWidth
        message={t('common.personalisation_modal.intro.next_button') as string}
        onClick={onNext}
        ref={ref}
        data-testid="personalisation-modal.intro.next"
      />
      <button
        className="text-ocean-100 hover:text-ocean-150 focus:text-ocean-150 w-full font-bold"
        type="button"
        onClick={onClose}
        data-testid="personalisation-modal.intro.close"
      >
        <Trans i18nKey="common.personalisation_modal.intro.later_button" />
      </button>
    </>
  );
});

IntroFooter.displayName = 'IntroFooter';
