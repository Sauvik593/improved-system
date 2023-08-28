import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';

import { useHubspotForm } from '@hooks/useHubspotForm';

import { submitForm, NewsletterFormProps } from '@components/Subscribe/Form/submitForm';
import { createEmailValidationSchema } from '@components/Subscribe/Form/createEmailValidationSchema';

import { Form } from './Form';
import { ErrorView } from './ErrorView';
import { SuccessView } from './SuccessView';

export const Newsletter = () => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormProps>({
    resolver: yupResolver(createEmailValidationSchema(t)),
  });

  const { error, setFormState, submit, success } = useHubspotForm({
    formService: () => submitForm(getValues()),
  });

  const renderView = () => {
    switch (true) {
      case success:
        return <SuccessView email={getValues('email')} />;
      case error:
        return <ErrorView onRetry={() => setFormState('form')} />;
      default:
        return (
          <Form
            register={register}
            errors={errors}
            handleSubmit={handleSubmit(submit)}
            submitting={isSubmitting}
          />
        );
    }
  };

  return (
    <article className="flex h-full flex-col justify-center rounded-lg bg-[#123250] p-5 text-white">
      {renderView()}
    </article>
  );
};
