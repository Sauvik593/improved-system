import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';
import NextImage from 'next/image';
import { AgentsSeed } from './AgentsSeed';
import { CountryContext } from '@contexts/CountryContext';
import { getAssetsUrl } from '@helpers/assetsUrl';

interface Props {
  agentsSeed: AgentsSeed;
}

export const TrustedAgents = ({ agentsSeed }: Props) => {
  const { t } = useTranslation('common');
  const { country } = useContext(CountryContext);
  return (
    <section className="md:bg-sierra-night-5 mt-4 bg-white pt-10 pb-[85px] md:mt-0 md:pb-0">
      <div className="container relative mx-auto">
        <div className="rounded-md py-3 md:bg-white md:py-10 lg:px-8 lg:py-10">
          <h3 className="text-h-4 md:text-h-3 text-sierra-night-100 mb-4 text-center font-bold">
            {t('general.agent_display.title')}
          </h3>
          <ul className="grid grid-cols-3 grid-cols-3 items-center justify-around gap-5 lg:flex xl:gap-6">
            {agentsSeed[country?.translation_key as string].map((agent) => (
              <li
                key={agent.name}
                className="bg-clay-100 mx-auto flex h-20 w-24 items-center justify-center rounded sm:h-28 sm:w-40"
              >
                <figure className="relative h-14 w-14 sm:h-20 sm:w-20">
                  <NextImage
                    src={getAssetsUrl(`/static/agents/${agent.figure}.webp`)}
                    objectFit="contain"
                    layout="fill"
                    alt={t('general.agent_display.alt', { name: agent.name })}
                  />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
