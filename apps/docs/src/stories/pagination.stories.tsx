import { Pagination, PaginationProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Pagination',
  component: Pagination,
};

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentPage: 6,
  totalPages: 10,
  pathname: '/',
  nextPage: 7,
  prevPage: null,
  search: '?path=/story/pagination--default&some_param=true',
};

export default meta;
