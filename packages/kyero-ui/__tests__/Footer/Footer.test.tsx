import renderer from 'react-test-renderer';
import { Footer, type FooterProps, type ButtonLinkElementProps } from '../../src';

const DummyLink = (props: ButtonLinkElementProps) => (
  <a href={props.to as string} className={props.className}>
    {props.children}
  </a>
);

export const languages = [
  { title: 'English', locale: 'en' },
  { title: 'Espana', locale: 'es' },
];

const getLanguageProps = () => ({
  languages,
  currentLocale: 'en',
  currentUrl: '/',
  changeUrlPath: '/',
  LinkComponent: DummyLink,
});

const getProps = (props: Partial<FooterProps> = {}) => ({
  linkProps: [
    {
      title: 'test',
      href: '/',
    },
  ],
  ...props,
});

describe('<Footer />', () => {
  it('should render correctly', () => {
    const props = getProps() as FooterProps;
    const footer = renderer.create(<Footer {...props} />).toJSON();
    expect(footer).toMatchSnapshot();
  });

  describe('with language switcher', () => {
    it('should render correctly', () => {
      const props = getProps({ languageProps: getLanguageProps() }) as FooterProps;
      const footer = renderer.create(<Footer {...props} />).toJSON();
      expect(footer).toMatchSnapshot();
    });
  });
});
