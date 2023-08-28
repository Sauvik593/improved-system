import React from 'react';

import cn from 'classnames';

interface Props {
  isActive: boolean | number | undefined;
  direction: 'left' | 'right';
  theme: 'white' | 'clay';
  children: React.ReactNode;
  headerButton: React.ReactNode;
  headerVariant: 'single' | 'multi';
}
export const DrawerContainer: React.FunctionComponent<Props> = (props) => {
  const drawerClassNames = cn(
    'overflow-auto fixed top-0 left-0 w-full h-full duration-300 transition-all',
    {
      ['pointer-events-none -translate-x-full']: !props.isActive && props.direction === 'left',
      ['pointer-events-none translate-x-full']: !props.isActive && props.direction === 'right',
      ['bg-white']: props.theme === 'white',
      ['bg-clay-100']: props.theme === 'clay',
    },
  );

  const contentClassNames = cn({
    'absolute top-0 right-0 h-full w-full transition-all duration-300': props.direction === 'left',
    'absolute top-0 right-0 h-full w-full transition-all duration-300 flex flex-col':
      props.direction === 'right',
  });

  const headerVariantsClassNames = cn({
    'flex items-center h-[64px]': props.headerVariant === 'single',
    'flex p-6 items-center text-p-2-sm': props.headerVariant === 'multi',
  });
  return (
    <div className={drawerClassNames} data-testid="drawer" style={{ zIndex: 99 }}>
      <section className={contentClassNames}>
        <header className={headerVariantsClassNames}>{props.headerButton}</header>
        {props.children}
      </section>
    </div>
  );
};
