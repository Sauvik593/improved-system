import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { renderAboutUsLink } from '@helpers/links';
import { LanguageContext } from '@contexts/LanguageContext';
import { getAssetsUrl } from '@helpers/assetsUrl';

export const FooterCertified = () => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const aboutUsPath = renderAboutUsLink(t('footer.links.help_and_info.about_us.link'), locale);
  return (
    <div className="grid grid-cols-[max-content_1fr] items-start gap-4 sm:order-3 sm:col-span-2 lg:col-span-1">
      <Image
        src={getAssetsUrl('/static/footer/certified.svg')}
        alt={t('footer.b_corp.alt')}
        width={56}
        objectFit="contain"
        height={87}
      />
      <aside>
        <p className="text-sierra-night-100 text-p-2 mb-2">{t('footer.description')}</p>
        <Link href={aboutUsPath}>
          <a className="text-ocean-100 font-medium underline hover:text-orange-100">
            {t('footer.cta.more_about')}
          </a>
        </Link>
      </aside>
    </div>
  );
};
