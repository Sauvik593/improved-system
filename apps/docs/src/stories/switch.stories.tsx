import { Switch, type SwitchProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Switch',
  component: Switch,
};

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultValue: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultValue: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultValue: true,
  disabled: true,
};

export default meta;
