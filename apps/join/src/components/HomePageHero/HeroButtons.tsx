import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button } from '@kyero/ui';
import { useInternalLinks } from '@hooks/useInternalLinks';

export const HeroButtons = () => {
  const { t } = useTranslation('common');
  const { pricingPath, contactPath } = useInternalLinks();
  return (
    <ul className="text-h-5-sm lg:text-h-5 mt-2 block md:flex md:items-center lg:h-[60px] lg:overflow-hidden">
      <li className="mb-5 w-full md:mb-0 md:mr-5 md:w-auto">
        <Link href={pricingPath}>
          <Button
            buttonType="sunshine"
            variant="full"
            fullWidth
            size="big"
            message={t('ui.buttons.pricing_and_packages')}
            linkProps={{ to: pricingPath }}
          />
        </Link>
      </li>
      <li>
        <Link href={contactPath}>
          <Button
            className="text-white"
            buttonType="sunshine"
            variant="outline"
            size="big"
            fullWidth
            message={t('ui.buttons.get_in_touch')}
            linkProps={{ to: contactPath }}
          />
        </Link>
      </li>
    </ul>
  );
};
