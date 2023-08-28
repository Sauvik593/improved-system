export interface LogoutProps {
  className?: string;
}

export const Logout = ({ className = '' }: LogoutProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.90481 10.6667V12.1905C9.90481 12.3925 9.82454 12.5863 9.68165 12.7292C9.53877 12.8721 9.34498 12.9524 9.14291 12.9524H3.80957C3.6075 12.9524 3.41371 12.8721 3.27083 12.7292C3.12794 12.5863 3.04767 12.3925 3.04767 12.1905V3.80951C3.04767 3.60744 3.12794 3.41365 3.27083 3.27076C3.41371 3.12788 3.6075 3.04761 3.80957 3.04761H9.14291C9.34498 3.04761 9.53877 3.12788 9.68165 3.27076C9.82454 3.41365 9.90481 3.60744 9.90481 3.80951V5.33332"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.61908 8H12.9524"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.4286 6.47607L12.9525 7.99988L11.4286 9.52369"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
