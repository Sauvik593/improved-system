import { useTranslation } from 'next-i18next';

export const FormFooter = () => {
  const { t } = useTranslation('common');
  return (
    <div className="bg-sierra-night-10 rounded-br-lg rounded-bl-lg py-5 px-8">
      <div
        className="text-sierra-night-100"
        dangerouslySetInnerHTML={{
          __html: t('contact.form.footer.terms_and_privacy', {
            interpolation: { escapeValue: false },
          }),
        }}
      />
    </div>
  );
};
