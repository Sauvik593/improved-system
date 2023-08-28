import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { startCase } from 'lodash';
import Link from 'next/link';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { HiddenInput } from '@components/common/FormInputs/HiddenInput';
import { LoadingButton } from '@components/common/LoadingButton';

import { LanguageContext } from '@contexts/LanguageContext';
import { CountryContext } from '@contexts/CountryContext';

import type { NewsletterFormProps } from '@components/Subscribe/Form/submitForm';
import { createDocsPath } from '@helpers/links';

interface Props {
  handleSubmit: () => void;
  register: UseFormRegister<NewsletterFormProps>;
  errors: FieldErrors<NewsletterFormProps>;
  submitting: boolean;
}

export const Form = ({ handleSubmit, register, errors, submitting }: Props) => {
  const { locale } = useContext(LanguageContext);
  const { country } = useContext(CountryContext);
  const docsPath = createDocsPath(locale, ['privacy']);
  const { t } = useTranslation('common');
  return (
    <section>
      <header>
        <h3 className="text-h-4 mb-3 font-semibold">{t('insights_newsletter.title')}</h3>
        <p className="mb-3">{t('insights_newsletter.description')}</p>
      </header>
      <form onSubmit={handleSubmit}>
        <BaseInput
          name="email"
          type="email"
          labelText="text-white"
          label={t('newsletter.email.label')}
          error={errors.email}
          register={register}
        />
        <HiddenInput name="hsLanguage" register={register} value={locale} />
        <HiddenInput
          name="defaultNationContact"
          register={register}
          value={startCase(country?.translation_key as string)}
        />
        <HiddenInput name="receiveMarketAnalysis" register={register} value={'true'} />
        <div className="mt-6">
          <LoadingButton
            color="sky"
            size="normal"
            loading={submitting}
            label={t('ui.buttons.subscribe')}
          />
        </div>
      </form>
      <footer className="text-p-3 mt-2 px-2 text-center font-semibold">
        {t('insights_newsletter.footer.privacy')}
        <Link href={docsPath}>
          <a className="ml-2 text-sky-100 hover:underline">
            {t('insights_newsletter.footer.policy')}
          </a>
        </Link>
      </footer>
    </section>
  );
};
