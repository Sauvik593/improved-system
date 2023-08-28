import renderer from 'react-test-renderer';
import { ArrowLink, type ArrowLinkProps, ButtonLinkElementProps } from '../../src';

const DummyLink = (props: ButtonLinkElementProps) => {
  return (
    <a data-testid="dummy-link" href={props.to as string} className={props.className || ''}>
      {props.children}
    </a>
  );
};

const getProps = (props: Partial<ArrowLinkProps> = {}) => ({
  message: 'Test',
  className: 'test-class',
  baseColorClassname: 'test-base-color-class',
  activeClassName: 'test-active-class',
  LinkComponent: DummyLink,
  linkProps: {
    to: '/',
  },
  ...props,
});

const renderArrowLink = (props: ArrowLinkProps) => <ArrowLink {...props} />;

describe('<ArrowLink />', () => {
  it('should render correctly', () => {
    const props = getProps() as ArrowLinkProps;
    const arrowLink = renderer.create(renderArrowLink(props)).toJSON();
    expect(arrowLink).toMatchSnapshot();
  });
});
