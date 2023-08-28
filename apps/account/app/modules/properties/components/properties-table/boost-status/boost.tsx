import { Link } from '@remix-run/react';
import { Button } from '@kyero/ui';
import { useTranslation } from 'react-i18next';

export const Boost = (props: { id: string }) => {
  const { t } = useTranslation();
  return (
    <Button
      buttonType="blue"
      variant="full"
      fullWidth
      message={t('ui.boostStatus.boostable.title')}
      linkProps={{
        to: `/properties/${props.id}/boost`,
      }}
      LinkComponent={Link}
    />
  );
};

Boost.displayName = 'Boost';
