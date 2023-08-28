import { RadioList, type RadioListProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Radio List',
  component: RadioList,
};

const OPTIONS = [
  { label: 'Villas', value: 'Villas' },
  { label: 'Garage', value: 'Garage' },
  { label: 'Flat', value: 'Flat' },
];

const Template: Story<RadioListProps> = (args) => <RadioList {...args} />;

export const List = Template.bind({});
List.args = {
  name: 'Property Types',
  options: OPTIONS,
  defaultValue: 'Villas',
};

export default meta;
