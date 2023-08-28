import { Button } from '@kyero/ui';
import { useTranslation } from 'react-i18next';
import { useIsSubmitting } from 'remix-validated-form';

export const SubmitButton = () => {
  const { t } = useTranslation();
  const submitting = useIsSubmitting();
  const messageKey = submitting
    ? 'common.form.submitting'
    : 'common.personalisation_modal.form.cta';
  return (
    <Button
      type="submit"
      buttonType="blue"
      variant="full"
      fullWidth
      message={t(messageKey) as string}
      className="mt-4"
      disabled={submitting}
      data-testid="personalisation-form.submit"
    />
  );
};
