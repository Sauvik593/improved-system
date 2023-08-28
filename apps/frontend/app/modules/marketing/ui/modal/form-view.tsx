import { forwardRef, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useFetcher } from '@remix-run/react';
import { Trans, useTranslation } from 'react-i18next';
import { withZod } from '@remix-validated-form/with-zod';

import { InputField } from '~/common/ui/forms/input-field';
import { ValidatedForm } from 'remix-validated-form';
import { CoiFields } from './coi-fields';
import { SubmitButton } from './submit-button';
import { SelectField } from '~/common/ui/forms/select-field';

import { getFormSchema } from '~/modules/marketing/marketing-user-profile.form.validator';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { useAppContext } from '~/common/contexts/app.context';
import { getFormDataForInstrumentation } from '../helper';
import { instrumentAdditionalModalSubmit } from '~/modules/tracking/instrument';

interface Props {
  initialData: { newsletter: boolean; email: string; buyersGuide: boolean };
  onSuccess: (email: string) => void;
  onError: () => void;
}

const WHY_BUY_OPTIONS_KEY = 'common.personalisation_modal.form.why_buy.options';
const WANT_TO_BUY_IN_OPTIONS_KEY = 'common.personalisation_modal.form.wants_to_buy_in.options';

export const FormView = forwardRef<HTMLInputElement, Props>(
  ({ initialData, onSuccess, onError }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { t } = useTranslation();
    const { privacy, terms } = useNavLinks();
    const { user } = useAppContext();
    const fetcher = useFetcher();

    const getTranslation = (baseKey: string, key: string) => t(`${baseKey}.${key}`) as string;

    useEffect(() => {
      if (fetcher.state === 'idle' && fetcher.data?.state === 'success') {
        onSuccess(fetcher.data?.email as string);

        const data = getFormDataForInstrumentation(formRef.current as HTMLFormElement, user);
        instrumentAdditionalModalSubmit(data);
      }

      if (fetcher.state === 'idle' && fetcher.data?.state === 'error') {
        onError();
      }
    });
    const formSchema = getFormSchema(t);
    return (
      <>
        <Dialog.Title className="text-tile-100 text-h-3-sm lg:text-h-3 gap-2 font-bold">
          <Trans i18nKey="common.personalisation_modal.form.title" />
        </Dialog.Title>
        <p className="text-tile-100 text-p-2 mt-2">
          <Trans i18nKey="common.personalisation_modal.form.subtitle" />
        </p>
        <section className="mt-6">
          <ValidatedForm
            data-testid="personalisation-form"
            action="/kyero-api/marketing/user-profile"
            method="POST"
            fetcher={fetcher}
            formRef={formRef}
            validator={withZod(formSchema)}
          >
            <div className="mt-4">
              <InputField
                name="email"
                type="email"
                defaultValue={initialData.email}
                label={t('common.personalisation_modal.form.email.label') as string}
                visuallyDisabled
              />
              <InputField
                name="name"
                type="name"
                defaultValue={user?.firstname || ''}
                label={t('common.personalisation_modal.form.first_name.label') as string}
                className="mt-4"
                ref={ref}
              />
              <SelectField
                name="why_buy"
                label={t('common.personalisation_modal.form.why_buy.label') as string}
                className="mt-4"
                placeholder={t('common.ui.select') as string}
                options={[
                  {
                    label: getTranslation(WHY_BUY_OPTIONS_KEY, 'to_retire'),
                    value: '0',
                  },
                  {
                    label: getTranslation(WHY_BUY_OPTIONS_KEY, 'holiday_home'),
                    value: '1',
                  },
                  {
                    label: getTranslation(WHY_BUY_OPTIONS_KEY, 'for_work'),
                    value: '2',
                  },
                  {
                    label: getTranslation(WHY_BUY_OPTIONS_KEY, 'investment'),
                    value: '3',
                  },
                  {
                    label: getTranslation(WHY_BUY_OPTIONS_KEY, 'relocate'),
                    value: '4',
                  },
                ]}
              />
              <SelectField
                name="wants_to_buy_in"
                label={t('common.personalisation_modal.form.wants_to_buy_in.label') as string}
                className="mt-4"
                placeholder={t('common.ui.select') as string}
                options={[
                  {
                    label: getTranslation(WANT_TO_BUY_IN_OPTIONS_KEY, 'in_three_months'),
                    value: '0',
                  },
                  {
                    label: getTranslation(WANT_TO_BUY_IN_OPTIONS_KEY, 'in_three_to_six_months'),
                    value: '1',
                  },
                  {
                    label: getTranslation(WANT_TO_BUY_IN_OPTIONS_KEY, 'in_six_to_twelve_months'),
                    value: '2',
                  },
                  {
                    label: getTranslation(WANT_TO_BUY_IN_OPTIONS_KEY, 'more_than_year'),
                    value: '3',
                  },
                  {
                    label: getTranslation(WANT_TO_BUY_IN_OPTIONS_KEY, 'unsure'),
                    value: '4',
                  },
                ]}
              />
              <input
                type="checkbox"
                hidden
                name="receive_weekly_newsletter"
                value="true"
                checked={initialData.newsletter}
                readOnly
                data-testid="personalisation-form.newsletter"
              />
              <input
                type="checkbox"
                hidden
                name="send_buyers_guide"
                value="true"
                checked={initialData.buyersGuide}
                readOnly
                data-testid="personalisation-form.buyers-guide"
              />

              <CoiFields />
              <SubmitButton />
            </div>

            <footer className="mt-4">
              <span
                className="text-sierra-night-60 text-p-3"
                dangerouslySetInnerHTML={{
                  __html: t('common.personalisation_modal.form.privacy', {
                    privacy,
                    terms,
                  }) as string,
                }}
              />
            </footer>
          </ValidatedForm>
        </section>
      </>
    );
  },
);

FormView.displayName = 'FormView';
