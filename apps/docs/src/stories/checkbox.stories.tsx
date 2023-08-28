import { Checkbox, CheckboxProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Villas',
  name: 'Villas',
  value: '1',
  defaultChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Villas',
  name: 'Villas',
  value: '1',
  defaultChecked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Villas',
  name: 'Villas',
  value: '1',
  defaultChecked: true,
  disabled: true,
};

export default meta;
