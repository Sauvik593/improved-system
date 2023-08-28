import cn from 'classnames';
import Carousel, { type DotProps } from 'react-multi-carousel';

import { type Property } from '~/modules/homepage/api/get-top-properties.server';
import { AsyncImage } from './async-image';
import { useTranslation } from 'react-i18next';
import { assetsPathTo } from '../client-router/helpers';

import BuildSize from '~/../public/images/icons/build_size.svg';
import Bathroom from '~/../public/images/icons/bathroom.svg';
import Bedroom from '~/../public/images/icons/bedroom.svg';

const BREAKPOINTS = {
  mobile: {
    breakpoint: { max: 3000, min: 0 },
    partialVisibilityGutter: 0,
    items: 1,
  },
};

export const PropertyCard = ({
  images,
  images_count,
  bathroom_count,
  bedroom_count,
  built_m2,
  name,
  price_formatted,
  agent,
  path,
}: Property) => {
  const stopPropagation = (ev: any) => {
    ev.stopPropagation();
  };

  const { t } = useTranslation();

  return (
    <article className="shadow-home-card flex h-full flex-col overflow-hidden rounded-md">
      <div
        className="relative h-[216px]"
        onTouchStart={stopPropagation}
        onTouchEnd={stopPropagation}
        onMouseDown={stopPropagation}
        onMouseUp={stopPropagation}
      >
        <figure className="z-1 shadow-card translate-x absolute top-3 right-3 inline-flex transform-gpu items-center justify-center gap-2 rounded-md bg-white px-2 py-1">
          <img
            src={assetsPathTo('/images/icons/camera.svg')}
            width={20}
            height={20}
            loading="lazy"
            role="presentation"
            alt=""
            title={t('common.ui.icons.gallery_size') as string}
            draggable={false}
          />
          <figcaption className="text-sierra-night-100 text-p-3 font-semibold">
            <span className="sr-only">{t('common.ui.icons.gallery_size') as string}</span>
            <span>{images_count}</span>
          </figcaption>
        </figure>
        <Carousel
          responsive={BREAKPOINTS}
          renderArrowsWhenDisabled={false}
          containerClass="h-full w-full relative"
          dotListClass="list-gallery-dots"
          customLeftArrow={null}
          customRightArrow={null}
          sliderClass="flex h-full"
          customDot={<CarouselDot />}
          itemClass="h-full relative w-full"
          deviceType="mobile"
          showDots
          ssr
        >
          {images.map((imageSrc, index) => {
            return (
              <AsyncImage
                key={index}
                imageUrl={imageSrc}
                alt={t('common.property_gallery.image_alt', {
                  propertyDescription: name,
                  number: index + 1,
                })}
                className="pointer-events-none absolute h-full w-full select-none object-cover"
              />
            );
          })}
        </Carousel>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="pb- grid grid-cols-[1fr_40px] gap-1 bg-white p-4">
          <div className="text-tile-100">
            <h3 className="text-p-2 leading-tight">
              <a href={path} draggable={false} className="hover:underline focus:underline">
                {name}
              </a>
            </h3>
            <p className="mt-1 font-bold">{price_formatted}</p>
          </div>
          <aside>
            <a href={path} draggable={false}>
              <figure>
                <img
                  src={agent.logo_url}
                  alt={agent.name}
                  draggable={false}
                  loading="lazy"
                  width="40px"
                  height="40px"
                />
              </figure>
            </a>
          </aside>
        </header>
        <footer className="mt-auto px-4 pb-4">
          <ul className="text-sierra-night-100 flex gap-4">
            <li className="flex items-center gap-2">
              <img
                src={Bedroom}
                width={20}
                height={20}
                loading="lazy"
                alt={t('common.ui.icons.bedrooms') as string}
                title={t('common.ui.icons.bedrooms') as string}
              />
              <p>{bedroom_count}</p>
            </li>
            <li className="flex items-center gap-2">
              <img
                src={Bathroom}
                width={20}
                height={20}
                loading="lazy"
                alt={t('common.ui.icons.bathrooms') as string}
                title={t('common.ui.icons.bathrooms') as string}
              />
              <p>{bathroom_count}</p>
            </li>
            <li className="flex items-center gap-2">
              <img
                src={BuildSize}
                width={20}
                height={20}
                loading="lazy"
                alt={t('common.ui.icons.build_size') as string}
                title={t('common.ui.icons.build_size') as string}
              />
              <p>{built_m2}</p>
            </li>
          </ul>
        </footer>
      </div>
    </article>
  );
};

export const CarouselDot = ({ active, onClick, index }: DotProps) => (
  <li>
    <button
      type="button"
      className={cn('list-gallery-dot', {
        'list-gallery-dot--active': active,
      })}
      onClick={onClick}
    >
      <div className="list-gallery-dot__content" />
      <span className="sr-only">Go to slide {index}</span>
    </button>
  </li>
);
