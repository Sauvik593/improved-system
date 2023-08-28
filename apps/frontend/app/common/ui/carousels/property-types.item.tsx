import { Button } from '@kyero/ui';
import { Trans, useTranslation } from 'react-i18next';
import { assetsPathTo } from '~/common/client-router/helpers';

import { type PropertyType } from '~/modules/homepage/api/get-property-types.server';

export const Item = ({ link, count_formatted, type }: PropertyType & { type: string }) => {
  const { t } = useTranslation();
  const title = t('common.homepage.top_property_types.item_cta', {
    count: count_formatted as unknown as number,
  });

  return (
    <article className="relative h-full">
      <div className=" bg-sierra-night-5 h-full rounded-lg px-5 py-8 sm:grid sm:grid-cols-[90px_1fr] sm:gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-0">
        <figure className="text-center" aria-describedby={`caption-${type}`}>
          <img
            src={assetsPathTo(`/images/illustrations/${type}.svg`)}
            width="168px"
            height="168px"
            loading="lazy"
            className="mx-auto h-[168px] w-[168px] sm:h-[90px] sm:w-[90px] lg:h-[168px] lg:w-[168px]"
            draggable="false"
            role="presentation"
            alt=""
          />
        </figure>
        <div className="mt-4 flex w-full flex-col text-center sm:mt-0 sm:justify-between sm:overflow-hidden lg:mt-4">
          <p
            className="text-h-4 sm:text-h-4-sm lg:text-h-4 text-sierra-night-100 font-bold"
            id={`caption-${type}`}
          >
            <Trans i18nKey={`common.property_types.types.${type}`} />
          </p>
          <Button
            buttonType="blue"
            variant="full"
            message={title}
            fullWidth
            title={title}
            className="mt-4 truncate"
            // @ts-ignore
            linkProps={{ to: link }}
          />
        </div>
      </div>
    </article>
  );
};
