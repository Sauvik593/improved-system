import { useForm } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import cn from 'classnames';

import { yupResolver } from '@hookform/resolvers/yup';

import { useHubspotForm } from '@hooks/useHubspotForm';

import { DesktopTopBg } from './DesktopTopBg';
import { MobileTopBg } from './MobileTopBg';
import { DesktopBottomBg } from './DesktopBottomBg';
import { MobileBottomBg } from './MobileBottomBg';
import { createEmailValidationSchema } from './Form/createEmailValidationSchema';
import { submitForm, NewsletterFormProps } from './Form/submitForm';
import { Form } from './Form';
import { SuccessView } from './Form/SuccessView';
import { ErrorView } from './Form/ErrorView';

interface Props {
  className?: string;
}

export const Subscribe = ({ className }: Props) => {
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
    <section className={cn('relative w-full', className)}>
      <div className="relative hidden w-full lg:block xl:-mb-[1px]">
        <DesktopTopBg />
      </div>
      <div className="relative block w-full lg:hidden">
        <MobileTopBg />
      </div>
      <div className="bg-[#1f3b71] px-4 pt-10 pb-2 md:px-0">
        <div className="flex justify-center text-white">{renderView()}</div>
      </div>
      <div className="relative hidden w-full bg-white pb-4 lg:block">
        <DesktopBottomBg />
      </div>
      <div className="relative block w-full bg-white pb-6 lg:hidden">
        <MobileBottomBg />
      </div>
    </section>
  );
};
