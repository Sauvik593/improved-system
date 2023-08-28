import cn from 'classnames';
import { Button } from '@kyero/ui';

import { ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { withZod } from '@remix-validated-form/with-zod';

import { Checkbox } from '~/common/ui/forms/checkbox';
import { PersonalisationModal } from './modal';
import { getFormSchema } from '~/modules/marketing/marketing-subscriptions.form.validator';
import { CoiFields } from './modal/coi-fields';
import { usePersonalisationModal } from './use-personalisation-modal';
import { useFetcher } from '@remix-run/react';
import { EmailInput } from './email-input';
import {
  type InstrumentNewsletterPayload,
  instrumentBuyersGuide,
} from '~/modules/tracking/instrument';

interface Props {
  className?: string;
}

const FORM_ID = 'personalisation-base-buyers-guide';

export const BuyersGuideIntroForm = ({ className = '' }: Props) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const schema = getFormSchema(t);

  const handleInstrumentation = (payload: InstrumentNewsletterPayload) => {
    instrumentBuyersGuide(payload);
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
  } = usePersonalisationModal(FORM_ID, fetcher, true, handleInstrumentation);

  return (
    <>
      <div className={cn(className)}>
        <ValidatedForm
          className="mt-2"
          fetcher={fetcher}
          id={FORM_ID}
          method="POST"
          action="/kyero-api/marketing/subscriptions"
          validator={withZod(schema)}
          formRef={ref}
          data-testid="buyers-guide-form"
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
            <Button
              message={t('common.buyers_guide.section.form.cta') as string}
              buttonType="blue"
              variant="full"
              type="submit"
              data-testid="buyers-guide.submit"
            />
          </div>
          <div className="mt-4">
            <Checkbox
              defaultChecked={false}
              label={t('common.buyers_guide.section.form.newsletter') as string}
              value={'true'}
              name="receive_weekly_newsletter"
              data-testid="buyers-guide.newsletter"
            />
            <CoiFields />
          </div>
          <input
            type="hidden"
            name="send_buyers_guide"
            value="true"
            data-testid="buyers-guide.send-buyers-guide"
          />
        </ValidatedForm>
      </div>
      <PersonalisationModal
        activeState={activeView}
        open={activeModal}
        type="buyers-guide"
        onSetView={setActiveView}
        onClose={handleClose}
        initialData={initialData}
      />
    </>
  );
};
