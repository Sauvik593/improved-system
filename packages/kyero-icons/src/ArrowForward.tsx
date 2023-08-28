import cn from 'classnames';

export const ArrowForward = ({
  className = 'text-ocean-100 w-5',
  size = 'w-5',
}: {
  className?: string | null;
  size?: string;
}) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, size)}
      aria-hidden="true"
    >
      <path
        d="M13.8286 11.1868L14.6821 10.3333H13.475H4.16667C3.98448 10.3333 3.83333 10.1821 3.83333 9.99994C3.83333 9.81774 3.98448 9.6666 4.16667 9.6666H13.475H14.6786L13.8293 8.81377L9.77095 4.73877L9.77022 4.73805C9.64048 4.60831 9.64048 4.39989 9.77022 4.27016C9.89989 4.14049 10.1082 4.14042 10.2379 4.26995C10.238 4.27002 10.238 4.27009 10.2381 4.27015L15.7209 9.76962L15.7214 9.77016C15.8512 9.89989 15.8512 10.1083 15.7214 10.238L10.2298 15.7297C10.1 15.8595 9.89163 15.8595 9.76189 15.7297C9.63215 15.6 9.63215 15.3832 9.76189 15.2535L13.8286 11.1868Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
};