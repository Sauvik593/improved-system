import cn from 'classnames';
import { Close, LogoWide } from '@kyero/icons';
import type { NavBottomUserProps } from './NavBottomUser';
import { NavBottomUser } from './NavBottomUser';

export interface NavbarProps {
  children: React.ReactNode;
  className?: string | null;
  bottomProps?: NavBottomUserProps;
  onClose?: () => void;
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => (
  <section
    className={cn('bg-sierra-night-100 flex h-full min-h-screen flex-col', {
      [props.className || '']: true,
    })}
  >
    <div className="flex p-5">
      <picture className="">
        <LogoWide variant="light" width={106} />
      </picture>
      {props.onClose ? (
        <button onClick={props.onClose} className="ml-auto lg:hidden">
          <Close className="text-white" />
        </button>
      ) : null}
    </div>
    <nav>
      <ul className="text-white">{props.children}</ul>
    </nav>
    {props.bottomProps ? (
      <footer className="mt-auto">
        <NavBottomUser {...props.bottomProps} />
      </footer>
    ) : null}
  </section>
);

Navbar.displayName = 'Navbar';
