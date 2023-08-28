import { useTranslation } from 'next-i18next';
import { Button } from '@kyero/ui';
import Link from 'next/link';

interface Props {
  commentsLength: number;
}

export const Header = ({ commentsLength }: Props) => {
  const { t } = useTranslation('common');
  const multipleComments = `${t('comments.length.other', { length: commentsLength })}`;
  const singleComment = `${t('comments.length.one', { length: commentsLength })}`;
  if (commentsLength === 0) {
    return (
      <header className="mb-10">
        <hr className="divider my-4 w-[68px]" />
        <h3 className="text-h-3-sm md:text-h-3 text-tile-100">{t('content.comments.first')}</h3>
      </header>
    );
  }

  return (
    <header className="mb-6">
      <hr className="divider my-4 w-[68px]" />
      <div className="flex justify-between">
        <h3 className="text-h-3-sm md:text-h-3 text-tile-100">
          {commentsLength > 1 ? multipleComments : singleComment}
        </h3>
        <Link href="#add-voice">
          <Button
            variant="full"
            buttonType="blue"
            linkProps={{ to: '#add-voice' }}
            message={t('content.comments.add')}
          />
        </Link>
      </div>
    </header>
  );
};
