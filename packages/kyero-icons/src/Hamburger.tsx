export const Hamburger = ({
  ariaHidden,
  className = 'text-sierra-night-100',
}: {
  ariaHidden?: boolean;
  className?: string;
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <g clipPath="url(#clip0_624_9075)">
      <path
        d="M4 24.004H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16.004H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8.00397H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_624_9075">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
