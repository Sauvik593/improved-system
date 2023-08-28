import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

import { Integration } from './IntegrationSeed';
import { getAssetsUrl } from '@helpers/assetsUrl';

export const IntegrationCard = ({ figure, name, path }: Integration) => {
  return (
    <Link href={path}>
      <a className="grid h-full w-full items-center justify-items-center gap-3 p-4">
        <NextImage
          src={getAssetsUrl(`/static/integrations/${figure}.webp`)}
          alt={name}
          objectFit="contain"
          width={120}
          height={60}
        />
        <p className="md:text-h-5 text-center font-bold">{name}</p>
      </a>
    </Link>
  );
};
