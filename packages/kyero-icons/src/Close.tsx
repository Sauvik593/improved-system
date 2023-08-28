export const Close = ({
  className,
  width = 24,
  ariaHidden,
}: {
  className?: string;
  width?: number;
  ariaHidden?: boolean;
}) => (
  <svg
    width={width}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...(ariaHidden ? { 'aria-hidden': true } : {})}
  >
    <g clipPath="url(#clip0_539_1272)">
      <path
        d="M5.4375 18.5619L18.5625 5.43692"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5625 18.5619L5.4375 5.43692"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_539_1272">
        <rect width="24" height="24" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
