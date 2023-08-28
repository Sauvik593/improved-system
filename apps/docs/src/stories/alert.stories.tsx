import { Alert, AlertProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';
import type { LinkComponentProps } from '@kyero/ui/src/types';

const meta: Meta = {
  title: 'Alert',
  component: Alert,
  argTypes: {
    type: {
      description: 'An alert type',
      options: ['info', 'success', 'error'],
      control: { type: 'select' },
    },
  },
};

const DummyLink = (props: LinkComponentProps) => (
  <a href={props.to as string} className={props.className}>
    {props.children}
  </a>
);

const Template: Story<AlertProps> = (args) => (
  <Alert {...args}>
    <p>Info for the user</p>
  </Alert>
);

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  fullWidth: false,
  closable: false,
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  fullWidth: false,
  closable: false,
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  fullWidth: false,
  closable: false,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  type: 'info',
  fullWidth: true,
  closable: false,
};

export const Closable = Template.bind({});
Closable.args = {
  type: 'info',
  fullWidth: false,
  closable: true,
  onClose: () => alert('closing!'),
};

export const ClosableWithAction = Template.bind({});
ClosableWithAction.args = {
  type: 'info',
  fullWidth: false,
  closable: true,
  onClose: () => alert('closing!'),
  action: {
    to: '/',
    message: 'Checkout',
    LinkComponent: DummyLink,
  },
};

export const SuccessClosableWithAction = Template.bind({});
SuccessClosableWithAction.args = {
  type: 'success',
  fullWidth: true,
  closable: true,
  onClose: () => alert('closing!'),
  action: {
    to: '/',
    message: 'Checkout',
    LinkComponent: DummyLink,
  },
};

export default meta;
