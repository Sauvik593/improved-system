interface Props {
  width?: number;
  className?: string;
}

export const Plus = ({
  width = 24,
  className = '',
  ...props
}: Props & JSX.IntrinsicElements['svg']) => (
  <svg
    width={width}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
