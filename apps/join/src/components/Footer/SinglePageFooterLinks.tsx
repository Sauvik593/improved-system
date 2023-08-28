import { SiteLinks } from '../Footer/SiteLinks';
import cn from 'classnames';
import { useRefPosition } from '@hooks/useRefPosition';
import { GetInTouchCTA } from './GetInTouchCTA';

export const SinglePageFooterLinks = () => {
  const { refVisible } = useRefPosition();
  const showFooter = !refVisible;
  const BORDER_CLASSNAME = cn({
    ['border-0']: !refVisible,
    ['border-t border-sierra-night-20']: refVisible,
  });
  return (
    <div
      className={cn('w-full bg-white ', {
        ['border-sierra-night-20 z-[99] border-t lg:fixed lg:bottom-0']: showFooter,
      })}
    >
      <div className="container relative mx-auto">
        <SiteLinks borderClassName={BORDER_CLASSNAME} />
      </div>
      <GetInTouchCTA />
    </div>
  );
};
