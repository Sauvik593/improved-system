import { useEffect, useMemo, useState } from 'react';

import throttle from 'lodash/throttle';

const THRESHOLDS = {
  MOBILE: 70,
  DESKTOP: 56,
};

type ThresholdType = keyof typeof THRESHOLDS;

interface Props {
  type: ThresholdType;
}

export const useHeaderScroll = ({ type = 'MOBILE' }: Props) => {
  const [headerScrollPosition, setHeaderScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setHeaderScrollPosition(position);
  };

  const handleScrollEvent = throttle(() => {
    window.requestAnimationFrame(handleScroll);
  }, 100);

  useEffect(() => {
    handleScrollEvent();
    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
    // eslint-disable-next-line
  }, []);

  const isAboveThreshold = useMemo(() => {
    return headerScrollPosition > THRESHOLDS[type];
  }, [headerScrollPosition, type]);

  return {
    headerScrollPosition,
    isAboveThreshold,
  };
};
