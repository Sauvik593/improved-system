import { useEffect, useRef, useState } from 'react';

export const useRefPosition = () => {
  const [refVisible, setRefVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  function getPosition() {
    if (!ref.current) {
      return;
    }
    const bounding = ref.current.getBoundingClientRect();
    const myElementHeight = ref.current.offsetHeight;
    const myElementWidth = ref.current.offsetWidth;
    if (
      bounding.top >= -myElementHeight &&
      bounding.left >= -myElementWidth &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth) + myElementWidth &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) + myElementHeight
    ) {
      setRefVisible(true);
    } else {
      setRefVisible(false);
    }
  }

  useEffect(() => {
    if (ref.current) {
      window.addEventListener('scroll', getPosition);
    }

    return () => window.removeEventListener('scroll', getPosition);
  });

  return { ref, refVisible };
};
