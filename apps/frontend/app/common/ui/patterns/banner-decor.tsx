import { assetsPathTo } from '~/common/client-router/helpers';

export const BannerDecor = () => (
  <svg
    viewBox="0 0 217 468"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="z-1 pointer-events-none absolute  top-0 -left-28 hidden h-full w-auto select-none md:block"
    id="curved-img"
    aria-hidden="true"
    role="presentation"
  >
    <defs>
      <pattern
        id="imgpattern"
        x="0"
        y="0"
        width="52px"
        height="39px"
        patternUnits="userSpaceOnUse"
        viewBox="0 0 1 1"
        preserveAspectRatio="xMidYMid slice"
      >
        <image
          width="1px"
          height="1px"
          xlinkHref={assetsPathTo('/images/shapes/pattern-ocean.svg')}
        />
      </pattern>
    </defs>
    <path
      d="M195.639 -8.55165e-06L167.089 -7.3037e-06C221.733 226.248 147.643 307.695 1.45642 468.399C0.971742 468.932 0.486277 469.465 2.05444e-05 470L180.597 470C243.773 233.218 208.174 19.1109 195.639 -8.55165e-06Z"
      fill="url(#imgpattern)"
      fillOpacity="0.5"
    />
  </svg>
);
