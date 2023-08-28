import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  prevSectionColor?: string;
  nextSectionColor?: string;
  className?: string;
  sectionClassName?: string;
  wrapperClassName?: string;
  bottomPattern?: 'banner-leaf-image' | 'banner-wave-image' | 'banner-pattern-image';
  testId?: string;
}

export const CurvedSection = ({
  prevSectionColor,
  nextSectionColor,
  children,
  className = '',
  sectionClassName = '',
  bottomPattern,
  wrapperClassName = '',
  testId,
}: Props) => {
  return (
    <div className={twMerge('relative md:mt-0', wrapperClassName)}>
      {prevSectionColor && (
        <div
          className="max-w-screen pointer-events-none absolute top-[-1px] h-full w-full overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 2139 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            className="z-1 xl-max-w-[2139px] 3xl:mx-auto 3xl:w-[max(2139px,100%)]  relative  top-0 ml-[-40%] w-[160%]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2138.5 0C1816 0 1758 46.6053 1035.5 46.6053C417.5 46.6053 364 0 0 0H2138.5Z"
              fill={prevSectionColor}
            />
          </svg>
        </div>
      )}

      <section className={twMerge('relative w-full py-4 md:overflow-hidden', sectionClassName)}>
        {bottomPattern && (
          <div className={twMerge(bottomPattern, ' pointer-events-none select-none')} />
        )}
        <div
          className={twMerge('mx-auto max-w-[1176px] py-14 px-4 md:py-24 md:pb-20', className)}
          data-testid={testId || undefined}
        >
          {children}
        </div>
      </section>

      {nextSectionColor && (
        <div
          className="max-w-screen pointer-events-none absolute bottom-[-2px] z-0 w-full overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 2138 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`z-1 xl-max-w-[2139px] 3xl:mx-auto 3xl:w-[max(2139px,100%)] after:content[""]  relative  ml-[-40%] w-[160%]`}
          >
            <path
              d="M2138 47V0C2009.11 0.0192871 1922.46 7.48779 1818.6 16.4398C1662.94 29.8563 1468.63 46.6053 1035.5 46.6053C685.846 46.6053 516.894 31.6865 370.171 18.7305C257.566 8.78711 158.055 0 0 0V47H2138Z"
              fill={nextSectionColor}
            />
          </svg>
        </div>
      )}
    </div>
  );
};
