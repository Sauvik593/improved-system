import { useTranslation } from 'next-i18next';
import { Reply } from '@kyero/icons';
import cn from 'classnames';

import { type Comment } from '@lib/types';

interface Props {
  comment: Comment;
  onClick: () => void;
}

export const CommentElement = ({ comment, onClick }: Props) => {
  const { t } = useTranslation('common');
  const repliedComment = cn('mb-4', {
    ['ml-6']: comment.parent,
    ['border-t-1 border-sierra-night-40 pt-4']: !comment.parent,
  });
  return (
    <div className={repliedComment}>
      <span className="lg:text-h-5 text-tile-100 font-bold">{comment.name}</span>
      <p className="text-sierra-night-80 mb-3">{comment.date}</p>
      <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      <button className="text-ocean-100 lg:text-h-6 mt-2 flex gap-2 font-bold" onClick={onClick}>
        <Reply />
        {t('content.comments.cta.reply')}
      </button>
    </div>
  );
};
