import { useContext } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

import { useTranslation } from 'next-i18next';
import { startCase } from 'lodash';

import { LoadingButton } from '@components/common/LoadingButton';
import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { HiddenInput } from '@components/common/FormInputs/HiddenInput';
import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';
import { NewsletterFormProps } from './submitForm';
import { NewsletterFooter } from '../NewsletterFooter';

interface Props {
  handleSubmit: () => void;
  register: UseFormRegister<NewsletterFormProps>;
  errors: FieldErrors<NewsletterFormProps>;
  submitting: boolean;
}

export const Form = ({ handleSubmit, register, errors, submitting }: Props) => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  return (
    <div data-testid="form-wrapper" className="lg:max-w-3xl">
      <h3 className="text-h-4-sm lg:text-h-4 mx-auto mb-4 text-center font-bold">
        {t('newsletter.title')}
      </h3>
      <form onSubmit={handleSubmit} data-testid="form">
        <div className="mx-auto mb-5 w-3/4 lg:grid lg:grid-cols-3 lg:gap-2">
          <div className="w-full lg:col-span-2 lg:mr-4">
            <BaseInput
              name="email"
              type="email"
              placeholder={t('newsletter.email.placeholder')}
              register={register}
              error={errors.email}
              testId="email"
              showTooltip
            />
          </div>
          <HiddenInput name="hsLanguage" register={register} value={locale} />
          <HiddenInput
            name="defaultNationContact"
            register={register}
            value={startCase(country?.translation_key as string)}
          />
          <HiddenInput name="receiveMarketAnalysis" register={register} value={'true'} />
          <div className="text-h-5-sm lg:text-h-5 mt-4 lg:mt-0 lg:grid-cols-1">
            <LoadingButton
              color="sky"
              size="normal"
              loading={submitting}
              label={t('ui.buttons.subscribe')}
            />
          </div>
        </div>
        <NewsletterFooter />
      </form>
    </div>
  );
};
