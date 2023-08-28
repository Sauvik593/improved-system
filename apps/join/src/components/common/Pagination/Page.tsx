import { useMemo } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import { buildPaginationPath } from './helpers';

interface Props {
  page: number;
  currentPage: number;
  pathname: string;
  testId: string;
}

export const Page = ({ pathname, currentPage, page, testId }: Props) => {
  const active = useMemo(() => {
    return page === currentPage;
  }, [page, currentPage]);

  const pagePathname = buildPaginationPath(pathname, page);
  return (
    <li data-testid={testId}>
      <NextLink href={pagePathname}>
        <a
          className={cn('flex h-[32px] w-[32px]  items-center justify-center rounded-full', {
            'bg-white': !active,
            'bg-ocean-100 text-white': active,
          })}
        >
          {page}
        </a>
      </NextLink>
    </li>
  );
};
