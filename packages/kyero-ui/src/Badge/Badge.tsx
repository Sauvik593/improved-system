import cn from 'classnames';

export type BadgeVariant = 'green' | 'orange' | 'gray';

export interface BadgeProps {
  variant: BadgeVariant;
  message: string;
  indicator?: boolean;
  className?: string;
}

const BADGE_CONFIG = {
  green: 'bg-meadow-100',
  orange: 'bg-orange-100',
  gray: 'bg-sierra-night-40',
};

const Pulse = () => {
  return <span className="mr-2 block h-2 w-2 animate-pulse rounded-full bg-white" />;
};

Pulse.displayName = 'Pulse';

export const Badge = (props: BadgeProps) => {
  const config = BADGE_CONFIG[props.variant];
  return (
    <span
      className={cn(
        'text-p-3 inline-flex items-center rounded-2xl p-1 px-2 text-white',
        props.className,
        {
          [config]: true,
        },
      )}
    >
      {props.indicator ? <Pulse /> : null}
      {props.message}
    </span>
  );
};

Badge.displayName = 'Badge';
