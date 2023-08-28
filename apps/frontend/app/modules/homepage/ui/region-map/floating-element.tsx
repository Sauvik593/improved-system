import { Button } from '@kyero/ui';
import { type FloatingElementData } from '.';
import { type Region } from '../../api/get-country-regions.server';
import { useTranslation } from 'react-i18next';

export interface Props {
  onEnter: () => void;
  onLeave: () => void;
  floatingElementData: FloatingElementData;
  activeRegion: Region | null | undefined;
}

export const FloatingElement = ({
  floatingElementData: { x, y, id },
  onEnter,
  onLeave,
  activeRegion,
}: Props) => {
  const { t } = useTranslation();
  if (!activeRegion) return null;

  return (
    <article
      className="shadow-home-card fixed inline-block overflow-hidden rounded-md bg-white p-4"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        left: x,
        top: y,
      }}
      aria-hidden={!activeRegion}
      tabIndex={-1}
    >
      <h2 className="text-h-5 text-sierra-night-100 mb-2 text-center font-bold">
        {activeRegion?.name}
      </h2>
      <Button
        message={
          t('common.homepage.top_locations.view_properties', {
            count: activeRegion.property_count_formatted as unknown as number,
          }) as string
        }
        variant="full"
        fullWidth
        buttonType="blue"
        tabIndex={-1}
        linkProps={{
          to: activeRegion.for_sale_path,
        }}
      />
    </article>
  );
};
