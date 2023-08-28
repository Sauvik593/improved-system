import { useContext } from 'react';
import { startCase } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { createContactFormSchema } from './createContactFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { HiddenInput } from '@components/common/FormInputs/HiddenInput';
import { SelectInput } from '@components/common/FormInputs/SelectInput';
import { ContactFormProps } from './submitForm';
import { submitForm } from './submitForm';
import { SuccessModal } from '../SuccessModal';
import { useHubspotForm } from '@hooks/useHubspotForm';
import { LanguageContext } from '@contexts/LanguageContext';

import { Radio } from '@kyero/ui';
import { ErrorModal } from '@components/common/ErrorModal';
import { LoadingButton } from '@components/common/LoadingButton';
import { CountryContext } from '@contexts/CountryContext';
import { mapCitiesToOptions, PROPERTIES_NUMBER, TIME_TO_CALL, GET_IN_TOUCH } from './formOptions';

export const ContactForm = () => {
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const CITY_OPTIONS = mapCitiesToOptions(country?.translation_key as string);

  const { t } = useTranslation('common');
  const BASED_OPTIONS = [
    { value: 'Advertiser', label: t('contact.form.user_type.options.new') },
    { value: 'Estate Agent', label: t('contact.form.user_type.options.current_agent') },
    { value: 'Developer', label: t('contact.form.user_type.options.developer') },
    { value: 'Buyer', label: t('contact.form.user_type.options.buyer') },
    { value: 'Other', label: t('contact.form.user_type.options.other') },
  ];

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormProps>({
    resolver: yupResolver(createContactFormSchema(t)),
  });
  const { error, setFormState, submit, success } = useHubspotForm({
    formService: () => submitForm(getValues()),
  });

  const closeModal = () => {
    setFormState('form');
    reset();
  };
  return (
    <section data-testid="contact-wrapper">
      <form onSubmit={handleSubmit(submit)} className="text-tile-100" data-testid="form">
        <h3 className="text-h-3-sm lg:text-h-3 text-tile-100 my-2 font-bold">
          {t('contact.form.header')}
        </h3>
        <p className="mb-4">{t('contact.form.contact_information')}</p>
        <div className="mb-4 grid grid-rows-none gap-y-4 lg:grid-cols-2 lg:gap-x-6">
          <BaseInput
            name={'firstName'}
            label={t('contact.form.first_name.label')}
            register={register}
            error={errors.firstName}
            testId="first-name"
          />

          <BaseInput
            name={'lastName'}
            label={t('contact.form.last_name.label')}
            register={register}
            error={errors.lastName}
            testId="last-name"
          />

          <BaseInput
            name={'email'}
            label={t('contact.form.work_email.label')}
            register={register}
            type="email"
            error={errors.email}
            testId="email"
          />

          <BaseInput
            name={'phone'}
            label={t('contact.form.phone_number.label')}
            register={register}
            defaultValue={null}
            error={errors.phone}
            testId="phone-number"
          />
        </div>
        <div>
          <p className="mb-2">{t('contact.form.business_information')}</p>
          <div className="mb-4 gap-y-4 lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-6">
            <BaseInput
              className="my-2"
              name={'company'}
              label={t('contact.form.business_name.label')}
              register={register}
              error={errors.company}
              testId="company-name"
            />
            <div className="py-2">
              <Controller
                name="userType"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <SelectInput
                    value={value}
                    name={name}
                    onChange={onChange}
                    options={BASED_OPTIONS}
                    placeholder={t('contact.form.select.placeholder')}
                    label={t('contact.form.user_type.label')}
                    testId="user-type"
                    error={errors.userType}
                  />
                )}
              />
            </div>
          </div>
          <div className="my-6 space-y-4 lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-6 lg:space-y-0">
            <Controller
              name="agentMainProvinceContact"
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <SelectInput
                  value={value}
                  name={name}
                  onChange={onChange}
                  options={CITY_OPTIONS}
                  placeholder={t('contact.form.select.placeholder')}
                  label={t('contact.form.agent_province.label')}
                />
              )}
            />

            <Controller
              name="numberOfPropertiesEnquire"
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <SelectInput
                  value={value}
                  name={name}
                  onChange={onChange}
                  options={PROPERTIES_NUMBER}
                  placeholder={t('contact.form.select.placeholder')}
                  label={t('contact.form.properties_number.label')}
                />
              )}
            />
          </div>
        </div>

        <div>
          <div className="mb-5 items-end lg:grid lg:grid-cols-2 lg:gap-x-6">
            <div>
              <p className="text-p-2 md:text-h-6 mb-4 font-bold">
                {t('contact.form.arrange_callback')}
              </p>
              <div className="space-y-4 lg:flex lg:items-center lg:space-y-0 lg:space-x-4">
                <Controller
                  name="timeOfDay"
                  control={control}
                  render={({ field: { onChange, name } }) => (
                    <>
                      {TIME_TO_CALL.map((option) => (
                        <Radio
                          onChange={onChange}
                          key={option.label}
                          defaultChecked={false}
                          label={t(option.label)}
                          name={name}
                          value={option.value}
                        />
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="mt-5 lg:mt-0">
              <p className="text-p-2 md:text-h-6 mb-4 font-bold">
                {t('contact.form.get_in_touch.label')}
              </p>
              <div className="space-y-4 lg:flex lg:items-center lg:space-y-0 lg:space-x-4">
                <Controller
                  name="preferredFormOfContact"
                  control={control}
                  render={({ field: { onChange, name } }) => (
                    <>
                      {GET_IN_TOUCH.map((option) => (
                        <Radio
                          onChange={onChange}
                          key={option.label}
                          defaultChecked={false}
                          label={t(option.label)}
                          name={name}
                          value={option.value}
                        />
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <HiddenInput
          name={'defaultNationContact'}
          register={register}
          value={startCase(country?.translation_key as string)}
        />
        <HiddenInput name={'hsLanguage'} register={register} value={locale} />
        <HiddenInput name={'receiveMarketAnalysis'} register={register} value={'true'} />
        <footer className="text-h-5-sm lg:text-h-5 mt-3 w-full lg:w-1/4">
          <LoadingButton loading={isSubmitting} label={t('contact.form.submit')} />
        </footer>
      </form>
      <SuccessModal active={success} onClose={closeModal} email={getValues('email')} />
      <ErrorModal active={error} onClose={() => setFormState('form')} />
    </section>
  );
};
