import type { LinkHTMLAttributes } from 'react';

export type BaseLinkProps =
  | {
      to: string;
    }
  | {
      to: {
        search?: string;
        pathname?: string;
      };
    };

export type LinkProps = BaseLinkProps & LinkHTMLAttributes<HTMLAnchorElement>;

export type LinkComponentProps = {
  className: string;
  children: React.ReactNode;
} & LinkProps;
