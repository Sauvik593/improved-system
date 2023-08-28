import { Button } from '@kyero/ui';
import { Trans, useTranslation } from 'react-i18next';
import { useAppContext } from '~/common/contexts/app.context';
import { useNavLinks } from '~/common/hooks/use-nav-links';
import { AgentFigure } from '~/common/ui/agent-figure';
import { CurvedSection } from '~/common/ui/curved-section';

import { type FeaturedAgent } from '~/modules/agents/featured-agents-data.server';

interface Props {
  featuredAgents: FeaturedAgent[];
}

export const SectionAgentDirectory = ({ featuredAgents }: Props) => {
  const { t } = useTranslation();
  const { countryName } = useAppContext();
  const { agents_search } = useNavLinks();

  return (
    <CurvedSection
      prevSectionColor="#F4F4F7"
      nextSectionColor="#E9E9EE"
      sectionClassName="bg-sunshine-100"
      className="flex flex-col pb-36 md:flex-row md:items-center md:pb-36"
      testId="agent-directory-section"
    >
      <header className="text-sierra-night-100 order-2 mt-8 md:order-1 md:mt-2 md:w-8/12  lg:w-7/12">
        <h2 className="text-h-4-sm md:text-h-3 text-sierra-night-100 font-bold md:mr-12">
          <Trans i18nKey="common.homepage.agents_section.title" />
        </h2>
        <p className="text-p-2 mt-3">
          <Trans i18nKey="common.homepage.agents_section.copy" />
        </p>
        <Button
          buttonType="blue"
          variant="full"
          className="mt-4 w-full truncate md:w-auto"
          linkProps={{ to: agents_search }}
          message={t('common.homepage.agents_section.cta', { countryName }) as string}
        />
      </header>
      <aside className="lg:justify-centerl relative order-1 md:order-2 md:w-5/12 md:justify-end md:px-0">
        <div className="min-h-[2px] md:mx-auto md:flex md:h-64 md:w-64 md:translate-x-20 md:-translate-y-8 md:justify-end lg:translate-y-0 lg:translate-x-0">
          <AgentFigure featuredAgents={featuredAgents} />
        </div>
      </aside>
    </CurvedSection>
  );
};
