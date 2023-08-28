import renderer from 'react-test-renderer';
import { render, queryByTestId } from '@testing-library/react';
import { Avatar, Dashboard } from '@kyero/icons';

import type { NavElementProps, NavbarProps } from '../../src';
import { Navbar, NavElement } from '../../src';

const DummyLink = (props: NavElementProps['linkProps'] & { children: React.ReactNode }) => {
  return (
    <div data-testid="dummy-link" className={props.className || ''}>
      {props.children}
    </div>
  );
};

const LINKS = [
  {
    title: 'Test1',
    icon: <Dashboard />,
    active: true,
    linkProps: { to: '/' },
    component: DummyLink,
  },
  { title: 'Test2', icon: <Avatar />, linkProps: { to: '/' } },
];

const BOTTOM_PROPS = {
  bottomProps: {
    title: 'Testing title',
    subtitle: 'Testing subtitle',
    imgSrc: 'test.jpg',
  },
};

const renderNav = (props: Partial<NavbarProps> = {}) => (
  <Navbar {...props}>
    {LINKS.map((link) => (
      <NavElement {...link} key={link.title} />
    ))}
  </Navbar>
);

describe('<Navbar />', () => {
  it('should render correctly', () => {
    const navbar = renderer.create(renderNav()).toJSON();
    expect(navbar).toMatchSnapshot();
  });

  describe('rendering list', () => {
    it('should render custom component in a correct place', () => {
      const { getAllByTestId } = render(renderNav());

      const navElements = getAllByTestId('nav-element');
      const [firstElement, secondElement] = navElements;

      expect(navElements).toHaveLength(2);
      expect(queryByTestId(firstElement, 'dummy-link')).toBeTruthy();
      expect(queryByTestId(secondElement, 'dummy-link')).toBeFalsy();
    });
  });

  describe('rendering footer', () => {
    it('should render correctly', () => {
      const navbar = renderer.create(renderNav(BOTTOM_PROPS)).toJSON();
      expect(navbar).toMatchSnapshot();
    });

    it('should render footer correctly', () => {
      const { getByTestId } = render(renderNav(BOTTOM_PROPS));

      expect(getByTestId('nav-bottom-user')).toBeTruthy();
    });
  });
});
