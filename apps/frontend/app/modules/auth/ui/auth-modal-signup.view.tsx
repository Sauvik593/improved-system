import { Button } from '@kyero/ui';
import { useFetcher } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { Trans, useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { useModalsContext } from '~/common/contexts/modals.context';
import { InputField } from '~/common/ui/forms/input-field';
import { Checkbox } from '~/common/ui/forms/checkbox';

import { getFormSchema } from '~/modules/auth/signup.validator';
import { useEffect, useRef } from 'react';
import { useGlobalPendingState } from 'remix-utils';

import { AuthErrorMessage } from './auth-error-message';
import { AuthModalTopText } from './auth-modal.top-text';
import { useAppContext } from '~/common/contexts/app.context';
import { CoiFields } from '~/modules/marketing/ui/modal/coi-fields';
import { instrumentSignup } from '../instrumentation';
import { type SignupActionResponse } from '../signup.action.server';

interface Props {
  modalType: 'auth-desktop' | 'auth-mobile';
}

export const AuthModalSignupView = ({ modalType }: Props) => {
  const state = useGlobalPendingState();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const doneRef = useRef(false);
  const { openModal, closeModalWithParents } = useModalsContext();
  const { country } = useAppContext();
  const openLogin = () => openModal(modalType, { type: 'login' });
  const formSchema = getFormSchema(t);
  const data = (fetcher.data as SignupActionResponse) || {};

  useEffect(() => {
    const isSuccess = fetcher.data?.state === 'success' && fetcher.state === 'idle';

    if (doneRef.current) {
      return;
    }

    if (isSuccess) {
      closeModalWithParents(modalType);
      instrumentSignup(fetcher.data, country?.id);
      doneRef.current = true;
    }
  }, [fetcher.data, fetcher.state, closeModalWithParents, doneRef, modalType, country]);

  return (
    <div data-testid="auth-modal.signup">
      <AuthModalTopText text={t('common.auth.signup.title') as string} />
      {/* @ts-ignore */}
      {data?.error && <AuthErrorMessage error={data?.error} />}
      <ValidatedForm
        data-testid="auth-modal.signup.form"
        action="/kyero-api/auth/signup"
        id="signup-form"
        method="POST"
        fetcher={fetcher}
        validator={withZod(formSchema)}
      >
        <div className="items-start gap-4 md:flex">
          <InputField
            name="firstname"
            type="text"
            label={t('common.auth.common.form.first_name.label') as string}
            formId="signup-form"
            testId="signup-form-firstname"
          />
          <InputField
            name="lastname"
            type="text"
            label={t('common.auth.common.form.last_name.label') as string}
            className="mt-4 md:mt-0"
            formId="signup-form"
            testId="signup-form-lastname"
          />
        </div>
        <InputField
          name="email"
          type="email"
          label={t('common.auth.common.form.email.label') as string}
          className="mt-4"
          formId="signup-form"
          testId="signup-form-email"
        />
        <InputField
          name="password"
          type="password"
          label={t('common.auth.common.form.password.label') as string}
          className="mt-4"
          formId="signup-form"
          testId="signup-form-password"
        />

        {country && (
          <>
            <div className="mt-4">
              <Checkbox
                defaultChecked={false}
                label={t('common.buyers_guide.section.form.newsletter') as string}
                value="true"
                name="receive_weekly_newsletter"
                className="grid grid-cols-[24px_1fr]"
              />
              <CoiFields />
            </div>
          </>
        )}
        <Button
          fullWidth
          buttonType="blue"
          message={t('common.auth.signup.cta') as string}
          variant="full"
          type="submit"
          className="mt-4"
          disabled={fetcher.state === 'submitting' || state === 'pending'}
        />
      </ValidatedForm>
      <div className="mb-14">
        <p className="mt-4 text-center font-bold">
          <Trans i18nKey="common.auth.signup.switch_to_login" />{' '}
          <button
            className="text-ocean-100 inline-flex hover:underline focus:underline"
            onClick={openLogin}
            data-testid="auth-modal.signup.switch-to-login"
          >
            <Trans i18nKey="common.auth.login_button" />
          </button>
        </p>
      </div>
      <footer className="bg-sierra-night-5 text-sierra-night-100 text-p-3 -m-8 p-8">
        <Trans i18nKey="common.auth.signup.disclaimer" />
      </footer>
    </div>
  );
};
