import { Radio, RadioProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Radio',
  component: Radio,
};

const Template: Story<RadioProps> = (args) => <Radio {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultChecked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Prime',
  name: 'Prime',
  value: '1',
  defaultChecked: true,
  disabled: true,
};

export default meta;
