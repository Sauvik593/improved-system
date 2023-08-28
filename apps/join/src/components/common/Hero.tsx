import cn from 'classnames';

interface HeroProps {
  title: string;
  description: string;
  type?: 'center' | 'left';
  paddingClassName?: string;
  children?: React.ReactNode;
  imageComponent?: React.ReactNode;
}

export const Hero = ({
  children,
  imageComponent,
  description,
  title,
  type = 'center',
  paddingClassName = 'pt-24 pb-32 md:pb-48',
}: HeroProps) => {
  return (
    <section className={cn('relative h-auto', paddingClassName)}>
      <div className="bg-ocean-100 curved-hero banner-wave-image absolute left-0 right-0 top-0 z-0 mx-auto h-full w-full" />
      <div className="container relative mx-auto h-full">
        <div
          className={cn('h-full text-white', {
            ['flex flex-col items-center justify-center lg:flex-row']: imageComponent,
          })}
        >
          <div
            className={cn({
              'lg:w-7/12': type === 'left',
            })}
          >
            <div
              className={cn(
                'text-h-3 sm:text-h-3 md:text-h-2 xl:text-h-1 font-semibold leading-none',
                {
                  'mx-auto text-center md:w-3/5': type === 'center',
                  'text-center sm:text-left': type === 'left',
                },
              )}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div
              className={cn('text-p-0-sm md:text-p-0 my-5 font-medium', {
                'mx-auto text-center md:w-2/3': type === 'center',
                'text-center sm:text-left': type === 'left',
              })}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {children}
          </div>
          {imageComponent}
        </div>
      </div>
    </section>
  );
};
