import { Transition } from '@headlessui/react';
import cn from 'classnames';
import { useId, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { type FeaturedAgent } from '~/modules/agents/featured-agents-data.server';

interface Props {
  featuredAgents: FeaturedAgent[];
}

export const AgentFigure = ({ featuredAgents }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const id = useId();
  const agentDescId = `agent-desc-${id}`;
  const [featuredAgentId, setFeaturedAgentId] = useState<number | null>(null);
  const featuredAgent = featuredAgentId !== null ? featuredAgents[featuredAgentId] : null;

  const { ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    onChange: (inView) => {
      if (inView && !revealed) {
        const randomAgentId = Math.floor(Math.random() * featuredAgents.length);
        setFeaturedAgentId(randomAgentId);

        requestAnimationFrame(() => {
          setTimeout(() => {
            setRevealed(true);
          }, 300);
        });
      }
    },
  });

  return (
    <div ref={ref} className="relative w-full">
      <Transition
        show={!!featuredAgent}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <figure
          className="bg-tile-100 relative h-64 w-64 transform-gpu overflow-hidden rounded-full"
          aria-describedby={agentDescId}
          data-testid="agent-figure"
        >
          <img
            data-testid="agent-figure.image"
            src={featuredAgent?.photo}
            srcSet={`${featuredAgent?.photo_retina} 2x`}
            role="presentation"
            alt=""
            loading="lazy"
            className="absolute top-0 right-0 h-[95%] w-[95%] max-w-full rounded-full object-cover object-center"
          />
          <div
            className={cn(
              `z-1 duration-600 pointer-events-none absolute top-1/2 -left-1/2 h-full w-full origin-left  select-none rounded-full transition-transform delay-100 duration-500`,
              {
                [`rotate-0 bg-[url('/new-frontend-assets/images/shapes/pattern-ocean.svg')]`]:
                  revealed,
                ' rotate-45': !revealed,
              },
            )}
          />
        </figure>
        <div
          className="bg-sunshine-150 z-1 text-sierra-night-100 absolute bottom-6 left-48 flex flex-col overflow-hidden rounded-lg p-4 font-bold md:left-0  md:-bottom-4 md:w-[200px] lg:-right-[40%] lg:left-auto"
          id={agentDescId}
        >
          <span data-testid="agent-figure.name">{featuredAgent?.name}</span>
          <span data-testid="agent-figure.company">{featuredAgent?.company}</span>
        </div>
      </Transition>
    </div>
  );
};
