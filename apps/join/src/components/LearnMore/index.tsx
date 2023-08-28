import React, { useContext } from 'react';
import { Button } from '@kyero/ui';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { QuestionMark } from '@kyero/icons';
import { createHelpPath } from '@helpers/links';
import { LanguageContext } from '@contexts/LanguageContext';

const Figure = () => (
  <div className="bg-sunshine-100 flex-[0_0_40px] rounded-full">
    <figure className="flex h-10 w-10 items-center justify-center">
      <QuestionMark />
    </figure>
  </div>
);

export const LearnMore = () => {
  const { t } = useTranslation('common');
  const { locale } = useContext(LanguageContext);
  const helpPath = createHelpPath(locale);
  const compatibleSystemsPath = [
    helpPath,
    t('integrations.learn_more.compatible_systems.link'),
  ].join('/');
  return (
    <div className="mb-10">
      <div className="container mx-auto">
        <h3 className="text-h-3-sm md:text-h-3 mb-4 text-center font-bold">
          {t('integrations.learn_more.title')}
        </h3>
        <div className="mb-6 items-center justify-between rounded-lg bg-white p-5 md:flex">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            <Figure />
            <h4 className="md:text-h-5 flex font-bold">
              {t('integrations.learn_more.compatible_systems.title')}
            </h4>
          </div>
          <Link href={compatibleSystemsPath}>
            <Button
              buttonType="blue"
              variant="outline"
              message={t('integrations.learn_more.compatible_systems.cta')}
              linkProps={{ to: compatibleSystemsPath }}
            />
          </Link>
        </div>

        <div className="items-center justify-between rounded-lg bg-white p-5 md:flex">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            <Figure />
            <h4 className="md:text-h-5 flex font-bold">
              {t('integrations.learn_more.missing_system.title')}
            </h4>
          </div>
          <Link href={helpPath}>
            <Button
              buttonType="blue"
              variant="outline"
              message={t('integrations.learn_more.missing_system.cta')}
              linkProps={{ to: helpPath }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
