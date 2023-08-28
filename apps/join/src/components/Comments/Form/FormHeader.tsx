import { ReplyData } from '@lib/api/strapi/addComment';
import { useTranslation } from 'next-i18next';

interface Props {
  parent?: ReplyData;
}

const headerClassName = 'text-h-4-sm md:text-h-4 text-tile-100 font-bold mb-3 comment-header';

export const AddCommentHeader = () => {
  const { t } = useTranslation('common');
  return (
    <p className={headerClassName} id="add-voice">
      {t('content.comments.add')}
    </p>
  );
};

export const ReplyCommentHeader = ({ parent }: Props) => {
  const { t } = useTranslation('common');
  return (
    <p className={headerClassName} id={`reply_to_${parent?.parentId}`}>
      {t('content.comments.reply', { user: parent?.user })}
    </p>
  );
};
