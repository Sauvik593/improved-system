import { ArrowForward } from '@kyero/icons';
import { Trans } from 'react-i18next';

import { GuidesCarousel } from '~/common/ui/carousels/guides';
import { useAppContext } from '~/common/contexts/app.context';

import { type GuidesResponse } from '../api/get-guides.server';

interface Props {
  guides: GuidesResponse;
  fallbackSection: {
    title: string;
    img: string;
    link: string;
  };
}

export const SectionGuides = ({ guides: { guides }, fallbackSection }: Props) => {
  const { countryName } = useAppContext();

  if (guides.length === 0) {
    return <FallbackSection {...fallbackSection} countryName={countryName} />;
  }

  return (
    <section className="bg-sierra-night-5 py-12" data-testid="homepage.section-guides">
      <div className="mx-auto max-w-[1176px] overflow-hidden px-5 pb-4 ">
        <h2
          className="text-h-2-sm md:text-h-3 text-tile-100 font-bold"
          data-testid="homepage.section-guides.title"
        >
          <Trans i18nKey="common.homepage.advice_section.title" />
        </h2>
        <a
          href={fallbackSection.link}
          data-testid="homepage.section-guides.link"
          className="text-h-5 text-ocean-100 focus:text-ocean-150 hover:text-ocean-150 mt-2 inline-flex items-center justify-between gap-2 font-bold"
        >
          <Trans i18nKey="common.homepage.advice_section.cta" values={{ countryName }} />
          <i>
            <ArrowForward />
          </i>
        </a>
        <div className="mt-4">
          <div className="min-h-[300px] w-[calc(100%+20px)] lg:min-h-[365px] lg:w-full">
            <GuidesCarousel elements={guides} />
          </div>
        </div>
      </div>
    </section>
  );
};

const FallbackSection = ({
  countryName,
  title,
  link,
  img,
}: {
  countryName: string;
  title: string;
  link: string;
  img: string;
}) => {
  return (
    <section
      className="bg-sierra-night-5 py-12 md:pt-24"
      data-testid="homepage.section-guides-fallback"
    >
      <div className="mx-auto max-w-[1176px] overflow-hidden px-5 pb-4 ">
        <h2
          className="text-h-2-sm md:text-h-3 text-tile-100 font-bold"
          data-testid="homepage.section-guides-fallback.title"
        >
          <Trans i18nKey="common.homepage.advice_section.title" />
        </h2>
        <p className="md:text-p-2 mt-2 lg:w-[44rem]">
          <Trans i18nKey={`common.homepage.advice_section.fallback.text`} />
        </p>
        <div className="mt-6">
          <a
            href={link}
            title={title}
            className="text-ocean-100 focus:bg-sierra-night-10 hover:bg-sierra-night-10 flex w-full items-center gap-3 rounded-lg bg-white p-4 sm:w-1/2 lg:w-1/4"
          >
            <img
              width="32px"
              height="32px"
              src={img}
              alt=""
              loading="lazy"
              className="bg-sierra-night-20 h-8 w-8 rounded-full"
              data-testid="homepage.section-guides-fallback.icon"
            />
            <span className="truncate font-bold" data-testid="homepage.section-guides-fallback.cta">
              {title}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
