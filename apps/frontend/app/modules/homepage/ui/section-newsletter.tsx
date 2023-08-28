import { Trans, useTranslation } from 'react-i18next';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { CurvedSection } from '~/common/ui/curved-section';
import { NewsletterForm } from '~/modules/marketing/ui/newsletter-form';

export const SectionNewsletter = () => {
  const { t } = useTranslation();
  const { privacy } = useNavLinks();
  return (
    <CurvedSection
      sectionClassName="bg-ocean-100"
      prevSectionColor="#ffffff"
      nextSectionColor="#ffffff"
      wrapperClassName="overflow-hidden text-center"
      className="mx-auto max-w-3xl px-4 md:py-14 md:pb-10 lg:pt-20"
    >
      <h3 className="text-h-4-sm md:text-h-4 font-bold text-white">
        <Trans i18nKey="common.newsletter.section.title" />
      </h3>
      <div className="mt-2">
        <NewsletterForm />
        <p
          className="mt-8 text-white"
          dangerouslySetInnerHTML={{
            __html: t('common.newsletter.section.form.privacy', { policy: privacy }),
          }}
        />
      </div>
    </CurvedSection>
  );
};
