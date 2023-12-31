import cn from 'classnames';

export const ArrowBackward = ({
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
        d="M4.02182 11.666L3.19452 10.8171H4.37991H18.7165C19.1342 10.8171 19.5 10.4605 19.5 10C19.5 9.53949 19.1342 9.18291 18.7165 9.18291H4.37991H3.1979L4.02111 8.33469L10.2717 1.89412L10.2724 1.89339C10.5838 1.57389 10.5838 1.05371 10.2724 0.734205C9.96822 0.422043 9.48354 0.421932 9.17921 0.733872C9.1791 0.733983 9.17899 0.734094 9.17888 0.734205L0.734041 9.42645L0.733513 9.427C0.422163 9.7465 0.422163 10.2667 0.733513 10.5862L9.19172 19.2658C9.49603 19.5781 9.98095 19.5781 10.2853 19.2658C10.5966 18.9463 10.5966 18.4129 10.2853 18.0934L4.02182 11.666Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
};
