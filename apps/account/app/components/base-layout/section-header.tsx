import { useLoaderData } from '@remix-run/react';
import cn from 'classnames';

interface Props {
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export const usePageTitle = () => {
  const loader = useLoaderData();

  return loader['title'];
};

export const SectionHeader = (props: Props) => {
  const title = usePageTitle();

  return (
    <section className={cn('mb-4', props.className)}>
      <h1 className="text-h-2-sm font-semibold text-sierra-night-100 md:text-h-2">{title}</h1>
      {props.description ? <p className="mt-2">{props.description}</p> : null}
      {props.children}
    </section>
  );
};
