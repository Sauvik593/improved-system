import React, { forwardRef } from 'react';
import cn from 'classnames';

import type { LinkComponentProps, LinkProps } from '../types';
import type { HTMLAttributes } from 'react';

type ButtonType = 'blue' | 'green' | 'orange' | 'sky' | 'sunshine';
type ButtonVariant = 'full' | 'outline';

type BaseButtonProps = {
  buttonType: ButtonType;
  variant: ButtonVariant;
  message: string | React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  size?: 'normal' | 'big';
};

export type ButtonLinkElementProps = {
  className: string;
  children: React.ReactNode;
} & LinkProps;

type ConditionalButtonProps =
  | {
      LinkComponent?: never;
      onClick?: () => void;
      linkProps?: never;
      type?: string;
    }
  | {
      LinkComponent?: (props: LinkComponentProps) => React.ReactElement | null;
      onClick?: never;
      linkProps: LinkProps;
      type?: string;
    }
  | {
      type: 'submit';
      linkProps?: never;
      onClick: never;
      LinkComponent: never;
    };

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  BaseButtonProps &
  ConditionalButtonProps;

const CONFIG = {
  blue: {
    full: 'bg-ocean-100 text-white border-ocean-100 hover:border-ocean-120 hover:bg-ocean-120 focus:border-ocean-120 focus:bg-ocean-120 disabled:bg-ocean-40 disabled:border-ocean-40 disabled:cursor-not-allowed',
    outline:
      'text-ocean-100 hover:border-ocean-120 hover:text-ocean-120 focus:border-ocean-120 focus:text-ocean-120',
  },
  green: {
    full: 'bg-meadow-100 text-white hover:border-meadow-120 hover:bg-meadow-120 focus:border-meadow-120 focus:bg-meadow-120',
    outline:
      'text-meadow-100 hover:border-meadow-120 hover:text-meadow-120 focus:border-meadow-120 focus:text-meadow-120',
  },
  orange: {
    full: 'bg-orange-100 text-white hover:border-orange-120 hover:bg-orange-120 focus:border-orange-120 focus:bg-orange-120',
    outline:
      'text-orange-100 hover:border-orange-120 hover:text-orange-120 focus:border-orange-120 focus:text-orange-120',
  },
  sky: {
    full: 'bg-sky-100 border-sky-100 text-tile-100 hover:border-sky-150 hover:bg-sky-150 focus:border-sky-150 focus:bg-sky-150',
    outline:
      'text-sky-150 border-sky-100 hover:border-sky-150 hover:text-sky-150 focus:border-sky-150 focus:text-sky-150',
  },
  sunshine: {
    full: 'bg-sunshine-100 border-sunshine-100 text-sierra-night-100 hover:border-sunshine-150 hover:bg-sunshine-150 focus:border-sunshine-150 focus:bg-sunshine-150 disabled:text-sierra-night-40 disabled:cursor-not-allowed',
    outline:
      'text-sunshine-100 border-sunshine-100 hover:border-sunshine-150 hover:text-sunshine-150 focus:border-sunshine-150 focus:text-sunshine-150',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      message,
      LinkComponent,
      className,
      buttonType,
      variant,
      fullWidth,
      linkProps,
      size = 'normal',
      type = 'button',
      disabled = false,
      ...baseHtmlProps
    },
    ref,
  ) => {
    const buttonStyles = CONFIG[buttonType][variant];

    const classNames = cn(
      'inline-block font-bold px-4 rounded-full text-center',
      {
        'w-full': fullWidth,
        [buttonStyles]: true,
        'py-2 border-1': size === 'normal',
        'py-3 border-2': size === 'big',
      },
      className,
    );

    if (!LinkComponent && !linkProps) {
      return (
        <button
          {...baseHtmlProps}
          className={classNames}
          onClick={onClick}
          type={type}
          disabled={disabled}
          ref={ref}
        >
          {message}
        </button>
      );
    }

    const LinkElement =
      LinkComponent === undefined
        ? ({ children, to, ...props }: LinkComponentProps) =>
            React.createElement('a', { ...props, href: to }, children)
        : LinkComponent;

    return (
      // eslint-disable-next-line
      // @ts-ignore
      <LinkElement className={classNames} disabled={disabled} {...linkProps}>
        {message}
      </LinkElement>
    );
  },
);

Button.displayName = 'Button';
