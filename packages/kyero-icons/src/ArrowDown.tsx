import cn from 'classnames';

export const ArrowDown = ({ className }: { className?: string | null }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M11.6464 13.5236L12 13.8772L12.3535 13.5236L16.2335 9.64361C16.4219 9.45528 16.7469 9.45168 16.9487 9.64592C17.1412 9.84082 17.1404 10.1525 16.9464 10.3465L17.3 10.7001L16.9464 10.3465L12.3564 14.9365C12.1617 15.1312 11.8483 15.1312 11.6535 14.9365L7.06353 10.3465C6.8688 10.1518 6.8688 9.83835 7.06353 9.64361C7.25827 9.44887 7.57169 9.44887 7.76643 9.64361L11.6464 13.5236Z"
      fill="#1F4DEF"
      stroke="#1F4DEF"
    />
  </svg>
);
