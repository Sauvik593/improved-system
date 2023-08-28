import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface Props {
  className?: string;
  sizeClassName?: string;
}

export const Ad = ({ className, sizeClassName }: Props) => {
  const { t } = useTranslation('common');
  const classes = cn(
    'border-[16px] border-sierra-night-20 flex justify-center items-center bg-white',
    className,
    sizeClassName,
  );

  return (
    <section className={classes}>
      <span className="text-sierra-night-20 text-h-3-sm">{t('content.ad.placeholder')}</span>
    </section>
  );
};
