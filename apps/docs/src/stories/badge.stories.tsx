import { Badge, BadgeProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    variant: {
      description: 'Badge color variant',
      options: ['green', 'orange', 'gray'],
      control: { type: 'select' },
    },
  },
};

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Green = Template.bind({});
Green.args = {
  variant: 'green',
  message: 'Live',
  indicator: false,
};

export const Orange = Template.bind({});
Orange.args = {
  variant: 'orange',
  message: 'New properties',
  indicator: false,
};

export const Gray = Template.bind({});
Gray.args = {
  variant: 'gray',
  message: 'Hidden',
  indicator: false,
};

export const WithIndicator = Template.bind({});
WithIndicator.args = {
  variant: 'orange',
  message: 'New properties',
  indicator: true,
};

export default meta;
