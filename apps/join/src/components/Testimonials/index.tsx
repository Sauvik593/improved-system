import React, { useContext } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'next-i18next';
import NextImage from 'next/image';

import { CountryContext } from '@contexts/CountryContext';

import { getAssetsUrl } from '@helpers/assetsUrl';
import type { TestimonialsSeed } from './TestimonialsSeed';
import { LanguageContext } from '@contexts/LanguageContext';

interface Props {
  testimonialsSeed: TestimonialsSeed;
}

const settings = {
  dots: false,
  arrows: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const Testimonials = ({ testimonialsSeed }: Props) => {
  const { t } = useTranslation('common');
  const { country } = useContext(CountryContext);
  const { locale } = useContext(LanguageContext);
  const fallbackCountry = country ? country.translation_key : 'default';
  return (
    <section className="bg-sierra-night-5 relative py-5 lg:pb-10 lg:pt-16">
      <div className="container mx-auto">
        <h3 className="text-h-4 lg:text-h-3 text-sierra-night-100 mb-5 pb-5 text-center font-bold">
          {t('general.testimonials.title')}
        </h3>
        <div className="testimonials-slider mt-5">
          <Slider {...settings}>
            {testimonialsSeed[fallbackCountry].map((testimonial) => {
              const quote = testimonial[locale as keyof typeof testimonial];
              return (
                <article key={testimonial.agent} className="w-100">
                  <div className="px-2 pt-2">
                    <NextImage
                      src={getAssetsUrl('/static/testimonials/doublequotes.svg')}
                      alt={t('general.testimonials.quotes.alt')}
                      width={45}
                      height={32}
                      className="mb-6"
                    />
                    <h3 className="text-h-4-sm my-6 font-medium leading-7">“{quote}”</h3>
                  </div>
                  <div className="flex items-center">
                    <figure className="mr-5">
                      <NextImage
                        className="inline-block rounded-full bg-white"
                        src={getAssetsUrl(`static/agents/${testimonial.figure}.webp`)}
                        height={64}
                        objectFit="contain"
                        width={64}
                        alt={t('general.agent_display.alt', { name: testimonial.agent })}
                      />
                    </figure>
                    <figcaption className="py-2">
                      {testimonial.client && (
                        <h3 className="text-h-5-sm text-sierra-night-100  overflow-hidden font-bold md:min-h-max">
                          {testimonial.client}
                        </h3>
                      )}
                      <p className="text-h-5-sm line-clamp-5 font-normal">{testimonial.agent}</p>
                    </figcaption>
                  </div>
                </article>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
