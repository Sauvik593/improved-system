import renderer from 'react-test-renderer';
import { Radio, type RadioProps } from '../../src';

const getProps = (props: Partial<RadioProps> = {}) => ({
  label: 'Test',
  name: 'Test',
  value: '1',
  defaultChecked: false,
  ...props,
});

const renderRadio = (props: RadioProps) => <Radio {...props} />;

describe('<Radio />', () => {
  it('should render correctly', () => {
    const props = getProps() as RadioProps;
    const radio = renderer.create(renderRadio(props)).toJSON();
    expect(radio).toMatchSnapshot();
  });

  describe('checked type', () => {
    it('should render correctly', () => {
      const props = getProps({ defaultChecked: true }) as RadioProps;
      const radio = renderer.create(renderRadio(props)).toJSON();
      expect(radio).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('should render correctly', () => {
      const props = getProps({ disabled: true }) as RadioProps;
      const radio = renderer.create(renderRadio(props)).toJSON();
      expect(radio).toMatchSnapshot();
    });
  });
});
