import React from 'react';
import cn from 'classnames';
import { useRefPosition } from '@hooks/useRefPosition';
import { SiteLinks } from './SiteLinks';
import { MainFooter } from './MainFooter';
import { GetInTouchCTA } from './GetInTouchCTA';

export const Footer = () => {
  const { ref, refVisible } = useRefPosition();
  const showFooter = !refVisible;
  const BORDER_CLASSNAME = cn({
    ['border-0']: !refVisible,
    ['border-t border-sierra-night-20']: refVisible,
  });

  return (
    <footer className="z-0">
      <section ref={ref}>
        <MainFooter />
      </section>
      <section
        className={cn('flex w-full items-center bg-white md:h-16', {
          ['border-sierra-night-20 z-99 border-t lg:fixed lg:bottom-0']: showFooter,
        })}
      >
        <SiteLinks borderClassName={BORDER_CLASSNAME} />
      </section>
      <GetInTouchCTA />
      <div id="portals"></div>
    </footer>
  );
};
