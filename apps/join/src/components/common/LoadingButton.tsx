import React from 'react';
import cn from 'classnames';
import NextImage from 'next/image';

import { getAssetsUrl } from '@helpers/assetsUrl';

interface Props {
  loading: boolean;
  label: string | React.ReactNode;
  buttonProps?: Record<string, unknown>;
  disabled?: boolean;
  onClick?: () => void;
  color?: 'blue' | 'sky';
  size?: 'normal' | 'big';
}

const OCEAN_STYLE =
  'bg-ocean-100 border-ocean-100 hover:border-ocean-120 hover:bg-ocean-120 focus:border-ocean-120 focus:bg-ocean-120 disabled:bg-ocean-40 disabled:border-ocean-40';
const SKY_STYLE =
  'bg-sky-100 border-sky-100 text-tile-100 hover:border-sky-150 hover:bg-sky-150 focus:border-sky-150 focus:bg-sky-150';

export const LoadingButton = ({
  label,
  loading,
  disabled = false,
  color = 'blue',
  size = 'big',
  onClick,
  buttonProps = {},
}: Props) => {
  const SIZE = size === 'big' ? 23 : 18;
  return (
    <button
      className={cn(
        'inline-block w-full rounded-full px-4 text-center font-bold text-white disabled:cursor-not-allowed',
        {
          [OCEAN_STYLE]: color === 'blue',
          [SKY_STYLE]: color === 'sky',
          ['border-1 py-2']: size === 'normal',
          ['border-2 py-3']: size === 'big',
        },
      )}
      disabled={disabled}
      {...(onClick ? { onClick } : {})}
      {...buttonProps}
    >
      {loading ? (
        <NextImage
          src={getAssetsUrl('/images/loader-white.svg')}
          width={SIZE}
          height={SIZE}
          className="m-auto"
        />
      ) : (
        label
      )}
    </button>
  );
};
