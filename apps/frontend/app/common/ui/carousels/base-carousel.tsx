import { createRef, useEffect } from 'react';
import Carousel, { type CarouselProps } from 'react-multi-carousel';

let firstClientX = 0,
  clientX = 0;

const preventTouch = (e: TouchEvent) => {
  const minValue = 5; // threshold

  clientX = e.touches[0].clientX - firstClientX;

  // Vertical scrolling does not work when you start swiping horizontally.
  if (Math.abs(clientX) > minValue) {
    e.preventDefault();
    e.returnValue = false;

    return false;
  }
};

const touchStart = (e: TouchEvent) => {
  firstClientX = e.touches[0].clientX;
};

export const BaseCarousel = ({ children, ...props }: CarouselProps) => {
  let containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', touchStart);
      containerRef.current.addEventListener('touchmove', preventTouch, {
        passive: false,
      });
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', touchStart);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('touchmove', preventTouch);
      }
    };
  });

  return (
    <div ref={containerRef} className={props.className}>
      <Carousel {...props}>{children}</Carousel>
    </div>
  );
};
