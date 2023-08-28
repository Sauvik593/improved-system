import { Meta, Story } from '@storybook/react';
import { Footer, FooterProps, ButtonLinkElementProps } from '@kyero/ui';

const meta: Meta = {
  title: 'Footer',
  component: Footer,
};

const DummyLink = (props: ButtonLinkElementProps) => (
  <a href={props.to} className={props.className}>
    {props.children}
  </a>
);

const languages = [
  { title: 'English', locale: 'en' },
  { title: 'Espana', locale: 'es' },
];

const Template: Story<FooterProps> = (args) => (
  <div className="flex-end flex min-h-[300px]">
    <Footer {...args} />
  </div>
);

export const WithoutLanguageSwitcher = Template.bind({});
WithoutLanguageSwitcher.args = {
  linkProps: [{ href: '/', title: 'Cookies' }],
};

export const WithLanguageSwitcher = Template.bind({});
WithLanguageSwitcher.args = {
  linkProps: [{ href: '/', title: 'Cookies' }],
  languageProps: {
    languages,
    currentLocale: 'en',
    currentUrl: '/',
    changeUrlPath: '/',
    LinkComponent: DummyLink,
  },
};

export default meta;
