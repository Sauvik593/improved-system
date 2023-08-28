import cn from 'classnames';
import NextImage from 'next/image';
import NextLink from 'next/link';

import { ArrowLink } from '@kyero/ui';
import { getAssetsUrl } from '@helpers/assetsUrl';

export interface SearchBannerDTO {
  text: string;
  cta_link: {
    title: string;
    url: string;
  };
  variant?: 'article' | 'regular';
  className?: string;
}

const REGULAR_CLASSES = 'container lg:my-16 my-10';
const ARTICLE_CLASSES = 'my-4';

export const SearchFeatureSection = ({
  text,
  cta_link,
  className,
  variant = 'regular',
}: SearchBannerDTO) => {
  const classes = cn('mx-auto rounded-lg', className, {
    [REGULAR_CLASSES]: variant === 'regular',
    [ARTICLE_CLASSES]: variant === 'article',
  });

  return (
    <section className={classes}>
      <div className="bg-sierra-night-100 container min-h-[110px] items-center rounded-lg py-4 font-bold text-white lg:flex lg:px-16">
        <figure className="-mx-3 lg:mr-2">
          <NextImage
            src={getAssetsUrl('/static/content/search-illustration.svg')}
            width={127}
            height={82}
          />
        </figure>
        <div className="lg:whitespace-nowrap">
          <h2 className="text-p-1-sm lg:ml-2 lg:inline-block">{text}</h2>
          <NextLink href={cta_link.url}>
            <ArrowLink
              message={cta_link.title}
              linkProps={{
                to: cta_link.url,
              }}
              baseColorClassname="text-sky-100"
              activeClassName="hover:text-sky-150 focus:text-sky-150"
              className="lg:mt-0 lg:ml-2"
            />
          </NextLink>
        </div>
      </div>
    </section>
  );
};
