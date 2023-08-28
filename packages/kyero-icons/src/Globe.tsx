interface Props {
  className?: string;
}

export const Globe = ({ className = 'text-white' }: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_1_329)">
      <path
        d="M9.74167 21.1C8.475 19.2417 7.625 15.8583 7.625 12C7.625 8.14166 8.45833 4.75833 9.74167 2.89999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2584 21.1C15.5251 19.2417 16.3751 15.8583 16.3751 12C16.3751 8.14166 15.5418 4.75833 14.2584 2.89999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.625 12H21.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.70837 7.625H20.2917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.70837 16.375H20.2917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.375 12C21.3775 14.0263 20.7192 15.9981 19.5 17.6167L21.3667 21.375L16.3667 20.2917C14.555 21.2476 12.48 21.5839 10.4591 21.249C8.43815 20.9141 6.58254 19.9265 5.176 18.4372C3.76946 16.948 2.88941 15.039 2.67043 13.0023C2.45145 10.9655 2.90559 8.91312 3.96341 7.15891C5.02123 5.40469 6.6245 4.04523 8.52804 3.2884C10.4316 2.53157 12.5306 2.41905 14.5042 2.96803C16.4777 3.51701 18.2171 4.69728 19.4564 6.32835C20.6957 7.95942 21.3667 9.95151 21.3667 12H21.375Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_329">
        <rect width="24" height="24" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
