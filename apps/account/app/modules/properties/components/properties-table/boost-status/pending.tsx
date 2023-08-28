import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Processing } from '@kyero/icons';

import type { Property } from '@properties/types';

export const Pending = (props: { property: Property }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/properties/${props.property.id}/boost`}
      className="block rounded-md bg-sierra-night-5 hover:bg-sierra-night-10 focus:bg-sierra-night-10"
    >
      <div className="p-3 py-8">
        <div className="flex items-center justify-center gap-2 text-p-3 font-bold">
          <Processing />
          <span>{t('ui.boostStatus.pending.title')}</span>
        </div>
      </div>
    </Link>
  );
};

Pending.displayName = 'Pending';
