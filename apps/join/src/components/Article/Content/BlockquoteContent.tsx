import cn from 'classnames';
import NextLink from 'next/link';

import { ArrowLink } from '@kyero/ui';
import { LinkComponent } from '@lib/types';

interface Props {
  quote: string;
  link: LinkComponent;
  className?: string;
}

export const BlockquoteContent = ({ quote, link, className }: Props) => {
  return (
    <article
      className={cn(`my-8 bg-white p-4 md:flex md:flex-col md:rounded-lg md:p-6`, className)}
      data-article-component
    >
      {quote && (
        <NextLink href={link.url}>
          <a
            className="hover:text-sierra-night-80 focus:text-sierra-night-80 text-tile-100"
            tabIndex={-1}
          >
            <blockquote className="text-h-4-sm md:text-h-3-sm lg:text-h-3-sm md:block">
              {quote}
            </blockquote>
          </a>
        </NextLink>
      )}
      <hr className="divider mt-4 hidden w-[64px] lg:block" />
      <ArrowLink
        message={link.title}
        linkProps={{ to: link.url }}
        baseColorClassname="text-ocean-100"
        activeClassName="hover:text-ocean-150 focus:text-ocean-150"
        className="inline-flex md:mt-4"
      />
    </article>
  );
};
