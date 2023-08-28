import { useTranslation } from 'next-i18next';

import { FacebookButton } from './FacebookButton';
import { TwitterButton } from './TwitterButton';
import { LinkedinButton } from './LinkedinButton';
import { EmailButton } from './EmailButton';

interface Props {
  url: string;
  buttonClassName: string;
  contentTitle: string;
  children?: React.ReactNode;
}

export const ShareButtons = ({ url, buttonClassName, contentTitle, children }: Props) => {
  const { t } = useTranslation('common');
  return (
    <ul className="flex gap-4 md:mt-2">
      <FacebookButton
        title={t('share_buttons.facebook')}
        path={url}
        className={`${buttonClassName} bg-[#4267B2]`}
      />
      <TwitterButton
        title={t('share_buttons.twitter')}
        className={`${buttonClassName} bg-[#1DA1F2]`}
        path={url}
        message={{
          title: contentTitle,
        }}
      />
      <LinkedinButton
        title={t('share_buttons.linkedin')}
        path={url}
        className={`${buttonClassName} bg-[#0077B5]`}
      />
      <EmailButton
        title={t('share_buttons.email')}
        className={`${buttonClassName} bg-sunshine-100`}
        path={url}
        message={{
          title: contentTitle,
        }}
      />
      {children}
    </ul>
  );
};
