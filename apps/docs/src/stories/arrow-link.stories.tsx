import { ArrowLink, ButtonLinkElementProps, type ArrowLinkProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'ArrowLink',
  component: ArrowLink,
};

const Template: Story<ArrowLinkProps> = (args) => <ArrowLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Search properties',
  linkProps: {
    to: '/',
  },
  LinkComponent: (props: ButtonLinkElementProps) => (
    <a href={props.to as string} className={props.className}>
      {props.children}
    </a>
  ),
};

export default meta;
