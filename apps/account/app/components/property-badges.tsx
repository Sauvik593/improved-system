import { useTranslation } from 'react-i18next';
import { Badge } from '@kyero/ui';
import { Property } from '~/modules/properties';

export const IncompleteBadge = () => {
  const { t } = useTranslation();
  return <Badge variant={'gray'} message={t('ui.badge.incomplete')} />;
};

export const LiveBadge = () => {
  const { t } = useTranslation();
  return <Badge variant={'green'} message={t('ui.badge.live')} />;
};

export const HiddenBadge = () => {
  const { t } = useTranslation();
  return <Badge variant={'gray'} message={t('ui.badge.hidden')} />;
};

export const EnquiriesBadge = ({ enquiries }: { enquiries: number }) => {
  const { t } = useTranslation();
  return <Badge variant={'orange'} message={t('ui.badge.enquiries', { enquiries })} indicator />;
};

export const StatusBadge = ({ status }: { status: Property['status'] }) => {
  if (status === 'live') {
    return <LiveBadge />;
  }

  return <IncompleteBadge />;
};
