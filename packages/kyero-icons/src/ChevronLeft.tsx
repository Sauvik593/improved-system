export const ChevronLeft = ({
  className,
  ariaHidden,
}: {
  className?: string | null;
  ariaHidden?: boolean;
}) => (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className || ''}
    aria-hidden={ariaHidden}
  >
    <path
      d="M8.33331 14.6667L1.66665 8.00008L8.33331 1.33342"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
