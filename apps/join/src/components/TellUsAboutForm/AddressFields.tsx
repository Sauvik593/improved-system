import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { useTranslation } from 'next-i18next';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { TellUsAboutFormProps } from './submitForm';

interface Props {
  register: UseFormRegister<TellUsAboutFormProps>;
  errors: FieldErrors<TellUsAboutFormProps>;
}

export const AddressFields = ({ errors, register }: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="my-4 grid grid-rows-none gap-y-3 lg:grid-cols-2 lg:gap-x-6">
      <div className="lg:col-span-2">
        <BaseInput
          name={'address'}
          label={t('tell_us_about.form.address.label')}
          register={register}
          error={errors.address}
          testId="address"
        />
      </div>

      <BaseInput
        name={'city'}
        label={'Town'}
        register={register}
        error={errors.city}
        testId="address-town"
      />

      <BaseInput
        name={'state'}
        label={t('tell_us_about.form.region.label')}
        register={register}
        error={errors.state}
        testId="address-region"
      />

      <BaseInput
        name={'zip'}
        label={t('tell_us_about.form.postcode.label')}
        register={register}
        error={errors.zip}
        testId="address-postcode"
      />

      <BaseInput
        name={'country'}
        label={t('tell_us_about.form.country.label')}
        register={register}
        error={errors.country}
        testId="address-country"
      />
    </section>
  );
};
