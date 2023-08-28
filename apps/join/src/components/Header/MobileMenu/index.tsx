import React, { useState } from 'react';

import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Hamburger, JoinLogo } from '@kyero/icons';

import { useHeaderScroll } from '@hooks/useHeaderScroll';
import { Drawer } from './Drawers';

const panelOpenHandler =
  (scrollHandler: (value: number) => void, activeHandler: (active: boolean) => void) => () => {
    scrollHandler(window.scrollY);
    document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    activeHandler(true);
  };
const panelCloseHandler = (activeHandler: (active: boolean) => void, scrollValue: number) => () => {
  document.body.style.overflowY = 'visible';
  document.body.style.position = 'static';
  window.scrollTo(0, scrollValue);
  activeHandler(false);
};

export const MobileMenu = () => {
  const { t } = useTranslation('common');
  const [activeDrawer, setActiveDrawer] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isAboveThreshold } = useHeaderScroll({ type: 'MOBILE' });
  const openDrawer = panelOpenHandler(setScrollPosition, setActiveDrawer);
  const closeDrawer = panelCloseHandler(setActiveDrawer, scrollPosition);
  return (
    <section
      className={cn(`sticky top-0 z-[99] flex w-full overflow-hidden bg-white py-4 lg:hidden`, {
        'shadow-mobile': isAboveThreshold,
      })}
    >
      <div className="text-sierra-night-100 container mx-auto flex w-full items-center justify-between ">
        <Link href="/">
          <a>
            <JoinLogo />
          </a>
        </Link>
        <button onClick={openDrawer} aria-label={t('header.menu.hamburger.label')}>
          <Hamburger ariaHidden />
        </button>
        <Drawer isActive={activeDrawer} openElement={undefined} onClose={closeDrawer} />
      </div>
    </section>
  );
};
