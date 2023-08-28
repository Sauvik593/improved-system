interface Props {
  color?: `text-${string}`;
  size?: number;
}

export const Cart = ({ color = 'text-white', size = 22 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
    >
      <path
        d="M1 1.09521H4.72141L6.04712 14.2762C6.10222 14.6395 6.28678 14.9707 6.56681 15.2087C6.84683 15.4468 7.20345 15.5755 7.57093 15.5714H17.1709C17.5033 15.5888 17.8321 15.4968 18.1072 15.3098C18.3824 15.1226 18.5887 14.8506 18.6947 14.5352L20.7214 8.43998C20.797 8.21083 20.8171 7.96699 20.7799 7.72857C20.7429 7.49014 20.6496 7.26393 20.5081 7.06855C20.3606 6.86082 20.1632 6.6934 19.9344 6.58158C19.7055 6.46978 19.4521 6.41717 19.1976 6.42855H5.25474"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.22673 14.9999L5.56006 6.99988H20.8934L18.2267 14.9999H6.22673Z"
        fill="currentColor"
      />
      <path
        d="M16.9119 20.9047C16.4912 20.9047 16.15 20.5635 16.15 20.1428C16.15 19.722 16.4912 19.3809 16.9119 19.3809C17.3327 19.3809 17.6738 19.722 17.6738 20.1428C17.6738 20.5635 17.3327 20.9047 16.9119 20.9047Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.00714 20.9047C6.58634 20.9047 6.24524 20.5635 6.24524 20.1428C6.24524 19.722 6.58634 19.3809 7.00714 19.3809C7.42793 19.3809 7.76905 19.722 7.76905 20.1428C7.76905 20.5635 7.42793 20.9047 7.00714 20.9047Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
