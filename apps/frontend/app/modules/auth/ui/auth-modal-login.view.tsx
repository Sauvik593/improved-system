import { Button } from '@kyero/ui';
import { useFetcher } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { Trans, useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { useModalsContext } from '~/common/contexts/modals.context';
import { InputField } from '~/common/ui/forms/input-field';

import { getFormSchema } from '~/modules/auth/login.validator';
import { useEffect, useRef } from 'react';
import { useGlobalPendingState } from 'remix-utils';

import { AuthJoinMessage } from './auth-join.message';
import { AuthErrorMessage } from './auth-error-message';
import { AuthModalTopText } from './auth-modal.top-text';
import { instrumentLogin } from '../instrumentation';
import { useNavLinks } from '~/common/hooks/use-nav-links';

interface Props {
  modalType: 'auth-desktop' | 'auth-mobile';
}

export const AuthModalLoginView = ({ modalType }: Props) => {
  const state = useGlobalPendingState();
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const doneRef = useRef(false);
  const { forgotPassword } = useNavLinks();
  const { openModal, closeModalWithParents } = useModalsContext();
  const openSignup = () => openModal(modalType, { type: 'signup' });
  const formSchema = getFormSchema(t);
  const data = fetcher.data || {};

  useEffect(() => {
    const isSuccess = fetcher.data?.state === 'success' && fetcher.state === 'idle';

    if (doneRef.current) {
      return;
    }

    if (isSuccess) {
      closeModalWithParents(modalType);
      instrumentLogin(fetcher.data);
      doneRef.current = true;
    }
  }, [fetcher.data, fetcher.state, closeModalWithParents, doneRef, modalType]);

  return (
    <div data-testid="auth-modal.login">
      <AuthModalTopText text={t('common.auth.login.title') as string} />
      {data.error && <AuthErrorMessage error={data.error} />}
      <ValidatedForm
        data-testid="auth-modal.login.form"
        action="/kyero-api/auth/login"
        method="POST"
        fetcher={fetcher}
        validator={withZod(formSchema)}
      >
        <InputField
          name="email"
          type="email"
          placeholder={t('common.auth.common.form.email.placeholder') as string}
          label={t('common.auth.common.form.email.label') as string}
          testId="login-form-email"
        />
        <InputField
          name="password"
          type="password"
          placeholder={t('common.auth.common.form.password.placeholder') as string}
          label={t('common.auth.common.form.password.label') as string}
          className="mt-4"
          testId="login-form-password"
        >
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a
            href={forgotPassword}
            className="text-ocean-100 hover:text-ocean-150 focus:text-ocean-150 text-p-3 md:text-p-2 max-w-[120px] truncate font-semibold md:max-w-[300px]"
          >
            <Trans i18nKey={'common.auth.login.forgot_password'} />
          </a>
        </InputField>
        <Button
          fullWidth
          buttonType="blue"
          message={t('common.auth.login.cta') as string}
          variant="full"
          type="submit"
          className="mt-4"
          disabled={fetcher.state === 'submitting' || state === 'pending'}
        />
      </ValidatedForm>
      <div>
        <p className="mt-4 text-center font-bold">
          <button
            className="text-ocean-100 inline-flex hover:underline focus:underline"
            onClick={openSignup}
            data-testid="auth-modal.login.switch-to-signup"
          >
            <Trans i18nKey="common.auth.login.switch_to_signup" />
          </button>
        </p>
      </div>
      <footer className="text-sierra-night-100 mt-8 text-center md:hidden">
        <AuthJoinMessage onOpenSignup={openSignup} />
      </footer>
    </div>
  );
};
