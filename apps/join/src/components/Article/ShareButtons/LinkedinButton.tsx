import cn from 'classnames';

import NextImage from 'next/image';
import { ButtonProps } from './types';
import { WindowOpener } from './WindowOpener';
import { getAssetsUrl } from '@helpers/assetsUrl';

export interface Props extends ButtonProps {
  path: string;
}

const LINKEDIN_URL = `https://www.linkedin.com/sharing/share-offsite/?url=`;

export const LinkedinButton: React.FC<Props> = ({ title, onClick, path, className }) => {
  return (
    <li className={cn(`flex items-center justify-center rounded-full`, className)}>
      <WindowOpener url={`${LINKEDIN_URL}${path}`} title={title} onClick={onClick}>
        <NextImage src={getAssetsUrl('/static/content/linkedin.svg')} width={20} height={20} />
      </WindowOpener>
    </li>
  );
};
