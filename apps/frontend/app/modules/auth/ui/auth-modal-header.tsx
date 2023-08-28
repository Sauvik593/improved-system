import { Fragment } from 'react';

import { mobile, desktop } from '~/modules/auth/images/images';

interface Props {
  messageComponent: React.ReactNode | null;
}

export const AuthModalHeader = ({ messageComponent }: Props) => {
  return (
    <header className="relative h-56 w-full md:order-2 md:-ml-3 md:h-auto md:md:w-[calc(100%+0.75rem)] md:overflow-hidden md:rounded-tr-xl md:rounded-br-xl">
      <picture>
        {[mobile, desktop].map(({ query, jpg, avif, webp, key }) => {
          return (
            <Fragment key={`${key}-fragment`}>
              <source
                key={`${key}-webp`}
                media={query}
                srcSet={`${webp[0]}, ${webp[1]} 2x`}
                type="image/webp"
              />
              <source
                key={`${key}-avif`}
                media={query}
                srcSet={`${avif[0]}, ${avif[1]} 2x`}
                type="image/avif"
              />
              {query ? (
                <source key={`${key}-jpg`} media={query} srcSet={`${jpg[0]}, ${jpg[1]} 2x`} />
              ) : (
                <img
                  key={key}
                  src={jpg[0]}
                  alt=""
                  role="presentation"
                  className="bg-sierra-night-10 absolute top-0 right-0 h-full w-full object-cover"
                />
              )}
            </Fragment>
          );
        })}
      </picture>
      {messageComponent}
    </header>
  );
};
