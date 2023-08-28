import React from 'react';
import { ArrowForward } from '@kyero/icons';
import cn from 'classnames';

import type { LinkComponentProps, LinkProps } from '../types';

export interface ArrowLinkProps {
  message: string;
  baseColorClassname?: string;
  activeClassName?: string;
  className?: string;
  LinkComponent?: (props: LinkComponentProps) => React.ReactElement | null;
  linkProps?: LinkProps;
}

const BASE_CLASSNAMES = 'inline-flex items-center mt-4 md:mt-auto group font-bold';

export const ArrowLink = ({
  LinkComponent,
  message,
  linkProps,
  baseColorClassname,
  activeClassName,
  className,
}: ArrowLinkProps) => {
  const LinkElement =
    LinkComponent === undefined
      ? ({ children, to, ...props }: LinkComponentProps) =>
          React.createElement('a', { ...props, href: to }, children)
      : LinkComponent;

  return (
    // eslint-disable-next-line
    // @ts-ignore
    <LinkElement
      {...linkProps}
      className={cn(BASE_CLASSNAMES, baseColorClassname, activeClassName, className)}
    >
      <span>{message}</span>
      <ArrowForward className="ml-2 transition-transform group-hover:translate-x-2 group-focus:translate-x-1" />
    </LinkElement>
  );
};
