import { useTranslation } from 'next-i18next';

import { ShareButtons } from '../ShareButtons';

interface Props {
  url: string;
  title: string;
}

export const MobileShareCard = ({ url, title }: Props) => {
  const { t } = useTranslation('common');
  const contentUrl = `https://kyero.com${url}`;

  return (
    <div className="my-8 block md:hidden">
      <div className="shadow-card flex items-center overflow-hidden bg-white p-4">
        <h2 className="text-h-5 text-tile-100 mr-6">{t('content.share.title')}</h2>
        <nav aria-label="Share menu">
          <ShareButtons url={contentUrl} buttonClassName="h-8 w-8" contentTitle={title} />
        </nav>
      </div>
    </div>
  );
};

MobileShareCard.displayName = 'MobileShareCard';
