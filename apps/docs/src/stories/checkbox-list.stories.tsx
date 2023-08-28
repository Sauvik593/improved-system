import { CheckboxList, type CheckboxListProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Checkbox List',
  component: CheckboxList,
};

const OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const Template: Story<CheckboxListProps> = (args) => <CheckboxList {...args} />;

export const List = Template.bind({});
List.args = {
  name: 'Bedrooms',
  options: OPTIONS,
  defaultValue: ['1'],
};

export default meta;
