import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useState, type HTMLAttributes } from 'react';

type Props = {
  imageUrl: string;
  alt: string;
} & HTMLAttributes<HTMLImageElement>;

export const AsyncImage = ({ imageUrl, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const { ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    onChange: (inView, entry) => {
      if (inView && !loaded) {
        loadImage(entry.target as HTMLImageElement);
      }
    },
  });

  const loadImage = (target: HTMLImageElement) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (!loaded) {
        target.setAttribute('src', imageUrl);
        setLoaded(true);
      }
    };
  };

  return (
    <>
      <div
        className={cn('bg-sierra-night-40 skeleton-pulse absolute h-full w-full transform-gpu', {
          'opacity-0': loaded,
        })}
      />
      <img
        {...props}
        alt={props.alt}
        ref={ref}
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full transform-gpu select-none object-cover transition-opacity duration-200',
          {
            'opacity-0': !loaded,
          },
        )}
      />
    </>
  );
};
