import cn from 'classnames';

export type LinkNavProps = {
  to: string;
  className?: string | null;
  children?: React.ReactNode | null;
  // eslint-disable-next-line
} & any;

export interface NavElementProps {
  title: string;
  active?: boolean;
  icon: React.ReactElement;
  component?: null | React.JSXElementConstructor<LinkNavProps>;
  linkProps: LinkNavProps;
}

const BaseLink = (props: LinkNavProps) => {
  return (
    <a href={props.to} className={props.className || ''}>
      {props.children}
    </a>
  );
};

export const NavElement = ({ title, active, icon, component, linkProps }: NavElementProps) => {
  const className = cn('w-full px-4 py-3 flex hover:bg-sierra-night-80 focus:bg-sierra-night-80', {
    'bg-sierra-night-80': active,
  });

  const WrapperComponent = component || BaseLink;

  return (
    <li className="flex items-center" data-testid="nav-element">
      <WrapperComponent {...linkProps} className={className}>
        {icon}
        <span className="ml-2">{title}</span>
      </WrapperComponent>
    </li>
  );
};

NavElement.displayName = 'NavElement';
