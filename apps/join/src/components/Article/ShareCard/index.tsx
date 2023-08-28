import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

import { useClipboardCopy } from './useClipboardCopy';

import { Button } from '../ShareButtons/Button';
import { ShareButtons } from '../ShareButtons';
import { getAssetsUrl } from '@helpers/assetsUrl';

interface Props {
  url: string;
  title: string;
}

export const ShareCard = ({ url, title }: Props) => {
  const [isCopied, toggleCopied] = useState(false);
  const toggleSwitcher = (): void => toggleCopied(!isCopied);
  const { t } = useTranslation('common');

  const contentUrl = new URL(url, 'https://kyero.com').toString();
  const { copy } = useClipboardCopy(`${contentUrl}`);
  const handleClick = () => {
    copy();
    toggleSwitcher();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      toggleCopied(false);
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return (
    <div>
      <div className="shadow-card hidden overflow-hidden rounded-lg bg-white p-4 py-6 md:block">
        <h2 className="text-h-4-sm xl:text-h-3-sm text-tile-100">{t('content.share.title')}</h2>
        <nav aria-label="Share menu">
          <ShareButtons url={contentUrl} buttonClassName="h-10 w-10" contentTitle={title}>
            <li>
              <Button
                title={t('share_buttons.copy')}
                onClick={handleClick}
                className="bg-terracotta-100 h-10 w-10"
              >
                <NextImage src={getAssetsUrl('/static/content/link.svg')} width={20} height={20} />
              </Button>
            </li>
          </ShareButtons>
          {isCopied && (
            <div className="clipboard-tooltip flex w-full w-[260px] items-center px-2">
              <p className="text-sunshine-100 text-p-1 mr-2">&#x2713;</p>
              <p>{t('content.share.copy_tooltip')}</p>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

ShareCard.displayName = 'ShareCard';
