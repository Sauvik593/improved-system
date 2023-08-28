import { useMemo } from 'react';

import { NextIcon, PrevIcon } from '@kyero/icons';
import { buildPaginationParams } from './helpers';

import type { LinkComponentProps } from '../types';

interface Props {
  page: number | null;
  type: 'next' | 'prev';
  search: string;
  pathname: string;
  LinkComponent: (props: LinkComponentProps) => React.ReactElement;
  testId: string;
}

type IconType = typeof NextIcon | typeof PrevIcon;

export const Button = ({ page, type, search, pathname, testId, LinkComponent }: Props) => {
  const Icon: IconType = useMemo(() => {
    return type === 'next' ? NextIcon : PrevIcon;
  }, [type]);

  const linkObject = useMemo(() => {
    if (!page) {
      return {};
    }

    const params = buildPaginationParams(search, page);

    return {
      pathname,
      search: params,
    };
  }, [search, page, pathname]);

  if (!page) {
    return (
      <li data-testid={`${testId}-inactive`}>
        <Icon className="text-ocean-40" />
      </li>
    );
  }

  return (
    <li data-testid={testId}>
      <LinkComponent to={linkObject} className="flex h-[32px] w-[32px] items-center justify-center">
        <Icon className="text-ocean-100" />
      </LinkComponent>
    </li>
  );
};
