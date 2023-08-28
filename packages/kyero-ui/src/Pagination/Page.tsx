import { useMemo } from 'react';

import cn from 'classnames';

import type { LinkComponentProps } from '../types';

import { buildPaginationParams } from './helpers';

interface Props {
  page: number;
  currentPage: number;
  search: string;
  pathname: string;
  LinkComponent: (props: LinkComponentProps) => React.ReactElement;
  testId: string;
}

export const Page = ({ pathname, currentPage, page, search, testId, LinkComponent }: Props) => {
  const active = useMemo(() => {
    return page === currentPage;
  }, [page, currentPage]);

  const linkObject = useMemo(() => {
    const params = buildPaginationParams(search, page);

    return {
      pathname,
      search: params,
    };
  }, [search, page, pathname]);

  return (
    <li data-testid={testId}>
      <LinkComponent
        to={linkObject}
        className={cn('flex h-[32px] w-[32px]  items-center justify-center rounded-full', {
          'bg-white': !active,
          'bg-ocean-100 text-white': active,
        })}
      >
        {page}
      </LinkComponent>
    </li>
  );
};
