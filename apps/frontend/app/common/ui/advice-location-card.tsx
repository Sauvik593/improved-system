import { type GuideLocation } from '~/modules/homepage/api/get-guides.server';

export const AdviceLocationCard = ({ name, description, url, img, imgRetina }: GuideLocation) => {
  return (
    <div className="shadow-card z-0 h-full overflow-hidden">
      <article
        className="bg-card-gradient
relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-lg p-4 text-white md:px-6"
        data-testid="guide-card.location"
      >
        <figure className="-z-1" role="presentation">
          <a href="w-full h-full block" tabIndex={-1} data-testid="guide-card.location.link">
            <img
              role="presentation"
              data-testid="guide-card.location.image"
              alt={name}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              src={img}
              srcSet={`${imgRetina} 2x`}
            />
          </a>
        </figure>
        <a
          href={url}
          data-testid="guide-card.location.link"
          className="hover:text-sierra-night-10 focus:text-sierra-night-10"
          tabIndex={-1}
        >
          <h3
            className="text-h-3-sm md:md:text-h-4 lg:text-h-3-sm font-bold"
            data-testid="guide-card.location.name"
          >
            {name}
          </h3>
        </a>
        {description && (
          <a
            href={url}
            className="hover:text-sierra-night-10 focus:text-sierra-night-10 mb-2"
            tabIndex={-1}
            data-testid="guide-card.location.link"
          >
            <p
              className="md:text-h-4-sm mt-4 text-base md:block lg:text-base"
              data-testid="guide-card.location.description"
            >
              {description}
            </p>
          </a>
        )}
      </article>
    </div>
  );
};
