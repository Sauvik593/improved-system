import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { Media } from '@lib/api/strapi/media';
import { getAssetsUrl } from '@helpers/assetsUrl';
import type { Author } from '@lib/types';

interface Props {
  author: Author;
  date: string;
  time: number;
  comments_size: number;
}

export const ContentInfo = ({ author, time, comments_size, date }: Props) => {
  const { t } = useTranslation('common');
  const imageUrl = Media.getImageResizedUrl({
    formatName: 'small',
    size: 'author',
    image: author.avatar,
  });
  const placeholder = Media.getImagePlaceholder(author.avatar);
  const commentSize = (comments_size: number): React.ReactNode => {
    switch (true) {
      case comments_size === 0:
        return t('content.info.no_comments');
      case comments_size === 1:
        return `${comments_size} ${t('content.info.comment')}`;
      case comments_size > 1:
      default:
        return `${comments_size} ${t('content.info.comments')}`;
    }
  };

  return (
    <section className="flex">
      <figure className="relative flex overflow-hidden rounded-full">
        <NextImage
          src={imageUrl}
          alt={author.full_name}
          objectFit="cover"
          className="bg-sierra-night-20"
          width="48px"
          placeholder="blur"
          blurDataURL={placeholder}
          height="48px"
        />
      </figure>
      <aside className="ml-4">
        <div className="flex gap-4 lg:block">
          <p className="text-ocean-100 font-bold">{author.full_name}</p>
          {date && <time className="block lg:hidden">{date}</time>}
        </div>
        <div className="flex gap-4">
          {date && (
            <time className="border-sierra-night-40 border-r-1 hidden pr-3 lg:block">{date}</time>
          )}
          <div className="border-sierra-night-40 border-r-1 pr-3">
            {t('content.info.minute_read', { time: time })}
          </div>
          <div className="-ml-1 flex gap-1">
            <NextImage
              src={getAssetsUrl('/static/content/comment-icon.svg')}
              height={20}
              width={20}
            />
            {commentSize(comments_size)}
          </div>
        </div>
      </aside>
    </section>
  );
};
