export const Avatar = ({ width = 20, height = 19 }: { width?: number; height?: number }) => (
  <svg
    viewBox="0 0 19 20"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9.24875" cy="9.24875" r="9.24875" fill="#232559" />
    <mask
      id="mask0_22_2320"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="2"
      y="3"
      width="14"
      height="17"
    >
      <path
        d="M12.4645 6.90497C12.4645 8.73556 11.0101 10.9933 9.13163 10.9933C7.25311 10.9933 5.85938 8.73556 5.85938 6.90497C5.85938 5.07438 7.31371 3.54889 9.19222 3.54889C11.0707 3.54889 12.4645 5.01336 12.4645 6.90497Z"
        fill="#B3B3B3"
      />
      <path
        d="M15.4338 16.546C15.4338 16.7901 12.1615 19.0479 9.13165 19.0479C6.22298 18.9868 2.89014 16.9122 2.89014 16.546C2.89014 13.8002 6.46537 11.6035 9.19225 11.6035C11.9191 11.6035 15.4338 13.8002 15.4338 16.546Z"
        fill="#B3B3B3"
      />
    </mask>
    <g mask="url(#mask0_22_2320)">
      <circle cx="9.24863" cy="9.24881" r="9.24875" fill="#EDEDF0" />
    </g>
  </svg>
);
