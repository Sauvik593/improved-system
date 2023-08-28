import { Trans } from 'react-i18next';
import { Accordion } from '~/common/ui/accordion';
import { CurvedSection } from '~/common/ui/curved-section';
import { useAppContext } from '~/common/contexts/app.context';
import { type FAQ } from '../api/get-faqs.server';

interface Props {
  faqs: FAQ[];
}

export const SectionFAQ = ({ faqs }: Props) => {
  const { countryName } = useAppContext();
  return (
    <>
      <LDSchemaFAQ faqs={faqs} />
      <CurvedSection
        sectionClassName="bg-white"
        nextSectionColor="#ffffff"
        className="py-4 pb-0 md:py-12 md:pb-0 "
        wrapperClassName="overflow-hidden"
      >
        <h2 className="text-h-2-sm md:text-h-3 text-sierra-night-100 font-bold">
          <Trans i18nKey="common.homepage.faq_section.title" values={{ countryName }} />
        </h2>
        <div className="-mx-4 mt-4 md:mx-0">
          {faqs.map((faq: FAQ) => (
            <Accordion key={faq.title} {...faq} />
          ))}
        </div>
      </CurvedSection>
    </>
  );
};

const LDSchemaFAQ = ({ faqs }: Props) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      name: faq.title,
      type: 'Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.content,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      data-testid="homepage.faqs-json"
    />
  );
};
