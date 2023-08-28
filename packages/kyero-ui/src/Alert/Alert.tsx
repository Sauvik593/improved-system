import cn from 'classnames';
import { AlertInfo, Checked, Close } from '@kyero/icons';

import type { LinkComponentProps } from '../types';

export type AlertType = 'info' | 'success' | 'error';

type BaseAlertProps = {
  type: AlertType;
  children: React.ReactNode;
  fullWidth?: boolean;
  action?: {
    LinkComponent: (props: LinkComponentProps) => React.ReactElement | null;
    to: string;
    message: string;
  };
};

type ConditionalAlertProps =
  | {
      closable?: true;
      onClose: () => void;
    }
  | {
      closable?: false;
      onClose?: never;
    };

export type AlertProps = BaseAlertProps & ConditionalAlertProps;

const ALERT_CONFIG = {
  info: {
    icon: AlertInfo,
    classNames: {
      root: 'bg-sunshine-20 border-sunshine-100',
      icon: 'text-sunshine-100',
      content: 'text-sierra-night-100',
      closeIcon: 'text-sierra-night-100',
      action:
        'bg-white text-sunshine-100 px-4 py-2 rounded-full text-center border-1 border-sunshine-100',
    },
  },
  success: {
    icon: Checked,
    classNames: {
      root: 'bg-meadow-100 border-meadow-100',
      icon: 'text-white',
      content: 'text-white',
      closeIcon: 'text-white',
      action:
        'bg-white text-meadow-100 px-4 py-2 rounded-full text-center border-1 border-transparent',
    },
  },
  error: {
    icon: AlertInfo,
    classNames: {
      root: 'bg-terracotta-10 border-terracotta-100',
      icon: 'text-terracotta-100',
      content: 'text-sierra-night-100',
      closeIcon: 'text-sierra-night-100',
      action:
        'bg-white text-terracotta-100 px-4 py-2 rounded-full text-center border-1 border-terracotta-100',
    },
  },
};

export const Alert = ({
  type,
  children,
  fullWidth = false,
  closable = false,
  onClose,
  action,
}: AlertProps) => {
  const config = ALERT_CONFIG[type];

  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn('border-1 items-center gap-2 rounded p-3', config.classNames.root, {
        flex: fullWidth,
        'inline-flex': !fullWidth,
      })}
    >
      <div className="mr-12 flex items-center gap-2">
        <div className="flex">
          <Icon className={config.classNames.icon} />
        </div>
        <div className={config.classNames.content}>{children}</div>
      </div>
      <div className="ml-auto flex gap-2">
        {action && (
          <action.LinkComponent className={config.classNames.action} to={action.to}>
            {action.message}
          </action.LinkComponent>
        )}
        {closable ? (
          <button data-testid="close" className="p-1" onClick={onClose}>
            <Close width={18} className={config.classNames.closeIcon} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';
