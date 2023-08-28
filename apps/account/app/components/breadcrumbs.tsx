import { Link } from '@remix-run/react';

export type Breadcrumb = {
  value: string;
  link?: string;
};

interface Props {
  breadcrumbs: Breadcrumb[];
}

const CLASSNAME = 'mr-2 text-h-6 text-tile-100';

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <nav className="mb-2">
      <ul className="flex">
        {breadcrumbs.map((item) => {
          const title = `${item.value} >`;

          return (
            <li key={title} className={CLASSNAME}>
              {item.link ? <Link to={item.link}>{title}</Link> : title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
