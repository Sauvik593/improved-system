import { Navbar, NavElement, type NavbarProps } from '@kyero/ui';
import { Avatar, Dashboard } from '@kyero/icons';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Navbar',
  component: Navbar,
};

const Link = (props: { children: React.ReactNode; className: string }) => {
  return <div className={props.className || ''}>{props.children}</div>;
};

const LINKS = [
  { title: 'Whatever', icon: <Dashboard />, active: true, linkProps: { to: '/' }, component: Link },
  { title: 'Other', icon: <Avatar />, linkProps: { to: '/' } },
  { title: 'Other', icon: <Avatar />, linkProps: { to: '/' } },
  { title: 'Other', icon: <Avatar />, linkProps: { to: '/' } },
];

const Template: Story<NavbarProps> = (args) => (
  <div className="h-full w-[217px]">
    <Navbar {...args}>
      {LINKS.map((link) => (
        <NavElement {...link} key={link.title} />
      ))}
    </Navbar>
  </div>
);

export const Default = Template.bind({});

export const WithBottomProps = Template.bind({});
WithBottomProps.args = {
  bottomProps: {
    title: 'John Doe',
    subtitle: 'Marketing Department',
    imgSrc: 'https://via.placeholder.com/48.png',
  },
};

export default meta;
