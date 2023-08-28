import { type GuideArticle } from '~/modules/homepage/api/get-guides.server';

export const AdviceArticleCard = ({ title, category, img, url, imgRetina }: GuideArticle) => {
  return (
    <article
      className="shadow-card z-0 h-full min-h-[360px] overflow-hidden rounded-lg bg-white"
      data-testid="guide-card.article"
    >
      <div className="relative  h-[188px] overflow-hidden rounded-t-lg md:h-[220px]">
        <a
          href={url}
          className="block h-full w-full"
          tabIndex={-1}
          data-testid="guide-card.article.link"
        >
          <img
            src={img}
            srcSet={`${imgRetina} 2x`}
            alt={title}
            loading="lazy"
            width={216}
            data-testid="guide-card.article.image"
            className={
              'pointer-events-none absolute inset-0 h-full w-full select-none object-cover'
            }
          />
        </a>
      </div>
      <div className="p-4">
        <div className="text-tile-100">
          <p
            className="text-sierra-night-60 text-h-6 font-semibold"
            data-testid="guide-card.article.category"
          >
            {category}
          </p>
          <h3
            className="text-h-4-sm lg:text-h-4 font-bold leading-tight hover:underline focus:underline"
            data-testid="guide-card.title"
          >
            <a href={url} draggable={false} data-testid="guide-card.link">
              {title}
            </a>
          </h3>
        </div>
      </div>
    </article>
  );
};
