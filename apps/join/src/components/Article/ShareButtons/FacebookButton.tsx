import cn from 'classnames';

import NextImage from 'next/image';
import { ButtonProps } from './types';
import { WindowOpener } from './WindowOpener';
import { getAssetsUrl } from '@helpers/assetsUrl';

export interface Props extends ButtonProps {
  path: string;
}
const FACEBOOK_URL = 'https://www.facebook.com/sharer/sharer.php?u=';

export const FacebookButton: React.FC<Props> = ({ title, onClick, path, className }) => {
  return (
    <li className={cn(`flex items-center justify-center rounded-full`, className)}>
      <WindowOpener url={`${FACEBOOK_URL}${path}`} title={title} onClick={onClick}>
        <NextImage src={getAssetsUrl('/static/content/facebook.svg')} width={12} height={22} />
      </WindowOpener>
    </li>
  );
};
