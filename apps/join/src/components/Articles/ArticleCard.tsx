import React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import { Media } from '@lib/api/strapi/media';

import type { Category, MediaImage } from '@lib/types';

interface Props {
  title: string;
  description: string;
  url: string;
  image: MediaImage;
  featured_image: MediaImage;
  category: Category;
}

export const ArticleCard = ({
  title,
  description,
  url,
  image,
  featured_image,
  category,
}: Props) => {
  const availableImage = featured_image ? featured_image : image;
  const featuredImage = Media.getImageResizedUrl({
    formatName: 'medium',
    size: 'article',
    image: availableImage,
  });
  const placeholder = Media.getImagePlaceholder(availableImage);
  return (
    <article className="flex h-full flex-col">
      <NextLink href={url}>
        <a tabIndex={-1}>
          <div className="relative h-[188px] w-full overflow-hidden rounded-t-lg md:h-[220px]">
            <NextImage
              src={featuredImage}
              layout="fill"
              placeholder="blur"
              alt={availableImage.alternativeText}
              objectFit="cover"
              className="md:h-full"
              blurDataURL={placeholder}
            />
          </div>
        </a>
      </NextLink>
      <aside className="flex h-full flex-col rounded-b-md bg-white p-4 md:p-6">
        <header className="font-bold">
          <NextLink href={category.url}>
            <a className="hover:text-sierra-night-80 focus:text-sierra-night-80 text-tile-100 mb-2 block">
              {category.title}
            </a>
          </NextLink>
          <NextLink href={url}>
            <a
              className="hover:text-sierra-night-80 focus:text-sierra-night-80 text-tile-100"
              tabIndex={-1}
            >
              <h3 className="md:text-h-4 lg:text-h-3-sm mt-2">{title}</h3>
            </a>
          </NextLink>
        </header>
        <p className="hidden md:mb-4 md:mt-4 md:block">{description}</p>
      </aside>
    </article>
  );
};
