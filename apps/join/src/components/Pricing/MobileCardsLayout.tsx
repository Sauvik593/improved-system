import { useTranslation } from 'next-i18next';

import cn from 'classnames';
import Slider from 'react-slick';

import { PlanCard } from './PlanCard';
import { tabPanelKeys, type PlanKey, PlansSeed } from './PlansSeed';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerPadding: '20px',
  centerMode: true,
  responsive: [
    {
      breakpoint: 565,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface Props {
  onClick: (option: PlanKey) => void;
  active: PlanKey;
  plansSeed: PlansSeed;
}

export const MobileCardsLayout = ({ active, onClick, plansSeed }: Props) => {
  const { t } = useTranslation('common');

  return (
    <section className="-mt-32">
      <header className="mx-auto mb-4 flex items-center justify-center gap-3">
        <p className="text-h-5 font-bold text-white">{t('pricing.kyero_prime.show_prices')}</p>
        <div>
          <select
            className={cn(`bg-ocean-80 w-full rounded-md p-2 pr-8 text-white`)}
            value={active}
            onChange={(event) => onClick(event.target.value as PlanKey)}
          >
            {tabPanelKeys.map((key) => (
              <option key={key} value={key}>
                {t(`pricing.kyero_prime.filters.${key}`)}
              </option>
            ))}
          </select>
        </div>
      </header>
      <section>
        <Slider {...settings}>
          {plansSeed[active].map((plan) => (
            <PlanCard {...plan} key={`${plan.type}_${plan.primeListings}`} />
          ))}
        </Slider>
      </section>
    </section>
  );
};
