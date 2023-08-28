import { Checkbox, FiltersField, FiltersFieldProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Filters Field',
  component: FiltersField,
};

const Template: Story<FiltersFieldProps> = (args) => (
  <FiltersField {...args}>
    <Checkbox label={'Villas'} name="Villas" value="1" defaultChecked={false} />
  </FiltersField>
);

export const Field = Template.bind({});
Field.args = {
  label: 'Seach properties',
};

export default meta;
