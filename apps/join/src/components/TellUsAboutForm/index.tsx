import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { startCase } from 'lodash';
import { createFormSchema } from './createFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { SuccessModal } from './SuccessModal';
import { TellUsAboutFormProps } from './submitForm';
import { useHubspotForm } from '@hooks/useHubspotForm';
import { submitForm } from './submitForm';
import { ErrorModal } from '../common/ErrorModal';
import { HiddenInput } from '@components/common/FormInputs/HiddenInput';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import { AddressFields } from './AddressFields';
import { LoadingButton } from '@components/common/LoadingButton';
import type { PlanKey } from '@components/Pricing/PlansSeed';
import { getPackageValue } from './getPackageValue';

export const TellUsAboutForm = ({
  listings,
  duration,
  isLoading,
}: {
  listings: string;
  duration: PlanKey;
  isLoading: boolean;
}) => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const { error, setFormState, submit, success } = useHubspotForm({
    formService: () => submitForm(getValues()),
  });
  const {
    handleSubmit,
    getValues,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TellUsAboutFormProps>({
    resolver: yupResolver(createFormSchema(t)),
  });

  useEffect(() => {
    if (isLoading) {
      reset();
    }
  }, [isLoading, reset]);

  const onClose = () => {
    setFormState('form');
    reset();
  };

  return (
    <section
      data-testid="form-wrapper"
      className="order-2 max-w-2xl rounded-xl bg-white shadow-sm sm:order-1"
    >
      <form className="text-tile-100 p-6" onSubmit={handleSubmit(submit)} data-testid="form">
        <header className="mb-4">
          <h3 className="text-h-4 lg:text-h-3 mb-2 font-bold">{t('tell_us_about.form.title')}</h3>
          <p className="text-p-2-sm lg:text-p-2">{t('tell_us_about.form.subtitle')}</p>
        </header>
        <section className="mb-4 grid grid-rows-none gap-y-4 lg:grid-cols-2 lg:gap-x-6">
          <BaseInput
            name={'firstName'}
            label={t('tell_us_about.form.first_name.label')}
            register={register}
            error={errors.firstName}
            testId="first-name"
          />

          <BaseInput
            name={'lastName'}
            label={t('tell_us_about.form.last_name.label')}
            register={register}
            error={errors.lastName}
            testId="last-name"
          />
        </section>

        <BaseInput
          name="email"
          label={t('tell_us_about.form.email.label')}
          register={register}
          error={errors.email}
          description={t('tell_us_about.form.email.description')}
          testId="email"
        />

        <p className="text-p-2-sm lg:text-p-2 my-4">{t('tell_us_about.form.business_info')}</p>

        <section className="space-y-4 lg:w-3/4">
          <BaseInput
            name={'company'}
            label={t('tell_us_about.form.company.label')}
            description={t('tell_us_about.form.company.description')}
            register={register}
            error={errors.company}
            testId="company-name"
          />

          <BaseInput
            name={'website'}
            label={t('tell_us_about.form.website.label')}
            description={t('tell_us_about.form.website.description')}
            register={register}
          />

          <BaseInput
            name={'phone'}
            label={t('tell_us_about.form.phone.label')}
            description={t('tell_us_about.form.phone.description')}
            register={register}
            error={errors.phone}
            testId="phone-number"
          />

          <BaseInput
            name={'taxNumberContact'}
            label={t('tell_us_about.form.vat_number.label')}
            description={t('tell_us_about.form.vat_number.description')}
            register={register}
            error={errors.taxNumberContact}
            testId="vat-number"
          />
        </section>
        <AddressFields register={register} errors={errors} />

        <HiddenInput
          name={'primePackageSelected'}
          register={register}
          value={getPackageValue(listings, duration)}
          testId={'prime-package-selected'}
        />
        <HiddenInput
          name={'defaultNationContact'}
          register={register}
          value={startCase(country?.translation_key as string)}
        />
        <HiddenInput name={'hsLanguage'} register={register} value={locale} />
        <footer className="my-4 space-y-3">
          <LoadingButton loading={isSubmitting} label={t('tell_us_about.form.cta.title')} />
        </footer>
      </form>
      <SuccessModal
        active={success}
        onClose={onClose}
        email={getValues('email')}
        name={getValues('firstName')}
      />
      <ErrorModal active={error} onClose={() => setFormState('form')} />
    </section>
  );
};
