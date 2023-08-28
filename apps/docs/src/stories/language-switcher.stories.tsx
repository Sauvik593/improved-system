import { LanguageSwitcher, ButtonLinkElementProps, LanguageSwitcherProps } from '@kyero/ui';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'LanguageSwitcher',
  component: LanguageSwitcher,
};

const languages = [
  { title: 'English', locale: 'en' },
  { title: 'Espana', locale: 'es' },
];

const DummyLink = (props: ButtonLinkElementProps) => (
  <a href={props.to} className={props.className}>
    {props.children}
  </a>
);

const Template: Story<LanguageSwitcherProps> = () => (
  <div className="relative flex h-[200px] items-end">
    <LanguageSwitcher
      languages={languages}
      currentLocale="en"
      currentUrl="/"
      changeUrlPath="/"
      LinkComponent={DummyLink}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
export default meta;
