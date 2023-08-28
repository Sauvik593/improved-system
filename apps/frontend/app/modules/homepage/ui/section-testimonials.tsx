import { Trans } from 'react-i18next';
import { CurvedSection } from '~/common/ui/curved-section';
import { TestimonialsCarousel } from '~/common/ui/carousels/testimonials';

import { type Testimonial } from '../api/get-testimonials.server';
import { TrustPilotWidget } from '~/common/ui/trustpilot-widget';
import { useAppContext } from '~/common/contexts/app.context';

interface Props {
  testimonials: Testimonial[];
}

export const SectionTestimonials = ({ testimonials }: Props) => {
  const { locale } = useAppContext();
  return (
    <CurvedSection
      nextSectionColor="#FFFFFF"
      sectionClassName="bg-sierra-night-10"
      className="py-4 md:py-4"
      bottomPattern="banner-leaf-image"
      wrapperClassName="overflow-hidden"
      testId="homepage.testimonials_section"
    >
      <>
        <header className="text-sierra-night-100">
          <h2 className="text-h-2-sm md:text-h-3 text-tile-100 font-bold">
            <Trans i18nKey="common.homepage.testimonials_section.title" />
          </h2>
        </header>
        <div className="mt-6">
          <div className="flex w-[calc(100%+40px)] lg:w-full">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
          <TrustPilotWidget locale={locale} key={locale} />
        </div>
      </>
    </CurvedSection>
  );
};
