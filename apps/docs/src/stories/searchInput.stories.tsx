import { SearchInput, SearchInputProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'SearchInput',
  component: SearchInput,
  argTypes: {
    className: {
      description: 'Additional class names for the search input',
      control: { type: 'text' },
    },
  },
};

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />;

export const Search = Template.bind({});
Search.args = {
  id: 'q',
  name: 'q',
  placeholder: 'Search properties',
};

export const SearchGray = Template.bind({});
SearchGray.args = {
  id: 'q',
  name: 'q',
  placeholder: 'Search properties',
  className: 'bg-sierra-night-10',
};

export default meta;
