import React, { useEffect, useState } from 'react';

export interface WindowConfig {
  width: number;
  height: number;
  location: string;
  toolbar: string;
  status: string;
  directories: string;
  menubar: string;
  scrollbars: string;
  resizable: string;
  centerscreen: string;
  chrome: string;
  noopener: string;
  windowCenter: boolean;
  noreferrer: string;
  top?: string;
  left?: string;
}

interface Sizes {
  width: number;
  height: number;
}

interface DefaultProps {
  windowConfig: WindowConfig;
}

export interface Props extends Partial<DefaultProps> {
  className?: string;
  children: React.ReactNode;
  url: string;
  title?: string;
  onClick?: () => void;
}

type PropsWithDefaults = Props & DefaultProps;

export const WINDOW_CONFIG: WindowConfig = {
  width: 500,
  height: 400,
  location: 'no',
  toolbar: 'no',
  status: 'no',
  directories: 'no',
  menubar: 'no',
  scrollbars: 'yes',
  resizable: 'no',
  centerscreen: 'yes',
  chrome: 'yes',
  noopener: 'yes',
  noreferrer: 'yes',
  windowCenter: true,
};

export const getConfigQuery = (config: WindowConfig) =>
  Object.keys(config)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((key: string) => `${key}=${config[key]}`)
    .join(', ');

export const getPositionByWindow = ({ width, height }: Sizes) => {
  if (typeof window !== 'undefined') {
    const { screenX, screenY, outerWidth, outerHeight, screenLeft, screenTop } = window;

    return {
      left: outerWidth / 2 + (screenX || screenLeft || 0) - width / 2,
      top: outerHeight / 2 + (screenY || screenTop || 0) - height / 2,
    };
  }

  return {};
};

export const getPositionByScreen = ({ width, height }: Sizes) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2,
});

export const getConfig = (config: Partial<WindowConfig>) => {
  const { windowCenter, ...restWindowConfig } = config;

  const updatedConfig = {
    ...WINDOW_CONFIG,
    ...restWindowConfig,
  };

  const positionGetter = windowCenter ? getPositionByWindow : getPositionByScreen;

  const { top, left } = positionGetter({
    width: updatedConfig.width,
    height: updatedConfig.height,
  });

  updatedConfig.top = top?.toString();
  updatedConfig.left = left?.toString();

  return updatedConfig;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WindowOpener: React.FC<Props> = (props: PropsWithDefaults) => {
  const [windowOpened, setWindowOpen] = useState(false);
  const updatedConfig = getConfig(props.windowConfig);

  useEffect(() => {
    if (windowOpened) {
      const otherWindow = window.open(props.url, '', getConfigQuery(updatedConfig));

      if (otherWindow) {
        otherWindow.opener = null;
      }
    }
  }, [windowOpened]);

  const handleClick = () => {
    setWindowOpen(!windowOpened);

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button type="button" className={props.className} onClick={handleClick} title={props.title}>
      {props.children}
    </button>
  );
};

WindowOpener.defaultProps = {
  windowConfig: WINDOW_CONFIG,
};
