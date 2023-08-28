import cn from 'classnames';

interface Props {
  initials: string;
}

export const InitialsCirle = ({ initials }: Props) => (
  <span
    className={cn(
      'bg-tile-100 text-p-3 flex h-10 w-10 items-center justify-center rounded-full font-normal text-white md:hidden',
    )}
    role="presentation"
    data-testid="mobile-menu.user-initials"
  >
    {initials}
  </span>
);
