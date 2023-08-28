import React from 'react';

import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';
import { getAssetsUrl } from '@helpers/assetsUrl';
import { CountryCarouselItem } from './CountryCarouselSeed';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  swipe: true,
  touchThreshold: 100,
  swipeToSlide: true,
  centerMode: true,
  centerPadding: '60px',
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
      },
    },
  ],
};

interface Props {
  countryCarousel: CountryCarouselItem[];
}

export const GetAccess = ({ countryCarousel }: Props) => {
  const { t } = useTranslation('common');
  return (
    <section className="bg-sierra-night-5 py-5 lg:py-10">
      <div className="container mx-auto">
        <h3 className="text-h-4 md:text-h-3 text-sierra-night-100 mb-2 font-bold lg:text-center">
          {t('homepage.international_audience.title')}
        </h3>
        <p className="text-h-5-sm text-sierra-night-100 mb-5 lg:text-center">
          {t('homepage.international_audience.description')}
        </p>
      </div>
      <div className="container mx-auto mt-4">
        <Slider {...settings} className="international-buyer-slider">
          {countryCarousel.map((country, index) => (
            <article
              key={`${t(`${country.key}.title`)}_${index}`}
              className="overflow-hidden rounded-lg bg-white py-4"
              style={{ width: 200 }}
            >
              <figure className="relative mx-auto flex items-center justify-center">
                <NextImage
                  src={getAssetsUrl(country.figure)}
                  alt={t(`${country.key}.alt`)}
                  width={56}
                  height={56}
                />
              </figure>
              <figcaption className="py-2 text-center lg:text-center">
                <h3 className="text-h-5-sm lg:text-h-5 text-sierra-night-100 mb-2  overflow-hidden font-bold ">
                  {t(`${country.key}.title`)}
                </h3>
                <p className="text-p-2">{country.population}</p>
                <span className="text-p-2">
                  {t('homepage.international_audience.unique_visits')}
                </span>
              </figcaption>
            </article>
          ))}
        </Slider>
      </div>
    </section>
  );
};
