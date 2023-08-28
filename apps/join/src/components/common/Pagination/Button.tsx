import { useMemo } from 'react';
import NextLink from 'next/link';

import { NextIcon, PrevIcon } from '@kyero/icons';
import { buildPaginationPath, checkNextPageNotLast } from './helpers';

interface Props {
  page: number | null;
  type: 'next' | 'prev';
  pathname: string;
  testId: string;
  pages: number[];
}

type IconType = typeof NextIcon | typeof PrevIcon;

export const Button = ({ page, type, pathname, testId, pages }: Props) => {
  const pagePathname = buildPaginationPath(pathname, page as number);

  const Icon: IconType = useMemo(() => {
    return type === 'next' ? NextIcon : PrevIcon;
  }, [type]);

  if (!page || checkNextPageNotLast(pages, page)) {
    return (
      <li data-testid={`${testId}-inactive`}>
        <Icon className="text-ocean-40" />
      </li>
    );
  }

  return (
    <li data-testid={testId}>
      <NextLink href={pagePathname}>
        <a className="flex h-[32px] w-[32px] items-center justify-center">
          <Icon className="text-ocean-100" />
        </a>
      </NextLink>
    </li>
  );
};
