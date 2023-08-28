import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { useInternalLinks } from '@hooks/useInternalLinks';

import { tabPanelKeys, type PlanKey, PlansSeed } from './PlansSeed';
import { CardsLayout } from './CardsLayout';
import { MobileCardsLayout } from './MobileCardsLayout';

interface Props {
  plansSeed: PlansSeed;
}

export const Plans = (props: Props) => {
  const { t } = useTranslation('common');
  const { contactPath } = useInternalLinks();
  const [selectedOption, setSelectedOption] = useState<PlanKey>(tabPanelKeys[0]);

  const handleChange = (option: PlanKey) => {
    setSelectedOption(option);
  };
  return (
    <section>
      <div className="container relative mx-auto hidden md:block">
        <CardsLayout
          onClick={setSelectedOption}
          active={selectedOption}
          plansSeed={props.plansSeed}
        />
      </div>
      <div className="relative md:hidden">
        <MobileCardsLayout
          onClick={handleChange}
          active={selectedOption}
          plansSeed={props.plansSeed}
        />
      </div>
      <section className="container mx-auto my-8 text-center">
        <Link href={contactPath}>
          <a className="text-sierra-night-100 hover:text-orange-100 focus:text-orange-100">
            {t('pricing.kyero_prime.contact')}
          </a>
        </Link>
      </section>
    </section>
  );
};
