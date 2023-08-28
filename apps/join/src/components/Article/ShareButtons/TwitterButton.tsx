import queryString from 'query-string';
import cn from 'classnames';
import NextImage from 'next/image';
import { ButtonProps } from './types';
import { WindowOpener } from './WindowOpener';
import { getAssetsUrl } from '@helpers/assetsUrl';

interface Params {
  hashtags?: string[];
  via?: string;
}

export interface Props extends ButtonProps {
  params?: Params;
  path?: string;
}

const getEncodedHastags = (hashtags: Params['hashtags']) => {
  if (typeof hashtags === 'undefined') {
    return undefined;
  }

  return hashtags.join(',');
};

const TWITTER_URL = `https://twitter.com/share?`;

export const TwitterButton: React.FC<Props> = ({
  path,
  params,
  message,
  title,
  onClick,
  className,
}) => {
  const hashtags = params ? getEncodedHastags(params.hashtags) : undefined;

  const query = queryString.stringify({
    url: path,
    title: message?.title,
    ...params,
    hashtags,
  });

  return (
    <li className={cn(`flex items-center justify-center rounded-full`, className)}>
      <WindowOpener url={`${TWITTER_URL}${query}`} title={title} onClick={onClick}>
        <NextImage src={getAssetsUrl('/static/content/twitter.svg')} height={18} width={20} />
      </WindowOpener>
    </li>
  );
};
