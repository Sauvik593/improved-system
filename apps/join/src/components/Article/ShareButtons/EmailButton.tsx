import queryString from 'query-string';
import cn from 'classnames';

import NextImage from 'next/image';
import { ButtonProps } from './types';
import { getAssetsUrl } from '@helpers/assetsUrl';

export interface Props extends ButtonProps {
  path: string;
  label?: string;
}

export const EmailButton: React.FC<Props> = ({ title, onClick, path, message, className }) => {
  const params = queryString.stringify({
    subject: message?.title,
    body: path,
  });

  return (
    <li className={cn(`flex items-center justify-center rounded-full`, className)}>
      <a href={`mailto:${params}`} title={title} onClick={onClick}>
        <NextImage src={getAssetsUrl('/static/content/email.svg')} height={14} width={20} />
      </a>
    </li>
  );
};
