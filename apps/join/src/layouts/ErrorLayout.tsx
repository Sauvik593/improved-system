import { useTranslation } from 'next-i18next';

import { BasePageLayout } from './BasePageLayout';

import { Error404 } from '@components/Error404';

import type { BaseLayoutProps as Props } from '@lib/types/general';

export const ErrorLayout = (props: Props) => {
  const { t } = useTranslation('common');
  return (
    <BasePageLayout {...props} title={t('error_404.title')}>
      <Error404 />
    </BasePageLayout>
  );
};
