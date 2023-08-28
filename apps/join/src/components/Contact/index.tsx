import { useTranslation } from 'next-i18next';

import { Hero } from '@components/common/Hero';
import { Testimonials } from '../Testimonials';
import { TrustedAgents } from '../TrustedAgents';
import { ContactForm } from './Form';
import { FormFooter } from './Form/Footer';
import type { AgentsSeed } from '@components/TrustedAgents/AgentsSeed';
import type { TestimonialsSeed } from '@components/Testimonials/TestimonialsSeed';

interface Props {
  agentsSeed: AgentsSeed;
  testimonialsSeed: TestimonialsSeed;
}

export const ContactDetails = ({ agentsSeed, testimonialsSeed }: Props) => {
  const { t } = useTranslation('common');
  return (
    <>
      <section className="bg-sierra-night-5 relative">
        <Hero
          title={t('contact.title')}
          description={t('contact.description')}
          type="left"
          paddingClassName="pt-16 pb-20 md:pb-48"
        />
        <div className="container relative mx-auto -mt-20 md:-mt-44">
          <div className="max-w-3xl rounded-xl bg-white shadow-sm">
            <div className="py-4 px-6">
              <div id="hubspot-form-wrapper">
                <ContactForm />
              </div>
            </div>
            <FormFooter />
          </div>
          <Testimonials testimonialsSeed={testimonialsSeed} />
        </div>
        <div className="pb-12 md:pb-24">
          <TrustedAgents agentsSeed={agentsSeed} />
        </div>
      </section>
    </>
  );
};
