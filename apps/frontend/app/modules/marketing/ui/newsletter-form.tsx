import { withZod } from '@remix-validated-form/with-zod';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { Button } from '@kyero/ui';

import { PersonalisationModal } from './modal';
import { getFormSchema } from '~/modules/marketing/marketing-subscriptions.form.validator';
import { CoiFields } from './modal/coi-fields';
import { usePersonalisationModal } from './use-personalisation-modal';
import { useFetcher } from '@remix-run/react';
import { EmailInput } from './email-input';

import {
  type InstrumentNewsletterPayload,
  instrumentFooterSubscribe,
} from '~/modules/tracking/instrument';

const FORM_ID = 'personalisation-base-newsletter';

export const NewsletterForm = () => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const schema = getFormSchema(t);

  const handleInstrumentation = (payload: InstrumentNewsletterPayload) => {
    instrumentFooterSubscribe(payload);
  };

  const {
    ref,
    activeModal,
    activeView,
    setActiveView,
    handleClose,
    initialData,
    emailError,
    getEmailProps,
  } = usePersonalisationModal(FORM_ID, fetcher, false, handleInstrumentation);

  return (
    <>
      <ValidatedForm
        className="mx-auto mt-4 max-w-lg"
        fetcher={fetcher}
        id={FORM_ID}
        method="POST"
        action="/kyero-api/marketing/subscriptions"
        validator={withZod(schema)}
        formRef={ref}
        data-testid="newsletter-form"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
          <div className="relative flex flex-1">
            <EmailInput
              getEmailProps={getEmailProps}
              id="newsletter-email"
              initialEmail={initialData.email}
              emailError={emailError}
            />
          </div>
          <CoiFields />
          <input
            type="checkbox"
            name="receive_weekly_newsletter"
            value="true"
            checked
            readOnly
            hidden
          />
          <Button
            message={t('common.newsletter.section.form.cta') as string}
            disabled={fetcher.state === 'submitting'}
            buttonType="sunshine"
            variant="full"
            type="submit"
            data-testid="newsletter-form.submit"
          />
        </div>
      </ValidatedForm>
      <PersonalisationModal
        open={activeModal}
        activeState={activeView}
        type="newsletter"
        onSetView={setActiveView}
        onClose={handleClose}
        initialData={initialData}
      />
    </>
  );
};
