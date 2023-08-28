import { Button, ButtonProps, ButtonLinkElementProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      description: 'Button type',
      options: ['blue', 'green', 'orange', 'sky', 'sunshine'],
      control: { type: 'select' },
    },
    variant: {
      description: 'Button variant',
      options: ['outline', 'full'],
      control: { type: 'select' },
    },
  },
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  buttonType: 'blue',
  variant: 'full',
  message: 'Search properties',
  fullWidth: false,
};

export const Outline = Template.bind({});
Outline.args = {
  buttonType: 'blue',
  variant: 'outline',
  message: 'Cancel',
  onClick: () => alert('click!'),
  fullWidth: false,
};

export const Green = Template.bind({});
Green.args = {
  buttonType: 'green',
  variant: 'full',
  message: 'Save now',
  onClick: () => alert('click!'),
  fullWidth: false,
};

export const Orange = Template.bind({});
Orange.args = {
  buttonType: 'orange',
  variant: 'full',
  message: 'Save now',
  onClick: () => alert('click!'),
  fullWidth: false,
};

export const Sky = Template.bind({});
Sky.args = {
  buttonType: 'sky',
  variant: 'full',
  message: 'Save now',
  onClick: () => alert('click!'),
  fullWidth: false,
};

export const Sunshine = Template.bind({});
Sunshine.args = {
  buttonType: 'sunshine',
  variant: 'full',
  message: 'Save now',
  onClick: () => alert('click!'),
  fullWidth: false,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  buttonType: 'blue',
  variant: 'outline',
  message: 'Save changes',
  onClick: () => alert('click!'),
  fullWidth: true,
};

export const WithLink = Template.bind({});
WithLink.args = {
  buttonType: 'blue',
  variant: 'outline',
  message: 'Go here!',
  LinkComponent: (props: ButtonLinkElementProps) => (
    <a href={props.to} className={props.className}>
      {props.children}
    </a>
  ),
  linkProps: {
    to: '/',
  },
  fullWidth: false,
};

export const NativeLink = Template.bind({});
NativeLink.args = {
  buttonType: 'blue',
  variant: 'outline',
  message: 'Go here!',
  LinkComponent: 'native',
  linkProps: {
    to: '/',
  },
  fullWidth: false,
};

export default meta;
