import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Processing } from '@kyero/icons';

import { Button } from '@kyero/ui';
import { useInternalLinks } from '@hooks/useInternalLinks';

export const FindOutMore = () => {
  const { t } = useTranslation('common');
  const { integrationsPath } = useInternalLinks();
  return (
    <div className="bg-ocean-100 relative mt-8 items-center rounded-lg p-5 lg:mb-4 lg:grid lg:grid-cols-[1.6fr,0.4fr]">
      <div className="lg:flex lg:items-center  lg:gap-6">
        <figure className="bg-ocean-150 flex h-16 w-16 items-center justify-center rounded-full lg:mb-0">
          <Processing className="h-8 w-8 text-white" />
        </figure>
        <div className="my-3 lg:my-0">
          <h3 className="lg:text-h-4 text-h-4-sm pb-2 text-white md:pb-0">
            {t('features.integrations.cta.title')}
          </h3>
          <p className="text-p-2 text-white">{t('features.integrations.cta.subtitle')}</p>
        </div>
      </div>
      <div className="text-h-5-sm lg:text-h-5">
        <Link href={integrationsPath}>
          <Button
            className="truncate"
            buttonType="sunshine"
            variant="full"
            fullWidth
            size="big"
            message={t('ui.buttons.find_out_more')}
            linkProps={{ to: integrationsPath }}
          />
        </Link>
      </div>
    </div>
  );
};
