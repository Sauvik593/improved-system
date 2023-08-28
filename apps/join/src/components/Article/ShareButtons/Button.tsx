import cn from 'classnames';

import type { ButtonProps } from './types';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ title, onClick, className, children }) => {
  return (
    <button
      className={cn(`flex items-center justify-center rounded-full`, className)}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
