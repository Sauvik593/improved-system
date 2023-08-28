interface Props {
  className?: string;
  size?: number;
}

export const XIcon = ({ className = 'text-white', size = 10 }: Props) => (
  <svg width={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className}>
    <path
      d="M1.25 8.74951L8.75 1.24951"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 8.74951L1.25 1.24951"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
