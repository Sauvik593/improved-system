import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  getEmailProps: (props: any) => any;
  emailError?: string | null;
  initialEmail: string | null;
  id: string;
}

export const EmailInput = ({ emailError, getEmailProps, initialEmail, id }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn('flex w-full ', {
        'mb-6': !!emailError,
      })}
    >
      <input
        type="text"
        className={cn('border-1 border-sierra-night-10 flex-1 rounded-md p-2 px-4', {
          'border-terracotta-100 text-terracotta-100 outline-terracotta-100 outline': emailError,
        })}
        placeholder={t('common.newsletter.section.form.email') as string}
        defaultValue={initialEmail}
        data-testid="email"
        {...getEmailProps({ id })}
      />
      {emailError && (
        <div
          className="border-terracotta-100 text-terracotta-100 absolute -bottom-2 rounded-md bg-white px-2"
          data-testid="email.error"
        >
          {emailError}
        </div>
      )}
    </div>
  );
};
