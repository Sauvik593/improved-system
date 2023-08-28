import cn from 'classnames';
import { useGlobalPendingState } from 'remix-utils';

export const PageLoader = () => {
  const state = useGlobalPendingState();

  return (
    <div
      className={cn('slider', {
        hidden: state === 'idle',
      })}
    >
      <div className="line" />
      <div className="subline inc" />
      <div className="subline dec" />
    </div>
  );
};
